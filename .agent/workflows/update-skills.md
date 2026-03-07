---
description: Scan all skills in .agent/skills/ and regenerate golden-rules.md with up-to-date entries
---

# /update-skills Workflow

This workflow reads all skill files and refreshes the `golden-rules.md` master document.

## Steps

1. List all skill directories inside `.agent/skills/` and read each `SKILL.md` file.

2. For each skill, extract:
   - The skill name and description (from YAML frontmatter)
   - The key trigger conditions (when should it be used?)
   - Any critical rules or gotchas documented in the file

3. Open `.agent/golden-rules.md` and update the **Skill Index & Triggers** section with the synthesized information from all skills. Preserve all other sections unchanged.

4. List all workflow files in `.agent/workflows/` and update the **Available Workflows** section of `golden-rules.md` with an up-to-date list of slash commands and their descriptions.

5. Report to the user a summary of what was updated.
