# Feature: Config cruft removal

## Problem

Four pieces of repo configuration are dead, broken, or lying about what they do. Individually each
is trivial; together they mean a developer cannot trust the tooling to tell the truth.

- **The root `type-check` script never type-checks anything.** It runs `turbo run ts-validate`, and
  no package defines a `ts-validate` task. Turbo finds nothing to run and exits successfully — a
  green gate that has never checked a single type. This is the worst of the four, because it reports
  success.
- **Two dead exports in `eslint-config`.** `./next` and `./react-internal` are advertised in the
  package's `exports` map but are not usable configurations.
- **An ambient global that would crash if anyone used it.** `isTruthy` is declared at
  `packages/typescript-config/types/global.d.ts:47` as a global type-guard helper, with a JSDoc
  example showing `[1, 2, undefined].filter(isTruthy)`. There is **no runtime implementation
  anywhere in the repo**, and no real call sites — the declaration tells TypeScript the function
  exists, so any code that took the suggestion would compile cleanly and throw at runtime.
- **`check-types` task ordering is unverified.** `turbo.json` declares
  `check-types: { dependsOn: ["^check-types"] }`. The original follow-up asked for `["^build"]` so
  that internal `@repo/*` `.d.ts` files resolve without a prior build. Whether the current form is
  correct needs checking rather than assuming.

## Goals

1. Every gate either does what its name says or does not exist.
2. No configuration advertises a capability the repo does not provide.
3. `pnpm type-check` from the root actually type-checks the workspace.

## Scope

- **Included**: fixing the root `type-check` script; deleting the two dead `eslint-config` exports
  and their README references; deleting the ambient `isTruthy` declaration; verifying and, if
  needed, correcting the `check-types` task ordering in `turbo.json`.
- **Not included**: fixing type errors the now-working `type-check` surfaces. If turning the gate on
  reveals pre-existing failures, record them and raise them separately — do not absorb an unbounded
  fix into this deliverable. Lint rule severity is
  [`20-type-hygiene`](../20-type-hygiene/spec.md).
- **Can be delivered independently**: yes.

## Non-Goals

- Adding new gates or new CI steps.
- Providing a working `isTruthy` implementation. It has no call sites; the declaration is the bug.
- Restructuring `eslint-config` beyond removing what is dead.

## Requirements

1. The root type-check script must invoke a task that packages actually define, and must fail when
   types are broken.
2. `eslint-config`'s `exports` map must list only usable entry points, and its README must match.
3. The `isTruthy` ambient declaration must be removed. Confirm zero real call sites first — the only
   current matches are the declaration itself and its own JSDoc example.
4. `check-types` must resolve internal `@repo/*` types when run standalone from a clean state.

## Edge Cases & Error Handling

- **Turning on a gate that was never running will likely surface failures.** That is expected and is
  the point. Capture what it finds; fix only what is in scope, and raise the rest.
- **Something outside the repo may import the dead eslint exports.** Grep before deleting; these are
  internal-only packages, so this should be provable rather than assumed.
- **`isTruthy` may appear in a comment or doc.** Remove or correct those alongside the declaration
  so it is not reintroduced from a stale example.

## Acceptance Criteria

- [ ] `pnpm type-check` from the repo root runs a real task and fails when a type is broken —
      verified by deliberately breaking one and observing a non-zero exit.
- [ ] `./next` and `./react-internal` are gone from `eslint-config`'s `exports` and README, with no
      remaining importers.
- [ ] The `isTruthy` ambient declaration is gone, and `grep -rn isTruthy` returns nothing.
- [ ] `check-types` run standalone from a clean state resolves internal `@repo/*` types.
- [ ] Any pre-existing failures surfaced by the newly-working type-check are recorded, with a note
      saying whether they were fixed here or raised separately.
