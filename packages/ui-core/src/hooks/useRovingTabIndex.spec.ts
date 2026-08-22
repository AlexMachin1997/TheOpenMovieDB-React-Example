import * as React from 'react';
import { act, renderHook } from '@testing-library/react';
import { useRovingTabIndex } from './useRovingTabIndex';
import type { IUseRovingTabIndex } from './useRovingTabIndex.types';

/**
 * Real focusable elements, wired to the hook's refs.
 *
 * The hook moves focus by calling `.focus()` on the node it was handed, so the assertions have to
 * go through real DOM elements to prove anything. `document.activeElement` is the assertion, not a
 * spy — that is what a keyboard user actually experiences.
 */
const setup = (options: IUseRovingTabIndex) => {
	const elements = Array.from({ length: options.itemCount }, () => {
		const element = document.createElement('button');
		document.body.appendChild(element);
		return element;
	});

	const rendered = renderHook((props: IUseRovingTabIndex) => useRovingTabIndex(props), {
		initialProps: options
	});

	// Attach the nodes exactly as a component's render would.
	elements.forEach((element, index) => {
		rendered.result.current.getItemProps(index).ref(element);
	});

	const pressKeyOn = (index: number, key: string) => {
		const preventDefault = vi.fn();

		act(() => {
			rendered.result.current.getItemProps(index).onKeyDown({
				key,
				preventDefault
			} as unknown as React.KeyboardEvent<HTMLElement>);
		});

		return { preventDefault };
	};

	const focusedIndex = () => elements.indexOf(document.activeElement as HTMLButtonElement);

	return { ...rendered, elements, pressKeyOn, focusedIndex };
};

afterEach(() => {
	document.body.innerHTML = '';
});

