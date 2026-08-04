import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cn } from '@repo/tailwind-config';
import { buttonVariants } from '~/components/Button/variants';
import { Icon } from '~/components/Icon/Icon';
import { useKeyboardActivation } from '~/hooks/useKeyboardActivation';
import type { NativeKeyboardActivation } from '~/hooks/useKeyboardActivation.types';
import type { IButton } from '~/components/Button/Button.types';

/**
 * Runs the consumer's handler first, then ours — unless they cancelled the event, which is how a
 * caller opts out of the built-in keyboard behaviour for a single interaction.
 */
const composeEventHandlers =
	<TEvent extends React.SyntheticEvent>(
		consumerHandler: ((event: TEvent) => void) | undefined,
		ourHandler: (event: TEvent) => void
	) =>
	(event: TEvent) => {
		consumerHandler?.(event);
		if (!event.defaultPrevented) ourHandler(event);
	};

/** Whether anything in `children` would give the button a visible accessible name. */
const hasTextChild = (children: React.ReactNode) =>
	React.Children.toArray(children).some(
		(child) => typeof child === 'number' || (typeof child === 'string' && child.trim().length > 0)
	);

const Button = ({
	className,
	variant,
	size,
	asChild = false,
	loading = false,
	disabled = false,
	type,
	startIcon,
	endIcon,
	children,
	onKeyDown,
	onKeyUp,
	onBlur,
	...props
}: IButton) => {
	const Comp = asChild ? Slot : 'button';
	const isDisabled = disabled || loading;

	// What the rendered element actually is decides everything below: which keys need synthesising,
	// whether `role`/`tabIndex` are needed, and whether `type`/`disabled` are even valid attributes
	// on it. A custom-component child is unknowable at compile time, so it is treated as non-native
	// — see the known limitation in docs/plans/button-enhancements.md.
	const child = asChild && React.isValidElement(children) ? children : null;
	const childProps = child?.props as { href?: string } | undefined;
	const rendersButton = !asChild || child?.type === 'button';
	const rendersAnchor = child?.type === 'a' && childProps?.href !== undefined;
	const rendersNonNative = !rendersButton && !rendersAnchor;

	const nativeActivation: NativeKeyboardActivation = rendersButton
		? 'both'
		: rendersAnchor
			? 'enter-only'
			: 'none';

	const { pressed, keyboardProps } = useKeyboardActivation({
		nativeActivation,
		disabled: isDisabled
	});

	// A control whose only content is a decorative icon has no accessible name at all. Non-throwing
	// by design — the button still renders, the omission is just impossible to miss in the console.
	if (
		size === 'icon' &&
		!hasTextChild(children) &&
		props['aria-label'] === undefined &&
		props['aria-labelledby'] === undefined
	) {
		console.warn(
			'[ui-core] Button: an icon-only button has no accessible name. Add an `aria-label` (or `aria-labelledby`) — the icon itself is `aria-hidden` and names nothing.'
		);
	}

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			// `type` is only a valid attribute on a real button, and defaulting it to `button` is the
			// whole point — a Button inside a form should not submit it by accident.
			type={rendersButton ? (type ?? 'button') : type}
			// Likewise `disabled`: meaningless on a div or an anchor, which rely on `aria-disabled`
			// plus the `aria-disabled:*` rules in the variants instead.
			disabled={rendersButton ? isDisabled : undefined}
			aria-disabled={isDisabled ? 'true' : undefined}
			aria-busy={loading ? 'true' : undefined}
			// Redundant on a real button or link, so applied only where the element has no button
			// semantics of its own. `tabIndex` goes with it: `role="button"` on a div is a lie
			// unless the div is also focusable.
			role={rendersNonNative ? 'button' : undefined}
			tabIndex={rendersNonNative ? 0 : undefined}
			// Drives the pressed treatment for keyboard presses. Pointer presses are covered by
			// `:active`, which works on any element, so the two look identical.
			data-pressed={pressed ? 'true' : undefined}
			onKeyDown={composeEventHandlers(onKeyDown, keyboardProps.onKeyDown)}
			onKeyUp={composeEventHandlers(onKeyUp, keyboardProps.onKeyUp)}
			onBlur={composeEventHandlers(onBlur, keyboardProps.onBlur)}
			{...props}
		>
			{startIcon ? <Icon name={startIcon} /> : null}
			<Slottable>{children}</Slottable>
			{loading ? (
				<Icon name='loader-circle' className='animate-spin' />
			) : endIcon ? (
				<Icon name={endIcon} />
			) : null}
		</Comp>
	);
};

Button.displayName = 'Button';

export { Button };
