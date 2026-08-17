---
"@kubb/plugin-axios": patch
"@kubb/plugin-fetch": patch
"@kubb/plugin-redoc": patch
"@kubb/plugin-swr": patch
---

Drop the unused internal utils devDependency flagged by knip. None of these packages import from it, they use the shared internals package, `ast`, or their own `utils.ts` instead. Runtime behavior is unchanged.
