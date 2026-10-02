import { expect, test } from 'claude-code/testing'

async function settle() {
  for (let i = 0; i < 20; i++) await new Promise(r => setTimeout(r, 0))
}

test('/aside opens the pane and answers from a fork, typed follow-ups too', async ($, on) => {
  const prompts: string[] = []
  on('command.register', () => ({ value: undefined }))
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('model.fork', ($, e) => {
    prompts.push(e.prompt)
    return { value: { isAnswered: true, text: `answer ${prompts.length}`, usage: { input_tokens: 1, output_tokens: 1, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 } } }
  })
  await $.session.start({ cwd: '/work', surface: 'terminal', isInteractive: true })

  const out = await $.command.run({ command: 'aside', args: 'why is slice 4 slow?' })
  expect(out.text ?? '').toBe('')

  const ui = await $.ui.mount({ plugin: 'aside', surface: 'terminal', component: 'Pane', props: {} as never, requestId: 'aside' } as never)
  await settle()
  expect(prompts[0]).toEndWith('Question: why is slice 4 slow?')
  expect(await ui.find({ text: 'answer 1' })).toBeTruthy()

  await ui.input({ key: 'question', text: 'and slice 5?' })
  await settle()
  expect(prompts[1]).toEndWith('Question: and slice 5?')
  expect(await ui.find({ text: 'answer 2' })).toBeTruthy()
})
