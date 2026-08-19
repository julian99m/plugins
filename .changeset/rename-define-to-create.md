---
"@kubb/plugin-ts": major
"@kubb/plugin-faker": major
"@kubb/plugin-zod": major
"@kubb/plugin-msw": major
"@kubb/plugin-react-query": major
"@kubb/plugin-vue-query": major
"@kubb/plugin-cypress": major
"@kubb/plugin-mcp": major
"@kubb/plugin-redoc": major
---

**Breaking:** Rename `defineAdapter` to `createAdapter` and `PluginManager` to `KubbDriver`. `definePlugin`, `defineGenerator`, and `defineConfig` are unchanged.

| Before | After |
|---|---|
| `defineAdapter` | `createAdapter` |
| `PluginManager` | `KubbDriver` |
| `pluginManager` (context property) | `driver` |
