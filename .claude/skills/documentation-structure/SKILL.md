---
name: documentation-structure
description: Where planning documentation lives in THIS repo and the layout quirks specific to it. ALWAYS read before creating a discovery, spec, implementation plan or roadmap document here, or before citing one by path.
---

# Documentation structure (this repo)

The general pattern — numbered deliverable folders, the `discovery` / `spec` / `plan` roles, what to
do when one file per role isn't enough — lives in the **`deliverable-documentation`** skill. Read
that for the rules. This file covers only what is specific to this repo.

[`docs/README.md`](../../../docs/README.md) holds the roadmap — the live list of deliverables, their
statuses and dependencies. It deliberately does _not_ restate the conventions; that's this file's
job, so the two can't drift apart.

## Layout

```
docs/
├── README.md                 the roadmap: every deliverable, status, dependencies
├── 01-icon/                  discovery.md, spec.md, plan.md — only what's needed
├── 02-button-enhancements/
├── NN-<slug>/…               see the roadmap for the current list
└── refactor/                 legacy track, flat files, its own roadmap
```

**Deliverables are flat and numbered.** There are no per-area subfolders — no `components/`, no
`design-system/`. Those existed briefly and were removed: deciding whether a piece of work is
"component work" or "design-system work" or "a correctness fix" is a judgement call with no right
answer, and a taxonomy applied inconsistently is worse than none. The roadmap's **Area** column
carries that information as a label instead, so nothing depends on getting it right and
re-categorising is a one-cell edit.

`docs/specs/`, `docs/plans/` and `docs/discovery/` are also gone. Any skill, memory or habit
reaching for those is out of date.

## Repo quirks

- **New work goes in the flat numbered set; `docs/refactor/` is closed to new deliverables.** It
  predates the layout, keeps flat files and its own status table (IDs `P0`, `D0`–`D10`), and is left
  alone deliberately — restructuring shipped work buys nothing.
- **Two pre-existing broken links** are known and left alone: `.agent/workflows/README.md:11` points
  at a `new-ui-component.md` that was never written, and `docs/refactor/04-debounce-hook.md:19`
  cites a `DebouncableInput/__fixtures__/interactions.ts` that does not exist (the only such fixture
  is under `ui-forms/Selects`).
- **Source comments cite doc paths.** `Button.tsx`, `Button.stories.tsx` and `Icon.mdx` each
  reference a deliverable document. Grep `packages/` and `apps/` for `docs/` when moving anything.
- **A second pass on a shipped deliverable stays in that deliverable's own `spec.md`.** It does
  _not_ get the next number. Follow-on work that extends something already marked ✅ done goes below
  a hard delimiter in the original spec — a heading plus a `Status: specified, not built.` line
  saying everything above it shipped — and appears on the roadmap under **Planned**, not as a table
  row, since no folder exists for it. `05-ui-forms-field-pattern` is the worked example: its "Second
  pass — the form layer" section. Its `plan.md` stays the as-built record of what shipped and links
  forward at the top, so the two never blur. Split into a new numbered folder only when the follow-on
  is genuinely independent work rather than a continuation of the same deliverable.
- **Consumer-facing docs go to Storybook.** A component's `.mdx` is for people _using_ the library —
  which props exist, what obligations fall on the caller. Implementation reasoning, rejected
  alternatives and known limitations go in the deliverable's `plan.md`. Route by who needs to know,
  not by how technical it is.
- **`.agent/golden-rules.md`** is this repo's behaviour contract and links here. Keep the two in
  agreement if either changes.
