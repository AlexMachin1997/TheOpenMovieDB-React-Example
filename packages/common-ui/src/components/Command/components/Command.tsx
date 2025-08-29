import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

/**
 * Props for the Command component
 *
 * @interface ICommand
 * @extends React.ComponentProps<typeof CommandPrimitive>
 */
interface ICommand extends React.ComponentProps<typeof CommandPrimitive> {
	/** Additional CSS classes to apply to the command container */
	className?: string;
}

/**
 * Root command component that provides the foundation for command palette functionality
 *
 * This component wraps the cmdk Command primitive and provides consistent styling
 * and behavior for command palette interfaces. It serves as the main container
 * for command search, navigation, and selection functionality.
 *
 * Features:
 * - Full-height and width flex container
 * - Consistent background and text colors using CSS variables
 * - Rounded corners and overflow handling
 * - Accessibility support through cmdk primitives
 * - Customizable styling through className prop
 * - Disabled built-in filtering (shouldFilter={false}) to allow custom filtering logic
 *
 * ⚠️ IMPORTANT: This component sets shouldFilter={false} to disable cmdk's built-in
 * filtering. This is required for proper integration with CommandProvider's custom
 * filtering logic and virtualization components. Without this, virtualization and
 * grouped lists may fail to render correctly.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Command>
 *   <CommandSearch />
 *   <CommandList>
 *     <CommandItem>Option 1</CommandItem>
 *     <CommandItem>Option 2</CommandItem>
 *   </CommandList>
 * </Command>
 *
 * // With custom styling
 * <Command className="border border-gray-200">
 *   <CommandSearch />
 *   <CommandList>
 *     <CommandItem>Option 1</CommandItem>
 *     <CommandItem>Option 2</CommandItem>
 *   </CommandList>
 * </Command>
 * ```
 *
 * @param props - The component props including all cmdk Command props
 * @returns The rendered command container component
 */
export const Command = ({ className, ...props }: ICommand) => {
	return (
		<CommandPrimitive
			data-slot='command'
			className={cn(
				'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
				className
			)}
			{...props}
			shouldFilter={false}
		/>
	);
};
