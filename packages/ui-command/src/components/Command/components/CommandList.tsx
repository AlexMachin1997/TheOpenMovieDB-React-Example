import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/tailwind-config';

import type { ICommandList } from '~/components/Command/Command.types';

export const CommandList = ({ className, ...props }: ICommandList) => {
	return (
		<CommandPrimitive.List
			data-slot='command-list'
			className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
			{...props}
		/>
	);
};
