---
name: documentation-structure
description: Which documentation track a piece of work belongs to in THIS repo, and the layout quirks specific to it. ALWAYS read before creating a discovery, spec, implementation plan or roadmap document here, or before citing one by path.
---

# Documentation structure (this repo)

The general pattern — tracks, numbered deliverables, the `discovery` / `spec` / `plan` roles, what
to do when one file per role isn't enough — lives in the **`deliverable-documentation`** skill. Read
that for the rules. This file covers only what is specific to this repo.

Authoritative description: [`docs/README.md`](../../../docs/README.md).

## `docs/specs/`, `docs/plans/` and `docs/discovery/` no longer exist

They were replaced by the layout below. Any skill, memory or habit reaching for those paths is out
of date — including the account-managed `problem-discovery` skill, which still names
`docs/discovery/` and cannot be edited from a Claude Code session.

## The tracks

| Track                 | Answers                    | Examples                                                  |
| --------------------- | -------------------------- | --------------------------------------------------------- |
| `docs/components/`    | Is this _component_ right? | Icon, Button enhancements                                 |
| `docs/design-system/` | Is the _library_ coherent? | Focus indicators, tokens, size scales, variant vocabulary |
| `docs/refactor/`      | Is the _code_ right?       | Repo health, test harness, correctness bugs, duplication  |

The line between the last two is worth holding. `refactor/` is correctness, tooling and structure —
it asks whether the code works. `design-system/` is consistency — whether `secondary` means the same
thing on a Badge as on a Button, whether two components sized `md` are the same height. Different
reviewers, different definitions of done, so they are not one list.

Work on a single component goes in `components/`, even when it touches shared code. Work that
changes what _every_ component must do goes in `design-system/`.

## Repo quirks

- **`docs/refactor/` keeps flat files** (`00-repo-health.md`, `01-test-harness.md`, …). It predates
  this layout and its deliverables only ever needed a spec. Don't restructure it — restructuring
  shipped work buys nothing. Everything new uses the folder pattern.
- **Two pre-existing broken links** are known and deliberately left alone:
  `.agent/workflows/README.md:11` points at a `new-ui-component.md` that was never written, and
  `docs/refactor/04-debounce-hook.md:19` cites a `DebouncableInput/__fixtures__/interactions.ts`
  that does not exist (the only such fixture is under `ui-forms/Selects`).
- **Source comments cite doc paths.** `Button.tsx`, `Button.stories.tsx` and `Icon.mdx` each
  reference a deliverable document. Grep `packages/` and `apps/` for `docs/` when moving anything.
- **Consumer-facing docs go to Storybook.** A component's `.mdx` is for people _using_ the library —
  which props exist, what obligations fall on the caller. The reasoning behind an implementation,
  rejected alternatives and known limitations go in the deliverable's `plan.md`. Route by who needs
  to know, not by how technical it is.
- **`.agent/golden-rules.md`** is this repo's behaviour contract and links here. Keep the two in
  agreement if either changes.
