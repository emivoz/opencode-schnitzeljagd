---
description: Start the Banana Split evidence investigation.
---

Start the Banana Split mission. Use the configured Archive MCP directly; do not use a browser, Playwright, Chrome DevTools, webfetch, or websearch to test it. First verify that the configured Archive MCP exposes `get_mission_brief`. Treat a log line such as `archive_get_mission_brief Unknown` as a failed tool call even if a later model message claims success. If the tool error contains a full HTML document, an internal application name, or a different tool prefix such as `archive_get_mission_brief`, stop and tell the team that the OpenCode MCP dispatcher is stale or a wrong connector is being used; do not continue or infer the mission brief. If the model provider returns `Unauthorized`, explain that the local OpenCode model/API credentials failed before any MCP call.

Then call the Archive MCP mission-brief tool, load the evidence-triage skill, delegate repository research and verification to the provided subagents, and present the human team with a concise evidence table.

End with a compact `Human decision required` section. Show **every candidate found**, including rejected, expired, superseded, draft, and missing-approval records, as one numbered checklist. For each option include its record ID, dispatch word if present, status, confidence, reason for concern or acceptance, and a short file citation. Do not remove decoys from the decision board, rank the options, or recommend which ones to choose. The confidence and status fields are evidence for the humans to interpret, not an automatic decision.

Ask the team to select exactly two option numbers from the full checklist, for example: `Choose options 1 and 3.` Only after that explicit response should you repeat the selected record ID/dispatch pairs and call `validate_evidence` for both. Do not ask for a physical code yet; physical observations happen after the Archive returns station clues. If the team selects a rejected option, submit only when they explicitly insist after seeing its warning; the Archive's rejection is part of the learning experience, not a reason to hide the candidate.
