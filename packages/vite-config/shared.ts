import fs from 'node:fs';
import path from 'node:path';

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

/**
 * React must never be bundled into a library's own dist output — every package here shares
 * a single React instance with whatever app (or sibling package) imports it. Bundling a
 * private copy breaks hooks/context across package boundaries with "Cannot read properties
 * of null (reading 'useState')" the moment two bundled copies render in the same tree.
 */
const REACT_EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'];

/** Matches a bare import specifier against a package name, including deep imports. */
const matchesPackage = (id: string, packageName: string) =>
	id === packageName || id.startsWith(`${packageName}/`);

/**
 * Every package name the building package declares as a runtime dependency.
 *
 * Read from `package.json` rather than listed here so the two can never disagree: adding a
 * dependency externalizes it, and removing one stops externalizing it, without a second edit.
 * `process.cwd()` is the package root — Vite is invoked from there, which is the same
 * assumption the `~` alias already makes.
 */
const readDeclaredDependencies = (packageDirectory: string): string[] => {
	const manifest = JSON.parse(
		fs.readFileSync(path.resolve(packageDirectory, 'package.json'), 'utf8')
	) as {
		dependencies?: Record<string, string>;
		peerDependencies?: Record<string, string>;
	};

	return [
		...Object.keys(manifest.dependencies ?? {}),
		...Object.keys(manifest.peerDependencies ?? {})
	];
};

interface ExternalMatcherOptions {
	/** Package names to externalize on top of the declared dependencies. */
	externals?: string[];
	/** Declared dependencies to bundle into `dist/` anyway. */
	bundle?: string[];
}

/**
 * Builds the Rollup `external` predicate shared by every library preset.
 *
 * A package's `dist/` should contain that package's own source and nothing else, so the default
 * is external: React, sibling `@repo/*` packages, and everything the package declares as a
 * runtime dependency. `bundle` is the escape hatch for a dependency that genuinely has to be
 * inlined — it cannot override React or `@repo/*`, which are external for correctness rather
 * than for output size.
 */
export const createExternalMatcher = ({
	externals = [],
	bundle = []
}: ExternalMatcherOptions = {}) => {
	const external = [...readDeclaredDependencies(process.cwd()), ...externals];

	return (id: string): boolean => {
		if (REACT_EXTERNALS.some((name) => matchesPackage(id, name))) return true;
		if (id.startsWith('@repo/')) return true;
		if (bundle.some((name) => matchesPackage(id, name))) return false;
		return external.some((name) => matchesPackage(id, name));
	};
};
