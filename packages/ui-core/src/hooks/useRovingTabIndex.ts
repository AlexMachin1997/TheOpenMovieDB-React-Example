import * as React from 'react';
import {
	NO_INDEX,
	findEdgeEnabledIndex,
	findNextEnabledIndex,
	resolveInitialTabStop
} from '~/hooks/useRovingTabIndex.utils';
import type {
	RovingTabIndexItemProps,
	UseRovingTabIndexOptions,
	UseRovingTabIndexResult
} from '~/hooks/useRovingTabIndex.types';

/** Where each key should move focus to. Mirrors Radix's `MAP_KEY_TO_FOCUS_INTENT`. */
const KEY_TO_INTENT: Record<string, 'prev' | 'next' | 'first' | 'last' | undefined> = {
	ArrowLeft: 'prev',
	ArrowUp: 'prev',
	ArrowRight: 'next',
	ArrowDown: 'next',
	Home: 'first',
	PageUp: 'first',
	End: 'last',
	PageDown: 'last'
};

/**
 * Turns a list of items into a single Tab stop with arrow-key navigation between them — the
 * roving-tabindex pattern.
 *
 * This exists because Radix ships no checkbox-group primitive. `RadioGroup` needs nothing like it:
 * `RadioGroupPrimitive.Root` is already a roving-focus widget. So the job here is narrow — behave
 * exactly as Radix's `RovingFocusGroup` does, so the two group components feel identical to a
 * keyboard user.
 *
 * Matched to Radix deliberately:
 * - `ArrowLeft`/`ArrowUp` go back, `ArrowRight`/`ArrowDown` go forward — all four work, because
 *   Radix leaves `orientation` unset by default.
 * - `Home`/`PageUp` and `End`/`PageDown` jump to the ends.
 * - Wrapping is on by default (`RadioGroup.Root` overrides `RovingFocusGroup`'s own `loop = false`).
 * - Disabled items are skipped, never focused.
 * - The tab stop starts on the checked item, falling back to the first enabled one.
 *
 * **Reading direction is not handled — arrow keys are LTR only.** That is not an oversight: Radix
 * reads direction from a `DirectionProvider` this library never mounts, so every Radix component
 * here is already hard LTR. Making this hook honour `dir` would leave `CheckboxGroup` swapping its
 * arrows while `RadioGroup` did not, which is worse than neither doing it. RTL is a library-wide
 * concern with its own deliverable — see docs/04-ui-forms-primitive-migration/plan.md, Follow-ups.
 *
 * @example
 * ```tsx
 * const { getItemProps } = useRovingTabIndex({
 * 	itemCount: options.length,
 * 	isItemDisabled: (index) => options[index].disabled ?? false,
 * 	isItemChecked: (index) => value.includes(options[index].value)
 * });
 *
 * options.map((option, index) => <Checkbox key={option.id} {...getItemProps(index)} />);
 * ```
 */
export const useRovingTabIndex = ({
	itemCount,
	isItemDisabled,
	isItemChecked,
	loop = true,
	disabled = false
}: UseRovingTabIndexOptions): UseRovingTabIndexResult => {
	const itemsRef = React.useRef<(HTMLElement | null)[]>([]);

	// `NO_INDEX` means "nothing focused yet", which is not the same as "index 0 is the tab stop" —
	// the initial tab stop depends on which item is checked.
	const [activeIndex, setActiveIndex] = React.useState(NO_INDEX);

	const isDisabled = React.useCallback(
		(index: number) => disabled || (isItemDisabled?.(index) ?? false),
		[disabled, isItemDisabled]
	);

	const isChecked = React.useCallback(
		(index: number) => isItemChecked?.(index) ?? false,
		[isItemChecked]
	);

	// An item can become disabled, or disappear, while it holds the tab stop. Recomputing rather
	// than trusting `activeIndex` keeps the group reachable instead of stranding the tab stop on an
	// item that can no longer take focus.
	const hasUsableActiveIndex =
		activeIndex !== NO_INDEX && activeIndex < itemCount && !isDisabled(activeIndex);

	const tabStopIndex = hasUsableActiveIndex
		? activeIndex
		: resolveInitialTabStop({ count: itemCount, isDisabled, isChecked });

	const moveFocusTo = React.useCallback((index: number) => {
		if (index === NO_INDEX) return;

		setActiveIndex(index);
		itemsRef.current[index]?.focus();
	}, []);

	const getItemProps = React.useCallback(
		(index: number): RovingTabIndexItemProps => ({
			tabIndex: index === tabStopIndex ? 0 : -1,

			ref: (node: HTMLElement | null) => {
				itemsRef.current[index] = node;
			},

			// Keeps the tab stop on whichever item the user last reached, however they reached it —
			// including by clicking one directly.
			onFocus: () => {
				setActiveIndex(index);
			},

			onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
				if (disabled) return;

				const intent = KEY_TO_INTENT[event.key];
				if (!intent) return;

				const target =
					intent === 'first' || intent === 'last'
						? findEdgeEnabledIndex({ edge: intent, count: itemCount, isDisabled })
						: findNextEnabledIndex({
								from: index,
								step: intent === 'next' ? 1 : -1,
								count: itemCount,
								isDisabled,
								loop
							});

				if (target === NO_INDEX) return;

				// Only once a move is actually happening. Arrow keys scroll the page and Home/End
				// jump it, but suppressing that when there is nowhere to go would swallow the key
				// for no reason.
				event.preventDefault();
				moveFocusTo(target);
			}
		}),
		[tabStopIndex, disabled, itemCount, isDisabled, loop, moveFocusTo]
	);

	return { tabStopIndex, getItemProps };
};
