# The Storybook interaction suite (this repo)

Read this when the suite is red, when adding a story, or when the headless run and the dev server
disagree. Setup and the other gates are in [`SKILL.md`](SKILL.md).

```bash
cd apps/storybook && npx vitest run
```

Storybook `play()` functions in Playwright/Chromium, ~60–120s. **Local only, deliberately** — see
below. Component tests are always `play()` functions, never `.spec.tsx`; pure logic (hooks, utils)
uses `.spec.ts`. See `storybook-standards`.

Healthy is fully green with no failures. **Capture your own baseline before you start** rather than
trusting a number written down here, and compare failure _lists_, never a bare pass/fail. A suite
that is green on the 14th and red on the 15th looks like "someone broke it today"; the real cause
was a `Calendar` story seeding `useState(new Date())` and asserting the 15th was not selected. `15`
fixed it by freezing the clock for the whole suite in
`apps/storybook/.storybook/vitest.setup.ts` — `vi.useFakeTimers({ toFake: ['Date'] })`, `Date` only,
because blanket fake timers stall `userEvent`.

**Story count is not test count.** Every story is a test whether or not it has a `play()`, so adding
a `play()` to an existing story does not move the total. The skipped files are the `.mdx` docs
pages, which carry no tests.

## Traps

- **The suite has load-sensitive flakes.** Several `play()` functions `waitFor` an animation to
  finish — Radix's Accordion collapse, `Form`'s submissions — and the default 1000ms expires when
  the machine is busy. Observed 2026-08-24 across three consecutive full runs: two failures, in
  different files each time, both green in isolation, third run green. A dev server left running on
  port 6006 was enough to cause it. **Re-run the failing file alone before chasing a red run.**
- **A stack-trace line number is not a source line number.** A failure reported
  `Calendar.stories.tsx:233` in a 229-line file — the trace points into Storybook's instrumented
  copy. Find the assertion by text, not by line.
- **Vitest 4 removed `--reporter=basic`**. It fails with `Failed to load custom Reporter from
basic`, which reads like a config error rather than a removed flag. Use the default reporter, and
  capture output with `> file 2>&1` rather than piping through `tail` — otherwise the summary
  survives and the failure list you needed does not.

## CI runs no tests, deliberately

`.github/workflows/linting-action.yml` has three jobs — ESLint, Prettier, TypeCheck — and no test
job. Running Playwright/Chromium on every push costs money, and the components are not stable enough
yet to justify it. Do not "fix" this by adding a CI test job; it is a decision, to be revisited when
the component library settles. It does mean the suite is only ever as green as the last person who
ran it locally.

## Nothing here tests appearance, and that is a decision

`play()` asserts state. It cannot see a flash, a jump, a wrong colour or an animation that ends in
the wrong place — the tool for that is visual regression, and **this repo deliberately does not have
it** (confirmed 2026-08-24). Do not propose adding it as the fix for a visual bug; say the bug needs
a human to look at it.

`18` is the worked example. Closing a dialog flashed back to full opacity for about 60ms, because
`tw-animate-css` defaults `animation-fill-mode` to `none` and the overlay is deliberately held open
through its exit animation. The open state was correct, the closed state was correct, the suite was
green, and the defect lived entirely between the two.

After changing how a component _appears_ — animation, transition, z-order, opacity, transform — a
green suite is not evidence. Ask for eyes on it.

### But do not guess either — most of it is measurable

"The suite cannot see it" is not a licence to ship a plausible theory. Static properties answer some
questions on their own — a transition and a keyframe animation on the same property is a stutter
waiting to happen, so read `animationName`, `animationDuration`, `animationFillMode`,
`transitionProperty` and `transitionDuration` before theorising.

For anything that unfolds over time, **sample in real time.** Arm a `MutationObserver` for the
element appearing, then walk it with `setTimeout`, recording both what the style says and where the
box actually is:

```js
const tick = () => {
	const cs = getComputedStyle(panel);
	const r = panel.getBoundingClientRect();
	samples.push([
		Math.round(performance.now() - t0),
		cs.transform,
		r.left,
		r.height,
		panel.offsetParent?.tagName
	]);
	if (performance.now() - t0 < 700) setTimeout(tick, 16);
};
```

Three traps, each of which cost a wasted round trip on `18`:

- **Stepping `animation.currentTime` by hand only ever draws the ideal curve.** It interpolates the
  keyframes on demand, so it is perfectly smooth even when the real thing stutters, and a "monotonic,
  no stall" reading from it proves nothing. It answers "what should this look like", never "what does
  it look like". Use it to inspect keyframe values; never to clear an animation of a reported bug.
- **`getBoundingClientRect()` does not include a transform that is animating on the compositor.**
  It will sit at the untransformed position while `getComputedStyle().transform` reports movement.
  So the two disagreeing tells you the animation is composited — it is not evidence the element is
  failing to move. Confirm the element responds at all by setting `style.transform` by hand and
  re-reading the rect. A discontinuity in `offsetParent` or in the box's _size_, though, is a real
  layout change and can be trusted.
