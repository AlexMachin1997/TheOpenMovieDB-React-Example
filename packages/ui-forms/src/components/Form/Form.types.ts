import type * as React from 'react';
import type { AnyFormApi, FieldComponent } from '@tanstack/react-form';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A form instance as `@repo/ui-forms` sees it.
 *
 * Declared structurally, listing only what this layer actually touches, exactly as
 * `ITanStackFieldLike` does one level down. That documents the coupling precisely — this is the
 * entire surface of TanStack Form the form layer depends on.
 *
 * **It is not `AnyFormApi`,** for two separate reasons:
 *
 * - `AnyFormApi` is `form-core`'s type and has no `Field`. That is added by React's `useForm`.
 * - `AnyFormApi & { Field }` looked like the smaller change, and compiles — until a form whose data
 *   type is `{}` is passed to it. `DeepKeys<{}>` is `never`, which makes `pushFieldValue`'s value
 *   parameter `never` too, and a contravariant parameter position then rejects the `any` in
 *   `AnyFormApi`. Listing four members rather than the whole API sidesteps a variance problem in
 *   methods nothing here calls.
 *
 * Every generic slot on `Field` is `any` deliberately. `FieldComponent` takes twelve of them, eleven
 * describing which validators the form was built with — none of which this layer cares about, since
 * it renders `form.Field` and reads the resulting state. Naming them concretely would make these
 * components accept forms with one validator configuration and reject others.
 *
 * `TFormData` is `any` too, which is the trade recorded in the spec: the form travels by context,
 * React context is not generic, so `name` is a plain `string` rather than a checked key of the
 * form's data. `DeepKeys<any>` resolves to `string` (`unknown extends any` is true), so
 * `form.Field`'s own typing still holds — nothing is bypassed or cast.
 *
 * `Form.types.spec.ts` pins a real `useForm` result against this at compile time.
 */
export interface IFormApiLike {
	/** Renders one field. `FormField` composes `Field` around whatever this yields. */
	Field: FieldComponent<any, any, any, any, any, any, any, any, any, any, any, any>;

	/** Subscribed to by `SubmitButton` via `useStore`, for submitting and validity state. */
	store: AnyFormApi['store'];

	/** Read after a submission settles — `isSubmitted` and `fieldMeta`. */
	state: AnyFormApi['state'];

	/** What `Form`'s submit handler actually drives. */
	handleSubmit: AnyFormApi['handleSubmit'];
}

/**
 * What `Form` puts on the context.
 *
 * The form instance is the obvious half. The form-level error message is the less obvious one, and
 * it lives here rather than in the form library's error map on purpose: that map's entries feed
 * `isFormValid` → `isValid` → `canSubmit`, so a message whose only job is to be *read* would also
 * gate submission. See the spec's Decisions.
 */
export interface IFormContext {
	/** The instance from `useForm`, as handed to `Form`. */
	form: IFormApiLike;

	/**
	 * The message from the last failed submission that belonged to no field, or `undefined` when the
	 * form has not failed that way. `Form` clears it at the start of every submission.
	 */
	formError: string | undefined;
}

/**
 * Properties for the Form component.
 *
 * `onSubmit` and `noValidate` are **omitted rather than defaulted**. Both are the whole reason this
 * component exists:
 *
 * - Without `noValidate` the browser's own constraint validation runs, and when a `required` field
 *   is empty it blocks the `submit` event outright — React's handler never fires, the form library
 *   never validates, and no message ever appears. A silent, complete failure.
 * - `onSubmit` is where the form library is actually driven, propagation is stopped and focus is
 *   moved. A caller-supplied one would replace all of it.
 *
 * Leaving them out of the type means neither can be passed at all, rather than being defaults a
 * spread could quietly overwrite.
 *
 * @example
 * ```tsx
 * <Form form={form} className='grid gap-6'>
 *   <TextField name='email' label='Email address' required />
 *   <FormError />
 *   <SubmitButton>Save</SubmitButton>
 * </Form>
 * ```
 */
export interface IForm extends Omit<React.ComponentProps<'form'>, 'onSubmit' | 'noValidate'> {
	/** The form instance, from `useForm`. */
	form: IFormApiLike;
}
