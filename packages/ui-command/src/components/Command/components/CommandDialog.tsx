import { cn } from '@repo/tailwind-config';
import { Command } from '~/components/Command/components';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@repo/ui-overlays';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

import type { ICommandDialog } from '~/components/Command/Command.types';

/**
 * Dialog component that wraps command palette functionality in a modal interface
 *
 * @component
 */
export const CommandDialog = ({
	title = 'Command Palette',
	description = 'Search for a command to run...',
	children,
	className,
	showCloseButton = true,
	...props
}: ICommandDialog) => {
	const { open, setOpen } = useCommandContext();

	return (
		<Dialog open={open} onOpenChange={setOpen} {...props}>
			<DialogContent
				className={cn('overflow-hidden p-0', className)}
				showCloseButton={showCloseButton}
			>
				{/*
				 * The header has to sit *inside* the content. Radix renders the content into a portal
				 * and does not carry a Title rendered outside it across, so a sibling header leaves
				 * the rendered `[role=dialog]` with no accessible name at all — which is what this
				 * did until now. `sr-only` keeps it out of the visual design, not out of the
				 * accessibility tree.
				 */}
				<DialogHeader className='sr-only'>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<Command className='[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};
