import * as React from 'react';
import type { IAlert } from '~/components/Alert/Alert.types';

/**
 * The states a field message can convey.
 *
 * A deliberate subset of `Alert`'s variants: `default` has no meaning under a form control, and
 * `destructive` is `Alert`'s second, near-identical red — `FieldMessage` uses `error` and does not
 * inherit that duplication. `info` was added to `Alert` for this component.
 */
export type FieldMessageVariant = 'error' | 'warning' | 'success' | 'info';

/**
 * Properties for the FieldMessage component.
 *
 * Renders an `Alert` under a form control — a description, or a validation message.
 *
 * @example
 * ```tsx
 * <FieldMessage variant='error'>Enter a valid email address</FieldMessage>
 * ```
 */
export interface IFieldMessage extends Omit<IAlert, 'variant' | 'children'> {
	/**
	 * The state the message conveys, which picks both the colour and the icon.
	 *
	 * Each state has a distinct icon shape as well as a distinct colour, so the state survives for a
	 * reader who cannot distinguish the colours (WCAG 1.4.1).
	 *
	 * @default 'info'
	 */
	variant?: FieldMessageVariant;

	/** The message itself. */
	children: React.ReactNode;
}
