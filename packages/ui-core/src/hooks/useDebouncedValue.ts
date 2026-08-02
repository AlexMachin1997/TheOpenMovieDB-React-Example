import * as React from 'react';

export interface UseDebouncedValueOptions {
	/** Controlled value. `undefined` means uncontrolled. */
	value?: string;
	/** Initial value when uncontrolled and no `value` is supplied. */
	defaultValue?: string;
	/**
	 * Delay in milliseconds before `onValueChange` fires after the value stops changing.
	 * `0` (or any value `<= 0`) emits synchronously instead of scheduling a timer.
	 *
	 * @default 300
	 */
	debounceMs?: number;
	/** Called with the settled value. Never called for the initial/unchanged value. */
	onValueChange: (value: string) => void;
}

export interface UseDebouncedValueResult {
	/** Current live value — updates immediately on every `setValue` call, never itself debounced. */
	value: string;
	/** Update the live value. Emits (debounced or synchronous) via `onValueChange` when it settles. */
	setValue: (next: string) => void;
}

export const useDebouncedValue = ({
	value: controlledValue,
	defaultValue,
	debounceMs = 300,
	onValueChange
}: UseDebouncedValueOptions): UseDebouncedValueResult => {
	const initialValue = controlledValue !== undefined ? controlledValue : (defaultValue ?? '');

	const [internalValue, setInternalValue] = React.useState<string>(initialValue);
	const lastEmittedValue = React.useRef<string>(initialValue);
	const onValueChangeRef = React.useRef(onValueChange);
	onValueChangeRef.current = onValueChange;

	// Sync the controlled value if the prop changes externally (router nav, programmatic clear, etc.).
	React.useEffect(() => {
		if (controlledValue !== undefined) {
			setInternalValue(controlledValue);
			lastEmittedValue.current = controlledValue;
		}
	}, [controlledValue]);

	const emitIfChanged = React.useCallback((next: string) => {
		if (next !== lastEmittedValue.current) {
			lastEmittedValue.current = next;
			onValueChangeRef.current(next);
		}
	}, []);

	React.useEffect(() => {
		if (debounceMs <= 0) return;

		const timeoutId = setTimeout(() => emitIfChanged(internalValue), debounceMs);
		return () => clearTimeout(timeoutId);
	}, [internalValue, debounceMs, emitIfChanged]);

	const setValue = React.useCallback(
		(next: string) => {
			setInternalValue(next);
			if (debounceMs <= 0) {
				emitIfChanged(next);
			}
		},
		[debounceMs, emitIfChanged]
	);

	return { value: internalValue, setValue };
};
