# Component inventory

A survey of what the clone still needs, taken from two directions: components already written inside
`apps/the-open-movie-database` that were never lifted into the library, and components
[themoviedb.org](https://www.themoviedb.org/?language=en-GB) uses that nothing in the repo can build
yet.

**This is a reference document, not a roadmap entry.** It records a set of decisions so they don't
get re-argued, and so the deliverables that come out of it start from an agreed scope. Items that
become work get a numbered folder and a row in [`README.md`](README.md) at that point, and keep their
row here with a pointer to it. **C02 is the only one scheduled so far** — everything else is
unscheduled.

**`C<n>` IDs are inventory IDs and have nothing to do with deliverable numbers.** `C01` is the card
wrapper; `01` is the shipped Icon deliverable. The prefix exists purely so the two can never be
confused — this repo has been bitten by an overloaded `D<n>` prefix before.

Surveyed 25 August 2026 at 1280px and 375px, logged out for the public pages and logged in for the
account pages.

## Summary

| Outcome      | Count | Meaning                                                   |
| ------------ | ----- | --------------------------------------------------------- |
| **Library**  | 13    | Goes in a `ui-*` package                                  |
| **App**      | 18    | Built in the app, or already covered by something we ship |
| **Dropped**  | 8     | Not doing it, or folded into another item                 |
| **Deferred** | 2     | Agreed in principle, deliberately not now                 |

Every item has a decision on it. C37 is the one that needed unpicking rather than answering — see
[C37 — Vibes](#c37--vibes-and-why-it-isnt-one-component).

## Library

Thirteen components, in the order they unblock each other.

| ID  | Component                   | Notes                                                                                                                                                                                                                                                           |
| --- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C01 | `Card`                      | Small composable parts in `ui-core`, assembled by hand at the call site — not a props-driven wrapper, and no `CardImage`. See [Card is parts, not a wrapper](#card-is-parts-not-a-wrapper).                                                                     |
| C02 | `Image`                     | **Scheduled as [`21-image`](README.md).** Error fallback, `ratio` prop, and one accessible name. See [Image scope](#image-scope).                                                                                                                               |
| C10 | Horizontal rail             | The left/right scrolling card container. The app hand-rolls this **16 times** today, none of them keyboard reachable.                                                                                                                                           |
| C03 | Rating ring                 | Port of `Percentage.tsx`. Hardcodes raw hex and a four-step colour ladder — worth sequencing behind the design-system audit in [`planned.md`](planned.md). Also needs a single name; it currently has three. See [C03](#c03-has-three-names-for-one-component). |
| C04 | `Spinner` + loading surface | Split in two. The current `Loader.tsx` is a spinner and a full-screen overlay sharing one `isFixed` flag, which stops the spinner being usable inside a button or a rail.                                                                                       |
| C05 | `ReadMore`                  | Needs `aria-expanded`/`aria-controls`, needs the clamped text out of the accessibility tree while hidden, and needs to respect `prefers-reduced-motion`. Removes the app's only component-level `.scss`.                                                        |
| C17 | `Separator`                 | Decorative by default, semantic opt-in, plus orientation. Replaces 9 hand-rolled `border-b border-solid` instances.                                                                                                                                             |
| C20 | `DescriptionList`           | `EntertainmentSidebar.tsx` repeats the label/value block **10 times**, `PersonSidebar.tsx` **5 more** — with a different heading level. Every label is currently marked up as a heading, so the sidebars emit 15 headings that aren't headings.                 |
| C21 | Badge variant               | Keyword and genre chips. A variant, not a component.                                                                                                                                                                                                            |
| C24 | Video lightbox              | Thumbnail with a play badge, opening a `Dialog` with a 16:9 embed. The current play affordance is an `<Icon>` in a plain `<div>` — no button, no handler, no keyboard path.                                                                                     |
| C28 | Social links                | Port of `SocialLinks.tsx`. Blocked on the `Icon` collection change below.                                                                                                                                                                                       |
| C31 | Filter sidebar              | Onto library components. See [the Formik question](#the-formik-question).                                                                                                                                                                                       |
| C34 | Infinite scroll             | Scroll-to-load with a button as an equal second route, not a failure fallback. `@tanstack/react-virtual` is already a dependency of both the app and `ui-command`, and the repo has a skill for the house pattern.                                              |

## App layer, or already covered

| ID  | Component             | Outcome                                                                                                                                                                                         |
| --- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C06 | Table                 | No library primitives. Redesign `CreditsTable` in the app — real `<thead>`, Year and Title columns, no `flex` on rows. Work moves to C30.                                                       |
| C07 | Navigation menu       | Reassembled in the app from `Sheet`, `DropdownMenu`, `Button`, `Popover`. Known trade: no `menubar`, so no arrowing sideways between top-level items.                                           |
| C08 | `RatingBlock`         | Stays in the app's `shared/`. It _is_ reused — `Review.tsx` and `MostRecentEpisode.tsx` both import it.                                                                                         |
| C11 | Segmented control     | App-specific. Note TMDB uses the same markup at both widths; the mobile "dropdown" is CSS, not a `<select>`. A real desktop-tabs/mobile-dropdown split is two controls and two keyboard models. |
| C12 | Search autocomplete   | `Command` at the app layer. `Search` already ships `showClearButton`, a leading icon and debouncing.                                                                                            |
| C15 | Poster overflow menu  | `DropdownMenu` — it already does roving focus and type-ahead.                                                                                                                                   |
| C19 | Backdrop hero         | `EntertainmentHeader` already covers it.                                                                                                                                                        |
| C22 | Review card           | Rebuild on `Avatar`, C03 and C05. Carries a security issue — see [The review card](#the-review-card).                                                                                           |
| C25 | Season card           | `MostRecentEpisode` reworked. Its poster is `hidden md:block`, so mobile loses the image entirely. Good first test of C01's API.                                                                |
| C26 | Content score meter   | `Progress` plus a score-to-message lookup.                                                                                                                                                      |
| C30 | Grouped credits table | The app-layer redesign C06 turned into. Unblocked.                                                                                                                                              |
| C32 | Slider scale labels   | Covered. `SliderRoot` takes an array value, so two-thumb ranges already work; the printed scale is app markup.                                                                                  |
| C33 | Token input           | Covered by `MultiSelect`.                                                                                                                                                                       |
| C35 | Empty state           | App-specific copy, and the markup is a heading and a sentence.                                                                                                                                  |
| C36 | Action rail           | App composition. The one library-shaped piece is a **toggle button with an exposed pressed state**, which `Button` lacks — same control as C40's sort direction.                                |
| C37 | Vibes                 | Three mechanisms, not one component. Rating slider and tone picker are buildable on parts we have; the mood picker has no data. See [C37](#c37--vibes-and-why-it-isnt-one-component).           |
| C38 | Settings layout       | A page, not a component. TMDB's mobile treatment is a horizontally scrolling tab strip that clips mid-word with no affordance; `Select`, `Sheet` or `Accordion` all beat it and all exist.      |
| C40 | Sort control          | `Select`, plus C36's toggle for direction.                                                                                                                                                      |

## Dropped

| ID  | Component                 | Why                                                                                                                       |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| C09 | `Combobox` / `Listbox`    | Deleted. Superseded by `Select`; takes `@headlessui/react` and `useDropdownPlacement` out of the app with them.           |
| C13 | Input with adornments     | Lost its main consumer once `Search`'s built-in clear button was confirmed. Remaining uses are on pages we may not clone. |
| C14 | Notice bar                | Cookie consent and the logged-out prompt strip. A clone needs neither.                                                    |
| C16 | `AspectRatio`             | Folded into C02 as a `ratio` prop.                                                                                        |
| C18 | Leaderboard list          | App-specific, composed of parts we'll have, not on a prioritised page.                                                    |
| C23 | Media gallery counts      | `Tabs` already takes arbitrary label content.                                                                             |
| C29 | Keyboard shortcuts dialog | Nothing needs it.                                                                                                         |
| C41 | File upload               | Skipped.                                                                                                                  |

## Deferred

**C27 / C39 — charts.** A line chart with a tooltip for the popularity trend, a vertical bar chart
for the 1–10 ratings histogram, horizontal bars for most-watched genres. Three page types need them,
so it isn't a one-off ornament.

Intent is to try TanStack Charts, accepting that it is **pre-alpha (0.14.0) and not production
ready** — `TanStack/react-charts` was archived on 13 May 2026 and is a different, dead library. The
risk is API churn rather than breakage, which is acceptable for a sidebar chart and useful practice.
Whichever library wins, the text alternative or data-table fallback is our responsibility, not the
library's.

## C37 — Vibes, and why it isn't one component

Recorded at length because the first two readings of it were both wrong.

Per [TMDB's contribution bible](https://www.themoviedb.org/bible/general), **Vibes is three separate
mechanisms**, not a single emoji picker:

| Part       | What it is                                                                                          | Where we stand                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Rating** | The classic 1–10, re-presented as a colourful slider instead of stars                               | `POST /movie/{id}/rating` — real, documented. `Slider` already exists                   |
| **Mood**   | Reactions across **7 named emotion categories**, several emoji per category at escalating intensity | No API. Names are visible in the UI; per-emoji ids are not                              |
| **Tone**   | Tone keywords, searched or picked from a dropdown, community-contributed                            | The control is `MultiSelect`, already covered by C33. The keyword data is the open part |

**The numeric rating is not an alternative to Vibes — it is one of its three parts**, and Vibes
sits _beside_ the user score rather than replacing it. Framing it as "numeric instead of reactions"
was a false choice: a mood is a category, not a point on a scale, so no number can stand in for
"Surprised".

Two corrections to what this document said earlier:

- **The names exist.** The picker labels every row — Interested, Surprised, Sad, Disgusted, Afraid,
  Angry, and a seventh above the visible scroll. The claim that a reaction picker was unbuildable
  for want of names was wrong; only the per-emoji ids are missing, and those matter for persistence,
  not for naming options.
- **The picker markup is lazy-loaded**, so it isn't in the page DOM until opened. Anything more
  detailed than the category names needs the panel opened and inspected.

**Where that leaves it:** the rating slider is buildable now against a real endpoint and is mostly
`Slider` plus whatever colour scale C03 settles. The tone picker is `MultiSelect` plus a keyword
source. The mood picker is the only part with no data behind it — buildable as UI against our own
category set, but it can never persist, so it is a design exercise rather than a clone.

## Notes carried out of the survey

### Image scope

**Superseded by [`21-image/spec.md`](21-image/spec.md).** The observations below still hold; two of
the decisions in them do not. A `ratio` prop does **not** replace the `width`/`height` pair — integer
attributes are the native mechanism and stay, with `ratio` covering the case where only the slot's
shape is known, and the two are mutually exclusive. The loading state was dropped. The spec is
authoritative.

The browser now handles `loading="lazy"`, `decoding="async"`, `srcset`/`sizes`, `fetchpriority`, and
space reservation — it derives `aspect-ratio` from the `width`/`height` attributes on its own. What
it still can't do declaratively is swap a broken image for a fallback; `onerror` remains the only
route, and there is no `:loading` pseudo-class either.

So the component is thin, and its job is to make the native path impossible to get wrong rather than
to add capability on top of it:

- **Sizing.** `Image.tsx` passes `width={width}` where `width` defaults to `'200px'` and `Card`
  passes `'100%'`. Those attributes must be plain integers, so the browser discards them and derives
  no ratio — every image on the site currently reserves no space. A `ratio` prop replaces the pair.
  Card posters also get `aspect-square`, which is the wrong ratio for a poster.
- **Accessibility.** The component sets `alt`, `aria-label` and `title`. `aria-label` on an `<img>`
  overrides `alt`, so the `alt` prop never reaches assistive tech — `label` wins and `alt` only
  surfaces as a `title` tooltip. Two props for one job, with the wrong one authoritative. Collapse to
  one accessible name, `alt=""` for decorative, and keep describing the _content_ when the image
  fails rather than announcing the failure.
- **Error fallback.** Local, not `via.placeholder.com`.

### Card is parts, not a wrapper

Revisited 14 September 2026. The original entry said "light assembly wrapper only", which left two
things unsettled that have now been answered: what shape the parts take, and whether they belong in
the library at all.

**It nearly got dropped.** The argument against: the parts carry no behaviour, and the duplication
they were meant to remove is really token divergence — the three cards that ignore the app's current
wrapper each hand-roll a different surface _(measured 2026-09-14)_:

```
Poster / Person      rounded-2xl  border    border-gray-200
Review               rounded-lg   border    border-gray-300  shadow-2xl
MostRecentEpisode    rounded-2xl  border-2  border-[#D3D3D3]
```

Three radii, two border widths, a raw hex, and `bg-white` hardcoded so none of it survives dark mode.
A surface token fixes that everywhere, including the places a `Card` component would never reach —
`Keywords.tsx` gives a chip the same treatment.

**What kept it** is that the abstraction is real: the app's `Card` has four consumers (`Poster`,
`Person`, `KnownFor`, `TopBilledCastMember`) _(measured 2026-09-14)_, and the shared shape — bordered
surface, image on top, content below — is genuinely repeated. What's wrong is the _interface_, not
the idea. Three of those four override its classes to escape it:

```tsx
// TopBilledCastMember.tsx
containerClassName =
	'min-w-[138px] max-w-[138px] mt-[0.625rem] rounded-2xl mb-[0.625rem] ml-[0.625rem] mr-[0.25rem] border border-solid border-gray-200';
contentClassName = 'p-0 border border-solid border-gray-200 rounded-b-2xl pb-2 flex flex-1';
```

Decisions taken:

- **Composable parts, not props.** No `renderLink`, no `imageHeight`, no `containerClassName` /
  `contentClassName` / `imageClassName`. The caller assembles. Want a link? Wrap the title in one.
  This is what removes the `React.cloneElement` call and the five escape hatches in one go.
- **`ui-core`, not the app.** The app's `shared/` stays available for anything genuinely
  TMDB-specific that turns up later.
- **No `CardImage`.** `Image` (C02) is dropped in as a child directly, which is how shadcn's own
  card-with-image example does it. A `CardImage` would only earn its place by carrying
  card-specific styling, and the top-corner radius it would carry is a token, not a component.
- **The surface tokens are still the design-system audit's job.** The parts consume them; they do
  not define them. Building `Card` before those exist means hardcoding the thing that was wrong in
  the first place — see [`planned.md`](planned.md#design-system-audit).

Not scheduled. It follows C02, since the parts are worth designing against an `Image` that already
reserves its space.

### The `Icon` collection change

`Icon` resolves every name from one hardcoded collection (`ICON_COLLECTION = 'lucide'`) against a
closed 30-name allowlist. **Lucide ships no brand icons**, so social marks are unreachable — this
blocks C28.

Agreed direction: drop `ICON_COLLECTION` and prefix names with their collection
(`'lucide:search'`, `'simple-icons:facebook'`), which is Iconify's native identifier format and
simplifies `Icon.tsx` to `icon={name}`.

Two things to preserve:

- **The allowlist stays closed.** `Icon.constants.ts` calls the compile-time error on an unknown name
  "by design"; an open string type means typos ship silently.
- **23 call sites** in `packages/` plus the constants file. Icon data resolves from Iconify's CDN at
  runtime, so a second collection costs nothing at build time.

### Naming icon-only links

`Icon` is always `aria-hidden` and its own documentation states the rule: an icon must never be the
only thing naming a control. A tooltip cannot supply the name — Radix wires tooltip content as
`aria-describedby`, a _description_, which assistive tech treats as supplementary. Tooltips also
never fire on touch.

So an icon-only link carries its own `aria-label`, and the tooltip is a sighted-mouse convenience on
top:

```tsx
<Tooltip>
	<TooltipTrigger asChild>
		<a href={url} aria-label='Facebook'>
			<Icon name='simple-icons:facebook' />
		</a>
	</TooltipTrigger>
	<TooltipContent>Facebook</TooltipContent>
</Tooltip>
```

### The review card

`Review.tsx` renders review bodies with `dangerouslySetInnerHTML`. The content is written by other
users and returned by the API, so against the live API this is an XSS hole — harmless only because
Storybook feeds it fixtures.

TMDB stores reviews as markdown, so the fix and the feature are the same thing: parse markdown to a
safe tree and render that, or sanitise before injection. Worth its own scope rather than riding on a
card rewrite, because the choice of parser and allowed subset outlives the component. **This is the
only item in the inventory that is a live defect rather than a gap.**

### The Formik question

The discover filters run on `formik@^2.4.3` across **9 files**; `ui-forms` is built on TanStack Form.
"Use `ui-forms` for this" is therefore a form-library migration, not a component swap — different
field API, validation wiring and submission model.

`CheckboxGroup`, `RadioGroup`, `Slider` and the date pickers all work as controlled components
without `Form`, so the sidebar can move onto library components while staying on Formik, deferring
the migration to its own deliverable. Preferred over doing both at once.

### C03 has three names for one component

Confirmed as the ring in `Percentage.tsx`, not the star pill in `RatingBlock.tsx`.

The confusion is the code's fault, not the reader's. That one file is called `Percentage.tsx`,
declares `const Rating`, `export default Rating`, and is imported everywhere as
`PercentageRating` — three names for the same component, none of which says "ring". Settle on one
name during the port.

### Sheet already covers the mobile drawer

`Sheet` needs **no API work** to serve the mobile filter sidebar (C31) or the settings nav (C38).
`side='left'|'right'` gives `h-full w-3/4 sm:max-w-sm`; it is built on a native `<dialog>`, so the
focus trap, Escape, backdrop and inertness come from the platform; `title`/`description`/`footer`
build the header and wire the ARIA; and `SheetInnerContent` is `flex-1 overflow-y-auto` that becomes
a tab stop **only when it actually overflows**, so a long filter list is keyboard-scrollable without
stealing the sheet's initial focus. `onRequestClose` can refuse a close, which suits unapplied
filters.

**Detents — a drag handle with peek/half/full snap points — were considered and rejected for now.**
Neither surface wants them: a side drawer is the right pattern for both, and detents earn their
place on bottom sheets that preview and expand, which nothing here is. The cost is also
misjudged if you think of it as dragging — a drag-only resize is unusable without a pointer, so a
real implementation owes a keyboard equivalent, snap-point semantics assistive tech can report, and
`prefers-reduced-motion` handling. Revisit when something actually needs it.

### C09 needs no `Select` change now

Deleting the app's `Combobox` and `Listbox` assumes no async option loading is needed, and that is
confirmed. If it is wanted later, the spec gets revised then rather than pre-emptively.

The reason it was raised: adding a filter/search event to `Select` afterwards changes a published
API rather than extending a new one. That cost is accepted knowingly — `Select` is internal to this
monorepo with one consumer, so "published" means less here than it would for a released package.

## Incidental findings

Turned up while surveying, not part of the 41. None is a candidate component; each is a defect or a
limitation in code we already ship.

**`Icon` fetches icon data from Iconify's CDN at runtime.** `Icon.tsx` carries a TODO about bundling
it offline. Until that happens every icon is a network request on first render, showing a
correctly-sized blank until it resolves — a third-party runtime dependency on the critical path, and
a visible flash anywhere icons appear in bulk. Already acknowledged in the source; not on any
roadmap. Arguably higher impact than several inventory items.

**`CreditsTable` builds broken URLs.** `generateResourceUrl(title, id, mediaType)` is called as
`generateResourceUrl(title, `${title}-${year}`, props.mediaType)` — the title passed where the
function's own comment says an id belongs. The result is
`/movie/The King's Man-2021-theking'sman`. C30 will be in this file anyway.

**`Sheet`'s `top` and `bottom` sides have no height ceiling.** `center` is `max-h-[90vh]`; `top` and
`bottom` are `h-auto` with no maximum, so a bottom sheet with tall content grows past the viewport
and carries its header off-screen. `left` and `right` are unaffected — they are `h-full`. Read from
the variant classes rather than observed in a render, so confirm before fixing.
