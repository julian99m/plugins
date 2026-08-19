---
"@kubb/plugin-zod": major
---

Rewrite to v5 AST-based architecture. The plugin no longer depends on `@kubb/plugin-oas` or `@kubb/oas`.

**Breaking changes:**
- Remove `mapper`, `version`, `contentType` options
- Remove `transformers.name` and `transformers.schema` callbacks
- Move `integerType`, `emptySchemaType`, `unknownType` to `adapterOas(...)`
- Remove the `wrapOutput` option. Use a `printer.nodes` override and call `this.base(node)` to wrap the built-in output instead
- `coercion` accepts granular object `{ dates?, strings?, numbers? }` in addition to `boolean`

**New options:**
- `resolver`, `printer`, `macros`

**New exports:** `resolverZod`, `printerZod`, `printerZodMini`
