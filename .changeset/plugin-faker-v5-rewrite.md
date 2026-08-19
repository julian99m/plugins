---
"@kubb/plugin-faker": major
---

Rewrite `@kubb/plugin-faker` for the v5 AST-based plugin architecture.

**Breaking changes:**
- Remove `contentType`, `dateType`, `unknownType`, and `emptySchemaType` options
- Replace `transformers: { name }` with `resolver`
- Replace `transformers` with `macros`
- Remove the `@kubb/plugin-oas` / `@kubb/oas` dependency and use `adapterOas()` in config instead

**New options and exports:**
- Add `resolver`, `printer`, and `macros`
- Export `resolverFaker` and `printerFaker`
