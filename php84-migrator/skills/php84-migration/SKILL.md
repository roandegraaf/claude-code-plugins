---
name: php84-migration
description: >
  PHP 7.4 to 8.4 migration knowledge for WordPress Bedrock/Sage/ACF sites.
  Triggers on: PHP migration, PHP upgrade, PHP 8 compatibility, null safety,
  deprecated functions, dynamic properties, Bedrock upgrade, Sage upgrade.
---

# PHP 7.4 to 8.4 Migration

## Breaking Changes Summary

| PHP Version | Category | Impact | Key Change |
|---|---|---|---|
| 8.0 | Type safety | Critical | Union types, `match`, named arguments, nullsafe operator |
| 8.0 | Null handling | Critical | Stricter null-to-type coercions in internal functions |
| 8.1 | Enums & fibers | High | Enums, fibers, readonly properties, intersection types |
| 8.1 | Deprecations | High | `$GLOBALS` restrictions, null to non-nullable params |
| 8.2 | Dynamic props | High | Dynamic properties deprecated (Error in 9.0) |
| 8.2 | Type system | Medium | `true`/`false`/`null` standalone types, DNF types |
| 8.3 | Typed constants | Medium | Typed class constants, `json_validate()`, `#[Override]` |
| 8.4 | Deprecations | High | Implicit nullable params deprecated, new deprecations |

See [references/breaking-changes.md](references/breaking-changes.md) for full details per version.

## ACF Field Type Defaults

When accessing ACF fields, use type-aware null coalescing based on expected return type:

| ACF Field Type | Safe Default |
|---|---|
| text, textarea, wysiwyg, email, url, password | `?? ''` |
| number, range | `?? 0` |
| image, file, post_object, page_link | Guard before use |
| gallery, repeater, flexible_content, relationship | `?: []` |
| true_false | `?? false` |
| select, radio | `?? ''` |
| checkbox | `?: []` |
| group, link | Guard before property/array access |
| color_picker | `?? ''` |

**Guard before use** means: check with `if ($value)` or nullsafe `?->` before accessing properties/methods.

See [references/acf-patterns.md](references/acf-patterns.md) for field-specific examples.

## Fix Pattern Quick Reference

### Null-safe string functions

```php
// Before
strlen($var)
// After
strlen($var ?? '')
```

### Implicit nullable parameters

```php
// Before (deprecated in 8.4, will be removed in 9.0)
function foo(string $bar = null)
// After
function foo(?string $bar = null)
```

### Superglobal access

```php
// Before
isset($_GET['x']) ? $_GET['x'] : 'default'
// After
$_GET['x'] ?? 'default'
```

### Array functions with nullable returns

```php
// Before
array_map($fn, get_posts($args))
// After
array_map($fn, get_posts($args) ?: [])
```

### Dynamic properties

```php
// Before (Error in 8.4)
$obj->undeclaredProp = 'value';
// After — option A: explicit declaration
class MyClass {
    public string $undeclaredProp;
}
// After — option B: attribute
#[AllowDynamicProperties]
class MyClass {}
```

### Ternary with function returns

```php
// Before
strtolower(get_field('name'))
// After
strtolower(get_field('name') ?? '')
```

## Bedrock / Sage Specifics

- **Bedrock**: `config/application.php` env handling, `composer.json` platform config, `mu-plugins`
- **Sage**: Blade templates, `app/` controllers/composers, service providers, Bud build pipeline

See [references/bedrock-sage.md](references/bedrock-sage.md) for Bedrock/Sage migration checklist.

## Dependency Compatibility

Verify all Composer dependencies support the target PHP version before upgrading.

See [references/dependency-matrix.md](references/dependency-matrix.md) for the compatibility matrix and upgrade paths.
