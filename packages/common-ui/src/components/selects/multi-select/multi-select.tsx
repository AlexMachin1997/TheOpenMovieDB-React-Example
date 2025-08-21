import * as React from 'react';
import { cn } from '~/utils/className';
import { Badge } from '~/components/badge/badge';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';
import { SelectItemClear } from '~/components/selects/core/components/select-item-clear';

/**
 * Props for the MultiSelectValue component
 *
 * @interface MultiSelectValueProps
 */
interface MultiSelectValueProps extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'children'> {
	/** Placeholder text shown when no items are selected */
	placeholder?: string;
	/** Whether selected items can be removed by clicking */
	clickToRemove?: boolean;
	/** How to handle overflow when there are many selected items */
	overflowBehavior?: 'wrap' | 'wrap-when-open' | 'cutoff';
}

/**
 * Displays selected values in a multi-select interface
 *
 * This component renders selected values as badges with optional remove buttons.
 * It handles overflow scenarios intelligently and provides smooth interactions
 * for managing selections.
 *
 * Features:
 * - Displays selected values as removable badges
 * - Intelligent overflow handling with different strategies
 * - Automatic focus management when items are removed
 * - Responsive layout that adapts to container size
 * - Accessibility support with proper ARIA labels
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <MultiSelectValue placeholder="Select frameworks..." />
 *
 * // With custom overflow behavior
 * <MultiSelectValue
 *   placeholder="Choose options..."
 *   overflowBehavior="wrap"
 *   clickToRemove={true}
 * />
 * ```
 *
 * @param props - The component props
 * @returns The rendered multi-select value display component
 */
export const MultiSelectValue = ({
	placeholder = 'No items selected',
	clickToRemove = true,
	className,
	overflowBehavior = 'wrap-when-open',
	...props
}: MultiSelectValueProps) => {
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
		(valueToRemove?: string) => {
			if (valueToRemove) {
				toggleValue(valueToRemove);
			}
		},
		[toggleValue]
	);

	if (selectedValues.size === 0) {
		return (
			<ul className='min-w-0 overflow-hidden font-normal text-muted-foreground'>
				<li>{placeholder}</li>
			</ul>
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
							<SelectItemClear
								value={value}
								valueLabel={optionsMap.get(value)}
								onClear={handleRemoveItem}
								variant='badge'
								iconSize='sm'
								onRefChange={(el) => {
									if (el) {
										buttonRefs.current.set(value, el);
									} else {
										buttonRefs.current.delete(value);
									}
								}}
							/>
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
