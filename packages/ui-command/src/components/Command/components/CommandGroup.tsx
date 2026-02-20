import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/tailwind-config';

import type { ICommandGroup } from '~/components/Command/Command.types';

export const CommandGroup = ({ className, ...props }: ICommandGroup) => {
	return (
		<CommandPrimitive.Group
			data-slot='command-group'
			className={cn(
				'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
				className
			)}
			{...props}
		/>
	);
};
