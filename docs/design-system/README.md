# Design system — roadmap

Consistency _across_ components: the tokens they draw from, the interaction states they share, the
scales they size by, and the vocabulary their variants use. Building or extending a single component
belongs in [`components/`](../components/README.md); correctness and tooling belong in
[`refactor/`](../refactor/README.md).

The distinction is worth holding onto. `refactor/` asks whether the code is right.
This track asks whether the library is _coherent_ — whether `secondary` means the same thing on a
Badge as on a Button, whether two components sized `md` are the same height, whether a focus ring
looks like the same idea everywhere it appears.

## Status

This track is **not yet audited**. `01-focus-indicators` exists because it was spec'd on its own
before the wider effort was scoped, and it is what surfaced the need for one: measuring the focus
ring turned up three unrelated focus idioms, a component hardcoding raw palette colours, and a
WCAG 2.2 SC 2.4.11 failure in both themes. None of that is really about focus — it's what a library
assembled from copied component code looks like when nobody has defined the system it should obey.

A full audit across six axes — tokens, interaction states, size scales, variant taxonomy, dark mode
coverage, motion — will populate this table. Until then the sequencing below is provisional, and
`01-focus-indicators` may well end up depending on a tokens deliverable that doesn't exist yet.

| ID  | Deliverable      | Status   | Depends on | Docs                                               |
| --- | ---------------- | -------- | ---------- | -------------------------------------------------- |
| 01  | Focus indicators | 📝 draft | TBD        | [01-focus-indicators](01-focus-indicators/spec.md) |

Numbers are stable IDs assigned at creation, not build order — see [`docs/README.md`](../README.md).

## Statuses

- **draft** — spec written, but Open Questions remain that must be settled before planning starts.
- **ready** — no blocking dependencies and no open questions; safe to plan and build.
- **blocked** — waiting on its "Depends on" column.
- **in progress** — being built.
- **done** — shipped, with an as-built `plan.md`.

## Open decisions

Carried from `01-focus-indicators`, because each one is likely to apply to the whole track rather
than to focus alone:

1. **Is WCAG 2.2 SC 2.4.11 the accessibility target?** The library committed to WCAG 2.1 AA during
   `02-button-enhancements`. The answer sets the bar for every visual deliverable here, not just
   focus.
2. **How far does "all interactive elements" reach?** Every focusable element in all four packages,
   or the subset that carries a visible indicator today.
3. **Do the existing theme token values change, or only how they're consumed?** `--ring` is 2.63:1
   against the page in light mode — passable but not generous. Retuning a token affects everything
   referencing it.
