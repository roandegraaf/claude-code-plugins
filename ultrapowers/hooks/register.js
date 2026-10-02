const ORCHESTRATORS = new Set(['ultrapowers:autopilot', 'ultrapowers:ultrapilot'])
const FLAG = 'auto-clear'
const lastResumedProgress = new Map()

const withFlag = args => (args.split(/\s+/).includes(FLAG) ? args : `${args} ${FLAG}`.trim())

async function findCheckpoint($) {
  if (!(await $.fs.exists('docs/slides'))) return null
  for (const task of await $.fs.list('docs/slides')) {
    if (task.kind !== 'dir' || task.name.startsWith('_')) continue
    const path = `docs/slides/${task.name}/status/checkpoint.json`
    if (!(await $.fs.exists(path))) continue
    const text = (await $.fs.read(path)).trim()
    if (!text) continue
    try {
      return { path, slug: task.name, ...JSON.parse(text) }
    } catch {
      return { path, slug: task.name, invalid: true }
    }
  }
  return null
}

export function register(on) {
  on('command.run', async ($, e, next) => {
    // Nothing can run the queued /clear in -p, SDK or cloud runs, so those keep the skill's continuation legs.
    if (!ORCHESTRATORS.has(e.command) || (await $.session.surfaces()).length === 0) return next(e)
    return next({ ...e, args: withFlag(e.args) })
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    if (e.agentId) return result
    const checkpoint = await findCheckpoint($)
    if (!checkpoint) return result

    await $.fs.write(checkpoint.path, '')
    if (e.reason !== 'answer') return result
    if (checkpoint.invalid) {
      $.ui.toast(`ultrapowers: unreadable checkpoint for ${checkpoint.slug}; run /clear then /ultrapowers:autopilot ${checkpoint.slug} yourself.`)
      return result
    }
    const key = `${checkpoint.command} ${checkpoint.slug}`
    // A fresh orchestrator loses the skill's own non-progress guard, so a stuck checkpoint would otherwise clear-and-rerun forever.
    if (!ORCHESTRATORS.has(checkpoint.command) || checkpoint.progressCount <= (lastResumedProgress.get(key) ?? -1)) {
      $.ui.toast(`ultrapowers: checkpoint for ${checkpoint.slug} made no progress since the last refresh; not resuming. Run /${checkpoint.command} ${checkpoint.slug} yourself.`)
      return result
    }
    lastResumedProgress.set(key, checkpoint.progressCount)
    void $.command.run({ command: 'clear', args: '' })
      // Our own command.run hook skips calls this plugin makes, so tag the resume here.
      .then(() => $.command.run({ command: checkpoint.command, args: withFlag(checkpoint.args) }))
      .catch(err => $.ui.toast(`ultrapowers: auto-clear failed (${err}); run /clear then /${checkpoint.command} ${checkpoint.args}`))
    return result
  })
}
