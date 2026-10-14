import { expect, test } from 'claude-code/testing'

const MARKER = 'docs/slides/demo/status/refresh'
const PROGRESS = 'docs/slides/demo/PROGRESS.md'

function fakeDisk(on, files: Record<string, string>) {
  const rel = (path: string) => path.slice(path.indexOf('docs/slides'))
  on('fs.exists', ($, e) => ({ value: rel(e.path) === 'docs/slides' || rel(e.path) in files }))
  on('fs.list', () => ({ value: [{ name: 'demo', kind: 'dir', size: 0, mtimeMs: 0, isLink: false }] }))
  on('fs.read', ($, e) => ({ value: files[rel(e.path)] }))
  on('fs.write', ($, e) => { files[rel(e.path)] = e.text; return { value: undefined } })
}

function fakeSession(on, agents: Array<{ id: string; status: string; parentId?: string }> = []) {
  on('session.surfaces', () => ({ value: ['terminal'] }))
  on('agent.list', () => ({ value: agents.map(a => ({ description: a.id, type: 'ultrapowers:slice-worker', ...a })) }))
  const stopped: string[] = []
  on('tool.call', ($, e) => { stopped.push((e as { task_id: string }).task_id); return { result: 'ok' } })
  const commands: string[] = []
  on('command.run', ($, e) => { commands.push(`${e.command}|${e.args}`); return { text: '' } })
  on('turn.complete', () => ({ text: '' }))
  return { commands, stopped }
}

const answered = (turnId: string) => ({ answer: '', durationMs: 1, isAborted: false, turnId, reason: 'answer' as const })

async function settle() {
  for (let i = 0; i < 40; i++) await new Promise(r => setTimeout(r, 0))
}

test('tags orchestrator runs with auto-clear, however they are named, and leaves other commands alone', async ($, on) => {
  const { commands } = fakeSession(on)
  fakeDisk(on, {})
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo review' })
  await $.command.run({ command: 'autopilot', args: '' })
  await $.command.run({ command: 'status', args: '' })
  expect(commands).toEqual(['ultrapowers:autopilot|demo review auto-clear', 'autopilot|auto-clear', 'status|'])
})

test('a marker after progress stops leftover workers, clears and resumes; one without progress does not', async ($, on) => {
  const { commands, stopped } = fakeSession(on, [
    { id: 'slice-1', status: 'running' },
    { id: 'scout', status: 'running', parentId: 'slice-1' },
    { id: 'slice-0', status: 'completed' },
  ])
  const files = { [PROGRESS]: '## Slice: one\n' }
  fakeDisk(on, files)
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'review' })
  commands.length = 0

  files[MARKER] = 'refresh\n'
  await $.turn.complete(answered('t1'))
  await settle()
  expect(stopped).toEqual(['slice-1'])
  expect(commands).toEqual(['clear|', 'ultrapowers:autopilot|demo review auto-clear resumed'])
  expect(files[MARKER]).toBe('')

  files[MARKER] = 'refresh\n'
  await $.turn.complete(answered('t2'))
  await settle()
  expect(commands.length).toBe(2)

  files[PROGRESS] += '## Slice: two\n'
  files[MARKER] = 'refresh\n'
  await $.turn.complete(answered('t3'))
  await settle()
  expect(commands.slice(2)).toEqual(['clear|', 'ultrapowers:autopilot|demo review auto-clear resumed'])
})

test('a turn that ends without the marker never clears, nor does a subagent turn or an interrupt', async ($, on) => {
  const { commands } = fakeSession(on)
  const files = { [PROGRESS]: '## Slice: one\n' }
  fakeDisk(on, files)
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  commands.length = 0

  await $.turn.complete(answered('t1'))
  await settle()
  files[MARKER] = 'refresh'
  await $.turn.complete({ ...answered('t2'), agentId: 'slice-1' })
  await $.turn.complete({ ...answered('t3'), isAborted: true, reason: 'aborted' })
  await settle()
  expect(commands).toEqual([])
})

test('a /clear the person types ends the run, so a later marker resumes nothing', async ($, on) => {
  const { commands } = fakeSession(on)
  const files = { [PROGRESS]: '## Slice: one\n' }
  fakeDisk(on, files)
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  await $.command.run({ command: 'clear', args: '' })
  commands.length = 0

  files[MARKER] = 'refresh'
  await $.turn.complete(answered('t1'))
  await settle()
  expect(commands).toEqual([])
})

test('runs with nowhere to draw stay untagged so the skill keeps continuation legs', async ($, on) => {
  on('session.surfaces', () => ({ value: [] }))
  const seen: string[] = []
  on('command.run', ($, e) => { seen.push(e.args); return { text: '' } })
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  expect(seen).toEqual(['demo'])
})

test('a short or missing slug still resumes the task whose folder holds the marker', async ($, on) => {
  const { commands } = fakeSession(on)
  const files: Record<string, string> = {
    'docs/slides/ws03-project-memory/PROGRESS.md': '## Slice: one\n',
    'docs/slides/ws03-project-memory/status/refresh': 'refresh',
  }
  const rel = (path: string) => path.slice(path.indexOf('docs/slides'))
  on('fs.exists', ($, e) => ({ value: rel(e.path) === 'docs/slides' || rel(e.path) in files }))
  on('fs.list', () => ({ value: ['ws03-project-memory', 'ws04-playbook-engine'].map(name => ({ name, kind: 'dir', size: 0, mtimeMs: 0, isLink: false })) }))
  on('fs.read', ($, e) => ({ value: files[rel(e.path)] }))
  on('fs.write', ($, e) => { files[rel(e.path)] = e.text; return { value: undefined } })

  await $.command.run({ command: 'ultrapowers:autopilot', args: 'ws03 review' })
  commands.length = 0
  await $.turn.complete(answered('t1'))
  await settle()
  expect(commands).toEqual(['clear|', 'ultrapowers:autopilot|ws03-project-memory review auto-clear resumed'])
})
