---
'@kubb/plugin-zod': minor
---

`printer.nodes` handlers that read `this.options.direction` now generate an `${name}InputSchema` variant automatically, including when the body is a `$ref`.

Before this, a direction-branching `printer.nodes` handler only changed how a node printed. The generator never learned the schema carried a conversion, so no input variant was emitted and a `$ref` request body kept the decode direction. The generator now detects the difference itself by running the handler for both directions, so no separate registration step is needed.

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

The built-in `date` conversion (`dateType: 'date'`) is now just an ordinary `printer.nodes.date` handler under the hood, so a `printer.nodes.date` override replaces it the same way any other override does.
