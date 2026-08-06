// Form
//
// `Form` owns the `<form>` element, `noValidate` and the context every field below it binds to.
// `useForm` stays an untouched re-export of `@tanstack/react-form`'s — nothing is wrapped.
// See docs/05-ui-forms-field-pattern/spec.md → Second pass.
export { Form, useForm, useFormContext } from '~/components/Form';
export type { IForm, IFormApiLike, IFormContext } from '~/components/Form';

// A submit button that cannot be built without submit semantics, and the surface for a failure that
// belongs to the form rather than to any field. Both require a `Form` ancestor.
export { SubmitButton } from '~/components/SubmitButton';
export type { ISubmitButton } from '~/components/SubmitButton';
export { FormError } from '~/components/FormError';
export type { IFormError } from '~/components/FormError';

// `FormField` binds `@repo/ui-core`'s `Field` to a field of the surrounding `Form`, by name.
// `toFieldProps` is the translation underneath, exported separately for anyone driving `form.Field`
// or `useField` directly. See docs/05-ui-forms-field-pattern/spec.md.
export { FormField } from '~/components/FormField/FormField';
export type { IFormField, IFormFieldControlProps } from '~/components/FormField/FormField.types';

// Bound field components. Each composes `FormField` with one control, so the per-control value and
// change wiring lives here once rather than being copy-pasted at every call site. `FormField`
// remains exported above as the escape hatch for controls that have no wrapper.
export * from '~/components/fields';

export { toFieldProps } from '~/adapters/toFieldProps';
export type {
	ITanStackFieldLike,
	IToFieldPropsOptions,
	IFieldPropsFromState,
	ShowErrorsWhen
} from '~/adapters/toFieldProps.types';

// Selects
export * from '~/components/Selects';

// DatePickers
export { SingleDatePicker, DateRangePicker } from '~/components/DatePickers';

// Leaf primitives (Input, Textarea, Checkbox, CheckboxGroup, Radio, Slider, Calendar) moved to
// `@repo/ui-core` — import them from there. No transitional re-exports: the library is unpublished,
// so a clean break is cheaper than a shim.
// See docs/04-ui-forms-primitive-migration/spec.md.
