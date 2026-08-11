---
"@kubb/plugin-ts": minor
"@kubb/plugin-axios": minor
"@kubb/plugin-fetch": minor
---

Generated JSDoc now keeps only the first sentence of each OpenAPI `description`. On a large spec this is where the bytes are: descriptions make up a third of what Kubb writes, and most of them are several paragraphs of prose that repeat what the type signature already says. Set `comments: 'full'` to restore the old output exactly.

The new `comments` option takes three values:

- `'brief'` (default) shortens `@description` to its opening sentence, capped at 120 characters. Every other tag is kept, so every type stays documented. Abbreviations like `e.g.` and open brackets are not treated as sentence ends.
- `'full'` emits every description in full, however many paragraphs the spec carries.
- `'none'` emits no JSDoc at all. The generated-by file banner is unaffected.

```ts
pluginTs({ comments: 'full' })
```

Measured on the OpenAI spec (281 operations), where the default trims 199 KB and `'none'` trims 1.03 MB of a 2.76 MB output.
