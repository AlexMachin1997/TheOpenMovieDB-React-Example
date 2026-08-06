/**
 * When a field's error becomes visible.
 *
 * - `touched` — as soon as the user has interacted with the field *or* the form has been submitted.
 *   TanStack sets `isTouched` on the first value change, on blur, and on every mounted field during
 *   `handleSubmit`, so this one flag covers all three.
 * - `blurred` — only once the user has left the field, plus any submit- or server-sourced error.
 *   Quieter while typing. The submit/server part is not optional: `handleSubmit` touches every field
 *   but blurs none, so a bare `isBlurred` check would silently hide errors on fields the user never
 *   visited — the single most important case a form has.
 * - `always` — as soon as the error exists, including before any interaction.
 */
export type ShowErrorsWhen = 'touched' | 'blurred' | 'always';

/**
 * The shape `toFieldProps` reads from a TanStack Form field.
 *
 * Declared structurally, listing only the properties actually read, rather than importing
 * `AnyFieldApi`. Two reasons: a plain object literal satisfies it, so the unit tests need no DOM and
 * no form instance; and it documents the coupling precisely — this is the entire surface of
 * TanStack Form that `@repo/ui-forms` depends on.
 *
 * `AnyFieldApi` is structurally assignable to it, which `toFieldProps.spec.ts` asserts at compile
 * time so the two cannot drift apart unnoticed.
 */
export interface ITanStackFieldLike {
	state: {
		meta: {
			/** Set on first change, on blur, and on every mounted field during submit. */
			isTouched: boolean;

			/** Set on blur only — never by submit. */
			isBlurred: boolean;

			/**
			 * Whatever the validators produced. `unknown` because the element type depends entirely
			 * on which validator ran: a plain function typically returns a `string`, a Standard
			 * Schema validator (zod et al.) returns an issue object carrying `message`.
			 */
			errors: ReadonlyArray<unknown>;

			/** Used to distinguish submit- and server-sourced errors from validation-on-blur. */
			errorMap: {
				onSubmit?: unknown;
				onServer?: unknown;
			};
		};
	};
}

/** Options for `toFieldProps`. */
export interface IToFieldPropsOptions {
	/**
	 * When the error becomes visible.
	 *
	 * @default 'touched'
	 */
	showErrorsWhen?: ShowErrorsWhen;
}

/**
 * What `toFieldProps` returns — exactly the subset of `Field`'s props derivable from form state.
 *
 * Deliberately just the error. `Field` derives its invalid state from the presence of an error, and
 * `label`, `description` and `required` come from the author, not from the form.
 */
export interface IFieldPropsFromState {
	/** The first renderable validation message, or `undefined` when the field has nothing to show. */
	error: string | undefined;
}
