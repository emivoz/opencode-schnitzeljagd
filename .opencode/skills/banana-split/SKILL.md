---
name: banana-split
description: Combines two Banana Split station shares and configures the final rendezvous MCP. Use after the team has two shares from different physical stations.
compatibility: Requires Node.js 20 or newer
---

# Combine Shares

Never write shares or the reconstructed key into a tracked file.

The project permission boundary denies the OpenCode agent Bash and file edits.
The human participant must run the included script in a terminal with two
shares from different stations:

```bash
node .opencode/skills/banana-split/scripts/combine-shares.mjs '<share-one>' '<share-two>'
```

Export the resulting key only in your shell:

```bash
export BANANA_RENDEZVOUS_KEY='<result>'
```

Then, using a text editor outside OpenCode, add this server under the existing
`mcp` object in `opencode.json`:

```json
"rendezvous": {
  "type": "remote",
  "url": "https://banana.nohumanintheloop.dev/mcp/rendezvous",
  "oauth": false,
  "headers": {
    "Authorization": "Bearer {env:BANANA_RENDEZVOUS_KEY}"
  },
  "enabled": true
}
```

Preserve the existing Archive and station entries and ensure JSON properties
are separated by commas. Fully restart OpenCode, verify the new connection
with `opencode mcp list`, and ask OpenCode to call `get_rendezvous`.

If combining fails, confirm the strings are complete and came from different stations.
