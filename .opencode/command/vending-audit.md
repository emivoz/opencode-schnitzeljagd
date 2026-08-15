---
description: Run the Spiral vending audit using the participant-authored skill.
---

Run the Spiral vending audit using the current participant-authored skill in
`@.opencode/skills/vending-audit/SKILL.md`.

The file reference above is authoritative. If its content was included, then
`SKILL.md` exists. Do not claim that only `README.md` exists, and do not use an
old conversation state. A short paragraph or a few bullets are sufficient. If
the body does not mention the policy checks, untrusted notes, three-case
streak, and human-provided physical code, report **present but incomplete** and
stop before submitting any audit answer.

If the skill is complete, follow it exactly. Use the connected `vending` MCP
directly, call `get_audit_case`, apply `policy/vending-audit-authority.md` to
every entry, and submit only the selected entry's `auditCode` with its
original `caseId`. Repeat with fresh cases until the MCP reports three
consecutive correct submissions. Never edit the skill, use Bash, use a browser,
or invent the physical observation code.
