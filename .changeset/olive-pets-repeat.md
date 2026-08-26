---
'@kubb/plugin-zod': minor
---

Add a `codecs` option for registering a conversion on a schema node whose runtime type differs from its wire type, such as a `time` field carried as an ISO string but modeled as a `Temporal.PlainTime`. Responses print the codec's `decode` side and request bodies its `encode` side, including when the body is a `$ref`.

A `printer.nodes` handler could already change how such a node prints, but only that. The generator never learned the schema carried a conversion, so no `${name}InputSchema` variant was emitted and a `$ref` request body kept the decode direction. Registering a codec is what supplies that missing signal.

Codecs are checked before the built-in date codec, so registering one for `date` replaces it. The `Codec` type is now exported.

```ts
pluginZod({
  codecs: [
    {
      matches: (node) => node.type === 'time',
      decode: () => 'z.iso.time().transform((value) => Temporal.PlainTime.from(value))',
      encode: () => 'z.instanceof(Temporal.PlainTime).transform((value) => value.toString())',
    },
  ],
})
```
