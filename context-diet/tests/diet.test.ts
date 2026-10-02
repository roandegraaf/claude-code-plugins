import { expect, test } from 'claude-code/testing'

const CONFIG = JSON.stringify({ mcp: ['Neon', 'claude_ai_*'], skills: ['kicad-happy:*', 'claude-api'], agents: ['stripe:*'] })

const TOOLS = `The following deferred tools are now available via ToolSearch:
EndConversation
mcp__Neon__run_sql
mcp__Neon__list_projects
mcp__claude_ai_Gmail__authenticate
mcp__github__get_me`

const MCP = `# MCP Server Instructions

## Neon
Notice: write mode active.

## github
The GitHub MCP Server provides tools.
`

const SKILLS = `The following skills are available for use with the Skill tool:

- apple-design: Apple's approach.
- claude-api: Reference for the Claude API.
TRIGGER — read BEFORE opening the target file.
SKIP only when another provider is being worked on.
- kicad-happy:bom
- kicad-happy:emc: EMC pre-compliance risk analysis.
- osmo:osmo: Find Osmo resources.`

const AGENTS = `Available agent types for the Agent tool:
- Explore: Fast read-only search agent. (Tools: All tools)
- stripe:Company Researcher: Research a company. (Tools: All tools)
- Plan: Software architect agent. (Tools: All tools)`

async function boot($, on) {
  on('prompt.attachment', ($, e) => ({ text: e.text }))
  on('env.get', () => ({ value: '/home/me' }))
  on('fs.exists', ($, e) => ({ value: e.path.endsWith('.claude/context-diet.json') && !e.path.startsWith('/home/me') }))
  on('fs.read', () => ({ value: CONFIG }))
  on('command.register', () => ({ value: undefined }))
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/work', surface: null, isInteractive: false })
}

async function filtered($, on, type: string, text: string) {
  return (await $.prompt.attachment({ type, text, origin: { kind: 'engine' } } as never)).text
}

test('hides MCP servers from the deferred tool list, keeping built-ins and other servers', async ($, on) => {
  await boot($, on)
  expect(await filtered($, on, 'deferred_tools_delta', TOOLS)).toBe(
    'The following deferred tools are now available via ToolSearch:\nEndConversation\nmcp__github__get_me',
  )
})

test('drops a hidden server instruction block', async ($, on) => {
  await boot($, on)
  expect(await filtered($, on, 'mcp_instructions_delta', MCP)).toBe('# MCP Server Instructions\n\n## github\nThe GitHub MCP Server provides tools.\n')
})

test('drops hidden skills including their wrapped description lines', async ($, on) => {
  await boot($, on)
  expect(await filtered($, on, 'skill_listing', SKILLS)).toBe(
    "The following skills are available for use with the Skill tool:\n\n- apple-design: Apple's approach.\n- osmo:osmo: Find Osmo resources.",
  )
})

test('drops hidden agents and leaves other attachments alone', async ($, on) => {
  await boot($, on)
  expect(await filtered($, on, 'agent_listing_delta', AGENTS)).toBe(
    'Available agent types for the Agent tool:\n- Explore: Fast read-only search agent. (Tools: All tools)\n- Plan: Software architect agent. (Tools: All tools)',
  )
  expect(await filtered($, on, 'date', "Today's date is 2026-10-02.")).toBe("Today's date is 2026-10-02.")
})

test('/diet init writes a project config from the model, dropping names it invented', async ($, on) => {
  const written: Record<string, string> = {}
  on('env.get', () => ({ value: '/home/me' }))
  on('fs.exists', ($, e) => ({ value: e.path in written }))
  on('fs.read', ($, e) => ({ value: written[e.path] ?? '' }))
  on('fs.list', () => ({ value: [{ name: 'composer.json', kind: 'file', size: 1, mtimeMs: 1, isLink: false }] }))
  on('fs.write', ($, e) => { written[e.path.slice(e.path.indexOf('.claude/'))] = e.text; return { value: undefined } })
  on('command.register', () => ({ value: undefined }))
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('prompt.attachment', ($, e) => ({ text: e.text }))
  on('model.complete', () => ({
    value: { isAnswered: true, text: '```json\n{"mcp": ["Neon", "made_up"], "skills": ["kicad-happy:*", "nope:*"], "agents": []}\n```', usage: { input_tokens: 1, output_tokens: 1, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 } },
  }))
  await $.session.start({ cwd: '/work', surface: 'terminal', isInteractive: true })
  await $.prompt.attachment({ type: 'deferred_tools_delta', text: TOOLS, origin: { kind: 'engine' } } as never)
  await $.prompt.attachment({ type: 'skill_listing', text: SKILLS, origin: { kind: 'engine' } } as never)

  const out = await $.command.run({ command: 'diet', args: 'init' })
  expect(out.text).toContain('hiding 1 MCP servers, 1 skill patterns')
  const config = JSON.parse(written['.claude/context-diet.json'])
  expect([config.mcp, config.skills, config.agents]).toEqual([['Neon'], ['kicad-happy:*'], []])
})

test('keep beats hide, and init never hides what CLAUDE.md names', async ($, on) => {
  const files: Record<string, string> = {
    '/home/me/.claude/context-diet.json': JSON.stringify({ keep: ['kicad-happy:bom'] }),
    '/home/me/.claude/CLAUDE.md': 'Always use the Neon MCP for databases.',
  }
  const key = (path: string) => (path.startsWith('/home/me/') ? path : path.endsWith('.claude/context-diet.json') ? '.claude/context-diet.json' : path)
  on('env.get', () => ({ value: '/home/me' }))
  on('fs.exists', ($, e) => ({ value: key(e.path) in files }))
  on('fs.read', ($, e) => ({ value: files[key(e.path)] ?? '' }))
  on('fs.list', () => ({ value: [] }))
  on('fs.write', ($, e) => { files[key(e.path)] = e.text; return { value: undefined } })
  on('command.register', () => ({ value: undefined }))
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('prompt.attachment', ($, e) => ({ text: e.text }))
  on('model.complete', () => ({
    value: { isAnswered: true, text: '{"mcp": ["Neon", "claude_ai_*"], "skills": ["kicad-happy:*"], "agents": []}', usage: { input_tokens: 1, output_tokens: 1, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 } },
  }))
  await $.session.start({ cwd: '/work', surface: 'terminal', isInteractive: true })
  await $.prompt.attachment({ type: 'deferred_tools_delta', text: TOOLS, origin: { kind: 'engine' } } as never)
  await $.prompt.attachment({ type: 'skill_listing', text: SKILLS, origin: { kind: 'engine' } } as never)

  await $.command.run({ command: 'diet', args: 'init' })
  const config = JSON.parse(files['.claude/context-diet.json'])
  expect(config.mcp).toEqual(['claude_ai_*'])

  const skills = (await $.prompt.attachment({ type: 'skill_listing', text: SKILLS, origin: { kind: 'engine' } } as never)).text
  expect(skills).toContain('- kicad-happy:bom')
  expect(skills).not.toContain('kicad-happy:emc')
})
