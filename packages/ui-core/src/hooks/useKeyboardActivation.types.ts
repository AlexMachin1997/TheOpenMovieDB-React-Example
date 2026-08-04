import * as React from 'react';

/**
 * What the rendered element already does on its own when focused and a key is pressed.
 *
 * You declare what the element *already* handles; {@link useKeyboardActivation} works out what is
 * missing and synthesises only that. Getting this wrong in the permissive direction is what causes
 * a handler to fire twice per press.
 *
 * - `'both'` — a real `<button>`. The browser fires `click` for Enter *and* Space, so nothing is
 *   synthesised.
 * - `'enter-only'` — an `<a href>`. Enter navigates natively; Space does nothing, so only Space is
 *   synthesised.
 * - `'none'` — a `<div>`, `<span>` or custom component. Neither key does anything, so both are
 *   synthesised.
 */
export type NativeKeyboardActivation = 'both' | 'enter-only' | 'none';

/**
 * Options for {@link useKeyboardActivation}.
 */
export interface UseKeyboardActivationOptions {
	/**
	 * What the element the handlers are spread onto already does natively.
	 *
	 * @see {@link NativeKeyboardActivation}
	 */
	nativeActivation: NativeKeyboardActivation;

	/**
	 * When `true`, every handler no-ops and {@link UseKeyboardActivationResult.pressed} is forced
	 * back to `false` in the same render — a disabled element stops receiving `keyup`, so a
	 * pressed state that only cleared on release would stay visually stuck.
	 *
	 * @default false
	 */
	disabled?: boolean;
}

/**
 * The handlers {@link useKeyboardActivation} needs spread onto the element.
 *
 * Spread these onto the *same* element that receives focus. If the consumer also supplies handlers
 * of their own, compose both — replacing these silently disables keyboard activation.
 */
export interface KeyboardActivationProps {
	/** Marks the element pressed, and activates it on Enter where Enter isn't handled natively. */
	onKeyDown: React.KeyboardEventHandler<HTMLElement>;

	/** Clears the pressed state, and activates it on Space where Space isn't handled natively. */
	onKeyUp: React.KeyboardEventHandler<HTMLElement>;

	/** Clears the pressed state when focus leaves mid-press (e.g. tabbing away while holding). */
	onBlur: React.FocusEventHandler<HTMLElement>;
}

/**
 * The return value of {@link useKeyboardActivation}.
 */
export interface UseKeyboardActivationResult {
	/**
	 * Whether Enter or Space is currently held down on the element.
	 *
	 * Tracked for *every* `nativeActivation` mode, including `'both'`, so a native `<button>` and a
	 * `<div>`-backed one can render an identical pressed treatment. Drive a `data-*` attribute or a
	 * class from it — it is a visual concern only and never triggers activation by itself.
	 */
	pressed: boolean;

	/** Handlers to spread onto the focusable element. */
	keyboardProps: KeyboardActivationProps;
}
