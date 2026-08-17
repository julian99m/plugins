---
"@kubb/plugin-axios": major
"@kubb/plugin-cypress": major
"@kubb/plugin-faker": major
"@kubb/plugin-fetch": major
"@kubb/plugin-mcp": major
"@kubb/plugin-msw": major
"@kubb/plugin-react-query": major
"@kubb/plugin-redoc": major
"@kubb/plugin-swr": major
"@kubb/plugin-ts": major
"@kubb/plugin-vue-query": major
"@kubb/plugin-zod": major
---

Depend on `kubb` instead of `@kubb/core` and `@kubb/renderer-jsx` directly. Every plugin's `peerDependencies` now list a single `kubb` entry. This matches the `kubb-labs/kubb` `5.0.0-beta.81` release, which adds `kubb/kit` and `kubb/jsx` subpaths that re-export the plugin authoring API (`kubb/kit` includes the `ast` namespace, so there's no separate `kubb/ast` subpath).

If you install a plugin directly (rather than only through `kubb`), update its peer to `kubb` and drop any standalone `@kubb/core` or `@kubb/renderer-jsx` install:

```diff
- pnpm add @kubb/core @kubb/renderer-jsx
+ pnpm add kubb
```

Custom generators and plugins that build on these packages' internals should follow the same
`@kubb/core` → `kubb/kit` and `@kubb/renderer-jsx` → `kubb/jsx` mapping. The `ast` namespace
(previously `@kubb/ast`) is reached as a named export off `kubb/kit` rather than its own subpath.
`@kubb/parser-ts` (used by `plugin-ts`) and `@kubb/adapter-oas` (used by `plugin-redoc`, and for
the `AdapterOas` type in `plugin-zod`) are unaffected and stay direct dependencies.
