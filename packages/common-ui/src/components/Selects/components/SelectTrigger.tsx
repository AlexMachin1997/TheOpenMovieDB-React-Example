import { Button } from '~/components/Button/Button';
import { PopoverTrigger } from '~/components/Popover/Popover';
import { cn } from '~/utils/className';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ChevronsUpDownIcon } from 'lucide-react';

/**
 * Props for the SelectTrigger component
 *
 * @interface SelectTriggerProps
 */
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof Button> {
	/** Additional CSS classes to apply to the trigger button */
	className?: string;
	/** Content to display inside the trigger button */
	children?: React.ReactNode;
}

/**
 * Trigger button component for select dropdowns
 *
 * This component provides a button that opens the select dropdown when clicked.
 * It integrates with the CommandContext to manage the open/close state and
 * provides proper accessibility attributes for screen readers.
 *
 * Features:
 * - Automatic open/close state management through CommandContext
 * - Proper ARIA attributes for accessibility (aria-expanded, role="combobox")
 * - Consistent styling with other form components
 * - Chevron icon to indicate dropdown functionality
 * - Focus and hover states with proper visual feedback
 * - Support for disabled state
 * - Integration with PopoverTrigger for positioning
 *
 * The component automatically:
 * - Sets aria-expanded based on the current open state
 * - Provides proper role="combobox" for accessibility
 * - Shows a chevron icon to indicate dropdown functionality
 * - Handles focus states and keyboard navigation
 *
 * Styling includes:
 * - Consistent border and background colors
 * - Proper spacing and typography
 * - Focus ring and hover states
 * - Disabled and invalid states
 * - Dark mode support
 *
 * @component
 * @param props - The trigger button configuration props
 * @returns The rendered select trigger button component
 */
export const SelectTrigger = ({
	className,
	children,
	variant = 'outline',
	role = 'combobox',
	'aria-expanded': ariaExpanded,
	...props
}: SelectTriggerProps) => {
	const { open } = useCommandContext();

	return (
		<PopoverTrigger asChild>
			<Button
				{...props}
				variant={variant}
				role={role}
				aria-expanded={ariaExpanded ?? open}
				aria-label='Select Trigger'
				aria-haspopup='listbox'
				className={cn(
					"flex w-full h-auto min-h-9 items-center justify-between gap-2 overflow-hidden rounded-md border border-input bg-transparent px-3 py-1.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
					className
				)}
			>
				{children}
				<ChevronsUpDownIcon className='size-4 shrink-0 opacity-50' />
			</Button>
		</PopoverTrigger>
	);
};
