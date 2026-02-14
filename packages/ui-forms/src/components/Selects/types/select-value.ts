import React from 'react';

/**
 * Base select value interface
 *
 * This interface defines the common properties for select value components
 * that extend the native ul element props.
 *
 * @interface ISelectValueProps
 */
interface ISelectValueProps extends React.ComponentPropsWithoutRef<'ul'> {
	/** Whether the select value component is disabled */
	disabled?: boolean;
	/** Whether the select value component is read-only */
	readOnly?: boolean;
	/** Whether the select value component is required */
	required?: boolean;
	/** Whether the select value component has an error state */
	error?: boolean;
	/** Additional CSS classes to apply */
	className?: string;
}

/**
 * Single select value interface
 *
 * This interface represents the props for single select value components.
 */
export interface ISingleSelectValue extends ISelectValueProps {
	/** Placeholder text to display when no option is selected */
	placeholder?: string;
	/** Whether to show the clear button for deselecting */
	showClearButton?: boolean;
}

/**
 * Multi select value interface
 *
 * This interface extends the base select value props with multi-select
 * specific functionality.
 */
export interface IMultiSelectValue extends ISelectValueProps {
	/** Maximum number of items that can be selected */
	maxItems?: number;
	/** Whether to show a count of selected items */
	showCount?: boolean;
	/** Placeholder text to display when no options are selected */
	placeholder?: string;
	/** Whether to show the clear button for deselecting */
	showClearButton?: boolean;
	/** Behavior when items overflow the display area */
	overflowBehavior?: 'wrap' | 'wrap-when-open' | 'cutoff';
}
