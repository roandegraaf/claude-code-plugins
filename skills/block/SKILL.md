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

## Step 3: Study Existing Codebase Patterns

Read these files to understand the project's conventions:

1. **BaseBlock class**: Glob for `**/BaseBlock.php` — understand `getCommonFields()`, `extractLayoutFields()`, `extractReusableContentFields()`
2. **2-3 existing blocks** similar to the one being created — read their PHP class, Blade template, and ACF JSON
3. **Blade components**: Read `resources/views/components/section.blade.php` and relevant `content/*.blade.php` components
4. **Existing ACF JSON**: Read 1-2 existing `acf-json/group_block_*.json` files to match the exact JSON structure

**Match the exact patterns and conventions of the existing codebase. Do not invent new patterns.**

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

If the user specified a page or it's obvious from context:

### 6a. Find the page

```
mcp__wordpress__wp_list_posts with post_type: "page", search: "<page-name>"
```

### 6b. Check current blocks on the page

```
mcp__wordpress__wp_list_post_blocks with post_id: <id>
```

### 6c. Find the correct position

Determine where the block should go based on user instructions or logical page flow.

### 6d. Find media for images

If the block needs images:
```
mcp__wordpress__wp_list_media with mime_type: "image"
```

Select the most appropriate image that matches the Figma design.

### 6e. Insert the block

```
mcp__wordpress__wp_insert_post_block with:
  post_id: <page-id>
  block_name: "acf/<block-slug>"
  position: <index>
  data: <JSON with ACF field values matching Figma content>
```

**Fill ALL content from the Figma design**: titles, text, buttons, images, layout options.

### 6f. Move if needed

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
- **Page:** {page name} ({url})
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
