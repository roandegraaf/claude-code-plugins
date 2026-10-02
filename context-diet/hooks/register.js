const PROJECT_CONFIG = '.claude/context-diet.json'
const KINDS = ['mcp', 'skills', 'agents']
const SYSTEM = `You trim what a coding agent loads into its context for one software project.
You get a fingerprint of the project and an inventory of MCP servers, skills and agents.
Answer with ONE JSON object and nothing else: {"mcp": [...], "skills": [...], "agents": [...]} listing what to HIDE.
Rules:
- Hide an item only when it targets a different platform or domain than this project: iOS/macOS design guides in a web project, PCB or hardware tools in a web app, legal or contract tooling in a code repo, a payments provider the project does not use, a database service the project does not use. When unsure, keep it.
- An item that fits the project's kind of work stays, even if the project does not depend on it by name. A website or web app keeps every web design, UI, frontend, redesign, animation, landing-page and design-tool item (Figma, Mobbin and the like); a mobile app keeps mobile design items.
- Keep general-purpose development tools: GitHub, documentation lookups, browser devtools, code review, git, planning and workflow skills.
- Use names exactly as they appear in the inventory, or "<plugin>:*" to hide every skill or agent of one plugin. Never invent names.`

const emptyConfig = () => ({ mcp: [], skills: [], agents: [], keep: [] })

let config = emptyConfig()
let sources = []
let interactive = false
let setupAttempted = false
const saved = new Map()
const inventory = { mcp: {}, skills: {}, agents: {} }

