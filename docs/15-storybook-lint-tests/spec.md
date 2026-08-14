# Feature: Storybook lint + interaction tests

## Problem

Two Storybook-related capabilities are switched off, and the recorded reasons for both are now out
of date.

**`eslint-plugin-storybook` is installed but deliberately not loaded.**
`packages/eslint-config/react.js:6-9` explains why: it triggered an `ERR_REQUIRE_CYCLE_MODULE` crash
on Node 22 that took the whole linter down. The legacy roadmap recorded this as blocked on aligning
Storybook versions — but that alignment **has since happened** (every Storybook package is now on
`^10.2.16`, and the plugin itself is `10.2.16`), and the code comment states the crash occurred
_with_ 10.2.16. So the stated unblocking condition was met and did not unblock it. The real cause is
unconfirmed.

**The Storybook interaction suite is reported red.** `apps/storybook` runs `play()` tests via
`@storybook/addon-vitest` and Playwright. The recorded diagnosis was that library `dist` bundled its
own React, causing duplicate-React "hooks are null" errors. That diagnosis was **partly right and is
now partly addressed**: React is externalized as of
[`11-correctness-bugs`](../11-correctness-bugs/plan.md). But the same record notes the identical
crash also occurred in the Storybook **dev server**, which loads package `src` directly rather than
`dist` — so the dist-bundling theory never fully explained it.

This is where component behaviour coverage lives; the node-based Vitest harness deliberately does
not duplicate it. While this is off, component behaviour is effectively untested.

## Goals

1. Storybook lint rules run, without taking the rest of the linter down.
2. The interaction suite runs and its result is trustworthy.
3. The actual root cause of each failure is established rather than inherited from a stale note.

## Scope

- **Included**: determining the current real state of both (not the recorded state); establishing the
  root cause of whichever is still broken; re-enabling `eslint-plugin-storybook`; getting the
  interaction suite to a known-good state.
- **Not included**: writing new stories or new interaction coverage. Upgrading Storybook beyond what
  is needed to unblock. The folder-structure lint rule, which is
  [`13-exports-conventions`](../13-exports-conventions/spec.md).
- **Sequencing**: run after [`12-build-dependency-tooling`](../12-build-dependency-tooling/spec.md), since
  externalizing the remaining dependencies may change the outcome — but do not assume it fixes it.

## Non-Goals

- Replacing the interaction-test approach with something else.
- Achieving a coverage target.
- Re-litigating the node-harness-vs-browser-tests split, which was a deliberate decision.

## Requirements

1. Start by establishing current state empirically. Both recorded diagnoses have already proven
   partly wrong; neither should be trusted as a starting assumption.
2. Enabling the Storybook lint plugin must not disable or degrade any other lint rule — the same
   failure mode as the folder-structure rule, and it is silent.
3. If the interaction suite is still red, the root cause must be identified before a fix is applied.
4. If either problem turns out to be genuinely blocked by an upstream bug, that must be recorded
   with a link, and the deliverable closed as blocked rather than left ambiguous.

## Edge Cases & Error Handling

- **The dev-server crash contradicts the dist theory.** Dev-server stories load `src`, so a
  `dist`-bundling explanation cannot account for it. Reproduce both paths before concluding.
- **A silently-degraded linter looks like a clean one.** Verify by introducing a deliberate lint
  error and confirming it is still caught.
- **Node version is implicated** in the recorded crash. Confirm which Node version the failure
  reproduces on before attributing it to package versions.

## Acceptance Criteria

- [ ] The current state of both capabilities is established empirically and written down, replacing
      the stale recorded diagnoses.
- [ ] `eslint-plugin-storybook` is loaded and its rules run — or, if genuinely blocked upstream, the
      blocker is linked and the reason recorded accurately.
- [ ] A deliberately introduced lint error is still caught with the plugin enabled.
- [ ] The interaction suite runs, with its result explained: green, or red with an identified root
      cause and a named owner deliverable.
- [ ] The stale claim that version alignment unblocks the lint plugin is corrected wherever it
      appears.
