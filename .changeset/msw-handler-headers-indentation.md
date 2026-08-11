---
"@kubb/plugin-msw": patch
---

Fix the `headers` block indentation in generated handlers, and remove the blank line left where a response declares no content type. `headers` sat two columns deeper than the `status` beside it in every handler that emits one. Only whitespace changes, so regenerating rewrites existing handler files without changing behavior.
