import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Form, useForm } from '~/components/Form';
import { TextareaField } from '~/components/fields/TextareaField';
import type { ITextareaField } from '~/components/fields/fields.types';

const meta = {
	title: 'UI Forms/Fields/Textarea field',
	component: TextareaField,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof TextareaField>;

export default meta;
/**
 * `StoryObj<Partial<ITextareaField>>` rather than `StoryObj<typeof meta>`: `name` and `label` are required, so
 * `typeof meta` makes `args` mandatory on every story, and each story here renders a component that
 * builds its own form. `component:` stays on the meta so `<Controls />` resolves.
 */
type Story = StoryObj<Partial<ITextareaField>>;

const BioForm = () => {
	const form = useForm({ defaultValues: { bio: '' }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextareaField
				name='bio'
				label='Short bio'
				placeholder='Tell us about yourself…'
				rows={4}
				description='A sentence or two is plenty.'
				validators={{
					onChange: ({ value }: { value: string }) =>
						value.length > 140 ? 'Keep it under 140 characters.' : undefined
				}}
			/>
		</Form>
	);
};

/**
 * A `Textarea` bound to a form field by name.
 *
 * Identical to [`TextField`](?path=/docs/ui-forms-fields-text-field--docs) apart from the control it
 * renders and the `rows` prop — reach for it when the answer runs to more than one line.
 */
export const Default: Story = {
	render: () => <BioForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Form, TextareaField, useForm } from '@repo/ui-forms';

const form = useForm({ defaultValues: { bio: '' }, onSubmit: async ({ value }) => save(value) });

<Form form={form} className='grid gap-4'>
  <TextareaField
    name='bio'
    label='Short bio'
    rows={4}
    description='A sentence or two is plenty.'
  />
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const bio = canvas.getByRole('textbox', { name: /Short bio/ });

		await step('It is wired up from its name alone', async () => {
			await expect(bio).toHaveAttribute('id', 'bio');
			await expect(bio).toHaveAttribute('rows', '4');
			await expect(bio).toHaveAttribute('aria-describedby', 'bio-message');
		});

		await step('Validation flows through with no wiring at the call site', async () => {
			await userEvent.type(bio, 'x'.repeat(141));

			await waitFor(async () => {
				await expect(bio).toHaveAttribute('aria-invalid', 'true');
			});

			await expect(canvasElement.querySelector('[id="bio-message"]')).toHaveTextContent(
				'Keep it under 140 characters.'
			);
		});
	}
};
