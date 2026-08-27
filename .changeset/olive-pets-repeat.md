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
        return this.options.direction === 'input'
          ? 'z.instanceof(Temporal.PlainTime).transform((value) => value.toString())'
          : 'z.iso.time().transform((value) => Temporal.PlainTime.from(value))'
      },
    },
  },
})
```

The built-in `date` conversion (`dateType: 'date'`) is now an ordinary handler on that same map, so overriding `printer.nodes.date` replaces it like any other override.
