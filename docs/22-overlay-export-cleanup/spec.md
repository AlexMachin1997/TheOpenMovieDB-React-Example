# Feature: Overlay export cleanup

## Problem

**Four deprecated parts are still exported.** `DialogPortal`, `DialogOverlay`, `SheetPortal` and
`SheetOverlay` survived the `<dialog>` swap in [`18`](../18-overlay-api/plan.md) as no-op
compatibility shims. They are exported from
[`packages/ui-overlays/src/index.ts`](../../packages/ui-overlays/src/index.ts), documented in the
package README, and imported by nothing under `apps/` _(verified 2026-11-04)_.

A native `<dialog>` opened with `showModal()` is promoted to the top layer by the browser. There is
no portal to render through and no backdrop element to stack, so neither part has anything left to
do — each one is a component that renders its children and nothing else.

## Scope

**This was the shared half of [`19`](../19-alert-dialog/spec.md), and the cleanup is all that is left
of it.** `19` was originally specified as a component plus two shared behaviours — a declared
dismissal policy and an awaitable action, both lifted into the surface `Dialog` and `Sheet` share.
Both were dropped in review on 4 November 2026 once it was clear each replaced a couple of lines of
ordinary React with a contract that needed its own edge cases. The reasoning is in
[`19`'s Decisions](../19-alert-dialog/spec.md#decisions), and the dismissal policy is kept as a
[Planned](../planned.md#a-declared-dismissal-policy-for-dialog-and-sheet) item rather than discarded.

**Included** — removing the four parts and their exports, and the README references to them.

**No longer included** — the dismissal policy, the awaitable action, and a two-action footer on
`DialogContent` or `SheetContent`.

**Independently deliverable** — yes. It no longer depends on `19`, and `19` does not depend on it.

## Non-Goals

- **Changing what `Dialog` or `Sheet` do.** Nothing renders these parts internally; removing them
  alters no behaviour.
- **Touching the compound parts that still earn their place** — `DialogHeader`, `DialogContentArea`,
  `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` and their `Sheet` equivalents.
- **`Popover`.** It has its own
  [`usePopoverElement`](../../packages/ui-overlays/src/components/Popover/hooks/usePopoverElement.ts)
  from [`20`](../20-popover-semantics/plan.md) and never had these parts.

## Requirements

1. `DialogPortal`, `DialogOverlay`, `SheetPortal` and `SheetOverlay` are no longer exported from
   `ui-overlays`, and their implementation files are deleted.
2. `packages/ui-overlays/README.md` no longer documents them.
3. No type remains that only existed to describe them.

## Edge Cases & Error Handling

- **A consumer outside this repo.** There is none today, but the packages are structured as though
  they might be published, which is the whole substance of the open question below.
- **A story importing one of them.** None does _(verified 2026-11-04)_, but the grep has to be rerun
  at implementation time rather than trusted from this spec.

## Acceptance Criteria

- **AC1** — The four parts are absent from the package's exports, and `pnpm build` passes without
  them.
- **AC2** — `pnpm lint` and the Storybook test suite pass unchanged.
- **AC3** — No file under `packages/` or `apps/` references any of the four names, the package README
  included.

## Open Questions

- **Whether removing them needs a deprecation cycle.** There is one consuming app and it imports none
  of them, so a clean break is available — but the packages are structured as though they might be
  published. The alternative is a `@deprecated` tag plus a lint rule now and removal in a later
  deliverable, which leaves AC1 unmet and carries dead exports with no consumer to protect.
