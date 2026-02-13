# PHP Breaking Changes Reference (7.4 → 8.4)

Comprehensive reference for automated migration tooling. Each entry includes detection patterns and fix patterns.

---

## PHP 8.0

### String Functions Reject Null Arguments

**Impact:** TypeError (was silently accepted)
**Affected functions:** `strlen`, `strpos`, `substr`, `str_contains`, `str_replace`, `strtolower`, `strtoupper`, `trim`, `ltrim`, `rtrim`, `explode`, `implode`, `sprintf`, `str_pad`, `str_repeat`, `str_word_count`, `str_split`, `nl2br`, `ucfirst`, `lcfirst`, `ucwords`, `wordwrap`, `number_format`, `htmlspecialchars`, `htmlentities`, `strip_tags`, `preg_match`, `preg_replace`, `preg_split`
**Error type:** TypeError
**Detection:** `grep -rPn '(strlen|strpos|substr|str_contains|str_replace|strtolower|strtoupper|trim|ltrim|rtrim|explode|implode|sprintf|str_pad|str_repeat|str_word_count|str_split|nl2br|ucfirst|lcfirst|ucwords|wordwrap|number_format|htmlspecialchars|htmlentities|strip_tags|preg_match|preg_replace|preg_split)\s*\(' --include='*.php' --include='*.blade.php'`
**Note:** Requires static analysis or runtime checks to confirm null is actually passed. Look for variables that may be null (e.g., from `get_field()`, database queries, optional parameters, uninitialized properties). In Sage sites, the most common pattern is indirect: `get_field()` in a block's `with()` method returns null, which is passed to a Blade template variable, which is then used in a string function.
**Fix:**
```php
// Before
$len = strlen($value);
$pos = strpos($haystack, $needle);
$lower = strtolower($name);

// After
$len = strlen($value ?? '');
$pos = strpos($haystack ?? '', $needle ?? '');
$lower = strtolower($name ?? '');
```

### String Concatenation with Null

**Impact:** Deprecation notice (PHP 8.1+), potential TypeError in future versions
**Error type:** Deprecated
**Detection:** `grep -rPn '\.\s*\$' --include='*.php' --include='*.blade.php'`
**Note:** The `.` concatenation operator with null arguments produces a deprecation notice in PHP 8.1+. Commonly occurs when `get_field()` or `get_sub_field()` returns null and is concatenated into HTML strings.
**Fix:**
```php
// Before
$html = '<div>' . $description . '</div>';
$output .= get_field('suffix');

// After
$html = '<div>' . ($description ?? '') . '</div>';
$output .= (get_field('suffix') ?? '');
```

### foreach on Nullable Return Values

**Impact:** TypeError when iterating null
**Error type:** TypeError
**Detection:** `grep -rPn 'foreach\s*\(\s*(get_field|get_sub_field|get_post_meta|get_option)\s*\(' --include='*.php' --include='*.blade.php'`
**Note:** Functions like `get_field()` for repeater/relationship fields return null when empty, not an empty array. Passing null to foreach causes a TypeError.
**Fix:**
```php
// Before
foreach (get_field('items') as $item) {}
foreach (get_field('items', $post_id) as $item) {}

// After
foreach (get_field('items') ?: [] as $item) {}
foreach (get_field('items', $post_id) ?: [] as $item) {}
```

### array_key_exists() No Longer Works on Objects

**Impact:** Fatal error
**Error type:** TypeError
**Detection:** `grep -rPn 'array_key_exists\s*\(' --include='*.php'`
**Note:** Requires context analysis to determine if second argument could be an object.
**Fix:**
```php
// Before
if (array_key_exists('key', $object)) {}

// After
if (property_exists($object, 'key')) {}
// Or if the variable could be either array or object:
if (is_array($var) ? array_key_exists('key', $var) : property_exists($var, 'key')) {}
```

### create_function() Removed

**Impact:** Removed (was deprecated in 7.2)
**Error type:** Fatal error
**Detection:** `grep -rPn 'create_function\s*\(' --include='*.php'`
**Fix:**
```php
// Before
$callback = create_function('$a, $b', 'return $a + $b;');

// After
$callback = function ($a, $b) { return $a + $b; };
// Or with arrow function:
$callback = fn($a, $b) => $a + $b;
```

### Stricter Type Coercion for Internal Functions

