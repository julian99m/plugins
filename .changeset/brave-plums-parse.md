---
"@kubb/plugin-fetch": patch
"@kubb/plugin-axios": patch
---

Response bodies with a `format: int64` field no longer lose precision before validation. `JSON.parse` always rounds an integer past `Number.MAX_SAFE_INTEGER` to the nearest representable `number`, so even after #797 coerced the field to `z.coerce.bigint()`, the value was already wrong by the time Zod saw it. Both clients now parse the response body with a bigint-safe `parseJson`, which reads an out-of-range integer literal straight into a `bigint` instead of through the lossy intermediate `number`. Ordinary payloads keep going through the native `JSON.parse` fast path.
