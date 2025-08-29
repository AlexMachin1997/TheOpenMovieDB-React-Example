import * as React from 'react';
import { cn } from '~/utils/className';
import { Command } from '~/components/Command/components';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '~/components/Dialog/Dialog';
import { useCommandContext } from '~/components/Command/hooks';

/**
 * Props for the CommandDialog component
 *
 * @interface ICommandDialog
 * @extends React.ComponentProps<typeof Dialog>
 */
interface ICommandDialog extends React.ComponentProps<typeof Dialog> {
	/** The title displayed in the dialog header (screen reader only) */
	title?: string;
	/** The description displayed in the dialog header (screen reader only) */
	description?: string;
	/** Additional CSS classes to apply to the dialog content */
	className?: string;
	/** Whether to show the close button in the dialog */
	showCloseButton?: boolean;
}

/**
 * Dialog component that wraps command palette functionality in a modal interface
 *
 * This component provides a full-screen modal dialog for command palette operations,
 * combining the Dialog component with Command functionality. It automatically
 * manages the open/close state through the CommandContext and provides
 * accessibility features through screen reader-only headers.
 *
 * Features:
 * - Full-screen modal dialog with backdrop
 * - Screen reader accessible with hidden header
 * - Integrated with Command component for consistent styling
 * - Automatic state management through CommandContext
 * - Customizable close button visibility
 * - Responsive design with proper overflow handling
 *
 * The dialog includes comprehensive styling for command components:
 * - Proper spacing and padding for command items
 * - Consistent typography and colors
 * - Icon sizing and positioning
 * - Group heading and separator styling
 *
 * @component
 * @param props - The dialog configuration props
 * @returns The rendered command dialog component
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
			<DialogHeader className='sr-only'>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
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
