import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { Label } from '~/components/Label/Label';
import { FieldMessage } from '~/components/FieldMessage/FieldMessage';
import type { IField, IFieldControlProps } from '~/components/Field/Field.types';

/**
 * Pairs a label, a control, an optional description and an optional error, and wires them together
 * for assistive technology.
 *
 * `Field` has no dependency on any form-state library. It takes plain values, so it works with
 * `useState`, with TanStack Form via `@repo/ui-forms`' `FormField`, or with nothing at all.
 *
 * @example
 * ```tsx
 * <Field label='Email address' description='We never share it.' error={error} required>
 *   {(control) => <Input {...control} type='email' value={value} onChange={onChange} />}
 * </Field>
 * ```
 */
const Field = ({
	label,
	children,
	description,
	error,
	required = false,
	nativeLabel = true,
	id,
	className,
	...props
}: IField) => {
	// A caller-supplied id wins; `useId` is the fallback. Ids read as `email` / `email-message` in
	// the DOM when one is given, which is worth something when debugging — and React 19's generated
	// ids contain «guillemets», which are valid in an attribute but not in a CSS selector.
	const fallbackId = React.useId();
	const controlId = id ?? fallbackId;

	// Always derived from the control id, never generated separately, so the pair stays legible.
	const messageId = `${controlId}-message`;
	const labelId = `${controlId}-label`;

	const isInvalid = error !== undefined;
	const hasMessages = description !== undefined || isInvalid;

	const control: IFieldControlProps = {
		id: controlId,
		// Points at the region unconditionally, including when it is empty. See the region below.
		'aria-describedby': messageId,
		'aria-invalid': isInvalid || undefined,
		...(nativeLabel
			? { required: required || undefined }
			: {
					// A native <label htmlFor> already names the control; adding `aria-labelledby`
					// there would override it rather than supplement it.
					'aria-labelledby': labelId,
					'aria-required': required || undefined
				})
	};

	return (
		<div data-slot='field' className={cn('w-full', className)} {...props}>
			{nativeLabel ? (
				<Label htmlFor={controlId} required={required} className='mb-2'>
					{label}
				</Label>
			) : (
				<Label nativeLabel={false} id={labelId} required={required} className='mb-2'>
					{label}
				</Label>
			)}

			{children(control)}

			{/*
			 * The message region is ALWAYS rendered, even with nothing to say, and `aria-describedby`
			 * always points at it.
			 *
			 * `aria-describedby` is read when focus lands on a control. An error that appears on blur
			 * therefore has to arrive in a region that already existed — a live region inserted into
			 * the DOM at the same moment as its content is announced unreliably, because assistive
			 * technology never saw the region become live.
			 *
			 * It must not be hidden with `display: none` either (`hidden`, `empty:hidden`): that
			 * removes the element from the accessibility tree entirely, so revealing it and filling
			 * it in the same commit reproduces the exact problem this avoids.
			 *
			 * Which is also why `Field`'s root is not a `grid gap-*`: a gap applies to an empty grid
			 * item just as readily as a full one, and would leave a phantom row under every field
			 * with nothing to say. Spacing is applied here instead, only when there is content.
			 */}
			<div
				id={messageId}
				data-slot='field-messages'
				aria-live='polite'
				className={cn('grid gap-2', hasMessages && 'mt-2')}
			>
				{description !== undefined && <FieldMessage variant='info'>{description}</FieldMessage>}
				{error !== undefined && <FieldMessage variant='error'>{error}</FieldMessage>}
			</div>
		</div>
	);
};

Field.displayName = 'Field';

export { Field };
