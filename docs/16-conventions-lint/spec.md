# Feature: Conventions doc + lint enforcement

## Problem

The repo's conventions live in people's heads and in the shape of existing code. There is no
`CONVENTIONS.md`, so a contributor has to infer the rules by reading around — which is exactly how
the inconsistencies in [`15-exports-conventions`](../15-exports-conventions/spec.md) accumulated.

Worse, the enforcement that was built has been switched off. `packages/eslint-config/react.js:74-86`
contains a fully-written `project-structure/folder-structure` rule block, commented out with a note
explaining why: the `projectStructureParser` was being applied as the `languageOptions.parser` for
_every_ file, which clobbered the TypeScript parser and silently disabled real code linting. The
plugin (`eslint-plugin-project-structure@^3.0.0`) and the rule config (`folderStructure.mjs`) are
both still present — only the wiring is disabled.

So the repo has a folder-structure rule that nobody is running, and no written statement of the
conventions it would enforce.

## Goals

1. A contributor can read the conventions in one place instead of inferring them.
2. The conventions that can be mechanically enforced are enforced, so they cannot quietly rot.
3. Enabling structural linting does not disable code linting — the failure that caused it to be
   switched off must not recur.

## Scope

- **Included**: writing `docs/CONVENTIONS.md` covering file layout, the barrel rule, variants file
  naming, `displayName`, and the control-value contract; re-enabling the folder-structure rule in an
  isolated configuration so its parser cannot affect other files; extending `folderStructure.mjs` to
  match the documented conventions.
- **Not included**: deciding the barrel strategy — that is `15`'s call, and this deliverable
  documents and enforces whatever `15` chose. Changing component code to comply; if the rule finds
  violations, record them and raise them separately.
- **Depends on**: [`15-exports-conventions`](../15-exports-conventions/spec.md). Documenting a
  convention before choosing it would mean writing this twice.

## Non-Goals

- Introducing new conventions that the codebase does not already broadly follow. This is a
  written record of decisions, not a redesign.
- Enforcing everything. A convention that cannot be checked cheaply can be prose-only.
- Re-enabling `eslint-plugin-storybook` — that is
  [`19-storybook-lint-tests`](../19-storybook-lint-tests/spec.md).

## Requirements

1. `CONVENTIONS.md` must state each convention and, where it is enforced, name the rule that
   enforces it.
2. The folder-structure rule must run without changing the parser used for any other file — proven,
   not assumed, because the previous attempt failed in exactly this way and was not noticed until
   later.
3. Enabling the rule must not reduce the number of real code-lint findings. Capture the finding
   count before and after.
4. The documented conventions must match what `15` actually implemented.

## Edge Cases & Error Handling

- **The parser-clobbering failure is silent.** Code linting appears to run and reports nothing.
  Verify by introducing a deliberate lint error in a `.tsx` file and confirming it is still caught
  with the structure rule enabled.
- **The rule will likely flag existing violations.** Decide up front whether it lands as `warn` and
  is promoted later, or as `error` with violations fixed first — and say which in the doc.
- **`CONVENTIONS.md` can drift** from the skill files that describe the same things. Cross-link
  rather than restate, the same way `docs/README.md` and the `documentation-structure` skill do.

## Acceptance Criteria

- [ ] `docs/CONVENTIONS.md` exists and covers file layout, barrels, variants naming, `displayName`,
      and the control-value contract.
- [ ] The folder-structure rule is enabled and running.
- [ ] A deliberately introduced TypeScript lint error is still caught with the rule enabled —
      demonstrating the parser regression has not returned.
- [ ] The code-lint finding count is no lower than before the rule was enabled.
- [ ] The conventions documented match the barrel strategy actually chosen in `15`.
