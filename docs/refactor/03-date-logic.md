# D2 — Test & fix date formatting

**Phase:** 1 · **Size:** S · **Depends on:** D0 · **Status:** todo

## Goal

Add unit tests for the pure date helpers in `@repo/core` and fix the confirmed
same-month `formatDateRange` bug they expose. These helpers back both DatePickers, so a
silent formatting bug ships to every consumer.

## Why

`@repo/core/dates` is the most obviously testable code in the repo (pure, deterministic)
and has zero tests. It also has a live bug:

- [`ranges.ts:43`](../../packages/core/src/dates/ranges.ts) uses `formatKey: 'monthShort'`, which maps to `'MMM yyyy'` ([`formats.ts:41`](../../packages/core/src/dates/formats.ts)). So a same-month range renders **`"Apr 2022 4 - Apr 8, 2022"`** instead of the documented `"Apr 4 - 8, 2022"` ([`ranges.ts:41`](../../packages/core/src/dates/ranges.ts)). The same-year branch already does it correctly with `'MMM'` at [`ranges.ts:47-51`](../../packages/core/src/dates/ranges.ts).

## Scope

- Fix the same-month branch to use `'MMM'` (day + month, no year).
- Add table-driven tests for `formatDateRange`, `formatDate`, `formatDateCustom`.
- Optional: collapse the three parallel lists of `DateFormatKey` (declared in
  [`types.ts:6-22`](../../packages/core/src/dates/types.ts), mapped in
  [`formats.ts:23-51`](../../packages/core/src/dates/formats.ts), described in
  [`helpers.ts:11-28`](../../packages/core/src/dates/helpers.ts)) into one record so a new key
  can't be added in one place and forgotten in another.
- Optional: drop the `console.warn` calls inside the formatters
  ([`formatters.ts:26,50`](../../packages/core/src/dates/formatters.ts)) — a library shouldn't
  log into consumers' apps on every bad date; returning `''` is enough.

## Out of scope

- DatePicker component behaviour (they already delegate to these helpers correctly).
- Adding a `test` script to `core` — done in D0.

## Approach

- [ ] Write `dates/ranges.test.ts` covering all four branches: same-month, same-year,
      cross-year, single-date (with and without the prefix), plus null/invalid inputs.
- [ ] Watch the same-month case fail, then fix [`ranges.ts:43`](../../packages/core/src/dates/ranges.ts).
- [ ] Add `dates/formatters.test.ts` for each `DateFormatKey` and null handling.
- [ ] (Optional) refactor the format-key record; (optional) remove `console.warn`.

## Acceptance criteria

- [ ] A same-month range formats as `"Apr 4 - 8, 2022"`.
- [ ] Tests cover every branch of `formatDateRange` and each `DateFormatKey`.
- [ ] `pnpm --filter @repo/core test` is green and included in `turbo run test`.
- [ ] DatePicker stories still render sensible strings.
