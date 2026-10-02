import { expect, test } from 'claude-code/testing'

type Entry = { kind: 'file' | 'dir'; mtimeMs: number; text?: string }

function fakeDisk(on, entries: Record<string, Entry>) {
  const rel = (path: string) => path.slice(path.indexOf('docs/slides'))
  on('fs.exists', ($, e) => ({ value: rel(e.path) === 'docs/slides' || rel(e.path) in entries }))
  on('fs.list', ($, e) => {
    const dir = rel(e.path) + '/'
    const names = Object.keys(entries).filter(p => p.startsWith(dir) && !p.slice(dir.length).includes('/'))
    return { value: names.map(p => ({ name: p.slice(dir.length), kind: entries[p].kind, size: 0, mtimeMs: entries[p].mtimeMs, isLink: false })) }
  })
  on('fs.read', ($, e) => ({ value: entries[rel(e.path)].text ?? '' }))
}

function captureContext(on) {
  const seen: (readonly string[] | undefined)[] = []
  on('prompt.submit', ($, e) => { seen.push(e.context); return { text: e.text } })
  return seen
}

const notification = { text: '<task-notification>slice-2 finished</task-notification>', origin: { kind: 'task-notification' } }

test('a worker notification carries each status file written since load, once', async ($, on) => {
  on('session.usage', () => ({ value: { startedAt: 0, context: { window: 1000, percent: 12.4 }, rateLimits: [] } }))
  const entries: Record<string, Entry> = {
    'docs/slides/demo': { kind: 'dir', mtimeMs: 1 },
    'docs/slides/demo/status': { kind: 'dir', mtimeMs: 1 },
    'docs/slides/demo/status/slice-2.md': { kind: 'file', mtimeMs: Date.now() + 1000, text: 'STATUS: more' },
  }
  fakeDisk(on, entries)
  const seen = captureContext(on)

  await $.prompt.submit(notification)
  await $.prompt.submit(notification)
  expect(seen[0]?.join('\n')).toContain('slice-2.md (disk is authoritative):\nSTATUS: more')
  expect(seen[1]).toBeUndefined()
})

test('during a run every prompt carries the measured context fill; a typed /clear ends that', async ($, on) => {
  on('session.usage', () => ({ value: { startedAt: 0, context: { window: 1000, percent: 27.6 }, rateLimits: [] } }))
  on('session.surfaces', () => ({ value: ['terminal'] }))
  fakeDisk(on, {})
  on('command.run', () => ({ text: '' }))
  const seen = captureContext(on)

  await $.prompt.submit({ text: 'hi' })
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  await $.prompt.submit({ text: 'go on' })
  await $.command.run({ command: 'clear', args: '' })
  await $.prompt.submit({ text: 'unrelated' })

  expect(seen[0]).toBeUndefined()
  expect(seen[1]).toEqual(['ultrapowers: orchestrator context is 28% full, measured (checkpoint at ~30%).'])
  expect(seen[2]).toBeUndefined()
})

test('status files already on disk when the mod loads are not relayed', async ($, on) => {
  on('clock.now', () => ({ value: 5000 }))
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  const entries: Record<string, Entry> = {
    'docs/slides/demo': { kind: 'dir', mtimeMs: 1 },
    'docs/slides/demo/status': { kind: 'dir', mtimeMs: 1 },
    'docs/slides/demo/status/slice-1.md': { kind: 'file', mtimeMs: 4000, text: 'STATUS: more' },
  }
  fakeDisk(on, entries)
  const seen = captureContext(on)
  await $.session.start({ cwd: '/work', surface: 'terminal', isInteractive: true })

  await $.prompt.submit(notification)
  entries['docs/slides/demo/status/w1s1.md'] = { kind: 'file', mtimeMs: 6000, text: 'STATUS: done' }
  await $.prompt.submit(notification)
  expect(seen[0]).toBeUndefined()
  expect(seen[1]?.join('\n')).toContain('w1s1.md (disk is authoritative):\nSTATUS: done')
})

test('a run Claude starts through the Skill tool is tagged on the main loop only', async ($, on) => {
  on('session.surfaces', () => ({ value: ['terminal'] }))
  const args: (string | undefined)[] = []
  on('tool.call', ($, e) => { args.push(e.args); return { result: 'ok' } })
  await $.tool.call({ tool: 'Skill', skill: 'ultrapowers:autopilot', args: 'demo' } as never)
  await $.tool.call({ tool: 'Skill', skill: 'autopilot', args: 'demo', agentId: 'leg-1' } as never)
  await $.tool.call({ tool: 'Skill', skill: 'osmo:osmo', args: 'hero' } as never)
  expect(args).toEqual(['demo auto-clear', 'demo', 'hero'])
})
