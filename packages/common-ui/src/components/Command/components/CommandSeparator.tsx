import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

interface ICommandSeparator extends React.ComponentProps<typeof CommandPrimitive.Separator> {
	className?: string;
}

export const CommandSeparator = ({ className, ...props }: ICommandSeparator) => {
	return (
		<CommandPrimitive.Separator
			data-slot='command-separator'
			className={cn('bg-border -mx-1 h-px', className)}
			{...props}
		/>
	);
};
