/**
 * Base select value interface
 *
 * This interface defines common props for components that display
 * selected values in select interfaces.
 *
 * @interface IBaseSelectValue
 */
interface IBaseSelectValue extends React.ComponentPropsWithoutRef<'ul'> {
	/** Whether to show a clear button for removing the selected value */
	showClearButton?: boolean;
	/** Placeholder text shown when no items are selected */
	placeholder?: string;
}

/**
 * Props for select value display components
 *
 * This interface defines common props for components that display
 * selected values in select interfaces.
 *
 * @interface SingleSelectValueProps
 */
export type ISingleSelectValue = IBaseSelectValue;

export type MultiSelectOverflowBehavior = 'wrap' | 'wrap-when-open' | 'cutoff';

/**
 * Props for multi select value display components
 *
 * This interface extends the base select value props with multi-select
 * specific functionality.
 *
 * @interface MultiSelectValueProps
 * @extends BaseSelectValueProps
 */
export interface IMultiSelectValue extends IBaseSelectValue {
	/** How to handle overflow when there are many selected items */
	overflowBehavior?: MultiSelectOverflowBehavior;
}
