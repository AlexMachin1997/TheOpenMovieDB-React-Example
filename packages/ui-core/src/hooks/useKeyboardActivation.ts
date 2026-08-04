import * as React from 'react';
import type {
	UseKeyboardActivationOptions,
	UseKeyboardActivationResult
} from '~/hooks/useKeyboardActivation.types';

/** The two keys that activate a button, per the WAI-ARIA button pattern. */
const ENTER = 'Enter';
const SPACE = ' ';

/**
 * Gives a non-native control the keyboard behaviour a real `<button>` gets for free, and tracks
 * whether it is currently being held down.
 *
 * A `<div role="button">` looks and behaves like a button to a mouse but is inert to a keyboard.
 * This hook closes that gap: tell it what the element already does natively via `nativeActivation`
 * and it synthesises only the missing half, so nothing ever fires twice.
 *
 * Activation dispatches a **real DOM click** on the element (`currentTarget.click()`) rather than
 * calling a captured `onClick`. That matters under Radix `Slot`, which *chains* the slot's handlers
 * with the child's — invoking a captured handler would run one and skip the other. A real click
 * runs the whole chain exactly once, which is the point: Enter and Space should be
 * indistinguishable from a click.
 *
 * @example
 * ```tsx
 * const { pressed, keyboardProps } = useKeyboardActivation({ nativeActivation: 'none', disabled });
 *
 * <div role='button' tabIndex={0} data-pressed={pressed || undefined} {...keyboardProps} onClick={onClick}>
 * 	Save
 * </div>
 * ```
 */
export const useKeyboardActivation = ({
	nativeActivation,
	disabled = false
}: UseKeyboardActivationOptions): UseKeyboardActivationResult => {
	const [pressed, setPressed] = React.useState(false);

	// Adjusting state during render, rather than in an effect. The element may become disabled
	// mid-press (an async handler flipping `loading`, say) and a disabled element stops receiving
	// `keyup` — so waiting for a release that never arrives would leave the pressed treatment stuck
	// on screen. React discards this render and immediately re-runs it, so nothing is committed with
	// the stale value. See https://react.dev/reference/react/useState#storing-information-from-previous-renders
	if (pressed && disabled) {
		setPressed(false);
	}

	// Belt and braces: the line above resets the *tracked* state, this guarantees the value returned
	// from this very render pass is already correct rather than relying on the re-render alone.
	const isPressed = pressed && !disabled;

	const synthesisesEnter = nativeActivation === 'none';
	const synthesisesSpace = nativeActivation !== 'both';

	const onKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLElement>) => {
			if (disabled) return;
			if (event.key !== ENTER && event.key !== SPACE) return;

			setPressed(true);

			if (event.key === SPACE && synthesisesSpace) {
				// Space scrolls the page by default. Suppress it here (on keydown, where the scroll
				// would happen) even though activation itself waits for keyup.
				event.preventDefault();
				return;
			}

			if (event.key === ENTER && synthesisesEnter) {
				event.preventDefault();
				event.currentTarget.click();
			}
		},
		[disabled, synthesisesEnter, synthesisesSpace]
	);

	const onKeyUp = React.useCallback(
		(event: React.KeyboardEvent<HTMLElement>) => {
			if (disabled) return;
			if (event.key !== ENTER && event.key !== SPACE) return;

			setPressed(false);

			if (event.key === SPACE && synthesisesSpace) {
				event.preventDefault();
				event.currentTarget.click();
			}
		},
		[disabled, synthesisesSpace]
	);

	// Holding a key and tabbing away never produces a `keyup` on the original element, which would
	// otherwise leave it looking permanently pressed.
	const onBlur = React.useCallback(() => {
		setPressed(false);
	}, []);

	return {
		pressed: isPressed,
		keyboardProps: { onKeyDown, onKeyUp, onBlur }
	};
};
