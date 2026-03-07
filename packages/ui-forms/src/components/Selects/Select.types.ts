import type React from 'react';
import type { Option } from '@repo/core';
import type { ICommandSearchConfig, IEmptyStateConfig } from '@repo/ui-command';

/**
 * Common props shared between single and multi select modes.
 *
 * @interface ISelectCommonProps
 */
interface ISelectCommonProps {
	/** Available options for selection */
	options: Option[];
	/** Placeholder text displayed when no value is selected */
	placeholder?: string;
	/** Whether to show the clear button(s) for deselecting */
	showClearButton?: boolean;
	/** Search configuration for the dropdown list */
	searchConfig?: ICommandSearchConfig;
	/** Configuration for empty state messages */
	emptyState?: IEmptyStateConfig;
	/** Default search value to start with */
	defaultSearchValue?: string;
	/** Additional CSS class for the trigger button */
	triggerClassName?: string;
	/**
	 * Custom renderer for the dropdown list items.
	 * If not provided, a default flat list of `SelectListItem` components is rendered.
	 */
	children?: React.ReactNode;
}

/**
 * Props for single-select mode.
 *
 * When `type` is `'single'`, `value` is a single string and `onValueChange`
 * receives a single string representing the selected (or deselected) value.
 *
 * @interface ISingleSelectProps
 */
export interface ISingleSelectProps extends ISelectCommonProps {
	/** Discriminator: use `'single'` for single-select mode */
	type: 'single';
	/** The currently selected value */
	value: string;
	/** Callback fired when the selected value changes */
	onValueChange: (value: string) => void;
}

/**
 * Props for multi-select mode.
 *
 * When `type` is `'multiple'`, `value` is a `string[]` and `onValueChange`
 * receives an array of all currently selected values.
 *
 * @interface IMultiSelectProps
 */
export interface IMultiSelectProps extends ISelectCommonProps {
	/** Discriminator: use `'multiple'` for multi-select mode */
	type: 'multiple';
	/** The currently selected values */
	value: string[];
	/** Callback fired when the selected values change */
	onValueChange: (value: string[]) => void;
	/** Behavior when selected badges overflow the trigger area */
	overflowBehavior?: 'wrap' | 'wrap-when-open' | 'cutoff';
}

/**
 * Discriminated union of single-select and multi-select props.
 *
 * Use `type="single"` or `type="multiple"` and TypeScript will enforce the
 * correct `value` and `onValueChange` signatures.
 *
 * @example
 * ```tsx
 * // Single select — value is a string
 * <Select type="single" value={value} onValueChange={setValue} options={options} />
 *
 * // Multi select — value is a string[]
 * <Select type="multiple" value={values} onValueChange={setValues} options={options} />
 * ```
 */
export type SelectProps = ISingleSelectProps | IMultiSelectProps;