function matcher(globs) {
  if (globs.length === 0) return () => false
  const escaped = globs.map(g => g.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*'))
  const re = new RegExp(`^(${escaped.join('|')})$`, 'i')
  return name => re.test(name)
}

async function readConfig($, path) {
  if (!(await $.fs.exists(path))) return null
  const parsed = JSON.parse(await $.fs.read(path))
  return Object.fromEntries([...KINDS, 'keep'].map(kind => [kind, Array.isArray(parsed[kind]) ? parsed[kind] : []]))
}

async function loadConfig($) {
  saved.clear()
  const home = await $.env.get('HOME')
  const paths = [home && `${home}/.claude/context-diet.json`, PROJECT_CONFIG].filter(Boolean)
  config = emptyConfig()
  sources = []
  for (const path of paths) {
    try {
      const found = await readConfig($, path)
      if (!found) continue
      for (const kind of [...KINDS, 'keep']) config[kind].push(...found[kind])
      sources.push(path)
    } catch (err) {
      $.ui.toast(`context-diet: ignoring ${path} (${err})`)
    }
  }
}

function dropEntries(text, isHidden, record) {
  const out = []
  let dropping = false
  for (const line of text.split('\n')) {
    const entry = line.match(/^- (.+?)(?::\s(.*)|:$|$)/)
    if (entry) {
      dropping = isHidden(entry[1])
      record[entry[1]] = (entry[2] ?? '').slice(0, 140)
    }
    if (!dropping) out.push(line)
  }
  return out.join('\n')
}

function dropMcpBlocks(text, isHidden) {
  return text
    .split(/(?=^## )/m)
    .filter(block => !(block.startsWith('## ') && isHidden(block.slice(3).split('\n')[0].trim())))
    .join('')
}

function dropMcpToolLines(text, isHidden) {
  return text
    .split('\n')
    .filter(line => {
      const [, server, tool] = line.match(/^mcp__(.+?)__(.+)$/) ?? []
      if (!server) return true
      const tools = (inventory.mcp[server] ??= [])
      if (tools.length < 6) tools.push(tool)
      return !isHidden(server)
    })
    .join('\n')
}

function hidden(kind) {
  const hide = matcher(config[kind])
  const keep = matcher(config.keep)
  return name => hide(name) && !keep(name)
}

const FILTERS = {
  deferred_tools_delta: text => dropMcpToolLines(text, hidden('mcp')),
  mcp_instructions_delta: text => dropMcpBlocks(text, hidden('mcp')),
  skill_listing: text => dropEntries(text, hidden('skills'), inventory.skills),
  agent_listing_delta: text => dropEntries(text, hidden('agents'), inventory.agents),
}

const list = patterns => patterns.map(p => `\`${p}\``).join(', ') || '-'

const loose = text => text.toLowerCase().replace(/[-_]+/g, ' ')

async function instructionsText($) {
  const home = await $.env.get('HOME')
  const texts = await Promise.all([home && `${home}/.claude/CLAUDE.md`, 'CLAUDE.md'].filter(Boolean).map(p => head($, p, 200000)))
  return loose(texts.filter(Boolean).join('\n'))
}

async function head($, path, chars) {
  return (await $.fs.exists(path)) ? (await $.fs.read(path)).slice(0, chars) : null
}

async function fingerprint($) {
  const parts = [`Top-level entries: ${(await $.fs.list('.')).map(f => f.name).slice(0, 80).join(', ')}`]
  for (const [path, keys] of [['package.json', ['dependencies', 'devDependencies']], ['composer.json', ['require', 'require-dev']]]) {
    const text = await head($, path, 200000)
    if (!text) continue
    try {
      const json = JSON.parse(text)
      parts.push(`${path} packages: ${keys.flatMap(k => Object.keys(json[k] ?? {})).join(', ')}`)
    } catch {}
  }
  for (const [path, chars] of [['pubspec.yaml', 1500], ['Package.swift', 1500], ['CLAUDE.md', 2000], ['README.md', 1000]]) {
    const text = await head($, path, chars)
    if (text) parts.push(`${path} (start):\n${text}`)
  }
  return parts.join('\n\n')
}

function describeInventory(inv) {
  return [
    'MCP servers (sample tools):',
    ...Object.entries(inv.mcp).map(([server, tools]) => `- ${server}: ${tools.join(', ')}`),
    '',
    'Skills:',
    ...Object.entries(inv.skills).map(([name, desc]) => `- ${name}${desc ? `: ${desc}` : ''}`),
    '',
    'Agents:',
    ...Object.entries(inv.agents).map(([name, desc]) => `- ${name}${desc ? `: ${desc}` : ''}`),
  ].join('\n')
}

// Anything the user's instructions name is something they rely on, whatever the model thinks of the project.
function pickHides(text, inv, instructions) {
  const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}')
  const mentioned = name => [name, name.split(':')[0]].some(part => instructions.includes(loose(part)))
  return Object.fromEntries(
    KINDS.map(kind => {
      const names = Object.keys(inv[kind])
      const wanted = Array.isArray(json[kind]) ? json[kind].filter(p => typeof p === 'string') : []
      return [kind, wanted.filter(p => { const hits = names.filter(matcher([p])); return hits.length && !hits.some(mentioned) })]
    }),
  )
}

async function setUpProject($) {
  const inv = KINDS.some(kind => Object.keys(inventory[kind]).length) ? inventory : await $.store.get('inventory')
  if (!inv) return 'context-diet: no inventory yet; send a prompt first, then run /diet init'
  const reply = await $.model.complete({
    model: 'sonnet',
    system: SYSTEM,
    prompt: `PROJECT\n${await fingerprint($)}\n\nINVENTORY\n${describeInventory(inv)}${config.keep.length ? `\n\nALWAYS KEPT (never list these): ${config.keep.join(', ')}` : ''}`,
    maxTokens: 2000,
  })
  if (!reply.isAnswered) return `context-diet: setup failed (${reply.reason}); run /diet init to retry`
  let hides
  try {
    hides = pickHides(reply.text, inv, await instructionsText($))
  } catch (err) {
    return `context-diet: setup got an unreadable answer (${err}); run /diet init to retry`
  }
  const note = `written by context-diet on ${new Date().toISOString().slice(0, 10)}; edit freely, an existing file is never regenerated except by /diet init`
  await $.fs.write(PROJECT_CONFIG, JSON.stringify({ _note: note, ...hides }, null, 2) + '\n')
  await loadConfig($)
  $.ui.invalidate('prompt.attachment')
  return `context-diet: set up this project, hiding ${hides.mcp.length} MCP servers, ${hides.skills.length} skill patterns and ${hides.agents.length} agent patterns from the next request on (/diet shows them)`
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    interactive = e.isInteractive
    await loadConfig($)
    await $.command.register({
      name: 'diet',
      description: 'Show what context-diet hides here; "/diet init" regenerates the project config, "/diet reload" re-reads it',
      argumentHint: '[init|reload]',
    })
    return next(e)
  })

  on('prompt.attachment', async ($, e, next) => {
    const result = await next(e)
    const filter = FILTERS[e.type]
    if (!filter || typeof result?.text !== 'string') return result
    const text = filter(result.text)
    saved.set(e.type, { before: result.text.length, after: text.length })
    return { ...result, text }
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    if (e.agentId || !Object.keys(inventory.skills).length) return result
    await $.store.set('inventory', inventory)
    if (setupAttempted || !interactive || (await $.fs.exists(PROJECT_CONFIG)) || !(await $.session.repo())) return result
    setupAttempted = true
    void setUpProject($).then(message => $.ui.toast(message))
    return result
  })

  on('command.run', { command: 'diet' }, async ($, e) => {
    const action = e.args.trim()
    if (action === 'init') return { text: await setUpProject($) }
    if (action === 'reload') {
      await loadConfig($)
      $.ui.invalidate('prompt.attachment')
    }
    const lines = [
      sources.length ? `config: ${sources.join(', ')}` : 'no config yet: it is generated after your first prompt in a git project, or run /diet init',
      ...KINDS.map(kind => `hiding ${kind}: ${list(config[kind])}`),
      `always kept: ${list(config.keep)}`,
      ...(saved.size
        ? [...saved].map(([type, s]) => `${type}: ${s.before} -> ${s.after} chars (-${s.before - s.after})`)
        : ['savings: not measured since the config loaded; send a prompt, then run /diet again']),
    ]
    return { text: lines.join('\n') }
  })
}
