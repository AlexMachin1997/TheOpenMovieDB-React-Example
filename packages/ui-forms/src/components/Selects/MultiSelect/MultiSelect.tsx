import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { Badge } from '@repo/ui-core';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';
import { useCommandContext } from '@repo/ui-command';
import { SelectItemClear } from '~/components/Selects/components/SelectItemClear';
import { IMultiSelectValue } from '~/components/Selects/types/select-value';

export const MultiSelectValue = ({
	placeholder = 'No items selected',
	showClearButton = true,
	className,
	overflowBehavior = 'wrap-when-open',
	...props
}: IMultiSelectValue) => {
	const { selectedValues, toggleValue } = useSelectContext();
	const { open, optionsMap } = useCommandContext();
	const [overflowAmount, setOverflowAmount] = React.useState(0);
	const valueRef = React.useRef<HTMLUListElement>(null);
	const overflowRef = React.useRef<HTMLUListElement>(null);
	const observerRef = React.useRef<ResizeObserver | null>(null);
	const buttonRefs = React.useRef<Map<string, HTMLElement>>(new Map());
	const [prevCount, setPrevCount] = React.useState(selectedValues.size);

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

	React.useLayoutEffect(() => {
		checkOverflow();
	}, [selectedValues, checkOverflow, shouldWrap]);

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
						{showClearButton && (
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
					display: overflowAmount > 0 && !shouldWrap ? 'flex' : 'none',
					alignItems: 'center',
					justifyContent: 'center'
				}}
				variant='outline'
				ref={overflowRef}
			>
				+{overflowAmount}
			</Badge>
		</ul>
	);
};
