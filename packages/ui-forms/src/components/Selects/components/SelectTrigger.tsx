import { Button, Icon } from '@repo/ui-core';
import { PopoverTrigger } from '@repo/ui-overlays';
import { cn } from '@repo/tailwind-config';
import { useCommandContext } from '@repo/ui-command';

/**
 * Props for the SelectTrigger component
 */
export interface ISelectTriggerProps extends React.ComponentPropsWithoutRef<typeof Button> {
	className?: string;
	children?: React.ReactNode;
}

export const SelectTrigger = ({
	className,
	children,
	variant = 'outline',
	role = 'combobox',
	'aria-expanded': ariaExpanded,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	id,
	...props
}: ISelectTriggerProps) => {
	const { open } = useCommandContext();

	// `aria-label='Select Trigger'` used to be hardcoded *after* the props spread, so it always won
	// — and `aria-label` outranks a native `<label for>` in the accessible name computation. A
	// `Field`-labelled Select therefore announced itself as "Select Trigger" rather than "Country".
	//
	// It is now a last resort, used only when the caller has supplied no name at all. An `id` counts
	// as a name here: it is what a `<label htmlFor>` points at, and that label is invisible from
	// inside this component. Passing one and still emitting the fallback would re-create the bug.
	const isNamedByCaller = Boolean(ariaLabel ?? ariaLabelledBy ?? id);

	return (
		<PopoverTrigger asChild>
			<Button
				{...props}
				id={id}
				variant={variant}
				role={role}
				aria-expanded={ariaExpanded ?? open}
				aria-label={isNamedByCaller ? ariaLabel : 'Select Trigger'}
				aria-labelledby={ariaLabelledBy}
				aria-haspopup='listbox'
				className={cn(
					"flex w-full h-auto min-h-9 max-w-96 items-center justify-between gap-2 overflow-hidden rounded-md border border-input bg-transparent px-3 py-1.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
					className
				)}
			>
				{children}
				<Icon name='chevrons-up-down' className='opacity-50' />
			</Button>
		</PopoverTrigger>
	);
};
