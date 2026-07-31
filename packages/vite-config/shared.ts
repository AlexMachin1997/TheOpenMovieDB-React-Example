/**
 * Shared globs for the library build/test tooling.
 *
 * Single-sourced so the Vitest `include` and the `vite-plugin-dts` `exclude`
 * can never drift — a spec file matched by `TEST_GLOBS` is guaranteed to be
 * kept out of the emitted `dist/` types.
 */

/** Test files, matched by Vitest and excluded from the DTS build. */
export const TEST_GLOBS = ['src/**/*.spec.{ts,tsx}', 'src/**/*.test.{ts,tsx}'];

/** Files the DTS build must never emit type declarations for. */
export const DTS_EXCLUDE = ['src/**/*.stories.tsx', 'src/**/*.mdx', ...TEST_GLOBS];
