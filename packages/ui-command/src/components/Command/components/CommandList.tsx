import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/ui-core';

export interface ICommandList extends React.ComponentProps<typeof CommandPrimitive.List> {
	className?: string;
}

export const CommandList = ({ className, ...props }: ICommandList) => {
	return (
		<CommandPrimitive.List
			data-slot='command-list'
			className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
			{...props}
		/>
	);
};
