import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { Option } from '@repo/core';
import { Form, useForm } from '~/components/Form';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';
import { TextField } from '~/components/fields/TextField';
import { TextareaField } from '~/components/fields/TextareaField';
import { CheckboxField } from '~/components/fields/CheckboxField';
import { SwitchField } from '~/components/fields/SwitchField';
import { SelectField } from '~/components/fields/SelectField';
import { RadioGroupField } from '~/components/fields/RadioGroupField';

const meta: Meta<typeof TextField> = {
	title: 'UI Forms/Fields',
	component: TextField,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

const countries: Option[] = [
	{ id: 'gb', value: 'gb', label: 'United Kingdom' },
	{ id: 'ie', value: 'ie', label: 'Ireland' },
	{ id: 'fr', value: 'fr', label: 'France' }
];

const plans: Option[] = [
	{ id: 'monthly', value: 'monthly', label: 'Monthly' },
	{ id: 'yearly', value: 'yearly', label: 'Yearly' }
];

interface IAccount {
	email: string;
	bio: string;
	country: string;
	plan: string;
	marketing: boolean;
	terms: boolean;
}

const AccountForm = () => {
	const [submitted, setSubmitted] = React.useState<IAccount | undefined>(undefined);

	const form = useForm({
		defaultValues: {
			email: '',
			bio: '',
			country: '',
			plan: 'monthly',
			marketing: false,
			terms: false
		} as IAccount,
		onSubmit: ({ value }) => setSubmitted(value)
	});

	return (
		<Form form={form} className='grid w-96 gap-5'>
			{/* No render prop, no value/onChange, no form, no nativeLabel to remember. */}
			<TextField
				name='email'
				id='account-email'
				label='Email address'
				type='email'
				placeholder='john@example.com'
				required
				description='We only use this to send you a receipt.'
				validators={{
					onChange: ({ value }: { value: string }) =>
						value.includes('@') ? undefined : 'Enter a valid email address.'
				}}
			/>

			<TextareaField
				name='bio'
				id='account-bio'
				label='Short bio'
				placeholder='Tell us about yourself…'
				rows={3}
			/>

			<SelectField
				name='country'
				id='account-country'
				label='Country'
				options={countries}
				placeholder='Choose a country…'
			/>

			{/* RadioGroupField sets nativeLabel={false} internally — a single <label> cannot name
			several controls, and forgetting that is exactly the bug these components prevent. */}
			<RadioGroupField
				name='plan'
				id='account-plan'
				label='Billing plan'
				options={plans}
			/>

			<SwitchField name='marketing' id='account-marketing' label='Email me offers' />

			<CheckboxField
				name='terms'
				id='account-terms'
				label='Accept the terms'
				required
				validators={{
					onChange: ({ value }: { value: boolean }) =>
						value ? undefined : 'You must accept the terms.'
				}}
			/>

			<SubmitButton>Create account</SubmitButton>

			{submitted !== undefined && (
				<p data-testid='submitted' className='text-muted-foreground text-sm'>
					Submitted {submitted.email} on the {submitted.plan} plan.
				</p>
			)}
		</Form>
	);
};

export const AllFields: Story = {
	render: () => <AccountForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import {
  CheckboxField, RadioGroupField, SelectField, SwitchField, TextField, TextareaField, useForm
} from '@repo/ui-forms';

const form = useForm({ defaultValues: { email: '', country: '', terms: false } });

<TextField name='email' label='Email address' type='email' required />
<TextareaField name='bio' label='Short bio' />
<SelectField name='country' label='Country' options={countries} />
<RadioGroupField name='plan' label='Billing plan' options={plans} />
<SwitchField name='marketing' label='Email me offers' />
<CheckboxField name='terms' label='Accept the terms' required />`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Every field is labelled and wired to its own message region', async () => {
			await expect(canvas.getByRole('textbox', { name: /Email address/ })).toHaveAttribute(
				'aria-describedby',
				'account-email-message'
			);
			await expect(canvas.getByRole('textbox', { name: 'Short bio' })).toBeInTheDocument();
			await expect(canvas.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
			await expect(canvas.getByRole('switch', { name: 'Email me offers' })).toBeInTheDocument();
			await expect(canvas.getByRole('checkbox', { name: /Accept the terms/ })).toBeInTheDocument();
		});

		await step('RadioGroupField labels its group without a native label', async () => {
			// It sets nativeLabel={false} itself, so the group is named via aria-labelledby and keeps
			// Radix's radiogroup role.
			const group = canvas.getByRole('radiogroup', { name: /Billing plan/ });
			await expect(group).toHaveAttribute('aria-labelledby', 'account-plan-label');
			await expect(canvas.getByRole('radio', { name: 'Monthly' })).toBeChecked();
		});

		await step('Validation flows through without any wiring at the call site', async () => {
			const email = canvas.getByRole('textbox', { name: /Email address/ });
			await userEvent.type(email, 'nope');

			await waitFor(async () => {
				await expect(email).toHaveAttribute('aria-invalid', 'true');
			});

			await expect(
				canvasElement.querySelector('[id="account-email-message"]')
			).toHaveTextContent('Enter a valid email address.');
		});

		await step('Booleans round-trip through the form', async () => {
			const email = canvas.getByRole('textbox', { name: /Email address/ });
			await userEvent.clear(email);
			await userEvent.type(email, 'john@example.com');

			await userEvent.click(canvas.getByRole('radio', { name: 'Yearly' }));
			await userEvent.click(canvas.getByRole('checkbox', { name: /Accept the terms/ }));

			await waitFor(async () => {
				await expect(canvas.getByRole('checkbox', { name: /Accept the terms/ })).toBeChecked();
			});

			await userEvent.click(canvas.getByRole('button', { name: 'Create account' }));

			await waitFor(async () => {
				await expect(canvas.getByTestId('submitted')).toHaveTextContent(
					'Submitted john@example.com on the yearly plan.'
				);
			});
		});
	}
};

const SelectMultipleForm = () => {
	const form = useForm({
		defaultValues: { interests: [] as string[] },
		onSubmit: () => undefined
	});

	return (
		<Form form={form} className='w-96'>
			<SelectField
				name='interests'
				id='interests'
				label='Interests'
				type='multiple'
				options={countries}
				placeholder='Choose any number…'
				description='Pick as many as you like.'
			/>
		</Form>
	);
};

export const MultiSelect: Story = {
	render: () => <SelectMultipleForm />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// `type='multiple'` switches the value shape from string to string[]; SelectField renders the
		// two modes as separate JSX because SelectProps is a discriminated union.
		const trigger = canvas.getByRole('combobox', { name: 'Interests' });
		await expect(trigger).toHaveAttribute('id', 'interests');
		await expect(trigger).toHaveAttribute('aria-describedby', 'interests-message');
	}
};
