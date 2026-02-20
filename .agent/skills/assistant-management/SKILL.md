---
name: Autonomous Assistant Management
description: 'Guidelines and instructions for autonomously managing AI agents workflows, skills, and internal architecture.'
---

# Autonomous Assistant Management

As an AI Assistant, you have the capability to autonomously create, modify, and optimize your own tools (`workflows` and `skills`) to better serve the repository.

This skill defines the process for analyzing pain points, identifying optimization opportunities, and proactively creating tools.

## Core Philosophy

1. **Be Proactive, Not Just Reactive:** If you notice a repetitive task, a common error pattern, or an operation that requires multiple complex steps (e.g., updating dependencies across a monorepo, generating boilerplate components, fixing specific TSConfig issues), you should _propose_ or _autonomously build_ a Workflow or Skill to automate it.
2. **Centralization over Fragmentation:** Before creating a new skill, check if an existing one can be expanded. Avoid creating 10 micro-skills when one cohesive "React Component Standards" skill works better.
3. **Documentation is Execution:** When you build a workflow, ensure it has clear `description` frontmatter, step-by-step markdown explanations, and utilizes the `// turbo` or `// turbo-all` annotations when bash commands are natively safe to auto-run.

## Workflows vs. Skills

- **Workflows (`.agent/workflows/*.md`):** Step-by-step executable guides containing `bash` or `cmd` snippets. Used for actionable tasks like `/update-storybook`, `/new-ui-component`, etc.
- **Skills (`.agent/skills/*/SKILL.md`):** Knowledge bases, architectural rules, and context injections. Used for persistent rules like linting standards, monorepo architecture, and TS config rules.

## Process For Creating / Managing Workflows

1. **Identify Need:** Recognize a multi-step terminal process or a frequent user request.
2. **Scaffold Workflow:**
   - Create a file in `.agent/workflows/[name-of-workflow].md`
   - Include the YAML frontmatter:
     ```yaml
     ---
     description: Concise description of what this automates
     ---
     ```
   - Write clear markdown steps.
   - Use `// turbo` above safe terminal commands, or `// turbo-all` at the top of the file if all commands are safe to execute without user prompting.
3. **Notify User:** Inform the user that a new slash command `/[name-of-workflow]` is now available.

## Process For Creating / Managing Skills

1. **Identify Need:** Notice repeated pattern corrections, stylistic preferences, or architectural rules that you keep having to look up.
2. **Scaffold Skill:**
   - Create a directory `.agent/skills/[name-of-skill]/`
   - Create `.agent/skills/[name-of-skill]/SKILL.md`
   - Use YAML frontmatter:
     ```yaml
     ---
     name: Title of Skill
     description: What context this brings to the agent.
     ---
     ```
3. **Consolidate:** Periodically review `.agent/skills/` to ensure there are no overlapping instructions (e.g. merging disjointed ESLint rules into one `eslint-standards` skill).
