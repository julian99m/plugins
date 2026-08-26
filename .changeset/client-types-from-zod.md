---
'@kubb/plugin-fetch': minor
'@kubb/plugin-axios': minor
'@kubb/plugin-zod': minor
---

Source operation types from `pluginZod({ inferred: true })` when `pluginTs` is not in the pipeline. `pluginFetch` and `pluginAxios` previously generated nothing for an operation without `pluginTs`, since both generators looked up its `Options` and `Responses` types unconditionally. They now fall back to the zod plugin's inferred types, so a client built on zod codecs is typed by what the codecs decode to (a `Temporal` instance, a `Date`) instead of the raw wire type:

```ts
export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginZod({ inferred: true, output: { path: 'schemas', mode: 'directory' } }),
    pluginFetch({ validator: 'zod', output: { path: 'fetcher.ts' } }),
  ],
})
```

`pluginTs` still wins whenever it is present, so existing configs generate the same types as before. To support this, `pluginZod({ inferred: true })` now also emits the per-status `<operation>ResponsesSchema` and its inferred type, alongside the `<operation>OptionsSchema` it already emitted. Both are built from the same shared schemas as the `plugin-ts` equivalents, so the two paths stay in lockstep.
