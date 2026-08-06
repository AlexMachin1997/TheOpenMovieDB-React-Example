import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Form, useForm } from '~/components/Form';
import { RadioGroupField } from '~/components/fields/RadioGroupField';
import type { IRadioGroupField } from '~/components/fields/fields.types';
import { plans } from '~/components/fields/__fixtures__/options';

const meta = {
	title: 'UI Forms/Fields/Radio group field',
	component: RadioGroupField,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof RadioGroupField>;

export default meta;
/**
 * `StoryObj<Partial<IRadioGroupField>>` rather than `StoryObj<typeof meta>`: `name` and `label` are required, so
 * `typeof meta` makes `args` mandatory on every story, and each story here renders a component that
 * builds its own form. `component:` stays on the meta so `<Controls />` resolves.
 */
type Story = StoryObj<Partial<IRadioGroupField>>;

const PlanForm = () => {
	const form = useForm({ defaultValues: { plan: 'monthly' }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<RadioGroupField
				name='plan'
				label='Billing plan'
				options={plans}
				description='Change it whenever you like.'
			/>
		</Form>
	);
};

/**
 * A `RadioGroup` bound to a form field by name.
 *
 * **It sets `nativeLabel={false}` for you, and that is the main reason it exists.** A single native
 * `<label>` cannot name several controls, so the field's label has to render as a `<span>` with the
 * group pointing back at it through `aria-labelledby`. A caller driving a radio group through
 * `FormField` directly has to remember that, and gets no warning when they don't — the label simply
 * names nothing.
 *
 * The group keeps Radix's `radiogroup` role rather than being given `group`. It is the more specific
 * of the two, and assistive technology reads set position ("2 of 4") from it.
 */
export const Default: Story = {
	render: () => <PlanForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Form, RadioGroupField, useForm } from '@repo/ui-forms';

const plans = [
  { id: 'monthly', value: 'monthly', label: 'Monthly' },
  { id: 'yearly', value: 'yearly', label: 'Yearly' }
];

const form = useForm({ defaultValues: { plan: 'monthly' }, onSubmit: async ({ value }) => save(value) });

<Form form={form} className='grid gap-4'>
  <RadioGroupField name='plan' label='Billing plan' options={plans} />
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The group is named by the field label, without a native one', async () => {
			const group = canvas.getByRole('radiogroup', { name: /Billing plan/ });
			await expect(group).toHaveAttribute('aria-labelledby', 'plan-label');
		});

		await step('Each option still carries its own per-item label', async () => {
			await expect(canvas.getByRole('radio', { name: 'Monthly' })).toBeChecked();
			await expect(canvas.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();
		});

		await step('Selecting an option round-trips through the form', async () => {
			await userEvent.click(canvas.getByRole('radio', { name: 'Yearly' }));

			await waitFor(async () => {
				await expect(canvas.getByRole('radio', { name: 'Yearly' })).toBeChecked();
			});
		});
	}
};
