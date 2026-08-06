import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Form, useForm } from '~/components/Form';
import { SelectField } from '~/components/fields/SelectField';
import type { ISelectField } from '~/components/fields/fields.types';
import { countries } from '~/components/fields/__fixtures__/options';

const meta = {
	title: 'UI Forms/Fields/Select field',
	component: SelectField,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof SelectField>;

export default meta;
/**
 * `StoryObj<Partial<ISelectField>>` rather than `StoryObj<typeof meta>`: `name` and `label` are required, so
 * `typeof meta` makes `args` mandatory on every story, and each story here renders a component that
 * builds its own form. `component:` stays on the meta so `<Controls />` resolves.
 */
type Story = StoryObj<Partial<ISelectField>>;

const CountryForm = () => {
	const form = useForm({ defaultValues: { country: '' }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<SelectField
				name='country'
				label='Country'
				options={countries}
				placeholder='Choose a country…'
				description='Where the invoice is sent.'
			/>
		</Form>
	);
};

const InterestsForm = () => {
	const form = useForm({ defaultValues: { interests: [] }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<SelectField
				name='interests'
				label='Interests'
				type='multiple'
				options={countries}
				placeholder='Choose any number…'
				description='Pick as many as you like.'
			/>
		</Form>
	);
};

/**
 * A `Select` bound to a form field by name.
 *
 * `nativeLabel` stays at its default of `true`, unlike
 * [`RadioGroupField`](?path=/docs/ui-forms-fields-radio-group-field--docs): the trigger is a
 * `<button>`, which is a labelable element, so a native `<label htmlFor>` genuinely names it.
 */
export const Default: Story = {
	render: () => <CountryForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Form, SelectField, useForm } from '@repo/ui-forms';

const countries = [
  { id: 'gb', value: 'gb', label: 'United Kingdom' },
  { id: 'ie', value: 'ie', label: 'Ireland' }
];

const form = useForm({ defaultValues: { country: '' }, onSubmit: async ({ value }) => save(value) });

<Form form={form} className='grid gap-4'>
  <SelectField name='country' label='Country' options={countries} placeholder='Choose a country…' />
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The trigger takes the field label as its accessible name', async () => {
			// Not "Select Trigger" — the hardcoded aria-label that used to outrank a real <label> was
			// made a fallback in the first pass of this deliverable.
			const trigger = canvas.getByRole('combobox', { name: 'Country' });
			await expect(trigger).toHaveAttribute('id', 'country');
			await expect(trigger).toHaveAttribute('aria-describedby', 'country-message');
		});
	}
};

/**
 * `type='multiple'` switches the value shape from a `string` to a `string[]`.
 *
 * `SelectField` renders the two modes as separate JSX rather than spreading, because `Select`'s own
 * props are a discriminated union and TypeScript only narrows them when `type` is a literal.
 */
export const Multiple: Story = {
	render: () => <InterestsForm />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole('combobox', { name: 'Interests' })).toBeInTheDocument();
	}
};
