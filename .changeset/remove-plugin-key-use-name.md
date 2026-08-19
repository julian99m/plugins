---
"@kubb/plugin-ts": major
"@kubb/plugin-faker": major
"@kubb/plugin-zod": major
"@kubb/plugin-msw": major
"@kubb/plugin-react-query": major
"@kubb/plugin-vue-query": major
"@kubb/plugin-cypress": major
"@kubb/plugin-mcp": major
---

**Breaking:** Remove `pluginKey` in favor of `pluginName`. Each plugin can now only be used once. Duplicate plugins throw an error.