**Impact:** TypeError for invalid type coercions
**Error type:** TypeError
**Detection:** `grep -rPn '(array_fill|array_chunk|array_slice|array_splice|array_pad|array_rand|str_repeat|str_pad|substr_count|substr_replace|str_word_count|strcmp|strncmp|substr_compare)\s*\(' --include='*.php'`
**Note:** In PHP 8.0, internal functions now throw TypeError when arguments of wrong type are passed instead of silently coercing. Requires analysis of argument types.
**Fix:**
```php
// Before
strlen(123);          // was silently coerced to "123"
array_fill(0, "3", "x"); // "3" coerced to 3

// After
strlen((string) 123);
array_fill(0, 3, "x");
```

### match() is Now a Reserved Keyword

**Impact:** Fatal error if used as function/method name
**Error type:** Fatal error
**Detection:** `grep -rPn 'function\s+match\s*\(' --include='*.php'`
**Fix:**
```php
// Before
function match($pattern, $subject) {}

// After - rename the function
function matchPattern($pattern, $subject) {}
```

### Named Arguments for Internal Functions

**Impact:** Renamed parameters in internal functions can break named argument calls
**Error type:** Fatal error (Unknown named parameter)
**Detection:** `grep -rPn '\w+\s*\(\s*\w+\s*:' --include='*.php'`
**Note:** Only relevant if code uses named arguments with internal PHP functions.
**Fix:**
```php
// Before (if parameter was renamed in PHP 8.0)
array_slice(array: $arr, offset: 0);

// After - use updated parameter names per PHP 8.0 docs
array_slice(array: $arr, offset: 0);
```

### Union Types Added (Keyword Conflicts)

**Impact:** `false`, `null`, `mixed` are now reserved type names
**Error type:** Fatal error
**Detection:** `grep -rPn 'class\s+(false|null|mixed)\b' --include='*.php'`
**Fix:**
```php
// Before
class Null {}
class False {}

// After - rename classes
class NullValue {}
class FalseValue {}
```

---

## PHP 8.1

### Implicit Float-to-Int Conversions Deprecated

**Impact:** Deprecated (will be removed)
**Error type:** Deprecated
**Detection:** `grep -rPn '\$\w+\s*\[\s*\d+\.\d+\s*\]' --include='*.php'`
**Note:** Difficult to detect statically. Occurs when a float without fractional part is used where int is expected (e.g., array offsets, bitwise operations).
**Fix:**
```php
// Before
$array[1.0] = 'value';
$result = 8.0 >> 1;

// After
$array[(int) 1.0] = 'value';
$result = 8 >> 1;
```

### $GLOBALS Usage Restrictions

**Impact:** Cannot write to `$GLOBALS` as a whole
**Error type:** Fatal error
**Detection:** `grep -rPn '\$GLOBALS\s*=' --include='*.php'`
**Note:** Individual element access (`$GLOBALS['key'] = val`) still works. Only assignment to the whole `$GLOBALS` variable is restricted.
**Fix:**
```php
// Before
$GLOBALS = [];
$GLOBALS = array_filter($GLOBALS, $callback);
$copy = $GLOBALS; // read-only copy still works

// After - manipulate individual keys instead
foreach (array_keys($GLOBALS) as $key) {
    unset($GLOBALS[$key]);
}
```

### Null to Non-Nullable Internal Function Parameter Deprecated

**Impact:** Deprecated (will become TypeError)
**Error type:** Deprecated
**Detection:** `grep -rPn '(htmlspecialchars|htmlentities|html_entity_decode|htmlspecialchars_decode|strip_tags|mb_strtolower|mb_strtoupper|mb_convert_case|mb_detect_encoding|mb_strlen|mb_substr|mb_strpos)\s*\(' --include='*.php'`
**Note:** This affects all internal functions receiving null for non-nullable parameters. Detection requires runtime analysis or type inference.
**Fix:**
```php
// Before
htmlspecialchars($maybeNull);
mb_strtolower($maybeNull);

// After
htmlspecialchars($maybeNull ?? '');
mb_strtolower($maybeNull ?? '');
```

### Enum Keyword Reserved

**Impact:** Cannot use `enum` as class/interface/trait name
**Error type:** Fatal error
**Detection:** `grep -rPn '(class|interface|trait)\s+enum\b' --include='*.php'`
**Fix:**
```php
// Before
class Enum {}
interface Enum {}

// After
class EnumBase {}
interface EnumInterface {}
```

### Fibers Added (Minor Conflicts)

**Impact:** `Fiber` is now a reserved class name
**Error type:** Fatal error
**Detection:** `grep -rPn 'class\s+Fiber\b' --include='*.php'`
**Fix:**
```php
// Before
class Fiber {}

// After
class FiberWrapper {}
```

### Return Type Declarations for Built-in Methods

