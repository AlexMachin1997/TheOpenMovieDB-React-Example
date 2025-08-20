import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { Button } from '~/components/button/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '~/components/command/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover/popover';
import { Badge } from '~/components/badge/badge';

type MultiSelectContextType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	selectedValues: Set<string>;
	toggleValue: (value: string) => void;
	items: Map<string, React.ReactNode>;
	onItemAdded: (value: string, label: React.ReactNode) => void;
};
const MultiSelectContext = React.createContext<MultiSelectContextType | null>(null);

export const MultiSelect = ({
	children,
	values,
	defaultValues,
	onValuesChange
}: {
	children: React.ReactNode;
	values?: string[];
	defaultValues?: string[];
	onValuesChange?: (values: string[]) => void;
}) => {
	const [open, setOpen] = React.useState(false);
	const [selectedValues, setSelectedValues] = React.useState(
		new Set<string>(values ?? defaultValues)
	);
	const [items, setItems] = React.useState<Map<string, React.ReactNode>>(new Map());

	function toggleValue(value: string) {
		const getNewSet = (prev: Set<string>) => {
			const newSet = new Set(prev);
			if (newSet.has(value)) {
				newSet.delete(value);
			} else {
				newSet.add(value);
			}
			return newSet;
		};
		setSelectedValues(getNewSet);
		onValuesChange?.([...getNewSet(selectedValues)]);
	}

	const onItemAdded = React.useCallback((value: string, label: React.ReactNode) => {
		setItems((prev) => {
			if (prev.get(value) === label) return prev;
			return new Map(prev).set(value, label);
		});
	}, []);

	return (
		<MultiSelectContext.Provider
			value={{
				open,
				setOpen,
				selectedValues: values ? new Set(values) : selectedValues,
				toggleValue,
				items,
				onItemAdded
			}}
		>
			<Popover open={open} onOpenChange={setOpen}>
				{children}
			</Popover>
		</MultiSelectContext.Provider>
	);
};

