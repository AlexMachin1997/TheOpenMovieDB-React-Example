import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Form, useForm } from '~/components/Form';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';
import { CheckboxField } from '~/components/fields/CheckboxField';
import type { ICheckboxField } from '~/components/fields/fields.types';

const meta = {
	title: 'UI Forms/Fields/Checkbox field',
	component: CheckboxField,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof CheckboxField>;

export default meta;
/**
 * `StoryObj<Partial<ICheckboxField>>` rather than `StoryObj<typeof meta>`: `name` and `label` are required, so
 * `typeof meta` makes `args` mandatory on every story, and each story here renders a component that
 * builds its own form. `component:` stays on the meta so `<Controls />` resolves.
 */
type Story = StoryObj<Partial<ICheckboxField>>;

const TermsForm = () => {
	const form = useForm({ defaultValues: { terms: false }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<CheckboxField
				name='terms'
				label='Accept the terms'
				required
				description='You can withdraw consent at any time.'
				validators={{
					onChange: ({ value }: { value: boolean }) =>
						value ? undefined : 'You must accept the terms.'
				}}
			/>

			<SubmitButton>Continue</SubmitButton>
		</Form>
	);
};

/**
 * A `Checkbox` bound to a boolean form field by name.
 *
 * This component exists because of a collision: Radix's `Checkbox` has its own `value` prop — a
 * string, for native form submission — which clashes with the field's value. Driving one through
 * `FormField` directly means destructuring `value` and `onChange` out of the control bag and
 * renaming them to `checked` and `onCheckedChange` at every call site. That knowledge lives here
 * once instead.
 */
export const Default: Story = {
	render: () => <TermsForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { CheckboxField, Form, SubmitButton, useForm } from '@repo/ui-forms';

const form = useForm({ defaultValues: { terms: false }, onSubmit: async ({ value }) => save(value) });

<Form form={form} className='grid gap-4'>
  <CheckboxField
    name='terms'
    label='Accept the terms'
    required
    validators={{ onChange: ({ value }) => (value ? undefined : 'You must accept the terms.') }}
  />
  <SubmitButton>Continue</SubmitButton>
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const terms = canvas.getByRole('checkbox', { name: /Accept the terms/ });

		await step('It starts unchecked and is wired up from its name', async () => {
			await expect(terms).not.toBeChecked();
			await expect(terms).toHaveAttribute('id', 'terms');
			await expect(terms).toHaveAttribute('aria-describedby', 'terms-message');
		});

		await step('The boolean round-trips through the form', async () => {
			await userEvent.click(terms);

			await waitFor(async () => {
				await expect(terms).toBeChecked();
			});
		});

		await step('Unchecking it surfaces the validation message', async () => {
			await userEvent.click(terms);

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="terms-message"]')).toHaveTextContent(
					'You must accept the terms.'
				);
			});
		});
	}
};
