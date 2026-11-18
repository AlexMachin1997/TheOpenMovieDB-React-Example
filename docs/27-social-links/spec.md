# Feature: Social links

## Problem

The movie, TV and person sidebars show a row of icon links to a title's or a person's profiles.
The app's `SocialLinks.tsx` builds that row, and it has 3 call sites: two in `EntertainmentSidebar.tsx`
and one in `PersonSidebar.tsx` _(measured 2026-11-16)_. It has these problems:

- **It draws icons from Font Awesome** (`fa-brands fa-facebook`) through the app's old `Icon`. The
  library's `Icon` cannot draw brand marks yet. See the
  [second pass on `01`](../01-icon/spec.md#second-pass--more-than-one-icon-collection).
- **Its accessible names describe the markup, not the destination.** Each link is named "A social
  link for Facebook".
- **It puts the tooltip inside the link,** around the icon. The tooltip adds nothing for keyboard,
  touch or screen reader users. That is acceptable only because each link has its own name.
- **It decides the dividers by platform.** It checks `SOCIAL.HOMEPAGE` and `SOCIAL.JUST_WATCH` to
  put a line before each of them. That ties the row to TMDB's platform list. The class also has a
  typo (`[&:not(:first-child)]border-solid`, missing a colon), which only goes unnoticed because
  the default border style is already solid.
- **It positions links with `space-x-4` and `ml-3`** instead of a gap.

This is C28 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. One row of icon links that any app can render from a list it builds.
2. Each link is named after where it goes.
3. The library knows nothing about specific platforms. Which links exist, in what order, with which
   icon and label, is the app's decision.

## Scope

**Included**: a social links component in `ui-core`, named `SocialLinks`, taking its list as a
`socials` prop, with consumer-facing Storybook documentation.

**Not included**:

- The sidebars that use it, which are app-level. Migrating the 3 call sites happens when the app is
  set up again.
- **Mapping TMDB's data to links.** TMDB returns `external_ids` as an object with no order
  (`facebook_id`, `instagram_id`, `twitter_id`…). The app turns that into an ordered list with
  labels, icons and groups, in a service or utility decided when the app is set up.
- **JustWatch.** Deferred _(decided 2026-11-18)_. Its mark is not in Simple Icons, so it needs a
  custom SVG in the app. Pick it up when it is worth the time.

**Independently deliverable**: no. It depends on the `Icon` second pass, for the brand marks.

## Non-Goals

- **Share buttons** (post this page to a network). These are links to existing profiles.
- **A list of known platforms in the library.** See Decisions.
- **Fetching or validating the URLs.** The component renders what it is given.

## Requirements

### Functional

1. The component takes an ordered list of links. Each link has an icon name from `Icon`'s
   allowlist, a label, a URL and a group.
2. Links render in the order given.
3. A link with no URL, or a URL that is only whitespace, is not rendered.
4. When no link has a URL, the component renders nothing, not an empty list.
5. A divider sits between two neighbouring rendered links whose groups differ. There is never a
   divider before the first link, after the last, or two in a row.
6. Each link opens in a new tab and does not give the opened page access to this one.

### UI/UX

7. Each link shows its icon, in the current text colour and at `Icon`'s size scale.
8. On pointer hover, a tooltip shows the link's label.
9. Spacing between links comes from a gap. The divider is a border on the first link of each new
   group, in the theme's border token, drawn by the component. It adds no element.

### Accessibility

10. The links are exposed as a list.
11. Each link's accessible name is its label, for example "Facebook", and says that it opens in a new
    tab.
12. The name is on the link itself. The tooltip does not provide it.
13. The divider is not in the accessibility tree, and the list's item count is the number of links.

### Integration

14. The component is exported from `ui-core` and follows the package's existing conventions.
15. It takes the same `className` escape hatch as every other `ui-core` component.
16. Every icon the current row needs is in `Icon`'s allowlist. `link`, for Homepage, is added as an
    ordinary Lucide icon. The brand marks come from the `Icon` second pass.

## Edge Cases & Error Handling

- **Some links in a group have no URL.** The divider rule only looks at rendered links, so a missing
  link never leaves a stray divider.
- **Every rendered link is in one group.** No divider.
- **Two links with the same label.** Both render, in the order given. The data is the caller's
  responsibility.
- **Touch devices.** No tooltip shows. The link still works and is still named.

## Success Criteria

- SC1: The 3 current call sites can be replaced with no Font Awesome dependency.
- SC2: A screen reader user hears where each link goes and that it opens a new tab.
- SC3: TMDB's row (profiles, then a divider, then Homepage) can be built without the library knowing
  any platform's name.

## Acceptance Criteria

- AC1: Given links where some URLs are empty or whitespace, when it renders, then only links with a
  URL appear.
- AC2: Given no links with a URL, when it renders, then nothing is rendered.
- AC3: Given links in the order given, when it renders, then they appear in that order.
- AC4: Given three links in group A followed by one in group B, when it renders, then there is one
  divider, between the third and fourth links.
- AC5: Given links in groups A, B and C, one each, when it renders, then there is a divider between
  each pair.
- AC6: Given links in groups A, B and C where the B link has no URL, when it renders, then there is
  one divider, between the A and C links.
- AC7: Given links that are all in one group, when it renders, then there is no divider.
- AC8: Given a link labelled "Facebook", when the accessibility tree is inspected, then the link is
  named "Facebook", says it opens in a new tab, and is inside a list.
- AC9: Given any link, when it is activated, then the URL opens in a new tab and the opened page
  cannot reach this one.
- AC10: Given a pointer hovering a link, when the tooltip appears, then it shows the link's label.
- AC11: Given an icon name, when the link renders, then it shows that icon in the current text
  colour.
- AC12: Given a divider, when the accessibility tree is inspected, then it is not in it and the list
  reports one item per rendered link.

## Decisions

- **Open items, not a fixed platform list** _(decided 2026-11-18)_. The library takes an icon,
  label, URL and group per link and knows no platform names. Platform knowledge such as "JustWatch"
  is TMDB vocabulary, which `21-image` already kept out of the library. The cost: the library no
  longer stops a caller from pairing a TikTok URL with a YouTube mark. That mapping lives in one
  place in the app, so it is checked there.
- **Dividers come from groups, not from a flag on an item.** A flag such as "divider before
  Homepage" breaks when Homepage has no URL. A group per link, with a divider wherever neighbouring
  rendered links' groups differ, works whichever links are missing. TMDB's row puts profiles in one
  group and each of JustWatch and Homepage in its own, which gives a line before each of them.
- **Named after the destination.** "Facebook" tells a screen reader user where they are going. "A
  social link for Facebook" adds words and no information.
- **The new tab is announced in the name.** These links leave the site, and an unannounced new tab
  breaks the Back button without warning.
- **X's mark is `x-logo`.** Decided in the `Icon` second pass. TMDB's field is still `twitter_id`,
  which is the app's mapping to make.

- **Named `SocialLinks`, with a `socials` prop** _(decided 2026-11-18)_. The component is still a row
  of social links even though it knows no platform names, so the name stays.

## Known limitations

- **The tooltip repeats the link's name to screen readers** _(found 2026-11-18)_. Radix links the
  tooltip to the link as a description, so a screen reader says "Facebook" twice. The fix is
  deferred to the
  [accessibility pass](../planned.md#accessibility-pass-icon-only-controls-and-tooltips), which
  handles it for every icon-only control at once. This component adopts whatever that decides.

## Open Questions

None. It waits on the `Icon` second pass being built.

## Design References

- The current component: `apps/the-open-movie-database/src/components/Sidebars/SocialLinks.tsx`.
- Its platform set: `apps/the-open-movie-database/src/types/Social.ts`.
- The target look: TMDB's sidebar row (Facebook, X, Instagram, a divider, JustWatch, a divider,
  Homepage).
- Naming icon-only links, and why a tooltip can't name them:
  [`component-inventory.md`](../component-inventory.md#naming-icon-only-links).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C28.
