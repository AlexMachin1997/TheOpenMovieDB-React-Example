# 22 — Overlay export cleanup

Status: **shipped.** As-built record for [`spec.md`](spec.md).

## Outcome

`DialogPortal`, `DialogOverlay`, `SheetPortal` and `SheetOverlay` are gone — the four files, the four
`I*` prop types, the barrel entries and the README paragraph that called them deprecated shims. No
behaviour changed, because nothing rendered any of them internally and nothing imported them.

## Gates

| Gate                      | Result                                                                       |
| ------------------------- | ---------------------------------------------------------------------------- |
| `turbo run build --force` | 11/11, 1m36s — forced, so a real compile rather than a cache replay          |
| `pnpm lint`               | 11/11                                                                        |
| Storybook suite           | 407 passed, 42 files, 27 MDX skipped, cache cleared first                    |
| `pnpm prettier:check`     | Red on 26 untouched files under `docs/` and `.claude/worktrees/` — see below |

No before-column: the working tree arrived with the four files already deleted and the barrels still
importing them, so there was no state to baseline against — it would not have built.

## Acceptance criteria

- [x] **AC1** — The four names appear in no barrel (`src/index.ts`, the `Dialog` and `Sheet` roots,
      both `components/index.ts`), and `build --force` is green without them.
- [x] **AC2** — Lint 11/11; the Storybook suite green with no story touched.
- [x] **AC3** — `grep -rn` over `packages/` and `apps/` for all four names returns nothing, the
      package README included. Build output carries none either.

## Follow-ups

- **The Prettier gate is red and was before this.** 26 files under `docs/` and `.claude/worktrees/`,
  none of them touched here; every file this deliverable edited passes `prettier --check`
  individually. It wants a commit of its own — `local-development` says never to fold a reformat into
  feature work, because `git add -A` sweeps it up silently.

---

## The open question, answered

The spec left one question open, and it was the only reason the roadmap carried this as `draft`:
whether removing the four parts needed a deprecation cycle.

**Clean break, no cycle.** The grep the spec asked to be rerun at implementation time came back
empty — nothing under `packages/` or `apps/` imported any of the four, stories included. With no
consumer to protect, a `@deprecated` tag plus a lint rule would have left AC1 unmet and carried four
dead exports forward for nothing. The packages being structured as though they might be published is
the argument for a cycle, but nothing is published, so there is no version anyone could be pinned to.

## As-built notes

Nothing rendered any of the four internally, so no story and no component needed touching. That is
what made this a barrel edit rather than a migration.

`DropdownMenuPortal` stays exported. It is a Radix primitive with a real portal behind it; the
resemblance to the names removed here is only a name.

The four names survive in `docs/16-type-hygiene/plan.md`, `docs/18-overlay-api/plan.md` and this
deliverable's own `spec.md`. Those are records of the world as it was and are supposed to keep them —
AC3 is scoped to `packages/` and `apps/` for that reason.
