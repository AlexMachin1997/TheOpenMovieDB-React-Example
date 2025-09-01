import * as React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '~/utils/className';
import { Button } from '~/components/Button/Button';

/**
 * Props for the SelectItemClear component
 *
 * @interface ISelectItemClear
 */
export type ISelectItemClear = {
	/**
	 * The value to clear
	 */
	value: string;
	/**
	 * Label for the value (used in aria-label)
	 */
	valueLabel?: string;
	/**
	 * Callback function called when the clear button is clicked
	 */
	onClear: (value: string) => void;
	/**
	 * Variant styling for different use cases
	 */
	variant?: 'badge' | 'input';
	/**
	 * Additional CSS classes
	 */
	className?: string;
	/**
	 * Icon size override
	 */
	iconSize?: 'sm' | 'md';
	/**
	 * Custom aria label - if not provided, will generate based on value and context
	 */
	ariaLabel?: string;
	/**
	 * Ref callback for focus management (used in multi-select)
	 */
	onRefChange?: (el: HTMLElement | null) => void;

	/**
	 * Ref callback for focus management (used in multi-select)
	 */
	ref?: React.Ref<HTMLElement>;
} & Omit<
	React.ComponentProps<typeof Button>,
	'onClick' | 'children' | 'type' | 'variant' | 'size' | 'ref'
>;

/**
 * A reusable clear button component for select interfaces
 *
 * This component provides a consistent clear/remove button that can be used in both
 * single-select and multi-select contexts. It handles the visual styling differences
 * between badge contexts (multi-select) and input contexts (single-select).
 *
 * Uses asChild with a div to avoid nested button issues when used inside other buttons.
 *
 * @component
 * @example
 * ```tsx
 * // In a badge context (multi-select)
 * <SelectItemClear
 *   value="react"
 *   valueLabel="React"
 *   onClear={handleRemove}
 *   variant="badge"
 *   iconSize="sm"
 * />
 *
 * // In an input context (single-select)
 * <SelectItemClear
 *   value="vue"
 *   valueLabel="Vue.js"
 *   onClear={handleClear}
 *   variant="input"
 *   iconSize="md"
 * />
 * ```
 *
 * @param props - The component props
 * @param ref - React ref for the button element
 * @returns The rendered clear button component
 */
export const SelectItemClear = ({
	value,
	valueLabel,
	onClear,
	variant = 'input',
	className,
	iconSize = 'md',
	ariaLabel,
	onRefChange,
	...props
}: ISelectItemClear) => {
	const handleClear = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		onClear(value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			e.stopPropagation();
			onClear(value);
		}
	};

	const handleRef = React.useCallback(
		(el: HTMLElement | null) => {
			if (typeof props.ref === 'function') {
				props.ref(el);
			} else if (props.ref) {
				props.ref.current = el;
			}
			onRefChange?.(el);
		},
		[onRefChange, props]
	);

	const defaultAriaLabel = React.useMemo(() => {
		if (ariaLabel) return ariaLabel;
		if (value && valueLabel) return `Remove ${valueLabel}`;
		if (value) return `Remove ${value}`;
		return 'Clear selection';
	}, [ariaLabel, value, valueLabel]);

	const variantStyles = React.useMemo(() => {
		switch (variant) {
			case 'badge':
				return 'text-muted-foreground group-hover:text-destructive h-auto w-auto min-w-0 p-1 hover:bg-transparent';
			case 'input':
			default:
				return 'ml-2 h-auto w-auto min-w-0 p-1 opacity-50 hover:opacity-100 focus:opacity-100 hover:bg-transparent';
		}
	}, [variant]);

	return (
		<Button
			{...props}
			asChild
			ref={handleRef}
			variant='ghost'
			size='sm'
			onClick={handleClear}
			className={cn(variantStyles, className)}
			aria-label={defaultAriaLabel}
		>
			<div onKeyDown={handleKeyDown} role='button' tabIndex={0}>
				<XIcon className={'size-3'} />
			</div>
		</Button>
	);
};

SelectItemClear.displayName = 'SelectItemClear';
