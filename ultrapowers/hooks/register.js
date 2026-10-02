const ORCHESTRATORS = new Set(['ultrapowers:autopilot', 'ultrapowers:ultrapilot'])
const FLAG = 'auto-clear'
const lastResumedProgress = new Map()

const PANE = 'ultrapowers-run'
const relayedMtimes = new Map()
let run = null
let panel = null
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

async function readText($, path) {
  return (await $.fs.exists(path)) ? $.fs.read(path) : ''
}

function section(md, heading) {
  const start = md.search(new RegExp(`^## ${heading}`, 'm'))
  if (start < 0) return ''
  const rest = md.slice(start)
  const end = rest.slice(3).search(/^## /m)
  return end < 0 ? rest : rest.slice(0, end + 3)
}

function startRun(command, args) {
  run = { command, named: args.split(/\s+/)[0], slug: null, startedAt: Date.now(), refreshes: run?.refreshes ?? 0 }
}

// The panel is a view; a failure in it must never hold up the run it shows.
async function showPanel($) {
  try {
    if ((await $.session.surfaces()).length) await openPanel($)
  } catch (err) {
    $.ui.toast(`ultrapowers: run panel unavailable (${err})`)
  }
}

async function openPanel($) {
  await $.ui.open({ id: PANE, title: run.command === 'ultrapowers:ultrapilot' ? 'Ultrapilot' : 'Autopilot' })
  await refreshPanel($)
}

async function refreshPanel($) {
  if (!run) return
  const tasks = await activeTasks($)
  if (!run.slug) run.slug = tasks.includes(run.named) ? run.named : tasks.length === 1 ? tasks[0] : null
  if (run.slug && !tasks.includes(run.slug)) {
    $.ui.toast(`ultrapowers: ${run.slug} is done`)
    await $.ui.close({ id: PANE })
    run = null
    return
  }
  const dir = `docs/slides/${run.slug}`
  const overview = run.slug ? await readText($, `${dir}/OVERVIEW.md`) : ''
  const progress = run.slug ? await readText($, `${dir}/PROGRESS.md`) : ''
  const nextSlide = run.slug ? await readText($, `${dir}/NEXT_SLIDE.md`) : ''
  const dod = section(overview, 'Definition of Done')
  const waveDir = `${dir}/wave`
  const wave = run.slug && (await $.fs.exists(waveDir)) ? (await $.fs.list(waveDir)).filter(f => f.name.endsWith('.md')).map(f => f.name.replace(/\.md$/, '')) : []
  panel = {
    dodDone: (dod.match(/^\s*- \[x\]/gim) ?? []).length,
    dodTotal: (dod.match(/^\s*- \[[ x]\]/gim) ?? []).length,
    slices: [...progress.matchAll(/^## Slice:?\s*(.+)$/gm)].map(m => m[1].trim()),
    now: section(nextSlide, 'This slice').split('\n').slice(1).map(l => l.trim()).find(Boolean) ?? '',
    wave,
    workers: (await $.agent.list()).filter(a => a.status === 'running').map(a => `${a.name ?? a.type}: ${a.description}`),
    percent: await contextPercent($),
  }
  $.ui.invalidate('ui.render')
}

function bar(done, total, width = 16) {
  const filled = total ? Math.round((done / total) * width) : 0
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    loadedAt = await $.clock.now()
    $.clock.every(5000, () => refreshPanel($).catch(() => {}))
    return next(e)
  })

  on('command.run', { command: ['clear', 'ultrapowers:autopilot', 'ultrapowers:ultrapilot'] }, async ($, e, next) => {
    // A /clear this plugin runs never reaches its own hook, so only the person's /clear ends a run.
    if (e.command === 'clear' && run) {
      run = null
      await $.ui.close({ id: PANE })
    }
    if (!ORCHESTRATORS.has(e.command)) return next(e)
    startRun(e.command, e.args)
    void showPanel($)
    // Nothing can run the queued /clear in -p, SDK or cloud runs, so those keep the skill's continuation legs.
    if ((await $.session.surfaces()).length === 0) return next(e)
    return next({ ...e, args: withFlag(e.args) })
  })

  on('tool.call', { tool: 'Skill' }, async ($, e, next) => {
    const skill = e.skill?.includes(':') ? e.skill : `ultrapowers:${e.skill}`
    // Continuation legs start the skill too; tagging one would make it clear the main session.
    if (e.agentId || !ORCHESTRATORS.has(skill)) return next(e)
    startRun(skill, e.args ?? '')
    void showPanel($)
    if ((await $.session.surfaces()).length === 0) return next(e)
    return next({ ...e, args: withFlag(e.args ?? '') })
  })

  on('prompt.submit', async ($, e, next) => {
    const statuses = e.origin?.kind === 'task-notification' ? await freshSliceStatuses($) : []
    if (!run && statuses.length === 0) return next(e)
    const blocks = statuses.map(s => `ultrapowers: worker status file ${s.path} (disk is authoritative):\n${s.text}`)
    const percent = run ? await contextPercent($) : null
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
    if (run) run.refreshes += 1
    void $.command.run({ command: 'clear', args: '' })
      // Our own command.run hook skips calls this plugin makes, so tag the resume here.
      .then(() => $.command.run({ command: checkpoint.command, args: withFlag(checkpoint.args) }))
      .then(() => run && showPanel($))
      .catch(err => $.ui.toast(`ultrapowers: auto-clear failed (${err}); run /clear then /${checkpoint.command} ${checkpoint.args}`))
    return result
  })

  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== PANE) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    if (!run || !panel) return Text({ dimColor: true, children: ['Waiting for the run to start...'] })
    const minutes = Math.round((Date.now() - run.startedAt) / 60000)
    const line = (text, props = {}) => Text({ wrap: 'truncate-end', ...props, children: [text] })
    const pct = panel.percent
    return Box({
      flexDirection: 'column',
      children: [
        line(`${run.slug ?? 'resolving task'}`, { bold: true }),
        line(`${minutes} min · ${run.refreshes} context refreshes`, { dimColor: true }),
        line(' '),
        line(`${bar(panel.dodDone, panel.dodTotal)} ${panel.dodDone}/${panel.dodTotal} done`, { color: 'green' }),
        line(`${panel.slices.length} slices shipped`, { dimColor: true }),
        line(' '),
        line('Now', { bold: true }),
        ...(panel.wave.length ? panel.wave.map(name => line(`◇ ${name}`)) : [line(panel.now || '-')]),
        ...panel.workers.map(worker => line(`● ${worker}`, { color: 'cyan' })),
        ...(panel.slices.length ? [line(' '), line('Recent', { bold: true }), ...panel.slices.slice(-3).reverse().map(s => line(`✓ ${s}`, { dimColor: true }))] : []),
        line(' '),
        pct == null ? line('context: -', { dimColor: true }) : line(`context ${pct}% (checkpoint ~30%)`, { color: pct >= 30 ? 'red' : pct >= 20 ? 'yellow' : 'green' }),
      ],
    })
  })
}
