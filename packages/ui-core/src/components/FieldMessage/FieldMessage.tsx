import { cn } from '@repo/tailwind-config';
import { Alert, AlertDescription } from '~/components/Alert/Alert';
import { Icon } from '~/components/Icon/Icon';
import type { IconName } from '~/components/Icon/Icon.constants';
import type {
	FieldMessageVariant,
	IFieldMessage
} from '~/components/FieldMessage/FieldMessage.types';

// One distinct shape per state, so `error` and `success` stay distinguishable to a reader who cannot
// tell red from green (WCAG 1.4.1). Not exported — the mapping is an implementation detail, and
// `react-refresh/only-export-components` is an error in this repo, so a second export here would
// fail lint regardless.
const ICON_BY_VARIANT: Record<FieldMessageVariant, IconName> = {
	error: 'x-circle',
	warning: 'alert-triangle',
	success: 'check-circle',
	info: 'info'
};

/**
 * A description or validation message belonging to one form control.
 *
 * Composes `Alert`, so the two share one colour vocabulary and one set of state semantics rather
 * than drifting into separate palettes for the same idea. `FieldMessage` adds the state→icon
 * mapping, narrows the variants to the four that mean something under a control, and drops the
 * assertive live region — see below.
 *
 * Not exported from the package. `Field` renders it; reach for `Field` rather than this.
 */
const FieldMessage = ({ className, variant = 'info', children, ...props }: IFieldMessage) => {
	const iconName = ICON_BY_VARIANT[variant];

	return (
		<Alert
			variant={variant}
			data-slot='field-message'
			data-variant={variant}
			// The resolved icon name, surfaced so the state→icon pairing is assertable. Iconify
			// fetches glyph data over the network and renders an identically-classed blank
			// placeholder until it arrives, so the rendered `<svg>` says nothing about *which* icon
			// it will become — reading it back would test the CDN, not this mapping.
			data-icon={iconName}
			// `Alert` defaults to `role='alert'`, an assertive live region. That is right for a
			// page-level banner and wrong here: `Field` already wraps its messages in a *polite*
			// live region, and an assertive one nested inside would interrupt a screen reader
			// mid-keystroke every time a description rendered or an error changed. `role` sits
			// before `{...props}` in `Alert`, so passing `undefined` genuinely clears it.
			role={undefined}
			className={cn(className)}
			{...props}
		>
			{/* `Icon` is always `aria-hidden`. The icon carries the state visually; the message text
			carries it to assistive technology, which is why the text must say what happened rather
			than leaving the colour to imply it. Size is left to `Alert`'s own `[&>svg]:size-4`. */}
			<Icon name={iconName} />

			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
};

export { FieldMessage };
