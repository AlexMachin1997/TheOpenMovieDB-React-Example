# 16 — Type-hygiene cleanup

Status: **shipped.** This is the as-built record. The [spec](spec.md) describes the world as it was
believed to be; this describes what was actually found.

## Summary

Both rules are now `error`, and `pnpm lint` reports **0 errors, 0 warnings**, down from 38.

Two things about the spec turned out to be wrong, and one of its judgements turned out to matter more
than the goal it sat under:

- **The scale was understated by nearly 4×.** The spec estimated "around 10 candidate sites"; the
  measured baseline was **38**, against the 39 originally deferred by `06`. Essentially nothing had
  been cleaned up in the interim.
- **33 of the 38 were not debt.** They were one deliberate idiom — a prop interface named after its
  component. Converting them would have fought a convention applied to ~134 types.
- **The spec's own edge-case clause was the load-bearing instruction**, not its Goal 2. "An empty
  object type is sometimes intentional… the fix may be a clearer expression rather than a different
  type" is exactly what applied, and following Goal 2 literally would have produced a worse codebase.

Only **5** violations were fixed by changing code. The other 33 were resolved by configuring the rule
to the convention already in force. Two `eslint-disable` blocks were also removed — they predated the
deliverable and would otherwise have survived it untouched.

## The count: 38, not ~10

`spec.md:18-20` reasoned from a scan that missed every declaration whose `extends` wraps onto a
second line. `DropdownMenu.types.ts` alone hides 9 that way. The "~10" is close to the correct
`no-explicit-any` count of 5 and ignores the empty-interface backlog entirely.

Measured baseline, before any edit:

| Package       | `no-empty-object-type` | `no-explicit-any` | Total  |
| ------------- | ---------------------- | ----------------- | ------ |
| `ui-core`     | 13                     | 5                 | **18** |
| `ui-overlays` | 20                     | 0                 | **20** |
| `ui-command`  | 0                      | 0                 | 0      |
| `ui-forms`    | 0                      | 0 (suppressed)    | 0      |
| apps          | 0                      | 0                 | 0      |
| **Total**     | **33**                 | **5**             | **38** |

This was derived by grep first and **then** confirmed against a real `pnpm lint` run, which reported
exactly `18 problems` in `ui-core` and `20 problems` in `ui-overlays`. Deriving it first is what made
the multi-extends exemption below discoverable — the arithmetic only closed once it was accounted
for.

## The rule does not report multi-extends interfaces

There are **39** empty `interface X extends … {}` declarations in the tree, but only **33** are
reported. Verified from the installed rule rather than inferred —
`@typescript-eslint/eslint-plugin@8.40.0`, `dist/rules/no-empty-object-type.js:68-73`:

```js
if (
	node.body.body.length !== 0 ||
	(extend.length === 1 && allowInterfaces === 'with-single-extends') ||
	extend.length > 1
) {
	return; // ← not reported
}
```

The six exempt ones are `IAlert`, `ICommandSearch`, `ICommandGroupedVirtualizedList`,
`ICommandGroupedList`, `ICommandVirtualizedList` and `ICommandListItems`. This is why `ui-command`
contributed **zero** warnings despite holding five empty interfaces.

**This detail is load-bearing.** Without it the inventory does not reconcile to the 18 / 20 split,
and the work would have edited six files it must not touch.

## Decision: configure the rule, don't convert 33 files

```js
'@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
'@typescript-eslint/no-explicit-any': 'error'
```

All 33 are the same shape — a pass-through prop interface with one supertype and no members:

```ts
/** Properties for the Tabs root component. */
export interface ITabs extends React.ComponentProps<typeof TabsPrimitive.Root> {}
```

The `I` prefix is **load-bearing**: it lets a prop interface be named after the component it
describes without colliding with it (`Tabs` the component, `ITabs` its props). The alternative —
converting each to `export type ITabs = …` — would have produced 41 type aliases still called `I`,
naming an interface that is not one, while leaving ~100 `I*` interfaces untouched. That is less
coherent than where it started, not more.

**The option also makes the rule self-consistent.** It already exempted `interface A extends B, C {}`
unconditionally; there was no coherent reason two supertypes should be fine and one should not.

### What still errors

Narrow, and verified by probe rather than assumed:

| Probe                                                | Result     |
| ---------------------------------------------------- | ---------- |
| `const x: any = 1;`                                  | error      |
| `interface Empty {}`                                 | error      |
| `type Obj = {};`                                     | error      |
| `interface P extends React.ComponentProps<'div'> {}` | **passes** |

The first three ran together: 3 errors, exit 1. The fourth ran alone: clean, exit 0.

**The fourth probe is the one that matters.** It is the only check that distinguishes "option
applied" from "option typo'd into a no-op" — which would silently disable the rule for precisely the
case it is meant to allow. A green lint run proves nothing on its own here.

A bare `{}` means "any value except `null`/`undefined`", not "an empty object". That is where this
rule earns its keep, and it is untouched.

### This deviates from spec Goal 2, deliberately

Goal 2 says "existing violations are fixed with real types, not suppressed". For the 33, this
instead rules that they were never violations in this codebase's terms. That is a real deviation, not
a technicality, and it is recorded here rather than hidden behind a ticked checkbox.

