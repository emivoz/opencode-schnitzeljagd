# Banana Split Protocol

Your team must recover any two of three Banana Split shares and use them to locate the end-of-day rendezvous.

Eine spoilerarme Spielanleitung auf Deutsch findet ihr in `SPIELANLEITUNG.md`.

## Start

Confirm this is the current kit by checking `KIT-VERSION.txt`. It must contain `spiral-human-skill-2026-08-15`.

1. Run `npm install`.
2. Run `npm run check:archive`. It must report `Archive MCP reachable`.
3. Open this directory in OpenCode and restart OpenCode if it was already running here.
4. Ask: `Begin the Banana Split mission. Use the archive and evidence-triage skill.`
5. Humans choose and visit physical stations.

If OpenCode reports `Unauthorized` from a model provider, that is a local model/API-key problem and happens before the agent can call Archive. The Archive connection is an MCP connection, not a browser task: do not use Chrome, Playwright, Chrome DevTools, or webfetch to test it. If an MCP error contains a full HTML page or mentions an unrelated internal application, the MCP URL is wrong or a stale connector is being used. Verify the URL in `opencode.json` is exactly `https://banana.nohumanintheloop.dev/mcp/archive` and restart OpenCode from this directory.

## At A Station

Batman and Aquarium provide a QR URL, an MCP server address, a credential, and a physical code. Add the displayed MCP configuration to `opencode.json` yourself, export the credential, restart OpenCode, and use `claim_share`.

Rui's Playground is an optional route with no dispatch word. Its QR reveals a remote MCP server like the other stations. Read `SPIRAL-TASK.md`, then create `.opencode/skills/vending-audit/SKILL.md` yourself using an editor outside the OpenCode chat. The project denies the primary agent both file editing and Bash, so do not change permissions or approve an attempted agent edit. Fully quit and reopen OpenCode from this participant-kit directory after writing the skill; sending a new prompt in an existing session does not refresh the skill index. OpenCode may review and test the skill against fresh `get_audit_case` results; three correct `submit_audit_result` calls unlock `claim_share`, which only needs the physical code observed by a human.

## Finish

Load the `banana-split` skill. Because this kit denies OpenCode Bash and file edits, run its share-combination command yourself in a terminal, export the resulting key in that terminal, manually register the Rendezvous MCP described by the skill, restart OpenCode, and call `get_rendezvous`.

Do not put any credential or share into a tracked file.
