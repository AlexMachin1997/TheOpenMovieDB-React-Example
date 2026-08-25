# Planned

Work that is agreed, or a question that is open, but has no deliverable folder yet. The
[roadmap](README.md) lists each of these in one line; this file holds the reasoning behind them.

Nothing here is a commitment to build. Several are deliberately pinned — recorded so the question
isn't re-argued from scratch every time someone notices it.

## Design-system audit

Six axes — tokens, interaction states, size scales, variant taxonomy, dark mode coverage, motion.
Would add deliverables to the roadmap. Not started.

`03-focus-indicators` is what surfaced the need for it. Measuring the focus ring turned up three
unrelated focus idioms, a component hardcoding raw palette colours, and a WCAG 2.2 SC 2.4.11 failure
in both themes. None of that is really about focus — it's what a library assembled from copied
component code looks like when nobody has defined the system it should obey.

## RTL / reading direction

Surfaced while planning `04` and not yet specified. The library is currently inconsistent with
itself: no `DirectionProvider` is mounted and no component takes a `dir` prop, so every Radix
component falls back to LTR — while `Calendar` already ships `rtl:` classes that only fire if a
`dir="rtl"` exists to trigger them.

The question spans arrow-key semantics, logical vs physical Tailwind properties, icon mirroring and
overlay placement, so it needs its own `problem-discovery` pass rather than being settled component
by component. See
[`04-ui-forms-primitive-migration/plan.md`](04-ui-forms-primitive-migration/plan.md#follow-ups).

## Popover semantics

`Popover` renders `role="dialog"` with no accessible name. That is a real, currently-shipping axe
`aria-dialog-name` failure — nine of them, suppressed by
[`17`](17-command-list-nesting/plan.md#the-a11y-gate-and-what-it-surfaced) with a pointer at `18`.
Verified in `@radix-ui/react-popover@1.1.15`: `Popover.Content` sets the role unconditionally, modal
or not.

**It was briefly in `18`'s scope and was deliberately moved out on 2026-08-24.** A modal content
surface and an anchored non-modal one are different concepts, and `18` became the native-`<dialog>`
swap — which `Popover` cannot follow, since `<dialog>` is neither anchored nor non-modal. Keeping it
in would have meant one deliverable spanning two primitives and two ideas.

### The direction is chosen; the timing is not

**Intent, stated 2026-08-24: move `Popover` off Radix onto the HTML Popover API**, for the same
reason `Dialog` and `Sheet` moved to `<dialog>` — prefer the platform. This is a decision waiting on
a date, not a question waiting on an opinion.

**What blocks it is our own floor, not the browsers.** The `popover` attribute itself is widely
supported. Anchoring a popover to its trigger needs CSS anchor positioning — Chrome 125, Firefox
147, Safari 26 — and all three have shipped it, so it _is_ Baseline Newly Available. But the
[support floor](../README.md#-browser-support) is pinned at Chrome 117 / Firefox 129 / Safari 17.5,
set by `@starting-style`. Adopting anchor positioning therefore means **raising the floor and
dropping Safari 17.5–25**, which is a product call nobody has made.

So the trigger for this work is a decision about which browsers the library supports, and it can be
revisited any time that changes.

Two things it still has to decide, which the primitive does not settle:

- **Is `role="dialog"` right for a popover at all, or is it over-semantic?** The `popover` attribute
  grants top layer and light dismiss but **no role**, so going native does not answer this — it just
  moves the choice to us. Removing the role makes the nine axe failures disappear; keeping it means
  every popover needs a name.
- **If the role stays, how is the name supplied?** `title` / `description` props were drafted for
  this in `18` and pulled back out. Radix Popover ships no `Title` / `Description` primitives, so
  either way it is hand-wired.

**Do not build the labelling twice.** This deliverable's own lesson from `18`: if the primitive is
going to change, wiring a full props API onto Radix Popover first means discarding it. If the nine
suppressed failures need clearing before the floor rises, the cheap interim fix is an `aria-label`
on the affected call sites — not a new API.

One thing it does **not** own: where a popover portals to inside a modal. That change belongs to
`18`, which forces it — see
[DD-6](18-overlay-api/discovery.md#dd-6--anchored-overlays-portal-into-the-dialog-element).

## The four-package split

Whether `ui-core` / `ui-overlays` / `ui-command` / `ui-forms` still earn their boundaries. Raised
while reviewing `04` and **not yet decided in either direction**.

The trigger: `Select` and the date pickers cannot sit alongside `Input` and `Checkbox`, because they
need `Popover` (`ui-overlays`) and `Command` (`ui-command`), which are built _after_ `ui-core`.
Moving them down would make `ui-core` depend on its own dependents, and turbo's
`dependsOn: ["^build"]` is a topological sort — a cycle has no valid build order at all.

What makes it worth asking rather than accepting:

- The entire `ui-overlays` → `ui-core` edge is **one component, `Icon`**, imported in three files
  (Dialog close, DropdownMenu chevron, Sheet close). The `Button`/`Alert`/`Avatar`/`Badge` imports
  are all in stories.
- `ui-command` → `ui-core` is **one component, `Search`**, in one file.
- `ui-command` is a **single component** in its own package (1,617 LOC); `ui-overlays` is five
  (1,100 LOC), against `ui-core`'s 22 (3,587 LOC).
- **Neither `Select` nor the date pickers are form-specific.** They are compound UI components that
  happen to be useful in forms — a `Select` is no more "form UI" than a `DropdownMenu`. On the
  current trajectory `ui-forms` ends up holding only genuinely form-specific things (`useForm`, the
  `Field` pattern from `05`, a future schema renderer), all of which build on `ui-core` anyway.

**The real argument for the split is dependency weight, not code size**, and it is worth stating
precisely because it is the one thing tree-shaking does _not_ solve. Tree-shaking drops unused
_code_ from a bundle; it does not drop a package from the dependency tree. Folding `ui-command`
into `ui-core` would put `cmdk`, `@tanstack/react-virtual`, `@radix-ui/react-dialog` and `react-use`
behind every `ui-core` install — including consumers who only ever wanted a `Button`. `ui-overlays`
brings four more Radix packages. Against `ui-core`'s current 19 direct dependencies, that is a
material change to what "depend on ui-core" costs.

How much that actually matters depends on whether these packages are ever published independently.
Inside this monorepo, with one consuming app and everything built from source, it costs close to
nothing.

**Nothing is broken.** The current layout builds, ships and is tested. The cost is ergonomic — a
consumer has to know that `Input` comes from `ui-core` while `Select` comes from `ui-forms`, and the
rule that decides which is invisible at the call site.

Options to weigh in the discovery: fold `ui-overlays` and `ui-command` into `ui-core` and let
application bundlers handle the unused weight; fold only `ui-overlays` (four Radix packages) and
leave `ui-command` separate, since `cmdk` and `react-virtual` are the heavy part; push `Icon` and
`Search` into a package below `ui-core` to invert the arrows; consume sibling packages from source
rather than built `dist/` (see the note in
[`04-ui-forms-primitive-migration/plan.md`](04-ui-forms-primitive-migration/plan.md#follow-ups));
or keep the split and document the boundary rule properly.

**Status: pinned, deliberately.** Known quirk of the current setup, not a blocker. Revisit when
something forces the question — a second consuming app, a decision to publish, or `ui-forms`
shrinking to the point where the boundary looks obviously wrong. It partially revisits an earlier
decision to keep the packages separate, so it needs a `problem-discovery` pass and an explicit call
rather than being folded into another deliverable.

## JSON/schema-driven form rendering

The `Field` composition layer it would render onto now exists (`05` is done), so the blocker is gone
— but it stays deliberately unspecified: schema format, validation-library integration and
extensibility for custom field types are all open, and it needs its own `problem-discovery` pass.

A declarative field-definition helper was raised while specifying the form-layer second pass and
**explicitly kept out of it**, because either shape it could take — a typed component factory, or a
declarative field list — reverses a decision taken elsewhere. That call belongs here, not as a rider
on another deliverable.
