import { act, renderHook } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('does not emit on initial mount', () => {
		const onValueChange = vi.fn();
		renderHook(() => useDebouncedValue({ defaultValue: 'initial', debounceMs: 300, onValueChange }));

		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('emits once the debounce delay elapses', () => {
		const onValueChange = vi.fn();
		const { result } = renderHook(() => useDebouncedValue({ defaultValue: '', debounceMs: 300, onValueChange }));

		act(() => {
			result.current.setValue('a');
		});
		act(() => {
			vi.advanceTimersByTime(299);
		});
		expect(onValueChange).not.toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(onValueChange).toHaveBeenCalledTimes(1);
		expect(onValueChange).toHaveBeenCalledWith('a');
	});

	it('coalesces rapid changes into a single emit of the final value', () => {
		const onValueChange = vi.fn();
		const { result } = renderHook(() => useDebouncedValue({ defaultValue: '', debounceMs: 300, onValueChange }));

		act(() => {
			result.current.setValue('a');
		});
		act(() => {
			vi.advanceTimersByTime(100);
			result.current.setValue('ab');
		});
		act(() => {
			vi.advanceTimersByTime(100);
			result.current.setValue('abc');
		});
		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(onValueChange).toHaveBeenCalledTimes(1);
		expect(onValueChange).toHaveBeenCalledWith('abc');
	});

	it('syncs the live value when the external `value` prop changes, without emitting', () => {
		const onValueChange = vi.fn();
		const { result, rerender } = renderHook(
			({ value }) => useDebouncedValue({ value, debounceMs: 300, onValueChange }),
			{ initialProps: { value: 'first' } }
		);

		expect(result.current.value).toBe('first');

		rerender({ value: 'second' });
		expect(result.current.value).toBe('second');

		act(() => {
			vi.advanceTimersByTime(300);
		});
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('does not emit when the value settles back to the last-emitted value', () => {
		const onValueChange = vi.fn();
		const { result } = renderHook(() => useDebouncedValue({ defaultValue: 'x', debounceMs: 300, onValueChange }));

		act(() => {
			result.current.setValue('x');
		});
		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('emits synchronously with no scheduled timer when debounceMs is 0', () => {
		const onValueChange = vi.fn();
		const { result } = renderHook(() => useDebouncedValue({ defaultValue: '', debounceMs: 0, onValueChange }));

		act(() => {
			result.current.setValue('typed');
		});

		expect(onValueChange).toHaveBeenCalledTimes(1);
		expect(onValueChange).toHaveBeenCalledWith('typed');

		act(() => {
			vi.advanceTimersByTime(1000);
		});
		expect(onValueChange).toHaveBeenCalledTimes(1);
	});

	it('does not emit if the component unmounts before the debounce delay elapses', () => {
		const onValueChange = vi.fn();
		const { result, unmount } = renderHook(() =>
			useDebouncedValue({ defaultValue: '', debounceMs: 300, onValueChange })
		);

		act(() => {
			result.current.setValue('a');
		});
		unmount();

		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(onValueChange).not.toHaveBeenCalled();
	});
});
