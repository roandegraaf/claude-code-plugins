const PANE = 'aside'
const SHOWN = 4
const FRAMING =
  'A side question from the user, answered outside the main conversation, which never sees it. ' +
  'Answer briefly from what you already know of this session. Do not call tools.\n\nQuestion: '

let asked = []

async function ask($, question) {
  const entry = { question, answer: null }
  asked = [...asked, entry]
  $.ui.invalidate('ui.render')
  const reply = await $.model.fork({ prompt: FRAMING + question })
  entry.answer = reply.isAnswered ? reply.text : `_No answer: ${reply.reason}_`
  $.ui.invalidate('ui.render')
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'aside',
      description: 'Ask a side question about this session in a pane; the main conversation never sees it',
      argumentHint: '[question]',
      immediate: true,
    })
    return next(e)
  })

  on('command.run', { command: 'aside' }, async ($, e) => {
    await $.ui.open({ id: PANE, title: 'Aside', focus: true, closeOnEscape: true })
    if (e.args.trim()) void ask($, e.args.trim())
    return {}
  })

  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== PANE) return next(e)
    const { Box, Text, Markdown, Input } = $.ui.resolve(e)
    const history = asked.slice(-SHOWN).flatMap((entry, i) => [
      Text({ bold: true, children: [`> ${entry.question}`] }),
      entry.answer === null
        ? Text({ dimColor: true, children: ['thinking...'] })
        : Markdown({ key: `answer-${asked.length - SHOWN + i}`, text: entry.answer }),
      Text({ children: [' '] }),
    ])
    return Box({
      flexDirection: 'column',
      children: [
        ...(history.length ? history : [Text({ dimColor: true, children: ['Ask anything about this session. Esc closes the pane.'] })]),
        Input({
          key: 'question',
          label: 'Aside',
          placeholder: 'Ask a side question and press Enter',
          value: '',
          submitLabel: 'ask',
          autoFocus: true,
          onSubmit: value => {
            if (value.trim()) void ask($, value.trim())
          },
        }),
      ],
    })
  })
}
