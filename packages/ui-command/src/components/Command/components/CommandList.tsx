import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/tailwind-config';

import { CommandContext } from '~/components/Command/contexts/command-context';

import type { ICommandList } from '~/components/Command/Command.types';

export const CommandList = ({ className, ref, ...props }: ICommandList) => {
	// Read directly rather than through `useCommandContext`, which throws: a bare `Command` renders a
	// list with no provider above it.
	const setListboxId = React.use(CommandContext)?.setListboxId;

	// `cmdk` owns the listbox id and overwrites any `id` passed in, so reading it off the rendered node
	// is how `SelectTrigger`, which sits outside `Command`, points `aria-controls` at the listbox.
	const listRef = React.useCallback(
		(node: HTMLDivElement | null) => {
			setListboxId?.(node?.id);

			if (typeof ref === 'function') {
				ref(node);
			} else if (ref) {
				ref.current = node;
			}
		},
		[setListboxId, ref]
	);

	return (
		<CommandPrimitive.List
			data-slot='command-list'
			className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
			{...props}
			ref={listRef}
		/>
	);
};