**Impact:** Classes extending internal classes must declare compatible return types
**Error type:** Deprecated
**Detection:** `grep -rPn 'class\s+\w+\s+extends\s+(ArrayObject|Countable|Iterator|IteratorAggregate|Serializable|SessionHandler|SplHeap|SplPriorityQueue|SplFixedArray|SplStack|SplQueue)' --include='*.php'`
**Note:** Overridden methods in child classes must add return type declarations.
**Fix:**
```php
// Before
class MyIterator extends ArrayIterator {
    public function current() { return parent::current(); }
}

// After
class MyIterator extends ArrayIterator {
    public function current(): mixed { return parent::current(); }
}
```

---

## PHP 8.2

### Dynamic Properties Deprecated

**Impact:** Deprecated (will be removed in PHP 9.0)
**Error type:** Deprecated
**Detection:** `grep -rPn '^\s*class\s+\w+' --include='*.php'`
**Note:** Requires analysis to determine if a class uses dynamic properties without `#[\AllowDynamicProperties]` or `__get`/`__set`. Classes extending `stdClass` are exempt.
**Fix:**
```php
// Before
class User {
    public string $name;
}
$user = new User();
$user->age = 25; // dynamic property - deprecated

// After (option 1: declare the property)
class User {
    public string $name;
    public int $age;
}

// After (option 2: allow dynamic properties)
#[\AllowDynamicProperties]
class User {
    public string $name;
}

// After (option 3: use a container)
class User {
    public string $name;
    private array $attributes = [];
    public function __get(string $name): mixed { return $this->attributes[$name] ?? null; }
    public function __set(string $name, mixed $value): void { $this->attributes[$name] = $value; }
}
```

### utf8_encode() and utf8_decode() Deprecated

**Impact:** Deprecated (removed in 8.3+)
**Error type:** Deprecated
**Detection:** `grep -rPn '(utf8_encode|utf8_decode)\s*\(' --include='*.php'`
**Fix:**
```php
// Before
$encoded = utf8_encode($string);
$decoded = utf8_decode($string);

// After
$encoded = mb_convert_encoding($string, 'UTF-8', 'ISO-8859-1');
$decoded = mb_convert_encoding($string, 'ISO-8859-1', 'UTF-8');
```

### ${var} String Interpolation Deprecated

**Impact:** Deprecated
**Error type:** Deprecated
**Detection:** `grep -rPn '"\$\{[^}]+\}"' --include='*.php'`
**Fix:**
```php
// Before
$str = "Hello ${name}";
$str = "Value ${obj->prop}";
$str = "${$varName}";

// After
$str = "Hello {$name}";
$str = "Value {$obj->prop}";
$str = "{$$varName}";
```

### Partially Supported Callables Deprecated

**Impact:** Deprecated
**Error type:** Deprecated
**Detection:** `grep -rPn '(call_user_func|call_user_func_array|is_callable|array_map|array_filter|array_walk|usort|uasort|uksort)\s*\(\s*["\x27](self|parent|static)::' --include='*.php'`
**Additional detection:** `grep -rPn '"[a-zA-Z_]+::[a-zA-Z_]+"' --include='*.php'`
**Note:** Callables like `"self::method"`, `"parent::method"`, `"static::method"`, `"ClassName::method"` (as strings), and `[$this, 'parent::method']` are deprecated.
**Fix:**
```php
// Before
$cb = "self::method";
$cb = "ClassName::staticMethod";
call_user_func("self::method");
array_map("static::transform", $items);

// After
$cb = self::method(...);
$cb = ClassName::staticMethod(...);
call_user_func(self::method(...));
array_map(static::transform(...), $items);
// Or use Closure::fromCallable()
$cb = Closure::fromCallable([self::class, 'method']);
```

### Read-Only Classes

**Impact:** `readonly` is now a class modifier keyword
**Error type:** Fatal error
**Detection:** `grep -rPn '(class|interface|trait)\s+readonly\b' --include='*.php'`
**Fix:**
```php
// Before
class readonly {}

// After
class ReadOnly {} // rename
```

### Null/False/True as Standalone Types

**Impact:** `null`, `false`, `true` cannot be used as class names
**Error type:** Fatal error
**Detection:** `grep -rPn 'class\s+(null|false|true)\b' -i --include='*.php'`
**Fix:**
```php
// Before
class True {}
class Null {}

// After
class TrueValue {}
class NullValue {}
```

---

## PHP 8.3

### array_sum() and array_product() Behavior Change

