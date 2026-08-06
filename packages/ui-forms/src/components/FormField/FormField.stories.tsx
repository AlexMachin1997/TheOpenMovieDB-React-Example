import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Checkbox, Input, Textarea } from '@repo/ui-core';
import { Form, useForm } from '~/components/Form';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';
import { FormField } from '~/components/FormField/FormField';

const meta: Meta<typeof FormField> = {
	title: 'UI Forms/Form field',
	component: FormField,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ISignUp {
	email: string;
	bio: string;
	terms: boolean;
}

const SignUpForm = () => {
	const [submitted, setSubmitted] = React.useState<ISignUp | undefined>(undefined);

	const form = useForm({
		defaultValues: { email: '', bio: '', terms: false } as ISignUp,
		onSubmit: ({ value }) => setSubmitted(value)
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			{/*
			 * Native inputs need nothing beyond the spread: `control` already carries id, the aria
			 * bindings, value, onChange and onBlur.
			 */}
			<FormField<string>
				name='email'
				label='Email address'
				id='signup-email'
				required
				description='We only use this to send you a receipt.'
				validators={{
					onChange: ({ value }: { value: string }) =>
						value.includes('@') ? undefined : 'Enter a valid email address.'
				}}
			>
				{(control) => <Input {...control} type='email' placeholder='john@example.com' />}
			</FormField>

			<FormField<string> name='bio' label='Short bio' id='signup-bio'>
				{(control) => <Textarea {...control} placeholder='Tell us about yourself…' />}
			</FormField>

			{/*
			 * A control with its own change vocabulary renames two props. That is the whole cost of
			 * FormField not holding a registry of control names.
			 */}
			<FormField<boolean>
				name='terms'
				label='Accept the terms'
				id='signup-terms'
				required
				validators={{
					onChange: ({ value }: { value: boolean }) =>
						value ? undefined : 'You must accept the terms.'
				}}
			>
				{/*
				 * `value` has to be destructured out rather than spread: Radix's Checkbox has its own
				 * `value` prop (a string, for form submission) and the two collide. This friction is
				 * exactly what `CheckboxField` exists to absorb — see the `fields` stories.
				 */}
				{({ value, onChange, ...control }) => (
					<Checkbox {...control} checked={value} onCheckedChange={onChange} />
				)}
			</FormField>

			<SubmitButton>Create account</SubmitButton>

			{submitted !== undefined && (
				<p data-testid='submitted' className='text-muted-foreground text-sm'>
					Submitted: {submitted.email}
				</p>
			)}
		</Form>
	);
};

export const Default: Story = {
	render: () => <SignUpForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Input } from '@repo/ui-core';
import { FormField, useForm } from '@repo/ui-forms';

const form = useForm({ defaultValues: { email: '' } });

<FormField
  form={form}
  name='email'
  label='Email address'
  required
  validators={{ onChange: ({ value }) => (value.includes('@') ? undefined : 'Enter a valid email address.') }}
>
  {(control) => <Input {...control} type='email' />}
</FormField>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const email = canvas.getByRole('textbox', { name: /Email address/ });

		await step('The field starts valid and is wired to its message region', async () => {
			await expect(email).not.toHaveAttribute('aria-invalid');
			await expect(email).toHaveAttribute('aria-describedby', 'signup-email-message');
			await expect(email).toBeRequired();
		});

		await step('Typing an invalid value surfaces the validator message', async () => {
			await userEvent.type(email, 'nope');

			await waitFor(async () => {
				await expect(email).toHaveAttribute('aria-invalid', 'true');
			});

			const region = canvasElement.querySelector('[id="signup-email-message"]');
			await expect(region).toHaveTextContent('Enter a valid email address.');
		});

		await step('Correcting it clears the error, with no hand-translation at the call site', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'john@example.com');

			await waitFor(async () => {
				await expect(email).not.toHaveAttribute('aria-invalid');
			});
		});

		await step('The value reached the form, resolved by name', async () => {
			await userEvent.click(canvas.getByRole('checkbox', { name: /Accept the terms/ }));
			await userEvent.click(canvas.getByRole('button', { name: 'Create account' }));

			await waitFor(async () => {
				await expect(canvas.getByTestId('submitted')).toHaveTextContent('john@example.com');
			});
		});
	}
};

const UnvisitedFieldForm = () => {
	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: () => undefined
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			{/*
			 * `showErrorsWhen='blurred'` is the quieter mode — it stays silent while you type. The
			 * point of this story is that it does NOT stay silent on submit: handleSubmit marks every
			 * mounted field touched but blurs none, so a naive isBlurred gate would hide the error on
			 * exactly the field the user skipped.
			 */}
			<FormField<string>
				name='email'
				label='Email address'
				id='unvisited-email'
				required
				showErrorsWhen='blurred'
				validators={{
					onSubmit: ({ value }: { value: string }) => (value === '' ? 'Required.' : undefined)
				}}
			>
				{(control) => <Input {...control} type='email' />}
			</FormField>

			<SubmitButton>Submit</SubmitButton>
		</Form>
	);
};

export const SubmitSurfacesErrorsOnUnvisitedFields: Story = {
	render: () => <UnvisitedFieldForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Nothing is shown before submitting', async () => {
			await expect(canvas.getByRole('textbox', { name: /Email address/ })).not.toHaveAttribute(
				'aria-invalid'
			);
		});

		await step('Submitting surfaces the error on a field never visited', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

			await waitFor(async () => {
				const region = canvasElement.querySelector('[id="unvisited-email-message"]');
				await expect(region).toHaveTextContent('Required.');
			});
		});
	}
};
