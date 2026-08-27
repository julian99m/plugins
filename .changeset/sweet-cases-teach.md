---
"@kubb/plugin-fetch": patch
"@kubb/plugin-axios": patch
---

A request body containing a `format: int64` field threw `TypeError: Do not know how to serialize a BigInt` before the call left the client, because `defaultBodySerializer` passed the body to a bare `JSON.stringify`. Bigints now serialize as JSON numbers.

A value past `Number.MAX_SAFE_INTEGER` still throws, now with a message naming the cause, rather than going out silently truncated. Register a `serializer.body` or a per-content-type codec to send those.
