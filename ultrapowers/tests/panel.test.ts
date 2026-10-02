import { expect, test } from 'claude-code/testing'

const FILES: Record<string, string> = {
  'docs/slides/demo/OVERVIEW.md': '# Demo\n\n## Definition of Done\n- [x] login works\n- [ ] export works\n- [ ] docs\n\n## Open questions\n- [ ] not counted\n',
  'docs/slides/demo/PROGRESS.md': '## Slice: auth model\nok\n\n## Slice: login form\nok\n',
  'docs/slides/demo/NEXT_SLIDE.md': '# Next slice — demo\n\n## This slice\n\nBuild the CSV export endpoint.\n',
}

async function settle() {
  for (let i = 0; i < 20; i++) await new Promise(r => setTimeout(r, 0))
}

test('starting a run opens a panel showing progress, the current slice and workers', async ($, on) => {
  const rel = (path: string) => path.slice(path.indexOf('docs/slides'))
  const dirs = new Set(['docs/slides', 'docs/slides/demo'])
  on('fs.exists', ($, e) => ({ value: dirs.has(rel(e.path)) || rel(e.path) in FILES }))
  on('fs.list', () => ({ value: [{ name: 'demo', kind: 'dir', size: 0, mtimeMs: 0, isLink: false }] }))
  on('fs.read', ($, e) => ({ value: FILES[rel(e.path)] }))
  on('session.surfaces', () => ({ value: ['terminal'] }))
  on('session.usage', () => ({ value: { startedAt: 0, context: { window: 1000, percent: 24 }, rateLimits: [] } }))
  on('agent.list', () => ({ value: [{ id: 'a1', name: 'slice-3', type: 'ultrapowers:slice-worker', description: 'CSV export', status: 'running' }] }))
  const opened: string[] = []
  on('ui.open', ($, e) => { opened.push(e.id); return { value: { isPlaced: true } } })
  on('command.run', () => ({ text: '' }))

  await $.command.run({ command: 'ultrapowers:autopilot', args: 'demo' })
  await settle()
  expect(opened).toEqual(['ultrapowers-run'])

  const ui = await $.ui.mount({ plugin: 'ultrapowers', surface: 'terminal', component: 'Pane', props: {} as never, requestId: 'ultrapowers-run' } as never)
  for (const text of ['1/3 done', '2 slices shipped', 'Build the CSV export endpoint.', '● slice-3: CSV export', '✓ login form', 'context 24%']) {
    expect(await ui.find({ text })).toBeTruthy()
  }
})
