---
"@kubb/plugin-react-query": major
"@kubb/plugin-vue-query": major
---

Add `hooks` option and change the default to `false` for both `pluginReactQuery` and `pluginVueQuery`.

`hooks: false` (the new default) emits only `queryOptions`, `mutationOptions`, `queryKey`, and `mutationKey` helpers. The `useQuery`, `useInfiniteQuery`, `useSuspenseQuery`, `useSuspenseInfiniteQuery`, and `useMutation` functions are not generated. The factory functions (`queryOptions`, `infiniteQueryOptions`, `mutationOptions`) work across all TanStack Query adapters.

Set `hooks: true` to restore the previous behavior and generate `use*` hook/composable functions alongside the helpers.

```ts
// generate queryOptions/mutationOptions/key factories only (new default)
pluginReactQuery({ output: { path: 'queries' } })

// generate use* hooks as well (opt-in)
pluginReactQuery({ output: { path: 'hooks' }, hooks: true })
```

`pluginReactQuery`'s `suspense` option also now defaults to `false` instead of `{}`, matching `infinite`'s existing off-by-default convention, so leaving `suspense` unset generates no suspense boilerplate.

**Breaking change:** existing configs that rely on generated `use*` hooks must add `hooks: true`. A config that sets `suspense` or `infinite` while leaving `hooks` at its default no longer emits `<op>SuspenseQueryOptions`, `<op>SuspenseInfiniteQueryOptions`, or `<op>InfiniteQueryOptions` (and their query key exports). Set `hooks: true` to keep generating them, and pass `suspense: {}` explicitly to opt back into suspense query generation.
