import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/tailwind-config';

import type { ICommandSeparator } from '~/components/Command/Command.types';

export const CommandSeparator = ({ className, ...props }: ICommandSeparator) => {
	return (
		<CommandPrimitive.Separator
			data-slot='command-separator'
			className={cn('bg-border -mx-1 h-px', className)}
			{...props}
		/>
	);
};
