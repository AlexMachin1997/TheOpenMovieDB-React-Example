import { cn } from '@repo/tailwind-config';

import type { ICommandShortcut } from '~/components/Command/Command.types';

export const CommandShortcut = ({ className, ...props }: ICommandShortcut) => {
	return (
		<span
			data-slot='command-shortcut'
			className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
			{...props}
		/>
	);
};
