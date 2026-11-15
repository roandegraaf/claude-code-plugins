import { expect, mock, test } from 'claude-code/testing'

const START = 1_000_000
const MIN = 60_000

type Entry = { kind: 'file' | 'dir'; mtimeMs: number; text?: string }
type Agent = { id: string; name?: string; status: string; parentId?: string }

function setup(on, agents: Agent[] = []) {
  const clock = mock.clock(on, { now: START })
  const entries: Record<string, Entry> = {
    'docs/slides/demo': { kind: 'dir', mtimeMs: 1 },
    'docs/slides/demo/status': { kind: 'dir', mtimeMs: 1 },
    'docs/slides/demo/PROGRESS.md': { kind: 'file', mtimeMs: 1, text: '## Slice: one\n' },
  }
  const rel = (path: string) => path.slice(path.indexOf('docs/slides'))
  on('fs.exists', ($, e) => ({ value: rel(e.path) === 'docs/slides' || rel(e.path) in entries }))
  on('fs.list', ($, e) => {
    const dir = rel(e.path) + '/'
    const names = Object.keys(entries).filter(p => p.startsWith(dir) && !p.slice(dir.length).includes('/'))
    return { value: names.map(p => ({ name: p.slice(dir.length), kind: entries[p].kind, size: 0, mtimeMs: entries[p].mtimeMs, isLink: false })) }
  })
  on('fs.read', ($, e) => ({ value: entries[rel(e.path)]?.text ?? '' }))
  on('fs.write', ($, e) => { entries[rel(e.path)] = { kind: 'file', mtimeMs: clock.now(), text: e.text }; return { value: undefined } })
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('session.surfaces', () => ({ value: ['terminal'] }))
  on('session.root', () => ({ value: '/repo' }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  const toasts: string[] = []
  on('ui.toast', ($, e) => { toasts.push(e.text); return { value: undefined } })
  on('agent.list', () => ({ value: agents.map(a => ({ description: a.id, type: 'ultrapowers:slice-worker', ...a })) }))
  on('command.run', () => ({ text: '' }))
  on('tool.call', () => ({ result: 'ok' }))
  on('turn.start', ($, e) => ({ turnId: e.turnId }))
  on('turn.complete', () => ({ text: '' }))
  const wakes: string[] = []
  on('prompt.submit', ($, e) => { wakes.push(e.text); return { text: e.text } })
  return { clock, entries, toasts, wakes }
}

async function startRun($) {
  await $.session.start({ cwd: '/repo', surface: 'terminal', isInteractive: true })
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
}

async function orchestratorTurn($, turnId: string) {
  await $.turn.start({ text: '', turnId })
  await $.turn.complete({ answer: '', durationMs: 1, isAborted: false, turnId, reason: 'answer' })
}

async function spawn($, name: string) {
  await $.tool.call({ tool: 'Agent', name, description: name, prompt: 'go' } as never)
}

test('a worker that idles without a STATUS gets the orchestrator woken, then a harder nudge, then the person', async ($, on) => {
  const agents: Agent[] = [{ id: 'a1', name: 'slice-5-2', status: 'running' }]
  const { clock, toasts, wakes } = setup(on, agents)
  await startRun($)
  await spawn($, 'slice-5-2')
  await $.tool.call({ tool: 'Bash', command: 'xcodebuild test', run_in_background: true, agentId: 'a1' } as never)
  await orchestratorTurn($, 't1')
  agents[0].status = 'idle'

  await clock.advance(4 * MIN)
  expect(wakes).toEqual([])
  await clock.advance(2 * MIN)
  expect(wakes.length).toBe(1)
  expect(wakes[0]).toContain('`slice-5-2`')
  expect(wakes[0]).toContain('never `run_in_background`')

  await clock.advance(20 * MIN)
  expect(wakes.length).toBe(1)

  await orchestratorTurn($, 't2')
  await clock.advance(6 * MIN)
  expect(wakes.length).toBe(2)
  expect(wakes[1]).toContain('TaskStop')

  await orchestratorTurn($, 't3')
  await clock.advance(60 * MIN)
  expect(wakes.length).toBe(2)
  expect(toasts.some(t => t.includes('needs you'))).toBe(true)
})

test('a run stopped on done, blocked or needs_input stays asleep; one stopped on more is woken', async ($, on) => {
  const agents: Agent[] = [{ id: 'a1', name: 'slice-2', status: 'running' }]
  const { clock, entries, wakes } = setup(on, agents)
  await startRun($)
  await spawn($, 'slice-2')
  entries['docs/slides/demo/status/slice-2.md'] = { kind: 'file', mtimeMs: clock.now() + 1, text: 'STATUS: blocked\nVERIFIED: pnpm test → 1\n' }
  agents[0].status = 'completed'
  await orchestratorTurn($, 't1')
  await clock.advance(60 * MIN)
  expect(wakes).toEqual([])

  await spawn($, 'slice-3')
  agents.push({ id: 'a2', name: 'slice-3', status: 'completed' })
  entries['docs/slides/demo/status/slice-3.md'] = { kind: 'file', mtimeMs: clock.now() + 1, text: 'STATUS: more\n' }
  await orchestratorTurn($, 't2')
  await clock.advance(6 * MIN)
  expect(wakes.length).toBe(1)
  expect(wakes[0]).toContain('STATUS: more')
  expect(wakes[0]).toContain('Continue the loop')
})

test('a running worker is left alone while it keeps calling tools, and flagged once it hangs', async ($, on) => {
  const agents: Agent[] = [{ id: 'a1', name: 'slice-4', status: 'running' }]
  const { clock, wakes } = setup(on, agents)
  await startRun($)
  await spawn($, 'slice-4')
  await orchestratorTurn($, 't1')

  await clock.advance(20 * MIN)
  await $.tool.call({ tool: 'Bash', command: 'pnpm test', agentId: 'a1' } as never)
  await clock.advance(20 * MIN)
  expect(wakes).toEqual([])

  await clock.advance(11 * MIN)
  expect(wakes.length).toBe(1)
  expect(wakes[0]).toContain('no tool call in 30 min')
})

test('a worker held on its own background job is woken 5 min after it idles, or at 30 min if it stays held', async ($, on) => {
  const agents: Agent[] = [{ id: 'a1', name: 'slice-5-2', status: 'running' }]
  const { clock, wakes } = setup(on, agents)
  await startRun($)
  await spawn($, 'slice-5-2')
  await $.tool.call({ tool: 'Bash', command: 'xcodebuild test', run_in_background: true, agentId: 'a1' } as never)
  await orchestratorTurn($, 't1')
  agents[0].status = 'waiting'
  await clock.advance(13 * MIN)
  expect(wakes).toEqual([])
  agents[0].status = 'idle'
  await clock.advance(1 * MIN)
  expect(wakes.length).toBe(1)
  expect(wakes[0]).toContain('without a STATUS line')

  await spawn($, 'slice-5-2-retry')
  agents.push({ id: 'a2', name: 'slice-5-2-retry', status: 'waiting' })
  agents[0].status = 'completed'
  await orchestratorTurn($, 't2')
  await clock.advance(29 * MIN)
  expect(wakes.length).toBe(1)
  await clock.advance(2 * MIN)
  expect(wakes.length).toBe(2)
  expect(wakes[1]).toContain('`slice-5-2-retry` (waiting) has made no tool call')
})

test('a missing status folder means the run is finalizing, so nothing is woken', async ($, on) => {
  const agents: Agent[] = [{ id: 'a1', name: 'slice-9', status: 'completed' }]
  const { clock, entries, wakes } = setup(on, agents)
  await startRun($)
  await spawn($, 'slice-9')
  delete entries['docs/slides/demo/status']
  await orchestratorTurn($, 't1')
  await clock.advance(30 * MIN)
  expect(wakes).toEqual([])
})

test('nothing fires while the orchestrator is mid-turn, or before any worker was spawned', async ($, on) => {
  const { clock, wakes } = setup(on, [])
  await startRun($)
  await orchestratorTurn($, 't1')
  await clock.advance(30 * MIN)
  expect(wakes).toEqual([])

  await spawn($, 'slice-1')
  await $.turn.start({ text: '', turnId: 't2' })
  await clock.advance(30 * MIN)
  expect(wakes).toEqual([])
})
