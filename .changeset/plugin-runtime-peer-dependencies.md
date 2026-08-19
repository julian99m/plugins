---
"@kubb/plugin-react-query": minor
"@kubb/plugin-vue-query": minor
"@kubb/plugin-zod": minor
"@kubb/plugin-msw": minor
"@kubb/plugin-swr": minor
"@kubb/plugin-faker": minor
"@kubb/plugin-cypress": minor
"@kubb/plugin-mcp": minor
---

Declare the runtime library each plugin generates against as a peer dependency, so package managers report a version mismatch at install time instead of leaving it to fail as a type error in the generated code.

| Plugin | Peer dependency |
| --- | --- |
| `@kubb/plugin-react-query` | `@tanstack/react-query` `^5.62.0` |
| `@kubb/plugin-vue-query` | `@tanstack/vue-query` `^5.62.0` |
| `@kubb/plugin-zod` | `zod` `^4.0.0` |
| `@kubb/plugin-msw` | `msw` `^2.0.0` |
| `@kubb/plugin-swr` | `swr` `^2.0.0` |
| `@kubb/plugin-faker` | `@faker-js/faker` `^9.0.0 \|\| ^10.0.0` |
| `@kubb/plugin-cypress` | `cypress` `^13.0.0 \|\| ^14.0.0 \|\| ^15.0.0` |
| `@kubb/plugin-mcp` | `@modelcontextprotocol/sdk` `^1.0.0` |

`@kubb/plugin-axios` already declared `axios`. `@kubb/plugin-fetch` generates against the native `fetch`, `@kubb/plugin-ts` depends on `typescript` directly, and `@kubb/plugin-redoc` loads Redoc from a CDN, so none of those gained a peer dependency.
