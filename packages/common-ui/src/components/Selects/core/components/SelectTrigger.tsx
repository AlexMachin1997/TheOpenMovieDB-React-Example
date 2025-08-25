import { Button } from '~/components/Button/Button';
import { PopoverTrigger } from '~/components/Popover/Popover';
import { cn } from '~/utils/className';
import { useSelectContext } from '~/components/Selects/core/hooks/useSelectContext';
import { ChevronsUpDownIcon } from 'lucide-react';

export const SelectTrigger = ({
	className,
	children,
	variant = 'outline',
	role = 'combobox',
	'aria-expanded': ariaExpanded,
	...props
}: {
	className?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Button>) => {
	const { open } = useSelectContext();

	return (
		<PopoverTrigger asChild>
			<Button
				{...props}
				variant={variant}
				role={role}
				aria-expanded={ariaExpanded ?? open}
				aria-label='Select Trigger'
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
