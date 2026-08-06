import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

/** Properties shared by both rendering modes. */
interface ILabelCommon {
	/**
	 * Renders the label bold rather than at the default text weight.
	 *
	 * Emphasised by default, because the common case is a field or group heading. Per-item option
	 * labels (`CheckboxLabel`, `RadioLabel`) opt out.
	 *
	 * @default true
	 */
	emphasis?: boolean;

	/**
	 * Marks the labelled control as required, rendering a `*` symbol alongside a visually-hidden
	 * `(required)`.
	 *
	 * The symbol is `aria-hidden`: assistive technology takes required-ness from the control's own
	 * `required`/`aria-required` attribute, so announcing "Email star" as well would be noise. The
	 * symbol and the hidden text exist so the requirement is conveyed by more than colour
	 * (WCAG 1.4.1).
	 *
	 * @default false
	 */
	required?: boolean;
}

/**
 * Properties for a `Label` in its default, native mode — a real `<label>` element that associates
 * with one control via `htmlFor`.
 *
 * @example
 * ```tsx
 * <Label htmlFor='email' required>Email address</Label>
 * <Input id='email' type='email' required />
 * ```
 */
export interface ILabelNative
	extends React.ComponentProps<typeof LabelPrimitive.Root>,
		ILabelCommon {
	/**
	 * Whether to render a native `<label>`. Omit or pass `true` for the native element.
	 *
	 * @default true
	 */
	nativeLabel?: true;
}

/**
 * Properties for a `Label` rendered as a plain `<span>`, for the cases where a native `<label>`
 * cannot do the job: naming a group of controls, or naming a control that is not a labelable
 * element (a `Slider`'s thumb, for instance).
 *
 * `htmlFor` is deliberately unavailable here. A `<span>` cannot associate with a control by
 * `htmlFor`, so the association has to be made the other way round — the control (or group
 * container) points back at this label's `id` with `aria-labelledby`. Typing it as `never` turns
 * "labels nothing at all" into a compile error rather than a silent accessibility bug.
 *
 * Used as a plain styled heading, outside any group, it needs no `aria-labelledby` wiring at all.
 *
 * @example
 * ```tsx
 * <Label nativeLabel={false} id='notify-heading'>Notify me about</Label>
 * <CheckboxGroup role='group' aria-labelledby='notify-heading' … />
 * ```
 */
export interface ILabelNonNative extends React.ComponentProps<'span'>, ILabelCommon {
	/** Whether to render a native `<label>`. Pass `false` for a `<span>`. */
	nativeLabel: false;

	/** Not available in non-native mode — a `<span>` cannot label a control by `htmlFor`. */
	htmlFor?: never;
}

/** Properties for the Label component. */
export type ILabel = ILabelNative | ILabelNonNative;
