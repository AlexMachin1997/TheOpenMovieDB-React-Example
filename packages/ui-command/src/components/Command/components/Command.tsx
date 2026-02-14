import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/ui-core';

/**
 * Props for the Command component
 *
 * @interface ICommand
 * @extends React.ComponentProps<typeof CommandPrimitive>
 */
export interface ICommand extends React.ComponentProps<typeof CommandPrimitive> {
	/** Additional CSS classes to apply to the command container */
	className?: string;
}

/**
 * Root command component that provides the foundation for command palette functionality
 *
 * This component wraps the cmdk Command primitive and provides consistent styling
 * and behavior for command palette interfaces.
 *
 * ⚠️ IMPORTANT: This component sets shouldFilter={false} to disable cmdk's built-in
 * filtering. This is required for proper integration with CommandProvider's custom
 * filtering logic and virtualization components.
 *
 * @component
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
