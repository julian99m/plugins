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

**Breaking:** Rename factory functions from `define*` to `create*`, and rename `PluginManager` to `PluginDriver`. `defineConfig` is unchanged.

| Before | After |
|---|---|
| `definePlugin` | `createPlugin` |
| `defineAdapter` | `createAdapter` |
| `defineGenerator` | `createGenerator` |
| `PluginManager` | `PluginDriver` |
| `pluginManager` (context property) | `driver` |
| `usePluginManager` | `usePluginDriver` |
