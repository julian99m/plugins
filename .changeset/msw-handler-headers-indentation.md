---
"@kubb/plugin-msw": patch
---

Fix the indentation of the `headers` block in generated handlers, and drop the blank line left behind when a response has no content type.

The template interpolated the block behind an indent it had already applied, so `headers` landed two columns deeper than the `status` it sits beside in every handler that emits a content type. The same interpolation left a whitespace-only line where a response carried no content type at all.

```ts
// before
return new Response(JSON.stringify(data), {
  status: 200,
    headers: {
    'Content-Type': 'application/json'
  },
})

// after
return new Response(JSON.stringify(data), {
  status: 200,
  headers: {
    'Content-Type': 'application/json'
  },
})
```

Only whitespace in the generated output changes, so regenerating produces a diff in existing handler files without any behavior change.
