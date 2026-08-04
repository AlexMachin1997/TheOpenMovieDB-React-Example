import * as React from 'react';
import { act, renderHook } from '@testing-library/react';
import { useKeyboardActivation } from './useKeyboardActivation';
import type { NativeKeyboardActivation } from './useKeyboardActivation.types';

/**
 * A focusable element plus a spy on the clicks dispatched at it.
 *
 * The hook activates by dispatching a real DOM click rather than calling a captured `onClick`, so
 * the assertions have to listen for the real event to prove anything.
 */
const createTarget = () => {
	const element = document.createElement('div');
	const onClick = vi.fn();
	element.addEventListener('click', onClick);

	return { element, onClick };
};

/** The shape of a React keyboard event, reduced to the parts the hook reads. */
const keyEvent = (key: string, element: HTMLElement) => {
	const preventDefault = vi.fn();

	return {
		event: {
			key,
			preventDefault,
			currentTarget: element
		} as unknown as React.KeyboardEvent<HTMLElement>,
		preventDefault
	};
};

const setup = (nativeActivation: NativeKeyboardActivation, disabled = false) =>
	renderHook(
		({ disabled: isDisabled }) => useKeyboardActivation({ nativeActivation, disabled: isDisabled }),
		{
			initialProps: { disabled }
		}
	);

describe('useKeyboardActivation', () => {
	describe("nativeActivation: 'both'", () => {
		it('synthesises nothing for Enter — the browser already fires click', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('both');
			const { event } = keyEvent('Enter', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(event);
			});

			expect(onClick).not.toHaveBeenCalled();
		});

		it('synthesises nothing for Space, and leaves the default alone', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('both');
			const down = keyEvent(' ', element);
			const up = keyEvent(' ', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(down.event);
			});
			act(() => {
				result.current.keyboardProps.onKeyUp(up.event);
			});

			expect(down.preventDefault).not.toHaveBeenCalled();
			expect(onClick).not.toHaveBeenCalled();
		});
	});

	describe("nativeActivation: 'enter-only'", () => {
		it('leaves Enter to the element — an anchor navigates on its own', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('enter-only');
			const { event } = keyEvent('Enter', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(event);
			});

			expect(onClick).not.toHaveBeenCalled();
		});

		it('synthesises Space exactly once, on keyup', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('enter-only');
			const down = keyEvent(' ', element);
			const up = keyEvent(' ', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(down.event);
			});
			expect(onClick).not.toHaveBeenCalled();

			act(() => {
				result.current.keyboardProps.onKeyUp(up.event);
			});
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe("nativeActivation: 'none'", () => {
		it('synthesises Enter exactly once, on keydown', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('none');
			const down = keyEvent('Enter', element);
			const up = keyEvent('Enter', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(down.event);
			});
			expect(onClick).toHaveBeenCalledTimes(1);

			act(() => {
				result.current.keyboardProps.onKeyUp(up.event);
			});
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('synthesises Space exactly once, on keyup', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('none');
			const down = keyEvent(' ', element);
			const up = keyEvent(' ', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(down.event);
			});
			expect(onClick).not.toHaveBeenCalled();

			act(() => {
				result.current.keyboardProps.onKeyUp(up.event);
			});
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('suppresses the default on Space keydown so the page does not scroll', () => {
			const { element } = createTarget();
			const { result } = setup('none');
			const down = keyEvent(' ', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(down.event);
			});

			expect(down.preventDefault).toHaveBeenCalled();
		});

		it('ignores keys that are not Enter or Space', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('none');
			const { event } = keyEvent('a', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(event);
			});

			expect(onClick).not.toHaveBeenCalled();
			expect(result.current.pressed).toBe(false);
		});
	});

	describe('pressed', () => {
		it.each(['both', 'enter-only', 'none'] as const)(
			'is tracked for nativeActivation: %s, so every element presses alike',
			(nativeActivation) => {
				const { element } = createTarget();
				const { result } = setup(nativeActivation);

				act(() => {
					result.current.keyboardProps.onKeyDown(keyEvent(' ', element).event);
				});

				expect(result.current.pressed).toBe(true);
			}
		);

		it('engages on keydown and clears on keyup', () => {
			const { element } = createTarget();
			const { result } = setup('none');

			act(() => {
				result.current.keyboardProps.onKeyDown(keyEvent('Enter', element).event);
			});
			expect(result.current.pressed).toBe(true);

			act(() => {
				result.current.keyboardProps.onKeyUp(keyEvent('Enter', element).event);
			});
			expect(result.current.pressed).toBe(false);
		});

		it('clears when focus leaves mid-press', () => {
			const { element } = createTarget();
			const { result } = setup('none');

			act(() => {
				result.current.keyboardProps.onKeyDown(keyEvent(' ', element).event);
			});
			expect(result.current.pressed).toBe(true);

			act(() => {
				result.current.keyboardProps.onBlur({} as React.FocusEvent<HTMLElement>);
			});
			expect(result.current.pressed).toBe(false);
		});

		it('clears as a direct consequence of becoming disabled mid-press', () => {
			const { element } = createTarget();
			const { result, rerender } = setup('none');

			act(() => {
				result.current.keyboardProps.onKeyDown(keyEvent(' ', element).event);
			});
			expect(result.current.pressed).toBe(true);

			// No keyup — a disabled element never receives one. The reset has to come from the
			// prop change itself.
			rerender({ disabled: true });

			expect(result.current.pressed).toBe(false);
		});
	});

	describe('disabled', () => {
		it('no-ops every handler', () => {
			const { element, onClick } = createTarget();
			const { result } = setup('none', true);
			const down = keyEvent('Enter', element);
			const spaceDown = keyEvent(' ', element);
			const spaceUp = keyEvent(' ', element);

			act(() => {
				result.current.keyboardProps.onKeyDown(down.event);
				result.current.keyboardProps.onKeyDown(spaceDown.event);
				result.current.keyboardProps.onKeyUp(spaceUp.event);
			});

			expect(onClick).not.toHaveBeenCalled();
			expect(down.preventDefault).not.toHaveBeenCalled();
			expect(spaceDown.preventDefault).not.toHaveBeenCalled();
			expect(result.current.pressed).toBe(false);
		});
	});
});
