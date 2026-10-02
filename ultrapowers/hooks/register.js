const ORCHESTRATORS = new Set(['ultrapowers:autopilot', 'ultrapowers:ultrapilot'])
const FLAG = 'auto-clear'
const lastResumedProgress = new Map()

const relayedMtimes = new Map()
let orchestrating = false
let loadedAt = 0

const withFlag = args => (args.split(/\s+/).includes(FLAG) ? args : `${args} ${FLAG}`.trim())

async function activeTasks($) {
  if (!(await $.fs.exists('docs/slides'))) return []
  return (await $.fs.list('docs/slides')).filter(t => t.kind === 'dir' && !t.name.startsWith('_')).map(t => t.name)
}

async function freshSliceStatuses($) {
  const fresh = []
  for (const slug of await activeTasks($)) {
    const dir = `docs/slides/${slug}/status`
    if (!(await $.fs.exists(dir))) continue
    for (const file of await $.fs.list(dir)) {
      if (file.kind !== 'file' || !file.name.endsWith('.md')) continue
      const path = `${dir}/${file.name}`
      if (file.mtimeMs <= loadedAt || relayedMtimes.get(path) === file.mtimeMs) continue
      relayedMtimes.set(path, file.mtimeMs)
      fresh.push({ path, text: (await $.fs.read(path)).trim() })
    }
  }
  return fresh
}

async function findCheckpoint($) {
  for (const slug of await activeTasks($)) {
    const path = `docs/slides/${slug}/status/checkpoint.json`
    if (!(await $.fs.exists(path))) continue
    const text = (await $.fs.read(path)).trim()
    if (!text) continue
    try {
      return { path, slug, ...JSON.parse(text) }
    } catch {
      return { path, slug, invalid: true }
    }
  }
  return null
}

async function contextPercent($) {
  const percent = (await $.session.usage()).context.percent
  return percent == null ? null : Math.round(percent)
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    loadedAt = await $.clock.now()
    return next(e)
  })

  on('command.run', { command: ['clear', 'ultrapowers:autopilot', 'ultrapowers:ultrapilot'] }, async ($, e, next) => {
    // A /clear this plugin runs never reaches its own hook, so only the person's /clear ends a run.
    if (e.command === 'clear') orchestrating = false
    if (ORCHESTRATORS.has(e.command)) orchestrating = true
    // Nothing can run the queued /clear in -p, SDK or cloud runs, so those keep the skill's continuation legs.
    if (!ORCHESTRATORS.has(e.command) || (await $.session.surfaces()).length === 0) return next(e)
    return next({ ...e, args: withFlag(e.args) })
  })

  on('tool.call', { tool: 'Skill' }, async ($, e, next) => {
    const skill = e.skill?.includes(':') ? e.skill : `ultrapowers:${e.skill}`
    // Continuation legs start the skill too; tagging one would make it clear the main session.
    if (e.agentId || !ORCHESTRATORS.has(skill)) return next(e)
    orchestrating = true
    if ((await $.session.surfaces()).length === 0) return next(e)
    return next({ ...e, args: withFlag(e.args ?? '') })
  })

  on('prompt.submit', async ($, e, next) => {
    const statuses = e.origin?.kind === 'task-notification' ? await freshSliceStatuses($) : []
    if (!orchestrating && statuses.length === 0) return next(e)
    const blocks = statuses.map(s => `ultrapowers: worker status file ${s.path} (disk is authoritative):\n${s.text}`)
    const percent = orchestrating ? await contextPercent($) : null
    if (percent != null) blocks.push(`ultrapowers: orchestrator context is ${percent}% full, measured (checkpoint at ~30%).`)
    return blocks.length ? next({ ...e, context: [...(e.context ?? []), ...blocks] }) : next(e)
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
