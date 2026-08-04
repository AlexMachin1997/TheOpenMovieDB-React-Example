# Documentation

Everything about a piece of work lives in **one folder**, not scattered across a folder per
document type. Opening `docs/components/02-button-enhancements/` shows you the whole story of that
deliverable — why it was built, what it had to do, and how it turned out — without having to know
that two other files exist somewhere else.

## Structure

```
docs/
├── components/          ← track: individual component work
│   ├── README.md            roadmap + status table
│   ├── 01-icon/
│   │   ├── discovery.md
│   │   ├── spec.md
│   │   └── plan.md
│   └── 02-button-enhancements/…
├── design-system/       ← track: cross-cutting design consistency
│   ├── README.md
│   └── 01-focus-indicators/…
└── refactor/            ← track: code health and tech debt
    ├── README.md
    └── 00-repo-health.md, 01-test-harness.md, …
```

### Tracks

A **track** is a folder with a `README.md` roadmap: a status table, sequencing, dependencies, and
any decisions that apply across the whole programme. Three exist today:

| Track                                       | For                                                                |
| ------------------------------------------- | ------------------------------------------------------------------ |
| [`components/`](components/README.md)       | Building or extending one component                                |
| [`design-system/`](design-system/README.md) | Consistency across components — tokens, interaction states, scales |
| [`refactor/`](refactor/README.md)           | Code health: correctness, tooling, structure, duplication          |

The distinction that matters: `refactor/` is about whether the code is _right_, `design-system/` is
about whether the library is _coherent_. They have different reviewers and different definitions of
done, which is why they aren't one list.

`refactor/` predates this layout and keeps flat files per deliverable — those deliverables only ever
needed a spec, so there was nothing to group. New tracks use folders.

### Deliverables

A **deliverable** is a numbered folder inside a track, holding only the lifecycle documents it
actually needs:

| File           | Written                                    | Contains                                                                                             |
| -------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `discovery.md` | first, when the problem isn't self-evident | the problem, evidence with `file:line` citations, constraints, open questions                        |
| `spec.md`      | always                                     | what must be true when it's done — behaviour and acceptance criteria, never implementation           |
| `plan.md`      | when it ships                              | the as-built record: architecture, rejected alternatives, traps found, known limitations, follow-ups |

Skip the ones that don't earn their place. A three-line CSS fix does not need a discovery document,
and `plan.md` should not exist until there is something built to describe.

**The number is a stable ID, not a position.** It's assigned when the folder is created and never
changes, so links and references stay valid. Build order lives in the track's `README.md`, which is
the only source of truth for sequencing and status — if the roadmap says `03` comes before `02`,
the roadmap is right.

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

1. Pick the track. If none fits, a new track is a folder and a `README.md`.
2. Create `NN-slug/` using the next unused number in that track.
3. Write `spec.md`; add `discovery.md` first if the problem needs establishing.
4. Add a row to the track's `README.md` with its status and dependencies.
5. When it ships, write `plan.md` and update the status.
