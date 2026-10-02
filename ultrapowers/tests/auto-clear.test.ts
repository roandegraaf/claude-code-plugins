import { expect, test } from 'claude-code/testing'

const MARKER = 'docs/slides/demo/status/checkpoint.json'

function fakeDisk(on, files: Record<string, string>) {
  const rel = (path: string) => path.slice(path.indexOf('docs/slides'))
  on('fs.exists', ($, e) => ({ value: rel(e.path) === 'docs/slides' || rel(e.path) in files }))
  on('fs.list', () => ({ value: [{ name: 'demo', kind: 'dir', size: 0, mtimeMs: 0, isLink: false }] }))
  on('fs.read', ($, e) => ({ value: files[rel(e.path)] }))
  on('fs.write', ($, e) => { files[rel(e.path)] = e.text; return { value: undefined } })
}

async function settle() {
  for (let i = 0; i < 20; i++) await new Promise(r => setTimeout(r, 0))
}

test('tags orchestrator runs with auto-clear, leaves other commands alone', async ($, on) => {
  on('session.surfaces', () => ({ value: ['terminal'] }))
  const seen: string[] = []
  on('command.run', ($, e) => { seen.push(`${e.command}|${e.args}`); return { text: '' } })
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo 15' })
  await $.command.run({ command: 'ultrapowers:ultrapilot', args: '' })
  await $.command.run({ command: 'status', args: '' })
  expect(seen).toEqual(['ultrapowers:autopilot|demo 15 auto-clear', 'ultrapowers:ultrapilot|auto-clear', 'status|'])
})

test('checkpoint clears then resumes; a repeat without progress does not', async ($, on) => {
  const files = { [MARKER]: JSON.stringify({ command: 'ultrapowers:autopilot', args: 'demo 10 5', progressCount: 4 }) }
  fakeDisk(on, files)
  const seen: string[] = []
  on('command.run', ($, e) => { seen.push(`${e.command}|${e.args}`); return { text: '' } })
  on('turn.complete', () => ({ text: '' }))

  await $.turn.complete({ answer: '', durationMs: 1, isAborted: false, turnId: 't1', reason: 'answer' })
  await settle()
  expect(seen).toEqual(['clear|', 'ultrapowers:autopilot|demo 10 5 auto-clear'])
  expect(files[MARKER]).toBe('')

  files[MARKER] = JSON.stringify({ command: 'ultrapowers:autopilot', args: 'demo 5 5', progressCount: 4 })
  await $.turn.complete({ answer: '', durationMs: 1, isAborted: false, turnId: 't2', reason: 'answer' })
  await settle()
  expect(seen.length).toBe(2)
})

test('subagent turns never trigger a refresh', async ($, on) => {
  const files = { [MARKER]: JSON.stringify({ command: 'ultrapowers:autopilot', args: 'demo', progressCount: 1 }) }
  fakeDisk(on, files)
  const seen: string[] = []
  on('command.run', ($, e) => { seen.push(e.command); return { text: '' } })
  on('turn.complete', () => ({ text: '' }))
  await $.turn.complete({ answer: '', durationMs: 1, isAborted: false, turnId: 't1', reason: 'answer', agentId: 'a1' })
  await settle()
  expect(seen).toEqual([])
})

test('runs with nowhere to draw stay untagged so the skill keeps continuation legs', async ($, on) => {
  on('session.surfaces', () => ({ value: [] }))
  const seen: string[] = []
  on('command.run', ($, e) => { seen.push(e.args); return { text: '' } })
  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  expect(seen).toEqual(['demo'])
})

test('an interrupted turn or an unreadable marker empties it without resuming', async ($, on) => {
  const files = { [MARKER]: JSON.stringify({ command: 'ultrapowers:autopilot', args: 'demo', progressCount: 1 }) }
  fakeDisk(on, files)
  const seen: string[] = []
  on('command.run', ($, e) => { seen.push(e.command); return { text: '' } })
  on('turn.complete', () => ({ text: '' }))
  await $.turn.complete({ answer: '', durationMs: 1, isAborted: true, turnId: 't1', reason: 'aborted' })
  await settle()
  expect(files[MARKER]).toBe('')

  files[MARKER] = '```json\n{oops'
  await $.turn.complete({ answer: '', durationMs: 1, isAborted: false, turnId: 't2', reason: 'answer' })
  await settle()
  expect(files[MARKER]).toBe('')
  expect(seen).toEqual([])
})
