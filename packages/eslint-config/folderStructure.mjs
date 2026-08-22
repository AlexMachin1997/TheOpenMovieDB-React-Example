// @ts-check
import { existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { createFolderStructure, projectStructurePlugin } from 'eslint-plugin-project-structure';

/**
 * Walk up from a package directory to the workspace root, identified by `pnpm-workspace.yaml`.
 *
 * `projectRoot` is resolved by the plugin against the repository root, not against ESLint's working
 * directory, so it has to be expressed as a repo-relative path. Deriving it removes the only way
 * this configuration can fail silently: a hand-written path that no longer matches reality points
 * the rule at a tree that does not exist, and a rule with nothing to check reports nothing.
 *
 * @param {string} packageDir Absolute path to the consuming package (pass `import.meta.dirname`).
 * @returns {string} The package path relative to the workspace root, with POSIX separators.
 */
const repoRelativePath = (packageDir) => {
	let current = packageDir;

	while (!existsSync(join(current, 'pnpm-workspace.yaml'))) {
		const parent = dirname(current);
		if (parent === current) throw new Error(`No pnpm-workspace.yaml above ${packageDir}`);
		current = parent;
	}

	return relative(current, packageDir).split(sep).join('/');
};

/** Sub-components of a compound component: `Dialog/components/DialogTitle.tsx`. */
const subComponents = {
	name: 'components',
	children: [
		{ name: 'index.ts' },
		{ name: '{PascalCase}.tsx' },
		{ name: '{PascalCase}.types.ts' },
		{ name: '{PascalCase}.variants.ts' }
	]
};

/**
 * Folders a component may keep beside its own files. Their contents are deliberately left
 * unconstrained — this rule is about where a component's files live, not about how a context or a
 * test fixture is organised internally.
 */
const supportingFolders = ['contexts', 'hooks', 'types', 'utils', '__fixtures__'].map((name) => ({
	name,
	children: []
}));

/** The files a component folder may hold, all named after the folder that contains them. */
const componentFiles = [
	{ name: 'index.ts' },
	{ name: '{FolderName}.tsx' },
	{ name: '{FolderName}.types.ts' },
	{ name: '{FolderName}.variants.ts' },
	{ name: '{FolderName}.constants.ts' },
	{ name: '{FolderName}.stories.tsx' },
	{ name: '{FolderName}.mdx' },
	{ name: '{FolderName}.types.spec.ts' },

	// `Overlay/` holds `OverlaySurface` and `OverlayCloseButton` rather than an `Overlay.tsx`. A
	// file prefixed with its folder's name still reads as belonging to that folder.
	{ name: '{FolderName}*.tsx' },
	{ name: '{FolderName}*.types.ts' }
];

/**
 * Folders that group several related components rather than describing one.
 *
 * Named individually rather than matched by a pattern: a generic "any folder may hold any
 * component" rule would readmit exactly the drift this is meant to catch. Whether these should be
 * flattened into ordinary component folders is a restructure, and out of scope here.
 */
const groupingFolders = [
	{
		name: 'Selects',
		children: [
			{ name: 'index.ts' },
			{ name: '{PascalCase}.tsx' },
			{ name: '{PascalCase}.types.ts' },
			{ name: '{PascalCase}.stories.tsx' },
			{ name: '{PascalCase}.mdx' },
			subComponents,
			...supportingFolders,
			{ name: '{PascalCase}', children: [] }
		]
	},
	{
		name: 'DatePickers',
		children: [{ name: 'index.ts' }, ...supportingFolders, { name: '{PascalCase}', children: [] }]
	},
	{
		name: 'fields',
		children: [
			{ name: 'index.ts' },
			// literal, not `{FolderName}`: that placeholder PascalCases to `Fields.types.ts`
			{ name: 'fields.types.ts' },
			{ name: '{PascalCase}.tsx' },
			{ name: '{PascalCase}.stories.tsx' },
			{ name: '{PascalCase}.mdx' },
			...supportingFolders
		]
	}
];

/**
 * Enforce this monorepo's UI package layout for one package.
 *
 * Returns a flat-config array. It sets **no parser**: the rule only inspects a file's path, so it
 * has no need of one, and the previous attempt at enabling this failed precisely because it
 * installed `projectStructureParser` for every source file and every code rule then ran against an
 * empty AST. Setting no parser makes that failure unreachable rather than merely avoided.
 *
 * @param {string} packageDir Absolute path to the consuming package (pass `import.meta.dirname`).
 * @returns {import("eslint").Linter.Config[]}
 */
export const folderStructure = (packageDir) => [
	{
		files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
		ignores: ['projectStructure.cache.json'],
		plugins: { 'project-structure': projectStructurePlugin },
		rules: {
			'project-structure/folder-structure': [
				'error',
				createFolderStructure({
					projectRoot: repoRelativePath(packageDir),
					ignorePatterns: ['node_modules', 'dist', '.turbo', 'coverage'],

					structure: [
						// Package-level files and folders this rule takes no view on.
						{ name: '*' },
						{ name: 'node_modules', children: [] },
						{ name: 'dist', children: [] },
						{ name: '.turbo', children: [] },

						{
							name: 'src',
							children: [
								{ name: 'index.ts' },

								// Non-component folders. Named explicitly so a typo is caught, but their
								// contents are their own business.
								{ name: 'hooks', children: [] },
								{ name: 'utils', children: [] },
								{ name: 'adapters', children: [] },
								{ name: 'types', children: [] },

								{
									name: 'components',
									children: [
										...groupingFolders,
										{
											name: '{PascalCase}',
											children: [...componentFiles, subComponents, ...supportingFolders]
										}
									]
								}
							]
						}
					]
				})
			]
		}
	}
];
