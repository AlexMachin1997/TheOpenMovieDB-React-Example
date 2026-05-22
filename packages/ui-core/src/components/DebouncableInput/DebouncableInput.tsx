import * as React from 'react';
import { useDebounce } from 'react-use';
import { cn } from '@repo/tailwind-config';
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
	const initialValue =
		controlledValue !== undefined ? String(controlledValue) : defaultValue !== undefined ? String(defaultValue) : '';

	const [internalValue, setInternalValue] = React.useState<string>(initialValue);
	const lastEmittedValue = React.useRef<string>(initialValue);

	// Sync controlled value if the prop changes externally
	React.useEffect(() => {
		if (controlledValue !== undefined) {
			setInternalValue(String(controlledValue));
			lastEmittedValue.current = String(controlledValue);
		}
	}, [controlledValue]);

	// Handle internal debouncing
	const handleDebouncedValueChange = React.useCallback(() => {
		if (internalValue !== lastEmittedValue.current) {
			lastEmittedValue.current = internalValue;
			onValueChange(internalValue);
		}
	}, [internalValue, onValueChange]);

	useDebounce(handleDebouncedValueChange, debounceMs, [internalValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInternalValue(newValue);
	};

	return (
		<input
			{...props}
			ref={ref}
			data-slot='debouncable-input'
			className={cn(debouncableInputVariants(), className)}
			value={internalValue}
			onChange={handleChange}
		/>
	);
};

DebouncableInput.displayName = 'DebouncableInput';
