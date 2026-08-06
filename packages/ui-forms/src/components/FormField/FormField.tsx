import type { AnyFieldApi, DeepKeys } from '@tanstack/react-form';
import { Field } from '@repo/ui-core';
import { toFieldProps } from '~/adapters/toFieldProps';
import type { IFormField } from '~/components/FormField/FormField.types';

/**
 * Reads a change from either a DOM event or a raw value.
 *
 * `Input` and `Textarea` hand back a `ChangeEvent`; `Checkbox`, `Switch`, `Select` and `Slider` hand
 * back the value itself. Normalising here is what lets one `onChange` serve all of them without
 * `FormField` knowing which control it is wrapping — which is the line between a generic wrapper
 * and the pre-wired component registry the spec rejected.
 */
const readChange = (next: unknown): unknown => {
	if (typeof next !== 'object' || next === null || !('target' in next)) {
		return next;
	}

	const { target } = next as { target: unknown };

	if (typeof target !== 'object' || target === null) {
		return next;
	}

	if ('type' in target && (target as HTMLInputElement).type === 'checkbox') {
		return (target as HTMLInputElement).checked;
	}

	return 'value' in target ? (target as HTMLInputElement).value : next;
};

/**
 * A `Field` bound to a TanStack Form field by name.
 *
 * Renders TanStack's own `form.Field` internally — which is where the reactivity comes from, not
 * from anything added here — translates its state with `toFieldProps`, and renders `@repo/ui-core`'s
 * `Field` around your control.
 *
 * It hands you the bindings and stops. It never maps a control *name* to a component, because that
 * would mean holding a registry of every control and how each reports a change, and every control
 * added later would need an entry. As written this works with controls that don't exist yet.
 *
 * @example
 * ```tsx
 * <FormField form={form} name='email' label='Email address' required>
 *   {(control) => <Input {...control} type='email' />}
 * </FormField>
 * ```
 */
export const FormField = <TFormData, TName extends DeepKeys<TFormData>>({
	form,
	name,
	children,
	validators,
	showErrorsWhen = 'touched',
	id,
	...fieldProps
}: IFormField<TFormData, TName>) => {
	const FormFieldPrimitive = form.Field;

	return (
		<FormFieldPrimitive name={name} validators={validators}>
			{(field: AnyFieldApi) => (
				<Field
					{...fieldProps}
					// Defaulting the control's id to the field's name gives readable DOM ids, makes a
					// field's element reachable from its name, and avoids React 19's generated ids,
					// which contain guillemets — valid in an attribute, invalid in a CSS selector.
					// `Form` relies on this to move focus to the first invalid control after a failed
					// submission. A caller-supplied id still wins.
					id={id ?? name}
					{...toFieldProps(field, { showErrorsWhen })}
				>
					{(control) =>
						children(
							{
								...control,
								name: field.name,
								value: field.state.value,
								onChange: (next: unknown) => field.handleChange(readChange(next)),
								onBlur: field.handleBlur
							},
							field
						)
					}
				</Field>
			)}
		</FormFieldPrimitive>
	);
};

FormField.displayName = 'FormField';
