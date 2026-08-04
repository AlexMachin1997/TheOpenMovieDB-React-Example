---
name: documentation-structure
description: Where planning and design documentation lives in this repo, and which file to write when. ALWAYS read before creating a discovery, spec, implementation plan, or roadmap document, and before referencing one by path.
---

# Documentation structure

This repo groups documentation **by deliverable, not by document type**. There is no `docs/specs/`,
`docs/plans/` or `docs/discovery/` — those existed until the tree was restructured, and any skill,
memory or habit that reaches for them is out of date.

Full reference: [`docs/README.md`](../../../docs/README.md). This file is the short version.

## Layout

```
docs/
├── README.md                    ← the authoritative description of this structure
├── components/                  ← track: individual component work
│   ├── README.md                    roadmap + status table
│   ├── 01-icon/{discovery,spec,plan}.md
│   └── 02-button-enhancements/{discovery,spec,plan}.md
├── design-system/               ← track: cross-cutting consistency
│   ├── README.md
│   └── 01-focus-indicators/{discovery,spec}.md
└── refactor/                    ← track: code health (flat files, predates this layout)
```

## Rules

- **A track is a folder with a `README.md` roadmap.** It owns the status table, sequencing and
  dependencies. Three exist: `components/`, `design-system/`, `refactor/`.
- **A deliverable is a numbered folder inside a track.** `NN-slug/`, containing only the lifecycle
  documents it needs.
- **The number is a stable ID, not a position.** Assigned at creation, never renumbered. Build order
  lives in the track README, which is the only source of truth for sequencing.
- **`refactor/` keeps flat files.** It predates this layout and its deliverables only ever needed a
  spec. Don't restructure it; do follow the folder pattern for everything new.

## Which file

| File           | Write it                            | Contains                                                                                         |
| -------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| `discovery.md` | when the problem isn't self-evident | problem, evidence with `file:line` citations, constraints, open questions                        |
| `spec.md`      | always                              | what must be observably true when done — behaviour and acceptance criteria, never implementation |
| `plan.md`      | when it ships                       | as-built record: architecture, rejected alternatives, traps found, known limitations, follow-ups |

Skip what doesn't earn its place. A small fix needs no `discovery.md`, and `plan.md` should not
exist before there is something built to describe.

## When writing one

- **Update the track's `README.md` in the same change.** A new deliverable needs a row; a status
  change needs the table updated. A stale status is worse than none — the `refactor/` roadmap listed
  a shipped deliverable as `todo` for several sessions.
- **Check for ripple effects before finalising a spec.** Grep the other tracks for the thing you're
  defining; if another spec assumed something you just changed, fix it in the same pass rather than
  leaving a note.
- **Relative links, verified.** Within a deliverable use `./spec.md`; across deliverables
  `../01-icon/spec.md`; across tracks `../../components/01-icon/spec.md`. Check they resolve —
  a moved file silently breaks every link pointing at it.
- **Route by audience.** Contributor-facing reasoning (why it's built this way, what was rejected)
  goes in these documents. Consumer-facing usage documentation goes in the component's Storybook
  `.mdx`. Not by how technical it is — by who needs to know.
