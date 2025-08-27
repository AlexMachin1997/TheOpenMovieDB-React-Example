import * as React from 'react';
import { cn } from '~/utils/className';

interface ICommandShortcut extends React.ComponentProps<'span'> {
	className?: string;
}

export const CommandShortcut = ({ className, ...props }: ICommandShortcut) => {
	return (
		<span
			data-slot='command-shortcut'
			className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
			{...props}
		/>
	);
};
