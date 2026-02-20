# Bedrock Project Scaffolding

Reference for creating a new Bedrock project from a classic WordPress site.

## Create Bedrock Project

```bash
composer create-project roots/bedrock <site-path>-bedrock
```

## Directory Structure

```
<project>/
├── config/
│   ├── application.php          # Main config (DB, salts, env vars)
│   └── environments/
│       ├── development.php
│       ├── staging.php
│       └── production.php
├── web/
│   ├── app/
│   │   ├── mu-plugins/          # Must-use plugins
│   │   ├── plugins/             # Regular plugins
│   │   ├── themes/              # Themes (Sage goes here)
│   │   └── uploads/             # Media uploads
│   ├── wp/                      # WordPress core (Composer-managed)
│   ├── index.php
│   └── wp-config.php            # Bedrock's WP config loader
├── vendor/
├── .env                         # Environment variables
├── .env.example
├── composer.json
└── wp-cli.yml
```

## .env Template

All environment variables that Bedrock uses:

```env
DB_NAME='database_name'
DB_USER='database_user'
DB_PASSWORD='database_password'
DB_HOST='localhost'
DB_PREFIX='wp_'

WP_ENV='development'
WP_HOME='https://example.com'
WP_SITEURL="${WP_HOME}/wp"

# Salts (generate at https://roots.io/salts.html)
AUTH_KEY='generateme'
SECURE_AUTH_KEY='generateme'
LOGGED_IN_KEY='generateme'
NONCE_KEY='generateme'
AUTH_SALT='generateme'
SECURE_AUTH_SALT='generateme'
LOGGED_IN_SALT='generateme'
NONCE_SALT='generateme'
```

## composer.json Configuration

### Set PHP Version

```json
{
  "require": {
    "php": ">=8.2"
  },
  "config": {
    "platform": {
      "php": "8.4"
    }
  }
}
```

### ACF Pro via Composer

**Option A: Roots ACF Pro Composer bridge**

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://pivot.roots.io/"
    }
  ],
  "require": {
    "wpengine/advanced-custom-fields-pro": "^6.0"
  }
}
```

Requires setting `ACF_PRO_KEY` in `.env` and adding to auth.json.

**Option B: Copy plugin directory**

If the classic theme has ACF Pro as a plugin, copy it to `web/app/plugins/advanced-custom-fields-pro/`.
Not recommended long-term but works for initial migration.

**Option C: Satispress**

Use a Satispress instance to serve ACF Pro as a Composer package from your own server.

### wpackagist Plugins

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://wpackagist.org",
      "only": ["wpackagist-plugin/*", "wpackagist-theme/*"]
    }
  ],
  "require": {
    "wpackagist-plugin/wordpress-seo": "^23.0",
    "wpackagist-plugin/contact-form-7": "^6.0"
  }
}
```

Pin to specific version ranges, never use `dev-trunk`.

## Migration from Classic Site

### Database
- Export database from classic site
- Import into Bedrock's database
- Run search-replace for URL changes:
  ```bash
  wp search-replace 'https://old-url.com' 'https://new-url.com' --all-tables
  wp search-replace '/wp-content/themes/theme-name/' '/app/themes/theme-name/' --all-tables
  ```

### Uploads
- Copy `wp-content/uploads/` → `web/app/uploads/`

### Plugins
- Install each plugin via Composer where possible
- Copy remaining plugins to `web/app/plugins/`
- Document which plugins are Composer-managed vs manual

### Verification
```bash
composer install
# Verify .env is configured
# Verify database connection
wp db check
```
