import { createContext } from 'react';

/**
 * Context value interface for command palette functionality
 *
 * This interface defines the shape of the context value provided by CommandProvider.
 * It includes all the state and functions needed for command palette operations.
 *
 * @interface CommandContextValue
 */
export interface CommandContextValue {
	/** Whether the command palette is currently open */
	open: boolean;
	/** Current search value for filtering command items */
	searchValue: string;
	/** Array of command items to display */
	items: unknown[];
	/** Function to update the command items array */
	setItems: (items: unknown[]) => void;
	/** Whether to automatically close the palette when an item is selected */
	closeOnSelect?: boolean;
	/** Function to close the command palette */
	close: () => void;
	/** Function to open the command palette */
	openMenu: () => void;
	/** Function to toggle the command palette open/close state */
	toggle: () => void;
	/** Function to set the command palette open state */
	setOpen: (open: boolean) => void;
	/** Function to handle search value changes */
	onSearchChange: (value: string) => void;
}

/**
 * React context for command palette functionality
 *
 * This context provides access to command palette state and functions
 * throughout the component tree. It must be used within a CommandProvider.
 *
 * The context includes:
 * - Open/close state management
 * - Search functionality
 * - Item management
 * - Selection behavior configuration
 *
 * @example
 * ```tsx
 * const { open, close, searchValue } = useCommandContext();
 * ```
 */
export const CommandContext = createContext<CommandContextValue | null>(null);
