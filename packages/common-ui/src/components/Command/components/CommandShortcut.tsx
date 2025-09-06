import * as React from 'react';
import { cn } from '~/utils/className';

/**
 * Props for the CommandShortcut component
 *
 * @interface ICommandShortcut
 * @extends React.ComponentProps<'span'>
 */
export interface ICommandShortcut extends React.ComponentProps<'span'> {
	/** Additional CSS classes to apply to the command shortcut */
	className?: string;
}

/**
 * Keyboard shortcut display component for command items
 *
 * This component provides a consistent way to display keyboard shortcuts
 * alongside command items. It uses muted styling and proper typography
 * to show shortcuts without overwhelming the main command text.
 *
 * Features:
 * - Muted text color for visual hierarchy
 * - Increased letter spacing for better readability
 * - Automatic right alignment within command items
 * - Consistent typography and sizing
 * - Customizable styling through className prop
 *
 * The component automatically:
 * - Uses muted foreground color for subtlety
 * - Applies increased letter spacing for better readability
 * - Aligns to the right side of command items
 * - Uses smaller text size for visual hierarchy
 * - Integrates with command palette design system
 *
 * Styling characteristics:
 * - Muted text color for visual hierarchy
 * - Smaller font size (text-xs) for subtlety
 * - Increased letter spacing for readability
 * - Right alignment within command items
 * - Consistent with design system colors
 *
 * Common use cases:
 * - Displaying keyboard shortcuts for commands
 * - Showing alternative ways to access functionality
 * - Providing quick reference for power users
 * - Enhancing accessibility with keyboard navigation hints
 *
 * @component
 * @param props - The command shortcut configuration props
 * @returns The rendered command shortcut display component
 */
export const CommandShortcut = ({ className, ...props }: ICommandShortcut) => {
	return (
		<span
			data-slot='command-shortcut'
			className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
			{...props}
		/>
	);
};
