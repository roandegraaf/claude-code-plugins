# Dependency Compatibility Matrix

Reference for upgrading Composer dependencies in WordPress Bedrock/Sage sites from PHP 7.4 to 8.4.

## Compatibility Matrix

| Package | Typical Old Version | Min for PHP 8.4 | Recommended | Notes |
|---------|-------------------|-----------------|-------------|-------|
| `roots/wordpress` | 5.9 | 6.4 | 6.7+ | Check available wpackagist versions |
| `roots/acorn` | 2.0.0-alpha | 4.0+ | Latest 4.x | Major breaking changes from 2.x to 4.x |
| `roots/bedrock-autoloader` | 1.0 | 1.0 | Latest | Generally compatible |
| `roots/wp-config` | 1.0.0 | 1.0.0 | Latest | Generally compatible |
| `roots/wp-password-bcrypt` | 1.0.0 | 1.0.0 | Latest | Generally compatible |
| `vlucas/phpdotenv` | ^5.2 | ^5.2 | ^5.6 | Already PHP 8.x compatible |
| `oscarotero/env` | ^2.1 | ^2.1 | ^2.1 | Check compatibility |
| `itinerisltd/acf-gutenblocks` | 0.4.0 | Check | Latest or fork | May need replacement |
| `wpackagist-plugin/wordpress-seo` | dev-trunk | Latest | Latest | Yoast regularly updates |
| `wpackagist-plugin/amazon-s3-and-cloudfront` | 2.5.5 | Latest | Latest | Check PHP 8.4 support |
| `league/csv` | ^9.6 | ^9.6 | ^9.x | Already compatible |

## How to Check Package PHP Requirements

**Read the package's `composer.json`:**

```bash
composer show <package> | grep -i php
```

This shows the `require.php` constraint declared by the package.

**Find the latest compatible version:**

```bash
composer show <package> --available
```

Lists all available versions. Cross-reference with the package's PHP requirement to find the newest version that supports PHP 8.4.

**Check packagist.org:** Visit `https://packagist.org/packages/<vendor>/<package>` to view the full release history, PHP requirements per version, and abandonment notices.

**Test resolution without installing:**

```bash
composer update --dry-run
```

This reveals conflicts before making changes.

## Acorn 2.x to 4.x Migration Highlights

Acorn 4.x is a significant rewrite. Sites running Acorn 2.x (common in older Sage 10 setups) require careful migration.

### Namespace Changes

Acorn 4.x moves to `Roots\Acorn` as the primary namespace. Check all `use` statements and service provider references. Key changes:

- Application bootstrap class path changed
- Facade references may need updating
- Helper function availability differs

### Service Provider Patterns

- Service providers must extend `Illuminate\Support\ServiceProvider` (or `Roots\Acorn\ServiceProvider`)
- The `boot()` and `register()` method signatures must match the parent
- Deferred providers use a different registration mechanism

### Config File Changes

- Config files move to `config/` in the theme root
- `app.php` config structure changed (providers list, aliases)
- Cache and view paths may need reconfiguration

### Boot Process Changes

- `\Roots\bootloader()` replaces the old `\Roots\Acorn\bootloader()` call
- The bootloader is typically called in `functions.php` or via mu-plugin
- Initialization timing relative to WordPress hooks changed

### Asset Management Changes

- Acorn 4.x integrates differently with Bud/Mix
- `asset()` helper behavior may differ
- Manifest file location and format may change

## Warning: dev-trunk Pinning

Older Bedrock sites commonly pin wpackagist plugins to `dev-trunk`:

```json
{
  "require": {
    "wpackagist-plugin/wordpress-seo": "dev-trunk",
    "wpackagist-plugin/amazon-s3-and-cloudfront": "dev-trunk"
  }
}
```

### Why This Is a Problem

- **No version locking**: `dev-trunk` tracks the latest WordPress.org SVN trunk, so `composer update` can pull any version at any time.
- **Incompatible updates**: A plugin update may drop PHP 7.4 support or introduce breaking changes without warning.
- **Non-reproducible builds**: Two installs of the same `composer.lock` at different times can produce different plugin versions if the lock is regenerated.

### How to Fix

Pin to specific version tags instead:

```json
{
  "require": {
    "wpackagist-plugin/wordpress-seo": "^23.0",
    "wpackagist-plugin/amazon-s3-and-cloudfront": "^3.2"
  }
}
```

Check available versions at `https://wpackagist.org/` or via `composer show wpackagist-plugin/<name> --available`.

## Composer Strategy for PHP Version Upgrade

### Step 1: Update Platform PHP Version

Set the target PHP version in `composer.json` so Composer resolves dependencies as if running on PHP 8.4:

```json
{
  "config": {
    "platform": {
      "php": "8.4.0"
    }
  }
}
```

This does not change the actual PHP runtime. It tells Composer to only allow packages compatible with PHP 8.4.

### Step 2: Update the PHP Requirement

In the project's `require` section:

```json
{
  "require": {
    "php": ">=8.4"
  }
}
```

### Step 3: Resolve Conflicts

Run `composer update` and work through failures:

```bash
# See what would change
composer update --dry-run 2>&1

# Update one package at a time to isolate issues
composer update roots/wordpress --with-dependencies
composer update roots/acorn --with-dependencies
```

### Common Conflict Resolution Patterns

**Package requires older PHP:**

```
Problem: roots/acorn 2.0.0 requires php ^7.4
```

Fix: upgrade the package to a version that supports PHP 8.4.

**Package has no PHP 8.4 compatible release:**

Options:
1. Find a maintained fork
2. Patch the package (using `composer-patches` plugin)
3. Replace with an alternative package
4. Remove the dependency if no longer needed

**Transitive dependency conflict:**

```bash
# Show why a package is installed and what depends on it
composer why <package>
composer why-not <package> <version>
```

### Recommended Order of Operations

1. Update `config.platform.php` to `8.4.0`
2. Pin any `dev-trunk` dependencies to specific versions
3. Update `roots/wordpress` to 6.7+
4. Update `roots/acorn` (the most complex change)
5. Update remaining Roots packages
6. Update third-party plugins and libraries
7. Run `composer update` and resolve remaining conflicts
8. Run the full test suite under PHP 8.4
