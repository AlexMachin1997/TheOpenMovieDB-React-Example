import type { AnyFormApi, FieldComponent } from '@tanstack/react-form';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A form instance as `@repo/ui-forms` sees it.
 *
 * `AnyFormApi` on its own is not enough: it is `form-core`'s type, and `Field` is added by React's
 * `useForm` on top of it. `FormField` renders `form.Field`, so both halves are needed.
 *
 * Every generic slot is `any` deliberately. `FieldComponent` takes twelve of them, eleven describing
 * which validators the form was built with — none of which this layer cares about, since it renders
 * `form.Field` and reads the resulting state. Naming them concretely would make these components
 * accept forms with one validator configuration and reject others.
 *
 * `TFormData` is `any` here too, which is the trade recorded in the spec: the form travels by
 * context, React context is not generic, so `name` is a plain `string` rather than a checked key of
 * the form's data. `DeepKeys<any>` resolves to `string` (`unknown extends any` is true), so
 * `form.Field`'s own typing still holds — nothing is bypassed or cast.
 *
 * `Form.types.spec.ts` pins a real `useForm` result against this at compile time.
 */
export type IFormApiLike = AnyFormApi & {
	Field: FieldComponent<any, any, any, any, any, any, any, any, any, any, any, any>;
};

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