- **Check `visibilityState` rather than assuming.** A hidden pane freezes playback and
  `requestAnimationFrame`, which makes real-time sampling impossible and leaves manual stepping as
  the only option. Observed reporting `visible` with `setTimeout` unthrottled at ~30ms, so the good
  method was available all along.

Two more, about the CSS itself:

- **`duration-*` sets `transition-duration`, not just the animation's.** With `transition-property`
  at its initial `all`, that arms a transition on everything. Use tw-animate-css's
  `animation-duration-*` for a keyframe animation, and never the bare `transition` utility beside
  one.
- **A keyframe `animate-in` / `animate-out` always animates `transform`,** whatever it is asked to
  do. `tw-animate-css` builds both on one pair of keyframes containing `translate3d(…)`, so an
  element told only to fade still carries a transform for the length of that fade — and a
  transformed ancestor becomes the containing block for `position: fixed` descendants. On `18` this
  moved a Sheet's panel to a different containing block 150ms into a 500ms slide, which showed on
  `right` and `bottom` and hid on `left` and `top`. Fade a container with `transition-opacity` plus
  `starting:opacity-0`; keep `animate-in` for the things that genuinely move.

Finally: **do not report a visual fix as confirmed without one of these probes**, and not on a probe
alone if a person can just look. Say it is a hypothesis and ask for eyes, or measure it. Claiming a
shared root cause because two bugs appeared together is how the same bug gets "fixed" twice.

## Accessibility gates are opt-in, per file

`preview.ts` sets `a11y: { test: 'todo' }` globally — reports only, never fails. Individual files
opt into `a11y: { test: 'error' }` on their own `meta`, deliberately, because the rest of the
library has pre-existing violations. As of `17` that is `Button`, `Field`, `Dialog`, `Sheet`,
`Command` and `Select`.

**Two of those metas also disable a rule, and both exceptions are load-bearing.** `Command` and
`Select` switch off `scrollable-region-focusable` (the listbox is `tabindex="-1"` because
`aria-activedescendant` needs focus to stay on the input, and axe cannot see arrow-key scrolling)
and `aria-dialog-name` (Radix's `PopoverContent`). Each carries a comment saying why. Do not delete
them to "clean up" a red suite; the reasoning is in `docs/17-command-list-nesting/plan.md`.

Story or meta level `a11y.test` **overrides** the global, so setting `'off'` in `preview.ts` will
not silence `Button`. If exactly one file fails a11y assertions, that is why.

A failure whose selector points at `vite-error-overlay` is not an accessibility problem — axe is
scanning Vite's error overlay. Find the import that failed.

### A closed `<dialog>` is invisible to axe

Since `18` the overlays are native `<dialog>` elements, which are `display: none` until opened. axe
skips what it cannot see, so **a story that never opens its overlay hands the a11y gate an empty
page and passes for that reason.** Both overlay files had run at `error` since `14` while 25 of
their 27 stories did exactly that; opening them surfaced two real violations immediately.

Any new overlay story needs a `play()` that opens it, or its `a11y` gate is decorative.

## The stories glob must use `packages/*/src`, never `packages/**/src`

`apps/storybook/.storybook/main.ts` globs `../../../packages/*/src/**/*.stories.*`. The single `*`
is load-bearing and has a comment on it — do not "tidy" it into `**`.

pnpm symlinks every workspace package into its dependents' `node_modules/@repo/`, so `**` also
matches `packages/ui-forms/node_modules/@repo/ui-core/src/...`, plus nested hops like
`ui-forms/node_modules/@repo/ui-command/node_modules/@repo/ui-overlays/node_modules/@repo/ui-core/...`.

Storybook's own indexer ignores those; `@storybook/addon-vitest` does not. With `**` the suite
collected **166 story files for ~30 components**, 97 of them unservable duplicates that each failed
to import and left a Vite error overlay in the shared page — which then failed `Button`'s a11y gate
on the _overlay's_ markup. Fixing it roughly halved the run time. The point is the ratio, not the
absolute numbers.

`test.exclude: ['**/node_modules/**']` in `apps/storybook/vite.config.ts` does **not** fix this.
`storybookTest` builds its `include` from Storybook's file matcher as explicit paths, so there is no
glob left to filter. The stories glob is the only lever.

## Diagnosing "headless fails, dev server is fine"

There is no separate test config: `apps/storybook/vite.config.ts` points
`storybookTest({ configDir })` at the same `.storybook` directory. Same `main.ts`, same
`preview.ts`.

Fastest check — start the dev server, then in the browser console:

```js
fetch('/index.json')
	.then((r) => r.json())
	.then((j) => {
		const paths = [...new Set(Object.values(j.entries).map((e) => e.importPath))];
		console.log({ entries: Object.keys(j.entries).length, files: paths.length });
	});
```

Compare `files` with `cd apps/storybook && npx vitest list --filesOnly`. **If Vitest's count is
higher it is collecting files Storybook never indexed, and that difference is the bug.** No stored
baseline is needed: the two numbers are checked against each other, and neither should include
anything under `node_modules`.

The dev server runs on port 6006 via `.claude/launch.json` (`preview_start` with name `storybook`).