export const MultiSelectTrigger = ({
	className,
	children,
	...props
}: {
	className?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Button>) => {
	const { open } = useMultiSelectContext();

	return (
		<PopoverTrigger asChild>
			<Button
				{...props}
				variant={props.variant ?? 'outline'}
				role={props.role ?? 'combobox'}
				aria-expanded={props['aria-expanded'] ?? open}
				className={cn(
					"flex h-auto min-h-9 w-fit items-center justify-between gap-2 overflow-hidden rounded-md border border-input bg-transparent px-3 py-1.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
					className
				)}
			>
				{children}
				<ChevronsUpDownIcon className='size-4 shrink-0 opacity-50' />
			</Button>
		</PopoverTrigger>
	);
};

export const MultiSelectValue = ({
	placeholder,
	clickToRemove = true,
	className,
	overflowBehavior = 'wrap-when-open',
	...props
}: {
	placeholder?: string;
	clickToRemove?: boolean;
	overflowBehavior?: 'wrap' | 'wrap-when-open' | 'cutoff';
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>) => {
	const { selectedValues, toggleValue, items, open } = useMultiSelectContext();
	const [overflowAmount, setOverflowAmount] = React.useState(0);
	const valueRef = React.useRef<HTMLDivElement>(null);
	const overflowRef = React.useRef<HTMLDivElement>(null);
	const observerRef = React.useRef<ResizeObserver | null>(null);

	const shouldWrap = overflowBehavior === 'wrap' || (overflowBehavior === 'wrap-when-open' && open);

	const checkOverflow = React.useCallback(() => {
		if (valueRef.current == null) return;

		const containerElement = valueRef.current;
		const overflowElement = overflowRef.current;
		const items = containerElement.querySelectorAll<HTMLElement>('[data-selected-item]');

		if (overflowElement != null) overflowElement.style.display = 'none';
		items.forEach((child) => child.style.removeProperty('display'));
		let amount = 0;
		for (let i = items.length - 1; i >= 0; i--) {
			const child = items[i];
			if (containerElement.scrollWidth <= containerElement.clientWidth) {
				break;
			}
			amount = items.length - i;
			if (child) {
				child.style.display = 'none';
				overflowElement?.style.removeProperty('display');
			}
		}
		setOverflowAmount(amount);
	}, []);

	React.useLayoutEffect(() => {
		checkOverflow();
	}, [selectedValues, checkOverflow, shouldWrap]);

	const handleResize = React.useCallback(
		(node: HTMLDivElement | null) => {
			// Clean up previous observer
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}

			valueRef.current = node;

			if (node) {
				const observer = new ResizeObserver(checkOverflow);
				observer.observe(node);
				observerRef.current = observer;
			}
		},
		[checkOverflow]
	);

	// Cleanup on unmount
	React.useEffect(() => {
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	if (selectedValues.size === 0 && placeholder) {
		return (
			<span className='min-w-0 overflow-hidden font-normal text-muted-foreground'>
				{placeholder}
			</span>
		);
	}

	return (
		<div
			{...props}
			ref={handleResize}
			className={cn(
				'flex w-full gap-1.5 overflow-hidden',
				shouldWrap && 'h-full flex-wrap',
				className
			)}
		>
			{[...selectedValues]
				.filter((value) => items.has(value))
				.map((value) => (
					<Badge
						variant='outline'
						data-selected-item
						className='group flex items-center gap-1'
						key={value}
						onClick={
							clickToRemove
								? (e) => {
										e.stopPropagation();
										toggleValue(value);
									}
								: undefined
						}
					>
						{items.get(value)}
						{clickToRemove && (
							<XIcon className='size-2 text-muted-foreground group-hover:text-destructive' />
						)}
					</Badge>
				))}
			<Badge
				style={{
					display: overflowAmount > 0 && !shouldWrap ? 'block' : 'none'
				}}
				variant='outline'
				ref={overflowRef}
			>
				+{overflowAmount}
			</Badge>
		</div>
	);
};

export const MultiSelectContent = ({
	search = true,
	children,
	...props
}: {
	search?: boolean | { placeholder?: string; emptyMessage?: string };
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Command>, 'children'>) => {
	const canSearch = typeof search === 'object' ? true : search;

	return (
		<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
			<Command {...props}>
				{canSearch ? (
					<CommandInput placeholder={typeof search === 'object' ? search.placeholder : undefined} />
				) : (
					<button autoFocus className='sr-only' />
				)}
				<CommandList>
					{canSearch && (
						<CommandEmpty>
							{typeof search === 'object' ? search.emptyMessage : undefined}
						</CommandEmpty>
					)}
					{children}
				</CommandList>
			</Command>
		</PopoverContent>
	);
};

export const MultiSelectItem = ({
	value,
	children,
	badgeLabel,
	onSelect,
	...props
}: {
	badgeLabel?: React.ReactNode;
	value: string;
} & Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, 'value'>) => {
	const { toggleValue, selectedValues, onItemAdded } = useMultiSelectContext();
	const isSelected = selectedValues.has(value);

	React.useEffect(() => {
		onItemAdded(value, badgeLabel ?? children);
	}, [value, children, onItemAdded, badgeLabel]);

	return (
		<CommandItem
			{...props}
			value={value}
			onSelect={(v) => {
				toggleValue(v);
				onSelect?.(v);
			}}
		>
			<CheckIcon className={cn('mr-2 size-4', isSelected ? 'opacity-100' : 'opacity-0')} />
			{children}
		</CommandItem>
	);
};

export const MultiSelectGroup = (props: React.ComponentPropsWithoutRef<typeof CommandGroup>) => {
	return <CommandGroup {...props} />;
};

export const MultiSelectSeparator = (
	props: React.ComponentPropsWithoutRef<typeof CommandSeparator>
) => {
	return <CommandSeparator {...props} />;
};

function useMultiSelectContext() {
	const context = React.useContext(MultiSelectContext);
	if (context == null) {
		throw new Error('useMultiSelectContext must be used within a MultiSelectContext');
	}
	return context;
}
