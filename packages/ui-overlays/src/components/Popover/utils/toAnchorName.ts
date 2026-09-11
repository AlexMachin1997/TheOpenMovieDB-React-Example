/**
 * Turn a `React.useId()` value into a `<dashed-ident>` that `anchor-name` accepts.
 *
 * React's ids are not CSS identifiers — `«r0»` in React 19.1, `_r_0_` from 19.2 — and an invalid
 * `anchor-name` is dropped without a warning, leaving the popover positioned against nothing.
 * Stripping everything outside `[A-Za-z0-9_-]` keeps the part of the id that makes it unique.
 */
export const toAnchorName = (reactId: string) => `--popover-${reactId.replace(/[^\w-]/g, '')}`;
