import { readFileSync } from 'fs';
import { join } from 'path';
import type { ComponentsConfig } from '~/types/components-config';

/**
 * Loads and validates the components.json configuration
 * @returns The validated components configuration
 */
export function loadComponentsConfig(): ComponentsConfig {
	try {
		const configPath = join(process.cwd(), 'components.json');
		const configContent = readFileSync(configPath, 'utf-8');
		const config = JSON.parse(configContent) as ComponentsConfig;

		// Basic validation
		if (!config.$schema) {
			throw new Error('Missing $schema in components.json');
		}

		if (!config.aliases?.components) {
			throw new Error('Missing components alias in components.json');
		}

		if (!config.tailwind?.css) {
			throw new Error('Missing CSS path in components.json');
		}

		return config;
	} catch (error) {
		throw new Error(
			`Failed to load components.json: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}

/**
 * Gets the components alias path
 * @returns The components alias path
 */
export function getComponentsAlias(): string {
	const config = loadComponentsConfig();
	return config.aliases.components;
}

/**
 * Gets the utils alias path
 * @returns The utils alias path
 */
export function getUtilsAlias(): string {
	const config = loadComponentsConfig();
	return config.aliases.utils;
}

/**
 * Gets the UI components alias path
 * @returns The UI components alias path
 */
export function getUiAlias(): string {
	const config = loadComponentsConfig();
	return config.aliases.ui;
}
