---
name: block
description: >
  Create an ACF block from a Figma design in a Sage WordPress theme. Scaffolds the PHP class, Blade
  template, and ACF field group JSON, then adds the block to the correct page with content from the
  design, and visually verifies the result in the browser against the Figma design until pixel-perfect.
  Trigger on: "create block", "build block", "new block", "implement this block", or when given a
  Figma design URL with a block to build.
argument-hint: <block-description> @<figma-url>
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash(*), Write, Edit, Agent, mcp__figma-desktop__get_design_context, mcp__figma-desktop__get_screenshot, mcp__figma-desktop__get_metadata, mcp__wordpress__*, mcp__claude-in-chrome__*, mcp__chrome-devtools__*
---

# /block — Create ACF Block from Figma Design

Create a complete ACF block from a Figma design, add it to the correct page with content, and visually verify it matches pixel-perfect.

## Hard Rules

1. **The block MUST match the Figma design pixel-perfect.** The user will be angry if it doesn't.
2. **Every block requires exactly 3 files**: PHP class, Blade template, ACF field group JSON.
3. **Always read existing blocks first** to match the codebase's established patterns.
4. **Always use the project's `sage-wordpress-builder` skill references** for conventions.
5. **Always verify visually in the browser** — never claim done without screenshot comparison.
6. **Iterate until perfect** — if the browser doesn't match Figma, fix and re-check.
7. **Always place the block on a page when the WordPress MCP is available.** Ask the user which page if it isn't clear from the arguments or Figma context. Never guess silently.
8. **Always read `BLOCK.md` first.** If it doesn't exist in the project, create it by analyzing existing blocks before scaffolding the new one. Update it whenever conventions change.

## Step 1: Parse Arguments

Extract from `$ARGUMENTS`:

- **Block name/description**: What the block is called and any special behavior notes
- **Figma URL**: Extract the `node-id` parameter from the URL (format: `node-id=XXXX-XXXX`)
- **Page placement**: If mentioned, which page and position the block should go on

If no Figma URL is provided:
- Print: "Usage: `/block <description> @<figma-url>`"
- Print: "Example: `/block hero section with background video @https://www.figma.com/design/...?node-id=1234-567`"
- Stop.

## Step 2: Get Figma Design

### 2a. Get design context

Call `mcp__figma-desktop__get_design_context` with:
- `nodeId`: extracted node ID (convert `XXXX-XXXX` URL format to `XXXX:XXXX`)
- `clientFrameworks`: `"wordpress,tailwindcss,blade,alpine.js"`
- `clientLanguages`: `"php,html,css,javascript"`
- `artifactType`: `"COMPONENT_WITHIN_A_WEB_PAGE_OR_APP_SCREEN"`
- `taskType`: `"CREATE_ARTIFACT"`

### 2b. Get screenshot

Call `mcp__figma-desktop__get_screenshot` with the same `nodeId` and framework/language params.

**Save the Figma screenshot mentally as your reference for pixel-perfect comparison.**

### 2c. Analyze the design

Document:
- Layout structure (full-width, container, grid, etc.)
- Colors, spacing, typography
- Which parts map to standard reusable fields (layout, reusable_content)
- Which parts are block-specific custom fields
- Any special behavior (background images, overlays, decorative elements, animations)
- Image assets and their positioning

## Step 3: Establish / Read Project Block Conventions (`BLOCK.md`)

Every project that uses `/block` keeps a `BLOCK.md` at the repo root (or theme root, next to `app/Blocks/`). It is the single source of truth for this project's block conventions. **You must read it before scaffolding, and update it when you discover new conventions.**

### 3a. Locate `BLOCK.md`

Glob for `BLOCK.md` starting from the theme root and walking up to the repo root. Pick the closest one to `app/Blocks/`.

### 3b. If `BLOCK.md` exists → READ IT

Read it in full before doing anything else in this step. Treat its conventions as authoritative for this project. Skip to Step 3d.

### 3c. If `BLOCK.md` does NOT exist → CREATE IT

Before creating the new block, you must first study the existing blocks and document the project's conventions. This is a one-time investment that makes every future `/block` run faster and more consistent.

Study these files:

1. **BaseBlock class**: Glob for `**/BaseBlock.php` — note `getCommonFields()`, `extractLayoutFields()`, `extractReusableContentFields()`, and any other shared helpers.
2. **Every existing block** (or at least 4–6 representative ones if there are many): read the PHP class, Blade template, and ACF JSON for each.
3. **Blade components**: Read `resources/views/components/section.blade.php` and all `resources/views/components/content/*.blade.php`.
4. **All existing ACF field groups**: Read `acf-json/group_block_*.json` plus any shared groups like `group_layout` and `group_reusable_content`.
5. **Tailwind config / theme tokens**: Read `tailwind.config.js` (or `app.css` for Tailwind v4 `@theme`) to capture color, spacing, and typography tokens used by blocks.

