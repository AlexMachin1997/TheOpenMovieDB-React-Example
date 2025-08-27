import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

interface ICommandEmpty extends React.ComponentProps<typeof CommandPrimitive.Empty> {
	className?: string;
}

export const CommandEmpty = ({ className, ...props }: ICommandEmpty) => {
	return (
		<CommandPrimitive.Empty
			data-slot='command-empty'
			className={cn('py-6 text-center text-sm', className)}
			{...props}
		/>
	);
};