It is licensed by `spec.md:57-58` — confirm intent before changing the shape — and intent was
confirmed explicitly during planning. Requirement 3 ("both rules must be `error`") and Goal 1 ("a new
violation fails the build") are met in full.

## The 5 counted violations: story `play()` signatures

`DebouncableInput.stories.tsx:35,62,77,91` and `Search.stories.tsx:58` carried
`play: async ({ … }: any)`. These were suppression, not a compiler-forced escape hatch — the same
`Search.stories.tsx` already had an un-annotated `play` at line 37 under the same `meta`, and the
repo's other ~100 play sites destructure bare.

Deleting the annotations type-checked unchanged, so neither file's `meta` needed promoting to
`satisfies Meta<typeof X>`. (It probably still should be — both use the annotation form that
`storybook-standards` advises against, along with 64 other files. Out of scope here.)

## `validators?: any` — replaced, not documented

The plan originally proposed narrowing two file-level `eslint-disable` blocks and giving each a
written reason. **That was the wrong call, and challenging it produced a better result.** TanStack
does ship a type for this.

`@tanstack/react-form@1.23.8` re-exports `@tanstack/form-core@1.24.4`, whose `FieldApi.d.ts:56`
declares `FieldValidators<…>` — the actual type of `form.Field`'s `validators` prop
(`FieldApi.d.ts:152`). It takes twelve generic parameters, which is presumably why nobody wanted it.
It does not need naming:

```ts
export type FieldValidatorsLike = NonNullable<Parameters<IFormApiLike['Field']>[0]['validators']>;
```

The same indexing is already used at `Form.types.spec.ts:35`. `Form.types.ts`'s rationale for `any`
does not reach this case: it argues the _form's_ generic slots stay open so components accept any
validator configuration, which is a different claim from the type of a per-field prop. Pinning
`TParentData`/`TName` to `any`/`string` is exactly what makes the derived type expressible.

### It is a real tightening

Proved with a throwaway probe rather than asserted:

```
onChagne: () => 'nope'   -> TS2561  "Did you mean to write 'onChange'?"
onChange: 42             -> TS2322  not assignable to FieldValidateOrFn<any, string, any>
onChange: () => 'Required' -> accepted
```

It resolves to `FieldValidators<any, string, any, FieldValidateOrFn<any, string, any> | undefined, …>`.
All 13 story files in `ui-forms`' tsconfig scope still compile.

`validators` was the only `any` in either file, so both `eslint-disable` blocks are **gone** rather
than better-commented. `Form.types.ts` keeps its own — those twelve `any`s are load-bearing and
already argued at length in-file.

### Pinned against regression

`Form.types.spec.ts` gained assertions that the derived type is not `any` and carries
`onChange`/`onBlur`/`onSubmit`. A derivation that silently collapsed to `any` would typecheck
everywhere and check nothing, so the assertion is the whole point.

**The assertion was itself verified** by inverting it to `.toBeAny()` and confirming it fails
(TS2349). A type assertion that cannot fail is worse than none.

Only `check-types` runs these — `vitest run` does not typecheck.

## Acceptance criteria

- [x] Both rules are `error` in `packages/eslint-config/base.js`.
- [x] `pnpm lint` is green with no new `eslint-disable` comments — the count went **down** by two.
- [x] `check-types` no worse than before: 19/19 tasks, green.
- [x] Any violation deliberately left unfixed is recorded — see the Goal 2 deviation above.

## Verification

All from a forced build, so nothing is a cross-worktree cache replay:

| Gate            | Result                                    |
| --------------- | ----------------------------------------- |
| Build           | 11/11 successful, 0 cached, 1m30.9s       |
| Lint            | 11/11, **0 errors, 0 warnings** (from 38) |
| Types           | 19/19 successful                          |
| Prettier        | `--check` clean across the repo           |
| Component tests | 385 passed, 27 skipped (68 files), cold   |

## Corrections made

- The plan claimed `FormField.types.ts` already imported from `~/components/Form/Form.types`. It did
  not; the `IFormApiLike` import had to be added.
- The plan's first draft proposed converting all 33 to type aliases. Reversed during review, for the
  naming reason above.
- The plan's second draft proposed narrowing the two `ui-forms` disables. Superseded by deriving a
  real type, which removed them instead.
- `ITextarea` was returned to `interface … extends` form mid-implementation, now that the rule
  accepts it. Its explanatory comment was removed rather than rewritten — it is the same idiom as the
  other 33 prop interfaces, so there is nothing left to explain.

## Found, not adopted

- **`ICheckboxField` and `ISwitchField` are still `type` aliases** (`fields.types.ts:76,79`) while
  `ITextarea` is now an interface. Both lint clean, so this is cosmetic — but the tree is now mixed
  where it was previously consistent-by-accident. Worth settling in `13`.
- **`IPopoverContent` and `IDialogOverlay` redeclare `className?: string`** over a base that already
  provides it. These may well have been added to dodge this very rule when it was first switched on.
  Now that the idiom lints clean, the workaround is redundant. Refactoring, not typing — not adopted.
- **64 story files use `const meta: Meta<typeof X> = {`** where `storybook-standards` mandates
  `satisfies`. Unrelated to this deliverable's rules.
- **The CI Prettier job rewrites its own checkout and always passes**
  (`.github/workflows/linting-action.yml`). Pre-existing, already recorded in `local-development`.
