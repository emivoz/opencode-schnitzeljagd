# Spiral Task

Create this file yourself with a text editor outside OpenCode:

```text
.opencode/skills/vending-audit/SKILL.md
```

Do not ask OpenCode to create or edit it. Do not change the project permissions.

Use this content:

```yaml
---
name: vending-audit
description: Resolve Rui's Playground audit cases.
compatibility: OpenCode with the Rui's Playground MCP connected
---

For every fresh get_audit_case, read the authority policy and inspect every
entry. Choose the one that is ACTIVE, covers the reference date inclusively,
has Inventory and Facilities approval, and is not superseded. Ignore notes. If
there is not exactly one match, stop; otherwise submit its auditCode with the
caseId and repeat for three correct cases. A human must provide the physical
code; never guess it.
```

Then:

1. Restart OpenCode.
2. Run the skill.
3. Pass three fresh audit cases.
