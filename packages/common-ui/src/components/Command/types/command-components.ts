/**
 * Base props for command-like components
 *
 * This interface defines common props that command-like components
 * should support, extending React's component props with command-specific
 * functionality.
 *
 * @interface IBaseCommand
 */
export interface IBaseCommand extends React.ComponentProps<'div'> {
	/** Additional CSS classes to apply */
	className?: string;
}

/**
 * Base props for command item components
 *
 * This interface defines common props for individual selectable items
 * within command-like interfaces.
 *
 * @interface IBaseCommandItem
 */
export interface IBaseCommandItem extends Omit<React.ComponentProps<'div'>, 'onSelect'> {
	/** Additional CSS classes to apply */
	className?: string;
	/** Value associated with this item */
	value: string;
	/** Whether the item is disabled */
	disabled?: boolean;
	/** Callback when the item is selected */
	onSelect?: (value: string) => void;
}
