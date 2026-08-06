import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Form, useForm } from '~/components/Form';
import { SwitchField } from '~/components/fields/SwitchField';
import type { ISwitchField } from '~/components/fields/fields.types';

const meta = {
	title: 'UI Forms/Fields/Switch field',
	component: SwitchField,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof SwitchField>;

export default meta;
/**
 * `StoryObj<Partial<ISwitchField>>` rather than `StoryObj<typeof meta>`: `name` and `label` are required, so
 * `typeof meta` makes `args` mandatory on every story, and each story here renders a component that
 * builds its own form. `component:` stays on the meta so `<Controls />` resolves.
 */
type Story = StoryObj<Partial<ISwitchField>>;

const PreferencesForm = () => {
	const form = useForm({ defaultValues: { marketing: false }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<SwitchField
				name='marketing'
				label='Email me offers'
				description='Occasional, and never shared.'
			/>
		</Form>
	);
};

/**
 * A `Switch` bound to a boolean form field by name.
 *
 * The same data shape as [`CheckboxField`](?path=/docs/ui-forms-fields-checkbox-field--docs), and it
 * absorbs the same Radix `value` collision. **Choose between them by when the change takes effect:**
 * a switch reads as something that applies immediately, a checkbox as something that applies when
 * the form is submitted.
 */
export const Default: Story = {
	render: () => <PreferencesForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Form, SwitchField, useForm } from '@repo/ui-forms';

const form = useForm({ defaultValues: { marketing: false }, onSubmit: async ({ value }) => save(value) });

<Form form={form} className='grid gap-4'>
  <SwitchField name='marketing' label='Email me offers' description='Occasional, and never shared.' />
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const marketing = canvas.getByRole('switch', { name: /Email me offers/ });

		await step('It reports the switch role, not checkbox', async () => {
			await expect(marketing).toHaveAttribute('id', 'marketing');
			await expect(marketing).not.toBeChecked();
		});

		await step('Toggling it round-trips through the form', async () => {
			await userEvent.click(marketing);

			await waitFor(async () => {
				await expect(marketing).toBeChecked();
			});
		});
	}
};
