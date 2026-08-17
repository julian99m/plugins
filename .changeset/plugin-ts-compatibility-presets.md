---
"@kubb/plugin-ts": major
---

**Breaking:** Replace the `legacy` option with `resolver`. The default now uses v5 naming conventions, and passing a `resolver` customizes naming instead. A resolver you pass overrides the base resolver from the preset.

**Breaking:** Remove several deprecated options in favor of `adapterOas(...)`:

| Removed | Replacement |
|---|---|
| `enumSuffix` | `adapterOas({ enumSuffix })` |
| `dateType` | `adapterOas({ dateType })` |
| `integerType` | `adapterOas({ integerType })` |
| `unknownType` | `adapterOas({ unknownType })` |
| `emptySchemaType` | `adapterOas({ emptySchemaType })` |
| `contentType` | `adapterOas({ contentType })` |
