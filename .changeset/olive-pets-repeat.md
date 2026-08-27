---
'@kubb/plugin-zod': minor
---

A `printer.nodes` handler that reads `this.options.direction` now generates an `${name}InputSchema` variant automatically, `$ref` request bodies included.

Such a handler used to only change how a node printed. The generator never learned the schema carried a conversion, so no input variant was emitted and a `$ref` request body kept the decode direction. It now runs the handler for both directions and compares, so nothing extra needs registering.

```ts
pluginZod({
  printer: {
    nodes: {
      time() {
        return this.options.direction === 'encode'
          ? 'z.instanceof(Temporal.PlainTime).transform((value) => value.toString())'
          : 'z.iso.time().transform((value) => Temporal.PlainTime.from(value))'
      },
    },
  },
})
```

The built-in `date` conversion (`dateType: 'date'`) is now an ordinary handler on that same map, so overriding `printer.nodes.date` replaces it like any other override.

`direction` also changes values, from `'input' | 'output'` to `'encode' | 'decode'`. The old pair collided with Zod's own `z.input` and `z.output`, and read inverted against them: the schema built at `direction: 'output'` is the one whose `z.input` is the wire type. The new values name the conversion instead, matching `z.codec(a, b, { decode, encode })`. Replace `'input'` with `'encode'` and `'output'` with `'decode'` in any `printer.nodes` handler that reads it.
