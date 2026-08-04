import * as React from 'react';
import { useDebouncedValue } from '~/hooks';
import { Input } from '~/components/Input/Input';
import type { IDebouncableInput } from '~/components/DebouncableInput/DebouncableInput.types';

/**
 * `Input` with a debounce hook layered on top.
 *
 * This composes `Input` rather than styling its own `<input>`: `Input` is the one native-input
 * styling primitive in the library, and the only thing that makes this component different is the
 * debouncing. Anything that changes how a text input looks belongs in `Input`, and arrives here
 * for free.
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
		<Input
			{...props}
			ref={ref}
			// Set after the spread so it wins over `Input`'s own `data-slot='input'`.
			data-slot='debouncable-input'
			className={className}
			value={value}
			onChange={handleChange}
		/>
	);
};

DebouncableInput.displayName = 'DebouncableInput';
