---
"@kubb/plugin-mcp": patch
---

Fix enum path parameters generating `z.string()` instead of `z.enum([...])` in `inputSchema`. String enums now generate `z.enum(["VALUE1", "VALUE2"])` and number/boolean enums generate `z.union([z.literal(...)])`.

Fix MCP not passing headers to fetch. The `RequestHandlerExtra` request object is now forwarded from the MCP tool callback to each generated handler function and on to the fetch client call, so downstream clients can read headers (auth tokens, trace IDs, and so on) from the MCP request context.
