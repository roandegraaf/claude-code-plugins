# ACF Field Groups

## Table of Contents
- [Field Rules](#field-rules)
- [Standard Field Groups](#standard-field-groups)
- [Standardized Block Field Structure](#standardized-block-field-structure)
- [Common Field Patterns](#common-field-patterns)
- [Block-Specific Field Examples](#block-specific-field-examples)
- [ACF Options Page](#acf-options-page)

All blocks use standardized field groups via ACF Clone fields. Fields are managed via WordPress Admin and stored in `acf-json/`.

## Field Rules

- **Never** make fields mandatory (unless explicitly requested)
- **Never** add placeholders to fields
- **Never** add instructions to fields
- Use **button groups** for selecting one of multiple options
- Return image **IDs** not objects (`return_format => 'id'`)
- Use **snake_case** for field names
- Prefix fields by section: `header_title`, `cta_buttons`

## Standard Field Groups

### 1. Layout Group (`group_layout`)

Standard layout settings cloned into all blocks:

| Field | Type | Options |
|-------|------|---------|
| `add_id` | button_group | `show`, `hide` |
| `id` | text | Conditional on add_id = show |
| `pt` | button_group | `pt-0` (None), `pt-small`, `pt-medium` |
| `pb` | button_group | `pb-0` (None), `pb-small`, `pb-medium` |
| `background` | button_group | `bg-primary`, `bg-secondary`, `bg-accent`, `bg-neutral`, `bg-light`, `bg-white` |

### 2. Reusable Content Group (`group_reusable_content`)

Standard content fields cloned into all blocks:

| Field | Type | Options/Notes |
|-------|------|---------------|
| `content_items` | checkbox | `subtitle`, `title`, `content`, `buttons` |
| `subtitle` | text | Conditional on subtitle selected |
| `heading` | button_group | `h1`, `h2`, `h3`, `h4` |
| `heading_size` | button_group | `small`, `normal`, `big` |
| `title` | text | Conditional on title selected |
| `content` | wysiwyg | Conditional on content selected |
| `buttons` | repeater | Conditional on buttons selected |

**Buttons Repeater Sub-fields:**
| Field | Type | Options |
|-------|------|---------|
| `type` | button_group | `button`, `arrow` |
| `color` | button_group | `primary`, `secondary`, `accent`, `neutral`, `white`, `black` |
| `link` | link | URL, title, target |

### 3. Media Group (`group_media`)

Media handling for image/video content:

| Field | Type | Options/Notes |
|-------|------|---------------|
| `media_type` | button_group | `image`, `video` |
| `image` | image | Return ID, shows when media_type = image |
| `video_type` | button_group | `file`, `youtube`, `vimeo` |
| `video_layout` | button_group | `autoplay`, `video-element` |
| `video_link` | text | External URL |
| `video_file` | file | Upload, shows when video_type = file |
| `placeholder` | image | Video placeholder/poster |

## Standardized Block Field Structure

Every block should follow this tab structure:

```
Tab: Layout
  └── Clone: group_layout (seamless)

Tab: Inhoud (Content)
  └── Clone: group_reusable_content (seamless)

[Block-specific fields after content tab]
```

### ACF Field JSON Structure

```json
{
  "key": "group_block_example",
  "title": "Block: Example",
  "fields": [
    {
      "key": "field_example_tab_layout",
      "label": "Layout",
      "type": "tab",
      "placement": "top"
    },
    {
      "key": "field_example_layout",
      "label": "Layout",
      "name": "layout",
      "type": "clone",
      "clone": ["group_layout"],
      "display": "seamless"
    },
    {
      "key": "field_example_tab_content",
      "label": "Inhoud",
      "type": "tab",
      "placement": "top"
    },
    {
      "key": "field_example_reusable_content",
      "label": "Content",
      "name": "reusable_content",
      "type": "clone",
      "clone": ["group_reusable_content"],
      "display": "seamless"
    }
  ],
  "location": [
    [
      {
        "param": "block",
        "operator": "==",
        "value": "acf/example"
      }
    ]
  ]
}
```

## Common Field Patterns

### Button Group Pattern

```json
{
  "key": "field_xxx_layout_type",
  "label": "Layout",
  "name": "layout_type",
  "type": "button_group",
  "choices": {
    "option-1": "Option 1",
    "option-2": "Option 2"
  },
  "default_value": "option-1",
  "return_format": "value"
}
```

### Image Field Pattern

```json
{
  "key": "field_xxx_image",
  "label": "Afbeelding",
  "name": "image",
  "type": "image",
  "return_format": "id",
  "preview_size": "medium"
}
```

### Repeater Pattern

```json
{
  "key": "field_xxx_items",
  "label": "Items",
  "name": "items",
  "type": "repeater",
  "layout": "block",
  "button_label": "Item toevoegen",
  "sub_fields": []
}
```

### Conditional Logic Pattern

Show field only when another field has specific value:

```json
{
  "key": "field_xxx_conditional",
  "conditional_logic": [
    [
      {
        "field": "field_xxx_toggle",
        "operator": "==",
        "value": "show"
      }
    ]
  ]
}
```

## Block-Specific Field Examples

### Text Block Fields

```
Tab: Layout → Clone group_layout
Tab: Inhoud → Clone group_reusable_content
  text_layout (button_group): centered, title_next_to_text, two_cols, text_indent
```

### Text + Image Block Fields

```
Tab: Layout → Clone group_layout
  image_text_position (button_group): text-image, image-text
  background_text (button_group): bg-white, bg-light, bg-black, bg-primary
Tab: Inhoud → Clone group_reusable_content
Tab: Media → Clone group_media
  linkable_list (button_group): yes, no
  list (repeater): link field
```

### Header Block Fields

```
  background (button_group): bg-primary, bg-secondary, etc.
  page (button_group): subpage, home
  type (button_group): image, video
  video_source (button_group): external, file
  background_image (image): conditional
  video_image (image): WCAG placeholder
  video (file): conditional
  video_url (text): conditional
Tab: Inhoud → Clone group_reusable_content
```

## ACF Options Page

For global theme settings:

```php
add_action('acf/init', function () {
    acf_add_options_page([
        'page_title' => 'Thema opties',
        'menu_title' => 'Thema opties',
        'menu_slug'  => 'thema-options',
        'capability' => 'edit_posts',
        'icon_url'   => 'dashicons-admin-settings',
    ]);
});

// Access options fields
$logo = get_field('site_logo', 'option');
```
