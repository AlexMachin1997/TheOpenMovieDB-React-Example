# Documentation

Everything about a piece of work lives in **one folder**. Opening `docs/02-button-enhancements/`
shows you the whole story of that deliverable — why it was built, what it had to do, how it turned
out — without having to know that other files exist elsewhere.

## Roadmap

Every deliverable, in one list. **Area** is a label for filtering, not a location — nothing about a
deliverable's folder depends on it, so re-categorising is a one-cell edit here rather than a folder
move that breaks links.

| ID  | Deliverable         | Area          | Status   | Depends on | Docs                                                     |
| --- | ------------------- | ------------- | -------- | ---------- | -------------------------------------------------------- |
| 01  | Icon component      | component     | ✅ done  | —          | [01-icon](01-icon/spec.md)                               |
| 02  | Button enhancements | component     | ✅ done  | 01         | [02-button-enhancements](02-button-enhancements/spec.md) |
| 03  | Focus indicators    | design system | 📝 draft | TBD        | [03-focus-indicators](03-focus-indicators/spec.md)       |

**Statuses** — `draft`: spec written, open questions remain before planning can start · `ready`: no
blocking dependencies or open questions · `blocked`: waiting on its "Depends on" column ·
`in progress` · `done`: shipped, with an as-built `plan.md`.

A deliverable marked **blocked** must not move into implementation planning — let alone code — until
everything it depends on is done and merged, not merely spec'd. Discovery and spec work can happen
ahead of that, and did for Button.

Update the table in the same change that changes reality. A stale status is worse than none, because
it's actively believed — the legacy roadmap below listed a shipped deliverable as `todo` for several
sessions.

### Legacy track

[`refactor/`](refactor/README.md) predates this layout: flat files, its own status table, deliverable
IDs `P0` and `D0`–`D10`. It is left alone deliberately — restructuring finished work buys nothing —
and keeps its own roadmap rather than being duplicated here. Anything new goes in the table above.

### Planned

A **design-system audit** across six axes — tokens, interaction states, size scales, variant
taxonomy, dark mode coverage, motion — would add deliverables to the table above. Not started.
`03-focus-indicators` is what surfaced the need for it: measuring the focus ring turned up three
unrelated focus idioms, a component hardcoding raw palette colours, and a WCAG 2.2 SC 2.4.11 failure
in both themes. None of that is really about focus — it's what a library assembled from copied
component code looks like when nobody has defined the system it should obey.

## Structure

```
docs/
├── README.md                     this file — structure + the roadmap above
├── 01-icon/
│   ├── discovery.md
│   ├── spec.md
│   └── plan.md
├── 02-button-enhancements/…
├── 03-focus-indicators/…
└── refactor/                     legacy track, see above
```

A **deliverable** is a numbered folder holding only the lifecycle documents it actually needs:

| File           | Written                                    | Contains                                                                                             |
| -------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `discovery.md` | first, when the problem isn't self-evident | the problem, evidence with `file:line` citations, constraints, open questions                        |
| `spec.md`      | always                                     | what must be true when it's done — behaviour and acceptance criteria, never implementation           |
| `plan.md`      | when it ships                              | the as-built record: architecture, rejected alternatives, traps found, known limitations, follow-ups |

Skip the ones that don't earn their place. A three-line CSS fix does not need a discovery document,
and `plan.md` should not exist until there is something built to describe.

**The number is a stable ID, not a position.** Assigned when the folder is created, never
renumbered — links and references stay valid. Build order lives in the roadmap, which is the only
source of truth for sequencing. If the roadmap says `03` ships before `02`, the roadmap is right.

There are no per-area subfolders, deliberately. Deciding whether focus indicators is "component
work" or "design-system work" or "a correctness fix" is a judgement call with no right answer, and a
taxonomy people categorise inconsistently is worse than none. The Area column captures the same
information without anything depending on getting it right.

### When one file per role isn't enough

**First check whether it's actually two deliverables.** Needing two specs is the usual symptom of a
deliverable that should be split — the numbered folders exist precisely so work stays small and
independently shippable. Splitting is right more often than it feels.

When it genuinely is one deliverable that outgrows one file:

- **Promote the role to a folder of the same name.** `spec.md` becomes `spec/` containing a
  `README.md` entry point plus its parts, and links point at `spec/`. Never both `spec.md` and
  `spec/` — nobody would know which is authoritative.
- **Supporting material isn't a role.** Evidence tables, measurements, benchmark output,
  screenshots: drop them in the deliverable folder under any sensible name, or an `evidence/`
  subfolder. The three names above are _required roles_, not an exhaustive file list.
- **Revisions update the original.** A deliverable revisited later doesn't get `plan-2.md`; update
  `plan.md` and record what changed and why. `02-button-enhancements/plan.md` does this for the
  pressed-state treatment, which was rewritten after review — the superseded reasoning is
  documented rather than deleted or duplicated.

## The flow

```
discovery  →  spec  →  implementation plan  →  code  →  plan.md as the as-built record
```

- **Discovery** establishes the problem and gathers evidence. Prefer verifying a fact now over
  writing "check this later" — a wrong assumption gets more expensive the further it travels.
- **Spec** states what must be observably true. It does not choose a mechanism; naming one locks
  planning out of a better answer.
- **Planning** chooses the mechanism, then the code gets written.
- **`plan.md`** is finally rewritten as an as-built record, so the next person inherits the
  reasoning and not just the result.

Two audiences, kept apart deliberately: **contributor-facing** reasoning belongs in these documents,
while **consumer-facing** usage documentation belongs in the component's Storybook `.mdx`. Route by
who needs to know, not by how technical it is.

## Adding a deliverable

1. Create `NN-slug/` using the next unused number. That's the whole placement decision.
2. Write `spec.md`; add `discovery.md` first if the problem needs establishing.
3. Add a row to the roadmap with its Area, status and dependencies.
4. When it ships, write `plan.md` and update the status.

The general form of this layout — and the reasoning behind it — is portable, and lives in the
`deliverable-documentation` skill. What's specific to this repo lives in
[`.claude/skills/documentation-structure`](../.claude/skills/documentation-structure/SKILL.md),
which Claude Code loads automatically here.
