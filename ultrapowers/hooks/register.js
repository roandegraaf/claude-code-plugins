const ORCHESTRATOR = 'ultrapowers:autopilot'
const FLAG = 'auto-clear'
const RESUMED = 'resumed'

const PANE = 'ultrapowers-run'
const PANEL_ROWS = 6
const relayedMtimes = new Map()
let run = null
let panel = null
let loadedAt = 0
let busy = false
let refreshing = false
let cwd = ''
const live = { sliceStartedAt: null, activity: '', waiting: false }

const qualify = name => (name?.includes(':') ? name : `ultrapowers:${name}`)
const userArgs = args => args.split(/\s+/).filter(word => word && word !== FLAG && word !== RESUMED)
const withFlag = args => [...userArgs(args), FLAG].join(' ')

// A shell `cd` moves the working directory that relative $.fs paths resolve against; the project root stays put.
const slidesDir = async $ => `${await $.session.root()}/docs/slides`
const taskDir = async ($, slug) => `${await slidesDir($)}/${slug}`

async function activeTasks($) {
  const slides = await slidesDir($)
  if (!(await $.fs.exists(slides))) return []
  return (await $.fs.list(slides)).filter(t => t.kind === 'dir' && !t.name.startsWith('_')).map(t => t.name)
}

async function freshSliceStatuses($) {
  const fresh = []
  for (const slug of await activeTasks($)) {
    const dir = `${await taskDir($, slug)}/status`
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
  run = { command, named: words[0], words, slug: null, startedAt: Date.now(), startProgress: null, refreshes: run?.refreshes ?? 0, resumedAt: -1 }
}

const relative = path => (cwd && path?.startsWith(`${cwd}/`) ? path.slice(cwd.length + 1) : path ?? '')
const clip = (text, max = 70) => (text.length > max ? `${text.slice(0, max - 1)}…` : text)

function describeActivity(e) {
  switch (e.tool) {
    case 'Edit':
    case 'MultiEdit':
    case 'Write':
    case 'NotebookEdit':
      return `editing ${relative(e.file_path ?? e.notebook_path)}`
    case 'Read':
      return `reading ${relative(e.file_path)}`
    case 'Bash':
      return `running ${clip(e.description || e.command || '')}`
    case 'Grep':
    case 'Glob':
      return `searching ${clip(e.pattern ?? '')}`
    case 'Agent':
      return `spawned ${clip(e.description ?? 'a helper')}`
    case 'WebFetch':
    case 'WebSearch':
      return 'researching on the web'
    default:
      return e.tool.startsWith('mcp__') ? `using ${e.tool.split('__')[1]}` : e.tool
  }
}

function duration(ms) {
  const minutes = Math.max(0, Math.round(ms / 60000))
  return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

async function lastSliceStatus($, dir) {
  if (!(await $.fs.exists(`${dir}/status`))) return { last: null, deferred: 0 }
  const files = (await $.fs.list(`${dir}/status`)).filter(f => f.kind === 'file' && /^slice-.*\.md$/.test(f.name))
  let deferred = 0
  for (const f of files) if (/^STATUS:\s*deferred/m.test(await $.fs.read(`${dir}/status/${f.name}`))) deferred += 1
  const newest = files.sort((a, b) => b.mtimeMs - a.mtimeMs)[0]
  if (!newest) return { last: null, deferred }
  const text = await $.fs.read(`${dir}/status/${newest.name}`)
  return {
    last: {
      name: newest.name.replace(/\.md$/, ''),
      status: text.match(/^STATUS:\s*(\S+)/m)?.[1] ?? '?',
      verified: text.match(/^VERIFIED:\s*(.+)$/m)?.[1]?.trim() ?? '',
    },
    deferred,
  }
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
    const path = `${await taskDir($, slug)}/status/refresh`
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
    const progress = sliceCount(await readText($, `${await taskDir($, slug)}/PROGRESS.md`))
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
  const dir = slug ? await taskDir($, slug) : ''
  const overview = slug ? await readText($, `${dir}/OVERVIEW.md`) : ''
  const progress = slug ? await readText($, `${dir}/PROGRESS.md`) : ''
  const nextSlide = slug ? await readText($, `${dir}/NEXT_SLIDE.md`) : ''
  const dod = section(overview, 'Definition of Done')
  const open = dod.split('\n').filter(l => /^\s*- \[ \]/.test(l))
  const isForUser = l => l.includes('[user-gated]') || /not verified:/i.test(l)
  const slices = sliceCount(progress)
  run.startProgress ??= slices
  panel = {
    dodDone: (dod.match(/^\s*- \[x\]/gim) ?? []).length,
    dodTotal: (dod.match(/^\s*- \[[ x]\]/gim) ?? []).length,
    nextItem: open.map(l => l.replace(/^\s*- \[ \]\s*/, '')).find(l => !isForUser(l)) ?? '',
    forUser: open.filter(isForUser).length,
    slices,
    now: section(nextSlide, 'This slice').split('\n').slice(1).map(l => l.trim()).find(Boolean) ?? '',
    ...(slug ? await lastSliceStatus($, dir) : { last: null, deferred: 0 }),
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
    cwd = e.cwd
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

  // Observe-only: what the worker is doing right now, for the panel.
  on('tool.call', async ($, e, next) => {
    if (!run) return next(e)
    if (e.agentId) {
      try {
        live.activity = describeActivity(e)
        $.ui.invalidate('ui.render')
      } catch {}
      return next(e)
    }
    if (e.tool === 'Agent') {
      live.sliceStartedAt = Date.now()
      live.activity = ''
    }
    if (e.tool !== 'AskUserQuestion') return next(e)
    live.waiting = true
    $.ui.invalidate('ui.render')
    try {
      return await next(e)
    } finally {
      live.waiting = false
      $.ui.invalidate('ui.render')
    }
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
    const line = (text, props = {}) => Text({ wrap: 'truncate-end', ...props, children: [text] })
    const elapsed = Date.now() - run.startedAt
    const shipped = panel.slices - (run.startProgress ?? panel.slices)
    const pace = shipped > 0 ? ` · ~${duration(elapsed / shipped)} per slice` : ''
    const { last } = panel
    const later = [panel.forUser && `${panel.forUser} check${panel.forUser === 1 ? '' : 's'} for you at the end`, panel.deferred && `${panel.deferred} deferred`].filter(Boolean)
    return Box({
      flexDirection: 'column',
      children: [
        line(`${run.slug ?? 'resolving task'} · slice ${panel.slices + 1} · ${duration(elapsed)}${pace} · ${run.refreshes} refreshes`, { bold: true }),
        line(`${bar(panel.dodDone, panel.dodTotal)} ${panel.dodDone}/${panel.dodTotal} done${panel.nextItem ? ` · next: ${panel.nextItem}` : ''}`, { color: 'green' }),
        live.waiting
          ? line('? waiting for your answer', { color: 'yellow', bold: true })
          : line(`▶ ${panel.now || 'planning the next slice'}${live.sliceStartedAt ? ` · ${duration(Date.now() - live.sliceStartedAt)}` : ''}`),
        line(`  ↳ ${live.activity || 'starting'}`, { dimColor: true }),
        last
          ? line(`${last.status === 'blocked' ? '✗' : '✓'} ${last.name} ${last.status}${last.verified ? ` · ${last.verified}` : ''}`, { color: last.status === 'blocked' ? 'red' : last.status === 'deferred' ? 'yellow' : undefined })
          : line('no slice finished yet this run', { dimColor: true }),
        later.length ? line(later.join(' · '), { color: 'yellow' }) : line('nothing waiting on you', { dimColor: true }),
      ],
    })
  })
}
