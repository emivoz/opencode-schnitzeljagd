---
name: banana-split
description: Combines two Banana Split station shares and configures the final rendezvous MCP. Use after the team has two shares from different physical stations.
compatibility: Requires Node.js 20 or newer
---

# Combine Shares

Never write shares or the reconstructed key into a tracked file. The
participant kit contains an ignored `.opencode/.rendezvous-key` file for the
reconstructed key.

The project permission boundary denies ordinary file edits and Bash commands.
It allows exactly one command for this skill: the included combiner in
`--write-key` mode. Use it after the team has two shares from different
stations:

```bash
node .opencode/skills/banana-split/scripts/combine-shares.mjs --write-key '<share-one>' '<share-two>'
```

The command writes the raw key to `.opencode/.rendezvous-key` and prints only
a confirmation message. It rejects duplicate shares and shares from different
games. Never print or commit the reconstructed key.

The Rendezvous MCP is already present in `opencode.json` and references the key
file:

```json
"rendezvous": {
  "type": "remote",
  "url": "https://banana.nohumanintheloop.dev/mcp/rendezvous",
  "oauth": false,
  "headers": {
    "Authorization": "Bearer {file:.opencode/.rendezvous-key}"
  },
  "enabled": true
}
```

Ask the human to fully quit and relaunch OpenCode from the participant-kit
directory so it reloads the file-backed credential. After the restart, call
`get_rendezvous` directly through the configured Rendezvous MCP.

If combining fails, confirm the strings are complete and came from different stations.
