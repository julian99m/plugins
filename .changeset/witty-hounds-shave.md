---
"@kubb/plugin-zod": patch
---

`format: int64` fields now print `z.coerce.bigint()` instead of `z.bigint()`. `JSON.parse` returns a `number` for those fields, so a plain `z.bigint()` failed at runtime for every response validated with `pluginFetch({ validator: 'zod' })`.
