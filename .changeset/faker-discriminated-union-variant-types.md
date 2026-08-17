---
"@kubb/plugin-faker": patch
---

Fix `TS2322` errors in mocks generated for discriminated `oneOf` schemas (reported in kubb-labs/plugins#200).

Each union variant was annotated with the whole-union indexed-access type (`NonNullable<Union>["prop"]`), which TypeScript collapses to a single union member and rejects the other variants' values. The faker printer now narrows each variant to its own discriminated branch via `Extract<NonNullable<Union>, { "<discriminator>": "<value>" }>`. Undiscriminated unions of objects guard each indexed access with `(NonNullable<Union> & Record<"prop", unknown>)["prop"]` instead of leaking the whole-union index, so a key carried by only some variants resolves to `unknown` instead of erroring with `TS2339`.