Then write `BLOCK.md` at the project root (or theme root if that's where `app/Blocks/` lives). It must cover at minimum:

- **File layout**: where PHP classes, Blade templates, and ACF JSON live; naming conventions (PascalCase class, kebab-case view, snake_case field keys, etc.).
- **BaseBlock contract**: what `getCommonFields()` returns; how `with()` should be composed; any required `$supports` defaults.
- **Reusable ACF field groups**: every shared group (e.g. `group_layout`, `group_reusable_content`) — its fields, intent, and how blocks clone it. Include the exact `clone` JSON snippet.
- **Standard tabs / field ordering**: e.g. "Layout tab → block-specific tab → Inhoud tab" — whatever the repo actually does.
- **Field rules**: image return format, button-group usage, required/placeholder rules, key prefix patterns (`field_block_{name}_...`).
- **Blade conventions**: required wrapper component (`<x-section>` and its props), reveal/animation attributes (`data-reveal-group`), standard content sub-components (`<x-content.title>` etc.), how `$content_items` and `$background_color` are passed.
- **Tailwind tokens**: brand colors, spacing scale, font families/sizes referenced by blocks.
- **Display / language**: e.g. block `$name` is in Dutch; tab labels are in Dutch ("Inhoud", "Layout").
- **Page placement conventions**: anything specific to how blocks are inserted via the WordPress MCP in this project (post types, parent restrictions, default media library tags, etc.).
- **Anything else that repeats** across 2+ blocks. If you see a pattern, write it down.

Be specific. Cite real field keys, real component names, real file paths from this codebase. Do not write generic Sage advice — that already lives in the `sage-wordpress-builder` skill.

### 3d. Match conventions exactly

When you build the new block in Step 4, follow `BLOCK.md` exactly. **Do not invent new patterns.** If the design genuinely requires a new pattern, see Step 3e.

### 3e. Update `BLOCK.md` when conventions change

If during this run you:

- Introduce a new reusable field group, helper, or component
- Adopt a new naming convention
- Discover an existing convention that wasn't documented
- Make a deliberate, project-wide change to how blocks are structured

…then **update `BLOCK.md` in the same change**. The file must stay in sync with the codebase. A single-block exception is not a convention — only document things that should apply to future blocks too.

## Step 4: Create the Block Files

### 4a. PHP Block Class

Create `app/Blocks/{BlockName}.php`:

```php
<?php

namespace App\Blocks;

use StoutLogic\AcfBuilder\FieldsBuilder;

class BlockName extends BaseBlock
{
    public $name = 'Display Name';
    public $description = 'Description';
    public $category = 'formatting';
    public $keywords = [];
    public $post_types = [];
    public $parent = [];
    public $mode = 'edit';
    public $view = 'blocks.block-name';

    public $supports = [
        'full_height' => false,
        'anchor' => false,
        'mode' => 'edit',
        'multiple' => true,
        'supports' => ['mode' => false],
        'jsx' => true,
    ];

    public function with()
    {
        return array_merge(
            $this->getCommonFields(),
            [
                // Block-specific fields from ACF
                'custom_field' => get_field('custom_field'),
            ]
        );
    }

    public function fields()
    {
        $acfFields = new FieldsBuilder('block_name');
        return $acfFields->build();
    }

    public function enqueue()
    {
        // Enqueue block-specific assets if needed
    }
}
```

**Rules:**
- Extend `BaseBlock`, always call `$this->getCommonFields()` in `with()`
- The `$view` must match the Blade template path: `blocks.{kebab-case-name}`
- The `$name` is the Dutch display name shown in the WordPress editor
- Match existing blocks' `$supports` configuration

### 4b. Blade Template

Create `resources/views/blocks/{block-name}.blade.php`:

**Rules:**
- Always wrap in `<x-section>` component with `:id`, `:pt`, `:pb`, `:background_color`
- Use `data-reveal-group` for scroll animations where appropriate
- Use `<x-content.subtitle>`, `<x-content.title>`, `<x-content.text>`, `<x-content.buttons>` for standard content
- Pass `$content_items` and `$background_color` to content components
- Use Tailwind CSS classes matching the Figma design exactly
- Use `@class([])` directive for conditional classes
- Match the exact HTML structure from the Figma design context

### 4c. ACF Field Group JSON

Create `acf-json/group_block_{name}.json`:

**Structure:**
```json
{
  "key": "group_block_{name}",
  "title": "Block: {Display Name}",
  "fields": [
    // Tab: Layout
    { "type": "tab", "label": "Layout" },
    { "type": "clone", "clone": ["group_layout"], "display": "seamless" },

    // Block-specific fields (if any)

    // Tab: Inhoud (Content)
    { "type": "tab", "label": "Inhoud" },
    { "type": "clone", "clone": ["group_reusable_content"], "display": "seamless" }
  ],
  "location": [[{ "param": "block", "operator": "==", "value": "acf/{slug}" }]]
}
```

**Field Rules:**
- Never make fields mandatory
- Never add placeholders or instructions to fields
- Use button groups for option selections
- Return image IDs not objects (`"return_format": "id"`)
- Use snake_case for field names
- Match the exact JSON structure of existing block field groups (copy key naming patterns, field key prefixes, etc.)

## Step 5: Build and Verify Code

Run the build to ensure no errors:

```bash
cd <theme-path> && npm run build
```

If build fails, fix the issues and rebuild.

## Step 6: Add Block to Page with Content

This step is **mandatory whenever the WordPress MCP is available**. The block must be placed on the right page with content from the Figma design — not just scaffolded.

### 6a. Check WordPress MCP availability

Check whether `mcp__wordpress__*` tools are available in this session.

- **If unavailable:** Skip to Step 7. In the final report, note: "WordPress MCP not available — block scaffolded only; manual placement required."
- **If available:** Continue.

### 6b. Determine the target page

Decide which page the block belongs on, in this priority order:

1. **User explicitly named a page** in `$ARGUMENTS` (e.g. "on the homepage", "on the contact page") → use that page.
2. **Figma context strongly implies a page** (e.g. the Figma frame is named "Homepage / Hero", or the parent frame is clearly a specific page) → use that page, but state your inference and confirm before inserting.
3. **Otherwise → ASK THE USER.** Do not guess. List the available pages first:

   ```
   mcp__wordpress__wp_list_posts with post_type: "page", per_page: 50
   ```

   Then ask the user something like:
   > "Which page should this block be added to? I found these pages: [list with titles + IDs]. Reply with a page title/ID, or say 'skip' to leave the block unplaced."

   If the user says skip / no / not now, jump to Step 7 and note in the final report that the block was not placed.

### 6c. Find the page

If the page name is known but the ID isn't:

```
mcp__wordpress__wp_list_posts with post_type: "page", search: "<page-name>"
```

If multiple matches return, ask the user which one.

### 6d. Check current blocks on the page

```
mcp__wordpress__wp_list_post_blocks with post_id: <id>
```

### 6e. Determine the correct position

- If the user specified a position ("after the hero", "at the bottom", "above the footer CTA"), respect it.
- If the position is implied by the Figma frame ordering, use that.
- If unclear and there are several reasonable spots, **ask the user** with the list of current blocks and your suggested index.

### 6f. Find media for images

If the block needs images:
```
mcp__wordpress__wp_list_media with mime_type: "image"
```

Select the most appropriate image that matches the Figma design. If no clear match exists and the user hasn't supplied one, ask before picking a stand-in.

### 6g. Insert the block

```
mcp__wordpress__wp_insert_post_block with:
  post_id: <page-id>
  block_name: "acf/<block-slug>"
  position: <index>
  data: <JSON with ACF field values matching Figma content>
```

**Fill ALL content from the Figma design**: titles, text, buttons, images, layout options. An empty block placement is not acceptable — populate every field that has a corresponding value in the design.

### 6h. Move if needed

If position is wrong:
```
mcp__wordpress__wp_move_post_block with post_id, from_index, to_index
```

## Step 7: Visual Verification (MANDATORY)

This step is **not optional**. The block must match the Figma design pixel-perfect.

### 7a. Open the page in browser

```
mcp__claude-in-chrome__tabs_context_mcp
mcp__claude-in-chrome__tabs_create_mcp (or use existing tab)
mcp__claude-in-chrome__navigate to the page URL
```

### 7b. Take screenshots

Scroll to the block and take screenshots:
```
mcp__claude-in-chrome__computer with action: "screenshot"
mcp__claude-in-chrome__computer with action: "scroll" to navigate to the block
```

### 7c. Compare with Figma

Compare the browser screenshot against the Figma design screenshot from Step 2b. Check:

- **Layout**: Does the structure match? (widths, positioning, alignment)
- **Spacing**: Are margins and padding correct?
- **Typography**: Font sizes, weights, colors, line height
- **Colors**: Background colors, text colors, button colors
- **Images**: Correct positioning, sizing, object-fit
- **Decorative elements**: Bars, lines, overlays, gradients
- **Responsive**: Does it look right at the current viewport?

### 7d. Zoom into details

Use zoom to check specific areas:
```
mcp__claude-in-chrome__computer with action: "zoom", region: [x1, y1, x2, y2]
```

### 7e. Fix and iterate

If ANY difference is found:
1. Identify the exact issue
2. Edit the Blade template or CSS
3. Reload the page in browser
4. Re-screenshot and compare again
5. Repeat until pixel-perfect

**Do NOT claim the block is done until the browser matches the Figma design.**

## Step 8: Report

Only after visual verification passes:

```
## Block Created: {Block Name}

### Files Created
- `app/Blocks/{BlockName}.php` — PHP block class
- `resources/views/blocks/{block-name}.blade.php` — Blade template
- `acf-json/group_block_{name}.json` — ACF field group

### Page Integration
- **Page:** {page name} ({url}) — or "Not placed (WordPress MCP unavailable)" / "Not placed (user skipped)"
- **Position:** {position description}
- **Content:** Filled from Figma design

### Visual Verification
- Compared against Figma node {node-id}
- Layout: Match
- Colors: Match
- Typography: Match
- Spacing: Match

The block matches the Figma design.
```

---

**BEGIN BLOCK CREATION FOR:** $ARGUMENTS
