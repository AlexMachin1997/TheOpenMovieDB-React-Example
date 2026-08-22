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
├── planned.md                the reasoning behind everything on the roadmap's Planned list
├── 01-icon/                  discovery.md, spec.md, plan.md — only what's needed
├── 02-button-enhancements/
└── NN-<slug>/…               see the roadmap for the current list
```

**`planned.md` exists because the roadmap stopped being scannable.** Open questions attract
reasoning — options weighed, why something is pinned, what would force the decision — and that
reasoning is worth keeping, which is how two-thirds of `README.md` became essay. The roadmap now
carries one line per planned item plus a link; the argument lives in `planned.md`. Anything on the
Planned list needing more than about three lines goes there, not inline. Deep links use the section
anchor (`planned.md#the-four-package-split`), and several `plan.md` files and
`packages/ui-command/README.md` already point at them — check before renaming a heading there.

**One layout, one roadmap.** There is no second track. `docs/refactor/` used to hold a parallel set
of deliverables with its own status table and its own IDs (`P0`, `D0`–`D10`, `F1`–`F6`); it was
migrated into the numbered set and deleted. If a document, comment or memory still refers to
`docs/refactor/` or to a `D`-prefixed deliverable ID, it is out of date.

**Deliverables are flat and numbered.** There are no per-area subfolders — no `components/`, no
`design-system/`. Those existed briefly and were removed: deciding whether a piece of work is
"component work" or "design-system work" or "a correctness fix" is a judgement call with no right
answer, and a taxonomy applied inconsistently is worse than none. The roadmap's **Area** column
carries that information as a label instead, so nothing depends on getting it right and
re-categorising is a one-cell edit.

`docs/specs/`, `docs/plans/` and `docs/discovery/` are also gone. Any skill, memory or habit
reaching for those is out of date.

## Repo quirks

- **Numbers are allocation order, not chronology.** `06`–`11` shipped _before_ `01`–`05`; they carry
  higher numbers because they were migrated into this layout later. An ID identifies a deliverable
  and says nothing about when it happened. Do not renumber to "fix" the order.
- **Deliverable state lives in the roadmap; task progress lives in `plan.md`.** These are different
  questions and must not be duplicated. `docs/README.md` is the only place `todo`/`ready`/`✅ done`
  appears. A `plan.md` opens with `Status: **shipped.**` — a statement about the document being an
  as-built record — and tracks its own steps as checkboxes. A `spec.md` carries no status at all,
  except the documented second-pass delimiter below. The legacy track duplicated deliverable state
  into each spec's header, the two drifted, and a shipped deliverable sat marked `todo` for weeks.
- **Checkboxes belong in `plan.md` only.** Specs here still carry `- [ ]` under Success and
  Acceptance Criteria — 70 of 73 have never been ticked and never will be, because the plan
  reproduces them with evidence instead. New specs use numbered `AC1`/`AC2` items; the existing
  boxes are being left alone rather than bulk-converted, so expect both shapes.
- **A shipped `plan.md` carries no unticked box without a reason on the same line, and no
  future-tense sentence about work already done.** `04`'s plan sat shipped for weeks with 23 open
  task boxes and a closing line reading "awaiting the go-ahead to start Phase 1"; it has since been
  collapsed to one ticked line per phase. `13`'s plan is the shape to copy. Both greps —
  `grep -n '^\s*- \[ \]'` and a scan for estimates or "awaiting" — take seconds at ship time. The
  legitimately-open boxes in `06`, `07` and `09` show the other half of the rule: each one states
  why it is open, so a reader can tell a deliberate gap from drift.
- **`D<n>` is an overloaded prefix — read the context.** Deliverables `04` and `05` both use
  `D1`, `D2`, `D3`… as _internal decision IDs_ within their own `plan.md`, with anchor links like
  `#d1--…`. Source comments referencing `plan.md, D3` mean those, not a deliverable. The retired
  legacy track also used `D0`–`D10` for whole deliverables. Never bulk-rewrite a `D<n>` without
  checking which of the two it is.
- **Known broken links, left alone deliberately.** `.agent/workflows/README.md:11` points at a
  `new-ui-component.md` that was never written. Separately, `04-ui-forms-primitive-migration`'s
  `discovery.md` and `spec.md` carry 11 links to `packages/ui-forms/…` paths for components that
  deliverable itself moved to `ui-core`. Those are pre-implementation documents describing where the
  code was _before_ the move, so repointing them would make them less accurate, not more. A
  deliverable's `plan.md` is the as-built record and should cite current paths; its `discovery.md`
  and `spec.md` describe the world as it was.
- **Do not cite a deliverable document from source code.** A comment saying
  `see docs/NN-some-deliverable/spec.md` couples code to a numbering scheme that moves: deliverables get
  renumbered, merged and retired, and nothing fails when the path goes stale. Put the _reason_ in
  the comment instead — it is what the reader needs, and it cannot rot. Source outlives planning
  docs.

  About 17 such citations predate this rule (`ui-core/index.ts`, `ui-forms/index.ts`,
  `Button.tsx`, `Label.variants.ts`, `RadioGroup.types.ts`, `Icon.mdx` and others). They are not
  being chased down, but do not add more, and prefer removing one to updating it when you are
  already editing that line. Grep `packages/` and `apps/` for `docs/` before moving any deliverable
  folder — and note that most `?path=/docs/…` hits are Storybook links, which are fine.

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
