import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

/**
 * Props for the CommandItem component
 *
 * @interface ICommandItem
 * @extends React.ComponentProps<typeof CommandPrimitive.Item>
 */
interface ICommandItem extends React.ComponentProps<typeof CommandPrimitive.Item> {
	/** Additional CSS classes to apply to the command item */
	className?: string;
}

/**
 * Individual selectable item within a command palette
 *
 * This component represents a single selectable option in a command palette
 * or dropdown interface. It extends the cmdk Command.Item primitive with
 * additional functionality for automatic closing behavior and consistent styling.
 *
 * Features:
 * - Automatic closing of command palette on selection (configurable)
 * - Consistent styling with hover and selection states
 * - Proper accessibility and keyboard navigation
 * - Integration with CommandContext for state management
 * - Support for disabled state
 * - Icon and text content support
 *
 * The component automatically handles the close-on-select behavior based on
 * the CommandContext configuration. When closeOnSelect is true, selecting
 * an item will automatically close the command palette.
 *
 * Styling includes:
 * - Hover and selection state colors
 * - Proper spacing and typography
 * - Icon sizing and positioning
 * - Disabled state styling
 *
 * @component
 * @param props - The command item configuration props
 * @returns The rendered command item component
 */
export const CommandItem = ({ className, onSelect, disabled = false, ...props }: ICommandItem) => {
	const { closeOnSelect, close } = useCommandContext();

	const handleSelect = React.useCallback(
		(value: string) => {
			if (onSelect) {
				onSelect(value);
			}

			// Automatically close the command menu if closeOnSelect is true
			if (closeOnSelect) {
				close();
			}
		},
		[onSelect, closeOnSelect, close]
	);

	return (
		<CommandPrimitive.Item
			data-slot='command-item'
			className={cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			disabled={disabled}
			onSelect={handleSelect}
			{...props}
		/>
	);
};
