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

## The native `<dialog>` element

Whether `Dialog` and `Sheet` should drop `@radix-ui/react-dialog` for the platform primitive. Raised
while reviewing `14` and **not yet decided**.

What native buys is real: `showModal()` gives a focus trap, an inert background, top-layer stacking
that fixes nesting for free, and Esc-to-close, with no library involved. What it does **not** buy is
worth stating precisely, because it is where the idea is usually oversold:

- **It does not give an accessible name.** You still supply `aria-label` or `aria-labelledby`
  yourself. That is the problem `14` and `18` exist to solve, and native does not touch it.
- **It does not lock body scroll.** A native modal makes the background inert to interaction, but the
  page behind it still scrolls. Radix handles this today.
- **It does not remove the dependency.** `@radix-ui/react-dialog` is also a direct dependency of
  `@repo/ui-command` — `cmdk`'s own `Command.Dialog` and our `CommandDialog` both use it — so it
  stays in the tree regardless.

The cost is concentrated in two places. Native `<dialog>` has no `data-state` attribute, so the whole
animation layer — `data-[state=open]:animate-in`, all four Sheet slide directions, Dialog's zoom and
fade — has to be rebuilt on `@starting-style`, `transition-behavior: allow-discrete` and `overlay`
transitions. And its open state is imperative (`showModal()` / `close()`) rather than declarative, so
the controlled `open` prop and Sheet's imperative ref both need rewiring through effects — a
well-known source of desync bugs.

That is a primitive swap with an animation and state-management rewrite attached, not a dependency
removal. It needs its own `problem-discovery` pass rather than being folded into an overlay
deliverable.

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
