---
"@kubb/plugin-react-query": patch
"@kubb/plugin-vue-query": patch
---

Fix declaration emit (`TS2527`/`TS2883`) for generated `*QueryOptions` and `*InfiniteQueryOptions` functions on `@tanstack/react-query` and `@tanstack/vue-query` >= 5.98.0.

Since 5.98.0, `queryOptions()`/`infiniteQueryOptions()` return types are branded with unexported unique symbols. Generated functions had no explicit return type, so `tsc` tried to infer and name that inaccessible type when emitting `.d.ts` files (`declaration: true` / `composite: true`), which fails. The generated functions now carry an explicit return type built from the exported public types (`UndefinedInitialDataOptions`/`UndefinedInitialQueryOptions`, `UndefinedInitialDataInfiniteOptions`, and `DataTag`), so declaration emit no longer needs to name the branded type.

The generated code now requires `@tanstack/react-query` / `@tanstack/vue-query` 5.62.0 or later, because `DataTag` only accepts an error type argument from that version on.
