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
- **It draws the divider before "Homepage" and "Just Watch" with a hand-built border class,** and
  the class has a typo (`[&:not(:first-child)]border-solid`, missing a colon).
- **It positions links with `space-x-4` and `ml-3`** instead of a gap.

This is C28 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. One row of profile links that any page can render from a list of links.
2. Each link is named after where it goes.
3. Brand marks from the library's own `Icon`.

## Scope

**Included**: a social links component in `ui-core`, with consumer-facing Storybook documentation.

**Not included**: the sidebars that use it, which are app-level. Migrating the 3 call sites happens
when the app is set up again.

**Independently deliverable**: no. It depends on the `Icon` second pass.

## Non-Goals

- **Share buttons** (post this page to a network). These are links to existing profiles.
- **Platforms beyond the app's current set.** That set is Facebook, X (Twitter), Instagram, TikTok,
  YouTube, Homepage and JustWatch. Adding one later is an allowlist entry, not a redesign.
- **Fetching or validating the URLs.** The component renders what it is given.

## Requirements

### Functional

1. The component takes a list of links, each with a platform from a fixed set and a URL.
2. A link with no URL is not rendered.
3. When no link has a URL, the component renders nothing, not an empty list.
4. Links render in the order the caller gives.
5. Brand profiles (Facebook, X, Instagram, TikTok, YouTube) come first. Homepage and JustWatch come
   after a divider. The divider only shows when both groups have at least one link.
6. Each link opens in a new tab and does not give the opened page access to this one.

### UI/UX

7. Each platform shows its own mark: the brand mark for brands, a link icon for Homepage, and a play
   icon for JustWatch. Simple Icons has no JustWatch mark _(checked 2026-11-16)_.
8. Icons use the current text colour and `Icon`'s size scale.
9. On pointer hover, a tooltip shows the platform name.
10. Spacing between links comes from a gap. The divider is the library's `Separator`
    ([`23`](../23-separator/spec.md)) if that has shipped, and otherwise a themed border.

### Accessibility

11. The links are exposed as a list.
12. Each link's accessible name is the platform name, for example "Facebook", and says that it opens
    in a new tab.
13. The name is on the link itself. The tooltip does not provide it.
14. The divider is decorative.

### Integration

15. The component is exported from `ui-core` and follows the package's existing conventions.
16. It takes the same `className` escape hatch as every other `ui-core` component.

## Edge Cases & Error Handling

- **Only Homepage or JustWatch has a URL.** It renders with no divider.
- **The same platform appears twice.** Both render, in the order given. The data is the caller's
  responsibility.
- **A URL that is whitespace only.** Treated as no URL.
- **Touch devices.** No tooltip shows. The link still works and is still named.

## Success Criteria

- SC1: The 3 current call sites can be replaced with no Font Awesome dependency.
- SC2: A screen reader user hears where each link goes and that it opens a new tab.

## Acceptance Criteria

- AC1: Given links where some URLs are empty, when it renders, then only links with a URL appear.
- AC2: Given no links with a URL, when it renders, then nothing is rendered.
- AC3: Given links for a brand and for Homepage, when it renders, then a divider sits between the
  two groups. Given links from only one group, there is no divider.
- AC4: Given a Facebook link, when the accessibility tree is inspected, then the link is named
  "Facebook", says it opens in a new tab, and is inside a list.
- AC5: Given any link, when it is activated, then the URL opens in a new tab and the opened page
  cannot reach this one.
- AC6: Given a pointer hovering a link, when the tooltip appears, then it shows the platform name.
- AC7: Given each platform, when it renders, then it shows that platform's mark at the requested
  size and in the current text colour.
- AC8: Given the divider, when the accessibility tree is inspected, then it is not in it.
- AC9: Given a whitespace-only URL, when it renders, then that link does not appear.

## Decisions

- **Named after the destination.** "Facebook" tells a screen reader user where they are going. "A
  social link for Facebook" adds words and no information.
- **The new tab is announced in the name.** These links leave the site, and an unannounced new tab
  breaks the Back button without warning.
- **Fixed platforms, not any icon.** Each platform decides its own icon and name, so a caller cannot
  pair a TikTok URL with a YouTube mark.
- **Twitter is shown as X.** The platform's name and mark are X now. The data field TMDB returns is
  still called `twitter_id`, but that is the app's mapping to make.

## Open Questions

None. It waits on the `Icon` second pass being built. X's mark is the `x-logo` icon.

## Design References

- The current component: `apps/the-open-movie-database/src/components/Sidebars/SocialLinks.tsx`.
- Its platform set: `apps/the-open-movie-database/src/types/Social.ts`.
- Naming icon-only links, and why a tooltip can't name them:
  [`component-inventory.md`](../component-inventory.md#naming-icon-only-links).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C28.
