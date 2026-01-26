# ACF Blocks

## BaseBlock Class

All blocks extend `BaseBlock` which provides common field extraction:

```php
<?php

namespace App\Blocks;

use Log1x\AcfComposer\Block;
use App\Traits\AcfBlockIcon;

abstract class BaseBlock extends Block
{
    use AcfBlockIcon;

    protected function getLayout(): array
    {
        return get_field('layout') ?? [];
    }

    protected function extractLayoutFields(): array
    {
        $layout = $this->getLayout();

        return [
            'id'               => $layout['id'] ?? null,
            'pt'               => $layout['pt'] ?? null,
            'pb'               => $layout['pb'] ?? null,
            'background_color' => $layout['background'] ?? null,
        ];
    }

    protected function getReusableContent(): array
    {
        return get_field('reusable_content') ?? [];
    }

    protected function extractReusableContentFields(): array
    {
        $reusableContent = $this->getReusableContent();

        return [
            'content_items' => $reusableContent['content_items'] ?? null,
            'subtitle'      => $reusableContent['subtitle'] ?? null,
            'heading'       => $reusableContent['heading'] ?? null,
            'heading_size'  => $reusableContent['heading_size'] ?? null,
            'title'         => $this->getCleanTitle($reusableContent['title'] ?? null),
            'content'       => $reusableContent['content'] ?? null,
            'buttons'       => $reusableContent['buttons'] ?? null,
        ];
    }

    protected function getCleanTitle($title): ?string
    {
        if (!$title) {
            return null;
        }
        return preg_replace('/<\/?p>/', '', $title);
    }

    protected function getCommonFields(): array
    {
        return array_merge(
            $this->extractLayoutFields(),
            $this->extractReusableContentFields()
        );
    }
}
```

## Block PHP Class Pattern

```php
<?php

namespace App\Blocks;

use StoutLogic\AcfBuilder\FieldsBuilder;

class Text extends BaseBlock
{
    public $name = 'Tekst';
    public $description = 'Tekst met opties.';
    public $category = 'formatting';
    public $keywords = [];
    public $post_types = [];
    public $parent = [];
    public $mode = 'edit';
    public $view = 'blocks.text';

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
                'text_layout' => get_field('text_layout'),
            ]
        );
    }

    public function fields()
    {
        $acfFields = new FieldsBuilder('text');
        return $acfFields->build();
    }

    public function enqueue()
    {
        // Enqueue block-specific assets if needed
    }
}
```

## Block Properties

| Property | Description | Example |
|----------|-------------|---------|
| `$name` | Display name in editor | `'Tekst'` |
| `$description` | Block description | `'Tekst met opties.'` |
| `$category` | Block category | `'formatting'`, `'widgets'` |
| `$keywords` | Search keywords | `['text', 'content']` |
| `$post_types` | Allowed post types (empty = all) | `['page', 'post']` |
| `$parent` | Parent block restrictions | `[]` |
| `$mode` | Default edit mode | `'edit'` or `'preview'` |
| `$view` | Blade template path | `'blocks.text'` |

## Block Supports Array

```php
public $supports = [
    'full_height' => false,  // Allow full height option
    'anchor' => false,       // Allow anchor ID
    'mode' => 'edit',        // Default mode
    'multiple' => true,      // Allow multiple instances
    'supports' => ['mode' => false],  // Disable mode switching
    'jsx' => true,           // Enable JSX in InnerBlocks
];
```

## Block Blade Template Pattern

```blade
<x-section
  :id="$id"
  :pt="$pt"
  :pb="$pb"
  :background_color="$background_color"
>
  <div class="container">
    <div data-reveal-group @class([
      'flex flex-col gap-4',
      'max-w-3xl mx-auto text-center' => $text_layout === 'centered',
      'grid md:grid-cols-2 gap-12' => $text_layout === 'title_next_to_text',
    ])>
      <div class="flex flex-col">
        <x-content.subtitle
          :subtitle="$subtitle"
          :contentItems="$content_items"
          :background="$background_color"
        />
        <x-content.title
          :title="$title"
          :heading="$heading"
          :background="$background_color"
          :headingSize="$heading_size"
          :contentItems="$content_items"
        />
      </div>

      @if($content || $buttons)
        <div class="flex flex-col gap-4">
          <x-content.text
            :content="$content"
            :background="$background_color"
            :contentItems="$content_items"
          />
          <x-content.buttons
            :buttons="$buttons"
            :contentItems="$content_items"
          />
        </div>
      @endif
    </div>
  </div>
</x-section>
```

## Common Blocks

### Text Block

Layouts: `centered`, `title_next_to_text`, `two_cols`, `text_indent`

### Text + Image Block

Additional fields:
- `image_text_position`: `text-image` or `image-text`
- `background_text`: Background color for text section
- `media`: Clone of media group (image/video)

### Header Block

Additional fields:
- `type`: `image` or `video`
- `background_image`: Hero image
- `video_source`: `external` or `file`
- `video_url` / `video_file`

### Images Block

Additional fields:
- `image_position`: `full-width`, `container`, `indent`, `slider`, `grid`
- `images`: Gallery field

## with() Method Pattern

Always use `getCommonFields()` and merge block-specific fields:

```php
public function with()
{
    return array_merge(
        $this->getCommonFields(),
        [
            'specific_field' => get_field('specific_field'),
            'another_field' => get_field('another_field'),
        ]
    );
}
```

## Returned Variables

From `getCommonFields()`:
- `$id` - Section ID
- `$pt` - Top padding class
- `$pb` - Bottom padding class
- `$background_color` - Background class
- `$content_items` - Array of enabled content
- `$subtitle` - Subtitle text
- `$heading` - Heading level (h1-h4)
- `$heading_size` - Heading size (small/normal/big)
- `$title` - Title text (cleaned)
- `$content` - WYSIWYG content
- `$buttons` - Buttons array
