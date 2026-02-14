import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/ui-core';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

export interface ICommandItem extends React.ComponentProps<typeof CommandPrimitive.Item> {
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	onSelect?: (value: string) => void;
}

export const CommandItem = ({ className, onSelect, disabled = false, ...props }: ICommandItem) => {
	const { closeOnSelect, close } = useCommandContext();

	const handleSelect = React.useCallback(
		(value: string) => {
			if (onSelect) {
				onSelect(value);
			}

			if (closeOnSelect) {
				close();
			}
		},
		[onSelect, closeOnSelect, close]
	);

	return (
		<CommandPrimitive.Item
			data-slot='command-item'
			className={cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			disabled={disabled}
			onSelect={handleSelect}
			{...props}
		/>
	);
};
