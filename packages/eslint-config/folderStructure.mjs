// @ts-check
import { createFolderStructure } from 'eslint-plugin-project-structure';

/**
 * Defines the enforced component folder structure for all UI packages.
 *
 * Every component folder inside `src/components/` must follow:
 *   - {ComponentName}.tsx          — React implementation
 *   - {ComponentName}.types.ts     — TypeScript interfaces (I{ComponentName})
 *   - {ComponentName}.variants.ts  — CVA variants (optional)
 *   - {ComponentName}.stories.tsx  — Storybook stories
 *   - {ComponentName}.mdx         — MDX documentation
 *   - index.ts                    — Barrel export
 *
 * Sub-component folders (e.g. Dialog/components/) follow the same pattern recursively.
 */
export const folderStructureConfig = createFolderStructure({
	ignorePatterns: ['node_modules', 'dist', '.turbo', 'coverage', 'projectStructure.cache.json'],

	structure: [
		// Allow any files in the root (package.json, tsconfig.json, etc.)
		{ name: '*' },

		// Allow any root-level folders
		{
			name: '*',
			children: []
		},

		// Enforce structure within the `src` folder
		{
			name: 'src',
			children: [
				// Allow top-level src files (index.ts, etc.)
				{ name: '*.ts' },
				{ name: '*.tsx' },

				// The `components` folder has strict rules
				{
					name: 'components',
					children: [
						{
							// Each component gets a PascalCase folder
							name: '{PascalCase}',
							children: [
								// Barrel export
								{ name: 'index.ts' },

								// Core component file
								{ name: '{folderName}.tsx' },

								// Types file
								{ name: '{folderName}.types.ts' },

								// CVA variants (optional)
								{ name: '{folderName}.variants.ts' },

								// Storybook stories
								{ name: '{folderName}.stories.tsx' },

								// MDX documentation
								{ name: '{folderName}.mdx' },

								// Allow a `components` sub-folder for compound components (e.g. Dialog)
								{
									name: 'components',
									children: [
										// Barrel export for sub-components
										{ name: 'index.ts' },

										// Each sub-component file
										{ name: '{PascalCase}.tsx' },
										{ name: '{PascalCase}.types.ts' },
										{ name: '{PascalCase}.variants.ts' }
									]
								}
							]
						}
					]
				},

				// Allow other top-level src folders (hooks, utils, lib, etc.)
				{
					name: '{camelCase}',
					children: []
				}
			]
		}
	]
});
