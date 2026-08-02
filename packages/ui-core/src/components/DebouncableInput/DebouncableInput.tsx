import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { useDebouncedValue } from '~/hooks';
import { debouncableInputVariants } from '~/components/DebouncableInput/DebouncableInput.variants';
import type { IDebouncableInput } from '~/components/DebouncableInput/DebouncableInput.types';

/**
 * A standard text input primitive that natively debounces changes.
 *
 * @component
 */
export const DebouncableInput = ({
	className,
	onValueChange,
	debounceMs = 300,
	value: controlledValue,
	defaultValue,
	ref,
	...props
}: IDebouncableInput) => {
	const { value, setValue } = useDebouncedValue({
		value: controlledValue !== undefined ? String(controlledValue) : undefined,
		defaultValue: defaultValue !== undefined ? String(defaultValue) : undefined,
		debounceMs,
		onValueChange
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<input
			{...props}
			ref={ref}
			data-slot='debouncable-input'
			className={cn(debouncableInputVariants(), className)}
			value={value}
			onChange={handleChange}
		/>
	);
};

DebouncableInput.displayName = 'DebouncableInput';
