import * as React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '@repo/tailwind-config';
import { Button } from '@repo/ui-core';

export type ISelectItemClear = {
	value: string;
	valueLabel?: string;
	onClear: (value: string) => void;
	variant?: 'badge' | 'input';
	className?: string;
	ariaLabel?: string;
	onRefChange?: (el: HTMLElement | null) => void;
	ref?: React.Ref<HTMLElement>;
} & Omit<
	React.ComponentProps<typeof Button>,
	'onClick' | 'children' | 'type' | 'variant' | 'size' | 'ref'
>;

export const SelectItemClear = ({
	value,
	valueLabel,
	onClear,
	variant = 'input',
	className,
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
				<XIcon className='size-3' />
			</div>
		</Button>
	);
};

SelectItemClear.displayName = 'SelectItemClear';