**Impact:** Emits E_WARNING for non-numeric values
**Error type:** Warning (behavior change)
**Detection:** `grep -rPn '(array_sum|array_product)\s*\(' --include='*.php'`
**Note:** Previously silently ignored non-numeric values. Now emits warnings. Requires runtime analysis to confirm non-numeric values are passed.
**Fix:**
```php
// Before
$total = array_sum($mixedArray); // silently skipped non-numeric

// After
$total = array_sum(array_filter($mixedArray, 'is_numeric'));
// Or explicitly cast
$total = array_sum(array_map('intval', $mixedArray));
```

### unserialize() Emits Deprecation for Incomplete Classes

**Impact:** Deprecated when class is not available
**Error type:** Deprecated
**Detection:** `grep -rPn 'unserialize\s*\(' --include='*.php'`
**Note:** When `unserialize()` encounters a class that is not loaded/available, it now emits a deprecation notice for `__PHP_Incomplete_Class`.
**Fix:**
```php
// Before
$obj = unserialize($data);

// After - ensure classes are autoloaded or specify allowed_classes
$obj = unserialize($data, ['allowed_classes' => [MyClass::class, OtherClass::class]]);
// Or if you need all classes:
$obj = unserialize($data, ['allowed_classes' => true]);
```

### json_validate() Added

**Impact:** New function, potential name collision
**Error type:** Fatal error (if user-defined function with same name exists)
**Detection:** `grep -rPn 'function\s+json_validate\s*\(' --include='*.php'`
**Fix:**
```php
// Before
function json_validate(string $json): bool {
    json_decode($json);
    return json_last_error() === JSON_ERROR_NONE;
}

// After - remove custom implementation or namespace it
// The built-in json_validate() is available in PHP 8.3+
// Remove the function or wrap in a version check:
if (!function_exists('json_validate')) {
    function json_validate(string $json): bool {
        json_decode($json);
        return json_last_error() === JSON_ERROR_NONE;
    }
}
```

### Deprecate Calling get_class()/get_parent_class() Without Arguments

**Impact:** Deprecated
**Error type:** Deprecated
**Detection:** `grep -rPn '(get_class|get_parent_class)\s*\(\s*\)' --include='*.php'`
**Fix:**
```php
// Before
class Foo {
    public function getType(): string {
        return get_class();
    }
    public function getParentType(): string {
        return get_parent_class();
    }
}

// After
class Foo {
    public function getType(): string {
        return get_class($this);
        // Or better: use static::class
        return static::class;
    }
    public function getParentType(): string {
        return get_parent_class($this);
    }
}
```

### Readonly Property Re-initialization in clone

**Impact:** Now allowed in `__clone()`
**Error type:** N/A (relaxation of restriction)
**Note:** This is not a breaking change but a feature. Previously readonly properties could not be modified in `__clone()`.

---

## PHP 8.4

### Implicit Nullable Parameter Declarations Deprecated

**Impact:** Deprecated (will be removed in PHP 9.0)
**Error type:** Deprecated
**Detection:** `grep -rPn 'function\s+\w+\s*\([^)]*\b(string|int|float|bool|array|object|callable|iterable|self|parent|static|mixed|\??\w+(\\\w+)*)\s+\$\w+\s*=\s*null' --include='*.php'`
**Note:** When a typed parameter has `= null` default without an explicit `?` prefix, it was implicitly made nullable. This is now deprecated.
**Fix:**
```php
// Before
function foo(string $bar = null) {}
function process(array $items = null, int $limit = null) {}
function handle(MyClass $obj = null) {}

// After
function foo(?string $bar = null) {}
function process(?array $items = null, ?int $limit = null) {}
function handle(?MyClass $obj = null) {}
```

### E_STRICT Constant Deprecated

**Impact:** Deprecated
**Error type:** Deprecated
**Detection:** `grep -rPn 'E_STRICT' --include='*.php'`
**Fix:**
```php
// Before
error_reporting(E_ALL & ~E_STRICT);
if ($errno === E_STRICT) { /* ... */ }

// After
error_reporting(E_ALL);
// E_STRICT is no longer emitted, remove references to it
// Remove E_STRICT checks from custom error handlers
```

### exit() and die() Behavior Changes

**Impact:** `exit` and `die` are now proper functions
**Error type:** Behavior change
**Detection:** `grep -rPn '\b(exit|die)\s*\(' --include='*.php'`
**Note:** `exit()` and `die()` are now proper functions rather than language constructs. They can now be called with named arguments (`exit(status: 1)`), passed as callbacks, and follow standard function calling conventions. This can affect code that relied on the old language-construct behavior.
**Fix:**
```php
// Before - these edge cases may break:
$fn = 'exit';
$fn();  // was a language construct, couldn't be used this way

// After - now works as a regular function
$fn = 'exit';
$fn();  // works in PHP 8.4

// Note: most common exit()/die() usage is unaffected
// Watch for custom error handlers or functions named exit/die
```

