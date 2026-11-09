# 21 — Image

Status: **in progress.** Implements [`spec.md`](spec.md). Approved 9 November 2026. Whether the
ratio form looks right is left to review once it renders in Storybook.

## Decisions for review

The spec settles behaviour. These are the shapes it left open, each with what this plan does.

1. **The public type is a union, not an interface.** Requirements 3–5 and 15 are mutual exclusions,
   which an interface cannot express. This is the stated exception `13` allows for a genuine union.

   ```ts
   type ImageRatio = '2/3' | '16/9';

   type ImageShape =
   	| { width: number; height: number; ratio?: never; unsized?: never }
   	| { ratio: ImageRatio; width?: never; height?: never; unsized?: never }
   	| { unsized: true; width?: never; height?: never; ratio?: never };

   type ImageName = { alt: string; decorative?: never } | { decorative: true; alt?: never };

   export type IImage = Omit<
   	React.ComponentProps<'img'>,
   	'width' | 'height' | 'alt' | 'src' | 'aria-label' | 'title'
   > &
   	ImageShape &
   	ImageName & {
   		src?: string | null;
   		fallback?: string;
   	};
   ```

2. **`ratio` ships two literals, `'2/3'` and `'16/9'`.** Those are the only shapes the 11 call sites
   need (see [Migration notes](#migration-notes)). The literal is the CSS `aspect-ratio` syntax.
   Adding one later is one line in the union and one in the class map. `'1/1'` is left out because
   its only candidate, `Review`, moves to `Avatar`.
3. **The opt-out is `unsized`.** It is the explicit form requirement 3 asks for.
4. **`number` is as far as the type goes.** It rejects `'250px'` (AC3) but cannot reject `1.5`.
   TypeScript has no integer type.
5. **The built-in fallback is a transparent 1×1 GIF data URI with `bg-muted` painted behind it.** It
   is one `<img>` (requirement 1), makes no request (AC10), and the token flips under `.dark` (AC12).
   The `alt` stays the caller's. The fallback is a flat muted fill with no icon: an icon would need
   either a wrapper element or a fetched or sandboxed SVG, and all three are ruled out.
6. **Default classes.** The ratio form gets `w-full object-cover` plus the ratio class. The intrinsic
   form gets nothing, because Tailwind preflight already sets `img { max-width: 100%; height: auto }`,
   which is what lets the browser derive the ratio from the attributes. The fallback adds `bg-muted`.
   All of these go through `cn`, so a caller's `object-contain` or `w-[300px]` replaces the default
   rather than fighting it (AC20, requirement 7).
7. **`onLoad` is forwarded for whichever source settles, the built-in fallback included.** A caller
   who hides a `Skeleton` on load therefore always clears it. `onError` fires once, for the primary
   `src` only (requirement 12). An empty or missing `src` is not a failure, so it does not fire.
8. **Warnings follow `Button`: ungated `console.warn` with an `[ui-core] Image:` prefix.** The spec
   says "warn in development". `import.meta.env.DEV` cannot express that here, because Vite's library
   build replaces it with `false` in `dist/`, so the app would never see a warning. Every existing
   warning in `ui-core` and `ui-overlays` is ungated. If "development only" is a hard requirement,
   the alternative is `process.env.NODE_ENV !== 'production'`, which needs proving in both the app
   and Storybook builds before relying on it.
9. **The `className`-sizing warning (spec edge case) is a measurement, not a class-name parse.** After
   layout, if the rendered box's ratio is more than 2% away from `ratio`, warn. This catches the
   failure itself (`PersonSidebar`'s fixed width and height) rather than guessing at Tailwind class
   names. A box with zero width (`hidden md:block` on mobile) is skipped.

## Baseline

Taken 9 November 2026 on `f424d7a`, after `pnpm install` and a forced build.

| Gate                           | Result                                     |
| ------------------------------ | ------------------------------------------ |
| `pnpm turbo run build --force` | ✅ 11/11, 0 cached, 1m05s                  |
| `pnpm turbo run lint --force`  | ✅ 0 errors, 0 warnings, 54s               |
| Storybook suite                | ✅ 418 passed, 43 files passed, 27 skipped |

## Spec claims re-measured

| Claim                                     | Measured 9 Nov 2026                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| 10 consumers                              | ✅ 10 files, 11 call sites (`Menu` has two)                                 |
| Only the footer logo passes integers      | ✅                                                                          |
| Four `aspect-*` classes, three contradict | ✅ `Card`, `Recommendation`, `MostRecentEpisode` contradict; `Video` agrees |
| `PersonSidebar` fights with `!important`  | ✅ `width='unset' height='unset'` + `!h-[450px] !w-[300px]`                 |
| Dark mode is class-based                  | ✅ `packages/tailwind-config/src/globals.css:4`                             |

## Files

All new, in `packages/ui-core/src/components/Image/`: `Image.tsx`, `Image.types.ts`,
`Image.variants.ts` (the ratio → class map), `Image.types.spec.ts`, `Image.stories.tsx`, `Image.mdx`
and `index.ts`. Plus two export lines in `packages/ui-core/src/index.ts`, and the image fixture
plugin in `apps/storybook/.storybook/` (see [Testing strategy](#testing-strategy)).

The app's own `Core/Image` is not touched. Migration is the separate change the spec names.

## Tasks

Each phase is verified and committed before the next starts.

### Phase 1: Types

- [ ] `Image.types.ts` as in decision 1, with per-prop JSDoc.
- [ ] `Image.types.spec.ts`: one `@ts-expect-error` line each for a CSS length (AC3), no shape (AC4),
      both shapes (AC5), and `alt` with `decorative`. `vitest run` does not type-check, so
      `pnpm check-types` is the gate. Prove it fires first by deleting one `@ts-expect-error` and
      watching the build fail.

### Phase 2: Rendering

- [ ] `Image.tsx`: one `<img>`, `loading='lazy'` default, shape → attributes or class, `alt` only,
      no `aria-label` and no `title`, native attributes passed through.
- [ ] Stories with `play()` for AC1, AC2, AC6, AC8, AC18, AC19 and AC20.

### Phase 3: Fallback and callbacks

- [ ] The cascade from primary to caller `fallback` to built-in, held in state keyed on `src`, so a
      new `src` resets during render with no effect (AC15) and the same `src` never retries (AC16).
- [ ] An empty or missing `src` goes straight to the built-in fallback and never reaches the DOM
      (AC11).
- [ ] Stories with `play()` for AC7, AC9, AC10, AC11, AC12, AC14, AC15 and AC16.

### Phase 4: Warnings

- [ ] The failing caller `fallback`, named in the message (AC13). No warning when only the primary
      fails.
- [ ] `alt=""` without `decorative` (AC17).
- [ ] A ratio that is not taking effect (decision 9).
- [ ] Stories that spy on `console.warn` for each, plus one asserting the primary-only failure stays
      silent.

### Phase 5: Docs and export

- [ ] `Image.mdx`: when to use intrinsic size or ratio (SC5), the `className` obligation, decorative
      images, the fallback, and composing `Skeleton` with `onLoad`.
- [ ] Export `Image`, `IImage` and `ImageRatio` from the package root.
- [ ] Rewrite this file as the as-built record and move `21` to ✅ done in the roadmap.

## Testing strategy

Component behaviour is tested with Storybook `play()`, never `.spec.ts` files. Types are tested in
`Image.types.spec.ts` through `check-types`.

**Network conditions come from a fixture route on the Storybook dev server**, added after approval
at the user's request to mock failures, offline and slow connections. It is a small Vite plugin in
`apps/storybook/.storybook/`, with no new dependency. It serves a labelled SVG of any size at
`/__image-fixture`, and query parameters choose the behaviour:

| Query         | Behaves like                                                |
| ------------- | ----------------------------------------------------------- |
| `w=300&h=450` | A real image of that intrinsic size                         |
| `delay=2000`  | A slow or mobile connection: the response starts after 2s   |
| `hang`        | A request that never completes, for measuring "before load" |
| `status=500`  | A server error                                              |
| `abort`       | No connectivity: the socket is dropped with no response     |

The techniques the ACs need:

| Need                      | How                                                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A failing source          | `status=500` or `abort` on the fixture route. Both are real network failures, so the component's `error` path runs exactly as it would in the app.               |
| "No request was issued"   | `performance.getEntriesByType('resource')` after the failure has nothing beyond the primary request: not for a fallback, not for the document URL (AC10, AC11).  |
| "Before the source loads" | `hang` on the fixture route, so the box is measured while the request is still open (AC1, AC2).                                                                  |
| Both colour schemes       | The same story twice, once inside `<div className='dark'>`. Compare the fallback's computed `background-color` with a `bg-muted` probe in the same scope (AC12). |

AC15 and AC16 need `src` to change after a failure. A story `render` with a button that swaps `src`
does that. It is a test fixture for the component's own reset behaviour, not app state.

## Risks

| Risk                                             | Mitigation                                                                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| The fixture route is not served in headless runs | The Vitest config may not apply `main.ts`'s `viteFinal`. Prove the route answers in a headless story before writing any test that depends on it. |
| The ratio warning fires on legitimate layouts    | It only compares the box with its own `ratio`, which a correct layout always matches. The 2% tolerance absorbs sub-pixel rounding.               |
| `cover` crops posters badly                      | The spec defers this to rendered output. Phase 2 stories show a real 2:3 poster in a 16:9 box and the reverse.                                   |

## Migration notes

How each current call site maps onto the new API (SC6). This is a record for the migration change,
not part of this deliverable's work.

| Call site              | Today                                                 | New                                                                                                                                               |
| ---------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Card`                 | `width='100%' height={imageHeight}` + `aspect-square` | `ratio='2/3'`. The width comes from the card. `imageHeight` (175–265px across four callers) retires, so card heights change. Check them visually. |
| `Recommendation`       | `250px` × `141px` + `aspect-square`                   | `ratio='16/9' className='w-[250px]'`                                                                                                              |
| `Review`               | `4rem` round photo                                    | Not an `Image`. Use `Avatar` (spec non-goal).                                                                                                     |
| `MostRecentEpisode`    | `130px` × `230px` + `aspect-square`                   | `ratio='2/3' className='w-[130px]'`. Height becomes 195px, not 230px.                                                                             |
| `Video`                | `300px` × `169px` + `aspect-video`                    | `ratio='16/9' className='w-[300px]'`                                                                                                              |
| `EntertainmentHeader`  | `300px` × `450px`, `loading='eager'`                  | `ratio='2/3' className='w-[300px]' loading='eager'`                                                                                               |
| `Footer`               | `width={140} height={140}`                            | Unchanged.                                                                                                                                        |
| `Menu`, square logo    | `75px` × `40px`                                       | `width={75} height={40}`                                                                                                                          |
| `Menu`, wide logo      | `190px` × `20px`                                      | `width={190} height={20}`                                                                                                                         |
| `EntertainmentSidebar` | `80px` × `40px` network logo                          | `width={80} height={40} className='object-contain'`. Logos vary in shape and must not be cropped.                                                 |
| `PersonSidebar`        | `unset` + `!h-[450px] !w-[300px]`, `title`            | `ratio='2/3' className='w-[300px]'`. Drop `title`.                                                                                                |

Every call site also drops `label` and keeps one `alt`. The current `label` strings are the better
names (`` `Poster for ${title}` `` rather than `title`), so `alt` takes the `label` value.

## Acceptance criteria

Walked at close, with evidence beside each. From [`spec.md`](spec.md).

- [ ] **AC1** — Given integer `width` and `height`, when the page renders before the source has
      loaded, then the element occupies a box of that ratio.
- [ ] **AC2** — Given a `ratio` and no intrinsic size, when the page renders before the source has
      loaded, then the element occupies a box of that ratio.
- [ ] **AC3** — Given a CSS length such as `'250px'` passed as `width`, when the code is type-checked,
      then it fails to compile.
- [ ] **AC4** — Given neither a `ratio` nor an intrinsic size and no explicit opt-out, when the code is
      type-checked, then it fails to compile.
- [ ] **AC5** — Given both a `ratio` and an intrinsic size, when the code is type-checked, then it
      fails to compile.
- [ ] **AC6** — Given a `ratio` and a source of a different shape, when the rendered image is
      measured, then it fills the box and its content is not distorted.
- [ ] **AC7** — Given a named image that fails to load, when assistive technology reads the element,
      then it announces the name the caller supplied and says nothing about the failure.
- [ ] **AC8** — Given a named image, when the rendered markup is inspected, then the name appears once
      and there is no `aria-label` or `title` on the element.
- [ ] **AC9** — Given an image marked decorative, when assistive technology traverses the page, then
      the element is not reachable — whether or not it loaded.
- [ ] **AC10** — Given an image that fails to load, when network activity is inspected, then no
      request was issued as a result of the failure.
- [ ] **AC11** — Given an empty `src`, when the rendered markup is inspected, then no request for the
      current document URL was issued and the fallback is shown.
- [ ] **AC12** — Given a failed image in each colour scheme, when the fallback is inspected, then it
      matches the scheme in use, including when the scheme is set by the app rather than by the OS.
- [ ] **AC13** — Given a caller-supplied `fallback` that also fails, when the element settles, then the
      built-in fallback is shown and a development warning names the failing fallback.
- [ ] **AC14** — Given a caller passing `onError`, when the image fails, then the fallback is shown
      **and** the caller's handler is invoked exactly once.
- [ ] **AC15** — Given an image that has failed, when `src` is changed to a working source, then the
      image loads and the fallback is no longer shown.
- [ ] **AC16** — Given an image that has failed, when the same source later becomes available, then
      nothing changes.
- [ ] **AC17** — Given `alt=""` with no explicit decorative marking, when the component renders in
      development, then it warns.
- [ ] **AC18** — Given a caller passing `loading`, `decoding`, `srcset`, `sizes` or `fetchpriority`,
      when the rendered markup is inspected, then each appears on the `<img>` unchanged.
- [ ] **AC19** — Given no `loading` value, when the rendered markup is inspected, then
      `loading="lazy"` is present.
- [ ] **AC20** — Given a caller sizing the element through `className`, when the element is measured,
      then the class takes effect without `!important`.

## Success criteria

- [ ] **SC1** — Every image the component renders reserves its layout space before the source loads,
      unless the caller has explicitly opted out.
- [ ] **SC2** — There is exactly one way to name an image, and it is the one assistive technology
      reads.
- [ ] **SC3** — No network request is issued as a result of an image failing.
- [ ] **SC4** — Every shape the app's current call sites need is expressible through the new API
      without `!important`, demonstrated in Storybook rather than asserted.
- [ ] **SC5** — A caller can tell from the documentation which of intrinsic size and ratio their case
      wants.
- [ ] **SC6** — The mapping from each current prop shape to the new API is written down.
