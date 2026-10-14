const ORCHESTRATOR = 'ultrapowers:autopilot'
const FLAG = 'auto-clear'
const RESUMED = 'resumed'

const PANE = 'ultrapowers-run'
const PANEL_ROWS = 4
const relayedMtimes = new Map()
let run = null
let panel = null
let loadedAt = 0
let busy = false
let refreshing = false

const qualify = name => (name?.includes(':') ? name : `ultrapowers:${name}`)
const userArgs = args => args.split(/\s+/).filter(word => word && word !== FLAG && word !== RESUMED)
const withFlag = args => [...userArgs(args), FLAG].join(' ')

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

const sliceCount = progress => (progress.match(/^## Slice/gm) ?? []).length

function startRun(command, args) {
  const words = userArgs(args)
  run = { command, named: words[0], words, slug: null, startedAt: Date.now(), refreshes: run?.refreshes ?? 0, resumedAt: -1 }
}

async function resolveSlug($) {
  if (run.slug) return run.slug
  const tasks = await activeTasks($)
  const prefixed = tasks.filter(t => run.named && t.startsWith(`${run.named}-`))
  run.slug = tasks.includes(run.named) ? run.named : prefixed.length === 1 ? prefixed[0] : tasks.length === 1 ? tasks[0] : null
  return run.slug
}

async function findMarker($) {
  for (const slug of await activeTasks($)) {
    const path = `docs/slides/${slug}/status/refresh`
    if ((await readText($, path)).trim()) return { slug, path }
  }
  return null
}

const resumeArgs = slug => [slug, ...run.words.filter(w => w === 'review'), FLAG, RESUMED].join(' ')

// The model only drops the marker; whether, when and with which arguments to resume is decided here.
async function maybeRefresh($) {
  if (!run || busy || refreshing) return
  refreshing = true
  try {
    const marker = await findMarker($)
    if (!marker) return
    await $.fs.write(marker.path, '')
    const { slug } = marker
    run.slug = slug
    const progress = sliceCount(await readText($, `docs/slides/${slug}/PROGRESS.md`))
    // A fresh orchestrator has no memory of the last refresh, so this guard is what stops a stuck task from clearing and rerunning forever.
    if (progress <= run.resumedAt) {
      $.ui.toast(`ultrapowers: ${slug} made no progress since the last refresh; not resuming. Run /${run.command} ${slug} yourself.`)
      return
    }
    run.resumedAt = progress
    await stopLeftoverAgents($)
    run.refreshes += 1
    const { command } = run
    const args = resumeArgs(slug)
    await $.command.run({ command: 'clear', args: '' })
    void $.command.run({ command, args }).catch(err => $.ui.toast(`ultrapowers: resume failed (${err}); run /${command} ${slug}`))
    void showPanel($)
  } catch (err) {
    $.ui.toast(`ultrapowers: auto-clear failed (${err}); run /clear then /${run?.command} ${run?.slug ?? ''}`)
  } finally {
    refreshing = false
  }
}

// Finished workers can linger as idle teammates; their late notifications would otherwise land in the fresh session.
async function stopLeftoverAgents($) {
  for (const agent of await $.agent.list()) {
    if (agent.status !== 'running' || agent.parentId) continue
    await $.tool.call({ tool: 'TaskStop', task_id: agent.id }).catch(() => {})
  }
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
  await $.ui.open({ id: PANE, title: 'Autopilot', rows: PANEL_ROWS })
  await refreshPanel($)
}

async function refreshPanel($) {
  if (!run) return
  const slug = await resolveSlug($)
  if (slug && !(await activeTasks($)).includes(slug)) {
    $.ui.toast(`ultrapowers: ${slug} is done`)
    await $.ui.close({ id: PANE })
    run = null
    return
  }
  const dir = `docs/slides/${slug}`
  const overview = slug ? await readText($, `${dir}/OVERVIEW.md`) : ''
  const progress = slug ? await readText($, `${dir}/PROGRESS.md`) : ''
  const nextSlide = slug ? await readText($, `${dir}/NEXT_SLIDE.md`) : ''
  const dod = section(overview, 'Definition of Done')
  panel = {
    dodDone: (dod.match(/^\s*- \[x\]/gim) ?? []).length,
    dodTotal: (dod.match(/^\s*- \[[ x]\]/gim) ?? []).length,
    slices: sliceCount(progress),
    now: section(nextSlide, 'This slice').split('\n').slice(1).map(l => l.trim()).find(Boolean) ?? '',
    percent: await contextPercent($),
  }
  $.ui.invalidate('ui.render')
}

function bar(done, total, width = 16) {
  const filled = total ? Math.round((done / total) * width) : 0
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

function onRunStart($, command, args) {
  startRun(command, args)
  void showPanel($)
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    loadedAt = await $.clock.now()
    $.clock.every(5000, () => {
      refreshPanel($).catch(() => {})
      maybeRefresh($)
    })
    return next(e)
  })

  on('command.run', { command: ['clear', 'autopilot', ORCHESTRATOR] }, async ($, e, next) => {
    // The refresh's own /clear and resume must neither end the run nor restart its bookkeeping.
    if (e.origin?.kind === 'plugin' && e.origin.name.split('@')[0] === 'ultrapowers') return next(e)
    const command = e.command === 'clear' ? 'clear' : qualify(e.command)
    if (command === 'clear' && run) {
      run = null
      await $.ui.close({ id: PANE })
    }
    if (command !== ORCHESTRATOR) return next(e)
    onRunStart($, command, e.args)
    // Nothing can run the queued /clear in -p, SDK or cloud runs, so those keep the skill's continuation legs.
    if ((await $.session.surfaces()).length === 0) return next(e)
    return next({ ...e, args: withFlag(e.args) })
  })

  on('tool.call', { tool: 'Skill' }, async ($, e, next) => {
    const skill = qualify(e.skill)
    // Continuation legs start the skill too; tagging one would make it clear the main session.
    if (e.agentId || skill !== ORCHESTRATOR) return next(e)
    onRunStart($, skill, e.args ?? '')
    if ((await $.session.surfaces()).length === 0) return next(e)
    return next({ ...e, args: withFlag(e.args ?? '') })
  })

  on('prompt.submit', async ($, e, next) => {
    const statuses = e.origin?.kind === 'task-notification' ? await freshSliceStatuses($) : []
    if (statuses.length === 0) return next(e)
    const blocks = statuses.map(s => `ultrapowers: worker status file ${s.path} (disk is authoritative):\n${s.text}`)
    return next({ ...e, context: [...(e.context ?? []), ...blocks] })
  })

  on('turn.start', async ($, e, next) => {
    if (!e.agentId) busy = true
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    if (e.agentId) return result
    busy = false
    if (e.reason === 'answer') void maybeRefresh($)
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
        line(`${run.slug ?? 'resolving task'} · ${minutes} min · ${run.refreshes} context refreshes`, { bold: true }),
        line(`${bar(panel.dodDone, panel.dodTotal)} ${panel.dodDone}/${panel.dodTotal} done · ${panel.slices} slices shipped`, { color: 'green' }),
        line(`Now: ${panel.now || '-'}`),
        pct == null ? line('context: -', { dimColor: true }) : line(`context ${pct}%`, { color: pct >= 30 ? 'red' : pct >= 20 ? 'yellow' : 'green' }),
      ],
    })
  })
}
