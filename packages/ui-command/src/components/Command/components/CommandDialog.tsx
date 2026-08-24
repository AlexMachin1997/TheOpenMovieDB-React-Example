import { cn } from '@repo/tailwind-config';
import { Command } from '~/components/Command/components';
import { Dialog, DialogContent } from '@repo/ui-overlays';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

import type { ICommandDialog } from '~/components/Command/Command.types';

/**
 * Dialog component that wraps command palette functionality in a modal interface
 *
 * @component
 */
export const CommandDialog = ({
	title = 'Command Palette',
	children,
	className,
	showCloseButton = true,
	...props
}: ICommandDialog) => {
	const { open, setOpen } = useCommandContext();

	return (
		<Dialog open={open} onOpenChange={setOpen} {...props}>
			{/*
			 * Named by `aria-label` rather than a hidden heading. A command palette's visible
			 * affordance is its search input, so a heading above it would be noise — but the dialog
			 * still needs a name, and the `sr-only` header this used to hand-build is exactly the
			 * pattern that is easy to get wrong. It sat *outside* the content until recently, where
			 * Radix never carried it into the portal, so the palette shipped with no name at all.
			 */}
			<DialogContent
				aria-label={title}
				className={cn('overflow-hidden p-0', className)}
				showCloseButton={showCloseButton}
			>
				<Command className='[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};
