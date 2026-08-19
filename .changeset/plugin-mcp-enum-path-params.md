---
"@kubb/plugin-mcp": patch
---

Fix enum path parameters generating `z.string()` instead of `z.enum([...])` in `inputSchema`. String enums now generate `z.enum(["VALUE1", "VALUE2"])` and number/boolean enums generate `z.union([z.literal(...)])`.

Forward the `RequestHandlerExtra` request object from the MCP tool callback into each generated handler function as a second parameter. The handler receives it but does not yet pass it (or anything derived from it, such as headers) on to the underlying client call.
