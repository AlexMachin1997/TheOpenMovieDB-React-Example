# Feature: Type-hygiene cleanup

## Problem

Two TypeScript lint rules were downgraded from `error` to `warn` as a temporary measure, and the
downgrade has outlived its purpose. `packages/eslint-config/base.js:45-46` currently has:

```js
'@typescript-eslint/no-empty-object-type': 'warn',
'@typescript-eslint/no-explicit-any': 'warn'
```

They were set to `warn` during the repo-health work ([`06-repo-health`](../06-repo-health/plan.md))
so that a linter which had never actually run could be turned on without blocking on ~39 pre-existing
violations. That was the right call then. But a `warn` is not a gate: new violations can be added
freely, and the count can grow without anything failing.

> **Corrected after implementation.** This paragraph originally read: "The scale looks materially
> smaller now than the ~39 originally recorded — a rough scan finds around 10 candidate sites — so
> this is likely a modest cleanup rather than the large one it was when deferred."
>
> That was wrong by nearly 4×. The measured baseline was **38**, against the 39 originally recorded —
> essentially nothing had been cleaned up. The rough scan missed every declaration whose `extends`
> wraps onto a second line, and counted only the `no-explicit-any` sites. See
> [`plan.md`](plan.md#the-count-38-not-10).

## Goals

1. Both rules are `error`, so a new violation fails the build rather than adding to a pile.
2. Existing violations are fixed with real types, not suppressed.

## Scope

- **Included**: fixing the outstanding `no-empty-object-type` and `no-explicit-any` violations, then
  restoring both rules to `error` in `packages/eslint-config/base.js`.
- **Not included**: other lint rules, other severities, or a general typing audit. Any violation
  whose correct type is genuinely non-obvious should be raised rather than force-fixed with a
  plausible guess.
- **Can be delivered independently**: yes.

## Non-Goals

- Enabling additional strictness flags in `tsconfig`.
- Refactoring the code that happens to contain the violations, beyond typing it.
- Replacing `any` with `unknown` where `unknown` merely relocates the problem to the call site.

## Requirements

1. Each violation must be fixed by giving the value its real type.
2. `eslint-disable` comments are not an acceptable fix. If a site genuinely needs one, it must carry
   a written reason.
3. Both rules must be `error` when this lands.
4. `pnpm lint` must be green, and `check-types` no worse than before.

## Edge Cases & Error Handling

- **Some `any`s are load-bearing** — generic constraints, third-party types that are themselves
  `any`. Where the true type cannot be expressed, prefer narrowing at the boundary over spreading
  `any` inward, and record why.
- **This repo uses `ts-reset` globally**, which changes the types of common built-ins. Check its
  effect before concluding a cast is necessary — the type may already be narrower than it appears.
- **An empty object type is sometimes intentional** as a marker or constraint. Confirm intent before
  changing the shape; the fix may be a clearer expression rather than a different type.

## Acceptance Criteria

- [ ] `@typescript-eslint/no-empty-object-type` and `@typescript-eslint/no-explicit-any` are both
      `error` in `packages/eslint-config/base.js`.
- [ ] `pnpm lint` is green with no new `eslint-disable` comments, or each new one carries a written
      reason.
- [ ] `check-types` is no worse than before.
- [ ] Any violation deliberately left unfixed is recorded with the reason.
