---
"@kubb/plugin-react-query": patch
"@kubb/plugin-vue-query": patch
"@kubb/plugin-cypress": patch
"@kubb/plugin-faker": patch
"@kubb/plugin-axios": patch
"@kubb/plugin-fetch": patch
"@kubb/plugin-redoc": patch
"@kubb/plugin-swr": patch
"@kubb/plugin-mcp": patch
"@kubb/plugin-msw": patch
"@kubb/plugin-ts": patch
"@kubb/plugin-zod": patch
---

Plugins now declare their `kubb` peer dependency as a range (`^5.0.0-beta.104`) instead of a single pinned version, and depend on each other through a range as well. A pinned peer made `npm install` fail with `ERESOLVE` whenever the installed `kubb` was a newer release than the one the plugin was published against, which is what `kubb init` hits when it resolves the `kubb` and plugin dist-tags separately.