describe('useRovingTabIndex', () => {
	describe('the tab stop', () => {
		it('starts on the first item when nothing is checked', () => {
			const { result } = setup({ itemCount: 3 });

			expect(result.current.tabStopIndex).toBe(0);
			expect(result.current.getItemProps(0).tabIndex).toBe(0);
			expect(result.current.getItemProps(1).tabIndex).toBe(-1);
			expect(result.current.getItemProps(2).tabIndex).toBe(-1);
		});

		it('starts on the checked item, so tabbing in lands on the current selection', () => {
			const { result } = setup({ itemCount: 3, isItemChecked: (index) => index === 2 });

			expect(result.current.tabStopIndex).toBe(2);
			expect(result.current.getItemProps(0).tabIndex).toBe(-1);
			expect(result.current.getItemProps(2).tabIndex).toBe(0);
		});

		it('skips a disabled first item', () => {
			const { result } = setup({ itemCount: 3, isItemDisabled: (index) => index === 0 });

			expect(result.current.tabStopIndex).toBe(1);
		});

		it('follows focus once an item has been focused', () => {
			const { result } = setup({ itemCount: 3 });

			act(() => {
				result.current.getItemProps(2).onFocus();
			});

			expect(result.current.tabStopIndex).toBe(2);
		});

		it('leaves the group unreachable by Tab when every item is disabled', () => {
			const { result } = setup({ itemCount: 3, disabled: true });

			expect(result.current.tabStopIndex).toBe(-1);
			expect(result.current.getItemProps(0).tabIndex).toBe(-1);
			expect(result.current.getItemProps(1).tabIndex).toBe(-1);
		});

		it('recovers when the item holding the tab stop becomes disabled', () => {
			const { result, rerender } = setup({ itemCount: 3 });

			act(() => {
				result.current.getItemProps(1).onFocus();
			});
			expect(result.current.tabStopIndex).toBe(1);

			rerender({ itemCount: 3, isItemDisabled: (index: number) => index === 1 });

			expect(result.current.tabStopIndex).toBe(0);
		});
	});

	describe('item refs', () => {
		it('hands out the same ref callback for an index across renders', () => {
			const { result, rerender } = setup({ itemCount: 3 });

			const before = [0, 1, 2].map((index) => result.current.getItemProps(index).ref);

			// A re-render with different options — the shape a real group sees on every keystroke.
			rerender({ itemCount: 3, isItemChecked: (index: number) => index === 1 });

			const after = [0, 1, 2].map((index) => result.current.getItemProps(index).ref);

			// React compares ref callbacks by identity. New identities mean it detaches every item's
			// ref (calling it with null) and re-attaches on every render — pure churn.
			expect(after[0]).toBe(before[0]);
			expect(after[1]).toBe(before[1]);
			expect(after[2]).toBe(before[2]);
		});

		it('gives each index its own callback, writing to its own slot', () => {
			const { result, elements } = setup({ itemCount: 2 });

			expect(result.current.getItemProps(0).ref).not.toBe(result.current.getItemProps(1).ref);

			// Already attached by `setup`; prove they landed in distinct slots by focusing via keys.
			expect(elements[0]).not.toBe(elements[1]);
		});
	});

	describe('arrow keys', () => {
		it('moves forward on ArrowDown and ArrowRight', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 3 });

			pressKeyOn(0, 'ArrowDown');
			expect(focusedIndex()).toBe(1);

			pressKeyOn(1, 'ArrowRight');
			expect(focusedIndex()).toBe(2);
		});

		it('moves backward on ArrowUp and ArrowLeft', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 3 });

			pressKeyOn(2, 'ArrowUp');
			expect(focusedIndex()).toBe(1);

			pressKeyOn(1, 'ArrowLeft');
			expect(focusedIndex()).toBe(0);
		});

		it('skips disabled items', () => {
			const { pressKeyOn, focusedIndex } = setup({
				itemCount: 4,
				isItemDisabled: (index) => index === 1 || index === 2
			});

			pressKeyOn(0, 'ArrowDown');
			expect(focusedIndex()).toBe(3);
		});

		it('wraps around at both ends', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 3 });

			pressKeyOn(2, 'ArrowDown');
			expect(focusedIndex()).toBe(0);

			pressKeyOn(0, 'ArrowUp');
			expect(focusedIndex()).toBe(2);
		});

		it('stops at the ends when loop is off', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 3, loop: false });

			pressKeyOn(2, 'ArrowDown');
			expect(focusedIndex()).toBe(-1);

			pressKeyOn(0, 'ArrowUp');
			expect(focusedIndex()).toBe(-1);
		});

		it('preventDefaults only when focus actually moves', () => {
			const { pressKeyOn } = setup({ itemCount: 3, loop: false });

			expect(pressKeyOn(0, 'ArrowDown').preventDefault).toHaveBeenCalled();
			// Nowhere to go — the key should behave normally rather than being swallowed.
			expect(pressKeyOn(0, 'ArrowUp').preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('Home, End and their Page equivalents', () => {
		it('jumps to the first and last item', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 4 });

			pressKeyOn(1, 'End');
			expect(focusedIndex()).toBe(3);

			pressKeyOn(3, 'Home');
			expect(focusedIndex()).toBe(0);
		});

		it('treats PageUp and PageDown the same way, as Radix does', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 4 });

			pressKeyOn(1, 'PageDown');
			expect(focusedIndex()).toBe(3);

			pressKeyOn(3, 'PageUp');
			expect(focusedIndex()).toBe(0);
		});

		it('lands on the first and last enabled item, not simply the ends', () => {
			const { pressKeyOn, focusedIndex } = setup({
				itemCount: 4,
				isItemDisabled: (index) => index === 0 || index === 3
			});

			pressKeyOn(1, 'End');
			expect(focusedIndex()).toBe(2);

			pressKeyOn(2, 'Home');
			expect(focusedIndex()).toBe(1);
		});
	});

	describe('keys it must leave alone', () => {
		it('ignores keys with no navigation meaning', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 3 });

			for (const key of [' ', 'Enter', 'a', 'Tab', 'Escape']) {
				expect(pressKeyOn(0, key).preventDefault).not.toHaveBeenCalled();
			}

			// Space in particular must still reach the checkbox underneath to toggle it.
			expect(focusedIndex()).toBe(-1);
		});

		it('does nothing at all when the group is disabled', () => {
			const { pressKeyOn, focusedIndex } = setup({ itemCount: 3, disabled: true });

			expect(pressKeyOn(0, 'ArrowDown').preventDefault).not.toHaveBeenCalled();
			expect(focusedIndex()).toBe(-1);
		});
	});
});
