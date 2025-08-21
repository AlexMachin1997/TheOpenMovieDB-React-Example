import * as React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { Badge } from '~/components/badge/badge';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';

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
} & Omit<React.ComponentPropsWithoutRef<'ul'>, 'children'>) => {
	const { selectedValues, toggleValue, optionsMap, open } = useSelectContext();
	const [overflowAmount, setOverflowAmount] = React.useState(0);
	const valueRef = React.useRef<HTMLUListElement>(null);
	const overflowRef = React.useRef<HTMLUListElement>(null);
	const observerRef = React.useRef<ResizeObserver | null>(null);
	const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
	const [prevCount, setPrevCount] = React.useState(selectedValues.size);

	const shouldWrap = overflowBehavior === 'wrap' || (overflowBehavior === 'wrap-when-open' && open);

	/**
	 * Check overflow when the number of selected values changes
	 */
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

	/**
	 * Set up ResizeObserver to check overflow when the number of selected values changes
	 */
	React.useEffect(() => {
		const node = valueRef.current;
		if (!node) return;

		const observer = new ResizeObserver(checkOverflow);
		observer.observe(node);
		observerRef.current = observer;

		return () => {
			observer.disconnect();
		};
	}, [checkOverflow]);

	/**
	 * Check overflow when the number of selected values changes
	 */
	React.useLayoutEffect(() => {
		checkOverflow();
	}, [selectedValues, checkOverflow, shouldWrap]);

	/**
	 * Focus the first button when the number of selected values decreases
	 */
	React.useEffect(() => {
		if (selectedValues.size < prevCount && buttonRefs.current.size > 0) {
			const firstButton = buttonRefs.current.values().next().value;
			firstButton?.focus();
		}
		setPrevCount(selectedValues.size);
	}, [selectedValues.size, prevCount]);

	const handleRemoveItem = React.useCallback(
		(valueToRemove: string) => {
			toggleValue(valueToRemove);
		},
		[toggleValue]
	);

	if (selectedValues.size === 0) {
		return (
			<span className='min-w-0 overflow-hidden font-normal text-muted-foreground'>
				{placeholder ?? 'No items selected'}
			</span>
		);
	}

	return (
		<ul
			{...props}
			ref={valueRef}
			className={cn(
				'flex w-full gap-1.5 overflow-hidden',
				shouldWrap && 'h-full flex-wrap',
				className
			)}
		>
			{Array.from(selectedValues).map((value) => (
				<li key={value}>
					<Badge variant='outline' data-selected-item className='group flex items-center gap-1'>
						{optionsMap.get(value) || value}
						{clickToRemove && (
							<button
								type='button'
								ref={(el) => {
									if (el) {
										buttonRefs.current.set(value, el);
									} else {
										buttonRefs.current.delete(value);
									}
								}}
								aria-label={`Remove ${optionsMap.get(value) || value}`}
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveItem(value);
								}}
							>
								<XIcon className='size-2 text-muted-foreground group-hover:text-destructive' />
							</button>
						)}
					</Badge>
				</li>
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
		</ul>
	);
};
