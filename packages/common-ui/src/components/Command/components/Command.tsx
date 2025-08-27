import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

interface ICommand extends React.ComponentProps<typeof CommandPrimitive> {
	className?: string;
}

export const Command = ({ className, ...props }: ICommand) => {
	return (
		<CommandPrimitive
			data-slot='command'
			className={cn(
				'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
				className
			)}
			{...props}
		/>
	);
};
