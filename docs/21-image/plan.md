# 21 — Image

Status: **shipped.** As-built record for [`spec.md`](spec.md). Left open on purpose: whether
`ratio`'s default crop (`object-cover`) is right for posters, a judgement for Storybook; and AC10 /
SC3, partly met until `Icon` bundles its data (decision 5).

## Outcome

`@repo/ui-core` exports `Image`: a single `<img>` that reserves its box before it loads, takes its
only name from `alt`, and falls back locally, first to a caller's `fallback` and then to a muted box
painted from theme tokens. Its stories run against real network behaviour (slow, failing, offline)
served by a fixture route on the Storybook dev server. The app's own `Core/Image` is untouched;
migrating its 11 call sites is the separate change the spec names, mapped in
[Migration notes](#migration-notes).

## Gates

| Gate                           | Baseline (`f424d7a`)                | After                               |
| ------------------------------ | ----------------------------------- | ----------------------------------- |
| `pnpm turbo run build --force` | ✅ 11/11, 0 cached                  | ✅ 11/11, 0 cached                  |
| `pnpm turbo run lint --force`  | ✅ 0 errors, 0 warnings             | ✅ 0 errors, 0 warnings             |
| `npx prettier --check .`       | —                                   | ✅ (feature files)                  |
| Storybook suite                | ✅ 418 passed, 43 files, 27 skipped | ✅ 437 passed, 44 files, 28 skipped |
| `ui-core` unit tests           | not run; 62 by subtraction          | ✅ 69 passed (+7 type cases)        |

## Acceptance criteria

Evidence is the story or spec case that settles each; every story runs in the suite above.

- [x] **AC1** — `IntrinsicSize`: a 140×140 box measured while `img.complete` is still `false` (1.5s
      delayed response), unchanged after load. Proved: removing `width={width}` made the box 0px wide.
- [x] **AC2** — `Ratio`: a 300×450 box before a 1.5s delayed response, no `width`/`height` attributes.
- [x] **AC3** — `Image.types.spec.ts`, `'250px'` as `width` and as `height`. Proved by deleting the
      directive: `TS2322`.
- [x] **AC4** — `Image.types.spec.ts`, no shape and one dimension only. Proved the same way.
- [x] **AC5** — `Image.types.spec.ts`, `ratio` with `width`/`height`, and `ratio` with `unsized`.
      Proved the same way.
- [x] **AC6** — `RatioWithAnotherShape`: a 2:3 source in a 16:9 box keeps the box at 1.78 with
      `object-fit: cover`.
- [x] **AC7** — `FailedToLoad`: after a 500, `getByRole('img', { name: 'Poster for Dune: Part Two' })`
      is the same element. Nothing about the failure is in its name.
- [x] **AC8** — `Named`: `alt` present, no `aria-label`, no `title`. Both are also removed from the
      type.
- [x] **AC9** — `Decorative`: `queryAllByRole('img')` is empty for a loaded and a failed decorative
      image, before and after the failure.
- [ ] **AC10** — partly met, by decision. No _image_ request follows a failure: `FailedToLoad` and
      `Offline` find nothing in the Resource Timing buffer beyond the primary, and the same query
      counts the one failed request in `SrcChangesAfterFailure`, so it is not vacuous. But the
      built-in fallback renders `Icon`, which fetches `image-off` from Iconify's CDN the first time
      it appears on a page. Accepted with decision 5, until `Icon` bundles its data.
- [x] **AC11** — `EmptySrc`: fallback shown at once, no `<img>` in the page, and no image request.
- [x] **AC12** — `BothColourSchemes`: in a light and a `.dark` panel, the fallback's computed
      background equals a `bg-muted` swatch in the same panel, and the two panels differ, as does the
      icon's colour. The scheme is the app's class, not the OS setting.
- [x] **AC13** — `CustomFallbackFails`: ends on the built-in fallback, one warning containing the
      fallback's URL. _Deviation:_ the warning is not limited to development; see decision 8.
- [x] **AC14** — `FailedToLoad` (one call), and `CustomFallbackFails` (still one call when the
      fallback fails too).
- [x] **AC15** — `SrcChangesAfterFailure`: a new `src` clears `data-state` and loads. Proved:
      disabling the reset made it fail.
- [x] **AC16** — `SrcChangesAfterFailure`: 500ms after failing, still on the fallback, with exactly
      one request for the broken URL.
- [x] **AC17** — `EmptyAlt` warns; `Decorative` does not. _Deviation:_ not limited to development;
      see decision 8.
- [x] **AC18** — `NativeAttributes`: `loading`, `decoding`, `fetchpriority`, `sizes` and `srcset`
      all on the `<img>` unchanged.
- [x] **AC19** — `Named`: `loading="lazy"` with no `loading` passed.
- [x] **AC20** — `SizedByClassName`: `w-[130px]` gives 130×195 with no `!important`.

## Success criteria

- [x] **SC1** — No shape does not compile (AC4); the opt-out is the explicit `unsized`.
- [x] **SC2** — `alt` is the only naming prop, and is what `getByRole` resolves (AC7, AC8).
- [ ] **SC3** — partly met: no image request (AC10, AC11), but `Icon`'s one CDN fetch per page.
- [x] **SC4** — Every mapping in the [migration notes](#migration-notes) has a story: 2:3 at 300px and
      130px, 16:9 at 320px, `object-contain` with a ratio, a logo at its real proportions (`Logo`),
      and a logo of unknown width (`LogoOfUnknownWidth`). None needs `!important`. Both logo
      mappings were also checked against the real TMDB files in Chrome: 140×101 and 190×25, the
      same before and after load.
- [x] **SC5** — `Image.mdx`, "Choosing a shape": a table of which form fits what you know, and a
      default for when in doubt.
- [x] **SC6** — [Migration notes](#migration-notes).

## Follow-ups

- **Migrate the app's 11 call sites** onto this component, using the table below. Not started; the
  spec scopes it out.
- **Review the `cover` default** against real posters. `RatioWithAnotherShape` and `RatioContained`
  in Storybook show the two side by side.

---

## Decisions

The spec settled behaviour. These are the shapes it left open.

1. **The public type is a union, not an interface.** The shape (intrinsic size, ratio, or
   `unsized`) and the name (`alt` or `decorative`) are each exactly one choice, which an interface
   cannot express. `IImage` follows `ILabel`'s documented exception for a genuine union.
2. **`ratio` has two literals, `'2/3'` and `'16/9'`**, the only shapes the call sites need, in CSS
   `aspect-ratio` syntax. Adding one is a line in `ImageRatio`, `imageVariants` and `RATIO_VALUES`.
   `'1/1'` was left out because its only candidate, `Review`, moves to `Avatar`.
3. **The opt-out is `unsized`**, the explicit form requirement 3 asks for.
4. **`number` is as far as the type goes.** It rejects `'250px'` but cannot reject `1.5`.
5. **The built-in fallback is a `<span role="img" aria-label={alt}>` holding `<Icon name='image-off'>`,
   in `bg-muted` / `text-muted-foreground`.** _Changed after review._ It first shipped as a flat fill
   on the `<img>` (a transparent SVG data URI), which read as an empty space; an icon cannot live
   inside an `<img>`. The user chose the existing `Icon` over hand-inlined SVG backgrounds, accepting
   two spec relaxations in the failed state only: requirement 1 (a `<span>` replaces the `<img>`) and
   requirement 21 (`aria-label` carries the name, since `alt` names nothing without an image). It
   also inherits `Icon`'s CDN fetch, so requirement 9 holds for the box and name but not the glyph
   until `Icon` bundles its data, a planned enhancement. Integer sizes become an `aspect-ratio` and a
   default width through `--image-width`, so `className` still overrides them.
6. **Default classes.** The ratio form gets `w-full object-cover` and the ratio class. The integer
   form gets none, because Tailwind's preflight already sets `max-width: 100%; height: auto` on
   `img`. Everything goes through `cn`, so `object-contain` or `w-[300px]` replaces the default.
7. **`onLoad` fires for `src` and a caller `fallback`, not for the built-in fallback**, which is not
   an image. The documented `Skeleton` recipe clears on `onError` too. `onError` fires once, for the
   primary only. A missing `src` is not a failure. A caller's `ref` is `null` while the built-in
   fallback shows.
8. **Warnings are ungated `console.warn` with an `[ui-core] Image:` prefix, like `Button`'s.** The
   spec says "warn in development". `import.meta.env.DEV` is replaced with `false` by Vite's library
   build, so the app would never see the warning. Every existing warning in the library is ungated.
   `process.env.NODE_ENV` remains the unproven alternative if production silence is required.
9. **The `className`-sizing warning measures the rendered box** against `ratio` (2% tolerance)
   rather than parsing class names. Zero-size boxes, such as `hidden md:block` on mobile, are skipped.

## What we hit

- **A 1×1 fallback pixel turned an integer-sized box square.** With `width` and `height` set, the
  box's ratio is `aspect-ratio: auto w / h`, and `auto` lets the loaded image's own ratio win over
  the attributes. The planned 1×1 GIF made a 2:3 box 1:1 the moment it loaded, so it became an
  empty SVG at the caller's own dimensions. Superseded when the built-in fallback became a `<span>`
  (decision 5), which gets the same shape from `aspect-ratio` and `--image-width` instead.
- **`srcSet` would outrank the fallback.** A candidate list beats `src`, so leaving it on the element
  would keep loading the failed candidates. `srcSet` and `sizes` are dropped off the primary stage.
- **A request that never answers starves the whole suite.** The planned `hang` fixture would hold
  one of Chromium's six HTTP/1.1 connections to the dev server for the rest of the run, blocking
  module loads for later stories. Replaced by a bounded `delay` (capped at 10s in the plugin), with
  "before load" measured while `img.complete` is still `false`.
- **The union strips Storybook's `play` inference**, as `storybook-standards` predicts. One
  `PlayContext` alias in the stories file, with `loaded` typed `Record<string, unknown>` because
  that is what Storybook gives a loader.
- **react-docgen reads nothing from a type-alias props type**, so the meta declares `argTypes` by
  hand and the MDX uses `<ArgTypes />`. Checked in the dev server: the props table has all 12 rows.
- **`Image.utils.ts` was not an allowed file name.** `folderStructure` only allowed a `utils/`
  folder, a record of the folders that existed when `13` wrote it rather than a decision. The
  helpers were parked in `.constants.ts`, then split into `utils/`, and finally settled: helpers
  owned by one component go in `{Component}.utils.ts`, and a `utils/` folder is for chunky or
  shared ones. The rule now allows `{FolderName}.utils.ts` and `.utils.spec.ts`.
- **Integer sizes only hold when they are the file's own proportions.** With `width` and `height`,
  the box's ratio is `aspect-ratio: auto w / h`, and `auto` yields to the file's ratio once it
  loads. The first migration notes passed each logo's slot size, so every logo row was wrong:
  measured on the real TMDB files, `Footer`'s 140×140 shrank to 140×101 on load and `Menu`'s
  190×20 grew to 190×25. Logos now map to their `viewBox` proportions, and a logo of unknown width
  to `unsized` with a fixed height.
- **Exact pixel comparisons fail on a scaled display.** At a device pixel ratio of 1.65, a 300px box
  measures `299.99997`. Headless Chromium runs at 1, so the suite was green while every size check
  failed in the user's browser. Sizes are compared with `toBeCloseTo(n, 0)`.
- **Revisiting a story in the Interactions tab served its image from memory.** The preview iframe
  stays one document across stories, and Chrome answers a URL already loaded in that document from
  its in-memory image cache regardless of `Cache-Control: no-store`. `IntrinsicSize` then found the
  image complete before its "before load" check, on the second visit only. The CLI and the Run
  tests button never revisit, so both stayed green. Every story now renders through `FreshImage`,
  which appends a per-mount nonce to fixture URLs. Checked by visiting all 19 stories twice in one
  preview document: 38/38.
- **The fixture route exists only if Storybook started with it.** Storybook reads `main.ts` once at
  startup, so a server started without `imageFixtures()` answers 404 and every image story falls
  back. Restart Storybook after changing `main.ts`.
- **Test scaffolding showed on the docs page.** `BothColourSchemes`' `bg-muted` probe was a visible
  square beside each image; it is `sr-only` now, which leaves its computed colour readable.
- **A hidden Browser pane loads no lazy images.** Opening the docs page with the pane hidden showed
  every box at its correct size and only the one `eager` image requested. That is the pane, which
  is not painting, not the component; the headless suite loads the same images.

## Testing

Component behaviour is tested in `Image.stories.tsx` `play()` functions and types in
`Image.types.spec.ts`, which only `check-types` runs. The a11y gate is on (`test: 'error'`) for the
whole file.

**Network conditions come from `apps/storybook/.storybook/imageFixtures.ts`**, a Vite plugin
registered in `main.ts`'s `viteFinal`, which the headless suite also applies. It serves a labelled
SVG at `/__image-fixture`, never cached:

| Query         | Behaves like                                            |
| ------------- | ------------------------------------------------------- |
| `w=300&h=450` | An image of that intrinsic size                         |
| `delay=2000`  | A slow or mobile connection; capped at 10s              |
| `status=500`  | A server error                                          |
| `abort`       | No connectivity: the socket is dropped with no response |

Each story passes its own `id`, and `FreshImage` adds a per-mount nonce, so the browser's in-page image cache never answers for the server — not even on a revisit.
"Nothing was requested" reads the Resource Timing buffer for `img` initiators since a timestamp the
meta's loader takes before render. Warnings go to a file-wide `console.warn` spy installed in
`beforeEach`, because they fire before `play()` does.

## Migration notes

How each current call site maps onto the new API (SC6). For the migration change, not this one.

| Call site              | Today                                                 | New                                                                                                                                                            |
| ---------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Card`                 | `width='100%' height={imageHeight}` + `aspect-square` | `ratio='2/3'`. The width comes from the card. `imageHeight` (175–265px across four callers) retires, so card heights change. Check them visually.              |
| `Recommendation`       | `250px` × `141px` + `aspect-square`                   | `ratio='16/9' className='w-[250px]'`                                                                                                                           |
| `Review`               | `4rem` round photo                                    | Not an `Image`. Use `Avatar` (spec non-goal).                                                                                                                  |
| `MostRecentEpisode`    | `130px` × `230px` + `aspect-square`                   | `ratio='2/3' className='w-[130px]'`. Height becomes 195px, not 230px.                                                                                          |
| `Video`                | `300px` × `169px` + `aspect-video`                    | `ratio='16/9' className='w-[300px]'`                                                                                                                           |
| `EntertainmentHeader`  | `300px` × `450px`, `loading='eager'`                  | `ratio='2/3' className='w-[300px]' loading='eager'`                                                                                                            |
| `Footer`               | `width={140} height={140}`                            | `width={185} height={133} className='w-[140px]'`. The file's viewBox is 185.04×133.4, so the box becomes 140×101; today it starts 140×140 and shrinks on load. |
| `Menu`, square logo    | `75px` × `40px`                                       | `width={185} height={133} className='h-10 w-auto'`. Same file as `Footer`; 40px tall gives 55×40, not 75×40.                                                   |
| `Menu`, wide logo      | `190px` × `20px`                                      | `width={273} height={36} className='w-[190px]'`. viewBox 273.42×35.52, so 190×25; today it starts 190×20 and grows on load.                                    |
| `EntertainmentSidebar` | `80px` × `40px` network logo                          | `unsized className='h-[30px] w-auto'`. TMDB's `h30` logos are 30px tall at any width, so only the height can be reserved.                                      |
| `PersonSidebar`        | `unset` + `!h-[450px] !w-[300px]`, `title`            | `ratio='2/3' className='w-[300px]'`. Drop `title`.                                                                                                             |

Every call site also drops `label` and keeps one `alt`. The current `label` strings are the better
names (`` `Poster for ${title}` `` rather than `title`), so `alt` takes the `label` value.

The three TMDB logo rows change size slightly, because they now take the files' real proportions instead of distorting them into the old boxes. `Card` and `MostRecentEpisode` change visibly, because their current heights are not 2:3. That is
the point — the old heights were the contradiction — but it wants eyes at migration.
