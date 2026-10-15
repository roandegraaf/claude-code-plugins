import { expect, test } from 'claude-code/testing'

const FILES: Record<string, string> = {
  'docs/slides/demo/OVERVIEW.md': '# Demo\n\n## Definition of Done\n- [x] login works\n- [ ] [user-gated] live payment\n- [ ] export works\n\n## Open questions\n- [ ] not counted\n',
  'docs/slides/demo/PROGRESS.md': '## Slice: auth model\nok\n\n## Slice: login form\nok\n',
  'docs/slides/demo/NEXT_SLIDE.md': '# Next slice — demo\n\n## This slice\n\nBuild the CSV export endpoint.\n',
  'docs/slides/demo/status/slice-2.md': 'STATUS: more\nVERIFIED: pnpm test → 0 (12/12)\nLogin form shipped.\n',
}

async function settle() {
  for (let i = 0; i < 20; i++) await new Promise(r => setTimeout(r, 0))
}

test('starting a run opens a compact panel showing progress and the current slice', async ($, on) => {
  const rel = (path: string) => path.slice(path.indexOf('docs/slides'))
  const dirs = new Set(['docs/slides', 'docs/slides/demo', 'docs/slides/demo/status'])
  on('fs.exists', ($, e) => ({ value: dirs.has(rel(e.path)) || rel(e.path) in FILES }))
  on('fs.list', ($, e) => ({
    value: rel(e.path) === 'docs/slides/demo/status'
      ? [{ name: 'slice-2.md', kind: 'file', size: 0, mtimeMs: 1, isLink: false }]
      : [{ name: 'demo', kind: 'dir', size: 0, mtimeMs: 0, isLink: false }],
  }))
  on('fs.read', ($, e) => ({ value: FILES[rel(e.path)] }))
  on('session.surfaces', () => ({ value: ['terminal'] }))
  on('session.root', () => ({ value: '/repo' }))
  on('session.usage', () => ({ value: { startedAt: 0, context: { window: 1000, percent: 24 }, rateLimits: [] } }))
  const opened: Array<{ id: string; rows?: number }> = []
  on('ui.open', ($, e) => { opened.push({ id: e.id, rows: e.rows }); return { value: { isPlaced: true } } })
  on('command.run', () => ({ text: '' }))
  on('tool.call', () => ({ result: 'ok' }))

  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  await settle()
  expect(opened).toEqual([{ id: 'ultrapowers-run', rows: 6 }])
  await $.tool.call({ tool: 'Agent', description: 'slice 3', prompt: 'go' } as never)
  await $.tool.call({ tool: 'Edit', file_path: 'src/export/csv.ts', old_string: 'a', new_string: 'b', agentId: 'slice-3' } as never)

  const ui = await $.ui.mount({ plugin: 'ultrapowers', surface: 'terminal', component: 'Pane', props: {} as never, requestId: 'ultrapowers-run' } as never)
  for (const text of ['demo · slice 3', '1/3 done · next: export works', '▶ Build the CSV export endpoint.', '↳ editing src/export/csv.ts', '✓ slice-2 more · pnpm test → 0 (12/12)', '1 check for you at the end']) {
    expect(await ui.find({ text })).toBeTruthy()
  }
})

test('the panel says so while the run waits for your answer', async ($, on) => {
  on('fs.exists', () => ({ value: false }))
  on('session.surfaces', () => ({ value: ['terminal'] }))
  on('session.root', () => ({ value: '/repo' }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('command.run', () => ({ text: '' }))
  let answer: (v: unknown) => void = () => {}
  on('tool.call', () => new Promise(r => { answer = r }) as never)

  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  await settle()
  const pending = $.tool.call({ tool: 'AskUserQuestion', questions: [] } as never)
  await settle()
  const ui = await $.ui.mount({ plugin: 'ultrapowers', surface: 'terminal', component: 'Pane', props: {} as never, requestId: 'ultrapowers-run' } as never)
  expect(await ui.find({ text: '? waiting for your answer' })).toBeTruthy()
  answer({ result: 'ok' })
  await pending
})