### round() Behavior Changes

**Impact:** More IEEE 754 compliant rounding
**Error type:** Behavior change (potential value differences)
**Detection:** `grep -rPn '\bround\s*\(' --include='*.php'`
**Note:** `round()` now follows IEEE 754 rounding rules more strictly. The banker's rounding mode (`PHP_ROUND_HALF_EVEN`) and general edge cases around .5 values may produce different results.
**Fix:**
```php
// Before - might get different results in edge cases
round(2.5);  // was 3, still 3 in most cases
round(0.55, 1);  // potential difference in edge cases

// After - verify critical rounding operations
// If exact banker's rounding is needed:
round($value, 0, PHP_ROUND_HALF_UP); // explicit mode
// Test financial calculations after upgrade
```

### strtolower() and strtoupper() No Longer Locale-Sensitive

**Impact:** Behavior change
**Error type:** Behavior change
**Detection:** `grep -rPn '(strtolower|strtoupper)\s*\(' --include='*.php'`
**Note:** `strtolower()` and `strtoupper()` now always perform ASCII case conversion regardless of the locale setting. For locale-aware conversion, use `mb_strtolower()`/`mb_strtoupper()`.
**Fix:**
```php
// Before - locale-sensitive
setlocale(LC_ALL, 'tr_TR.UTF-8');
echo strtolower('I'); // was 'ı' (Turkish dotless i)

// After - always ASCII
setlocale(LC_ALL, 'tr_TR.UTF-8');
echo strtolower('I'); // now always 'i'

// If locale-sensitive behavior was needed:
echo mb_strtolower('I', 'UTF-8'); // use mb_ functions
```

### New `#[\Deprecated]` Attribute

**Impact:** `Deprecated` cannot be used as a class/attribute name
**Error type:** Fatal error (name collision)
**Detection:** `grep -rPn '(class|interface|trait)\s+Deprecated\b' --include='*.php'`
**Fix:**
```php
// Before
class Deprecated {}

// After
class DeprecatedMarker {}
```

### Property Hooks Added

**Impact:** New syntax may conflict with certain coding patterns
**Error type:** N/A (new feature)
**Note:** Not a breaking change per se, but the `get` and `set` keywords have new meaning in property context.

### Asymmetric Visibility

**Impact:** New syntax for different read/write visibility
**Error type:** N/A (new feature)
**Note:** Not a breaking change but `public private(set)` is new valid syntax.

---

## Quick Reference: Detection Commands

Run these commands to scan a codebase for common issues:

```bash
# PHP 8.0: create_function removal
grep -rPn 'create_function\s*\(' --include='*.php' --include='*.blade.php' .

# PHP 8.0: string functions with potentially null args (high false-positive rate — combine with context analysis)
grep -rPn '(strlen|strpos|strtolower|strtoupper|trim|substr)\s*\(' --include='*.php' --include='*.blade.php' .

# PHP 8.0: string concatenation with potentially null vars
grep -rPn '\.\s*\$' --include='*.php' --include='*.blade.php' .

# PHP 8.0: foreach on nullable return values (ACF/WP functions)
grep -rPn 'foreach\s*\(\s*(get_field|get_sub_field|get_post_meta|get_option)\s*\(' --include='*.php' --include='*.blade.php' .

# PHP 8.1: enum keyword conflict
grep -rPn '(class|interface|trait)\s+enum\b' --include='*.php' .

# PHP 8.2: utf8_encode/utf8_decode removal
grep -rPn '(utf8_encode|utf8_decode)\s*\(' --include='*.php' --include='*.blade.php' .

# PHP 8.2: ${var} interpolation
grep -rPn '"\$\{[^}]+\}"' --include='*.php' --include='*.blade.php' .

# PHP 8.2: dynamic properties (requires manual analysis of matched classes)
grep -rPn '^\s*class\s+\w+' --include='*.php' .

# PHP 8.3: get_class() without arguments
grep -rPn '(get_class|get_parent_class)\s*\(\s*\)' --include='*.php' .

# PHP 8.4: implicit nullable params
grep -rPn 'function\s+\w+\s*\([^)]*\b(string|int|float|bool|array|object|callable|iterable)\s+\$\w+\s*=\s*null' --include='*.php' .

# PHP 8.4: E_STRICT constant
grep -rPn 'E_STRICT' --include='*.php' .

# PHP 8.4: strtolower/strtoupper with locale dependency
grep -rPn 'setlocale.*LC_(ALL|CTYPE)' --include='*.php' .
```
