import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Form, useForm } from '~/components/Form';
import { FormError } from '~/components/FormError/FormError';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';
import { CheckboxField } from '~/components/fields/CheckboxField';
import { SelectField } from '~/components/fields/SelectField';
import { TextField } from '~/components/fields/TextField';
import { countries } from '~/components/fields/__fixtures__/options';

const meta = {
	title: 'UI Forms/Form/End to end',
	component: Form,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Form>>>;

interface IAccount {
	email: string;
	country: string;
	terms: boolean;
}

/**
 * Stands in for a real API. Drives all four outcomes off the submitted email so the whole sequence
 * can be walked in one story:
 *
 * - `taken@example.com` → an error belonging to the **email field**
 * - `boom@example.com`  → a failure belonging to **no field**
 * - anything else       → success
 */
const save = async (value: IAccount) => {
	if (value.email === 'taken@example.com') {
		return { ok: false as const, fieldErrors: { email: 'That address is already registered.' } };
	}

	if (value.email === 'boom@example.com') {
		return { ok: false as const, formError: 'Our server is having a moment. Try again shortly.' };
	}

	return { ok: true as const };
};

const AccountForm = () => {
	const [saved, setSaved] = React.useState<IAccount | undefined>(undefined);

	const form = useForm({
		defaultValues: { email: '', country: '', terms: false } as IAccount,
		onSubmit: async ({ value, formApi }) => {
			const response = await save(value);

			if (response.ok) {
				setSaved(value);
				return;
			}

			// Belongs to a field -> bind it to the field. The common case, and the one a caller should
			// reach for first.
			if (response.fieldErrors) {
				formApi.setErrorMap({ onSubmit: { fields: response.fieldErrors } });
			}

			// Belongs to nobody -> throw, and <FormError /> renders it.
			if (response.formError) {
				throw new Error(response.formError);
			}
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-5'>
			<TextField
				name='email'
				label='Email address'
				type='email'
				required
				validators={{
					onSubmit: ({ value }: { value: string }) =>
						value.includes('@') ? undefined : 'Enter a valid email address.'
				}}
			/>

			<SelectField
				name='country'
				label='Country'
				options={countries}
				placeholder='Choose a country…'
			/>

			<CheckboxField
				name='terms'
				label='Accept the terms'
				required
				validators={{
					onSubmit: ({ value }: { value: boolean }) =>
						value ? undefined : 'You must accept the terms.'
				}}
			/>

			<FormError />

			<SubmitButton>Create account</SubmitButton>

			{saved !== undefined && <p data-testid='saved'>Created {saved.email}.</p>}
		</Form>
	);
};

/**
 * The whole flow, end to end, in one sequence — because these four outcomes only interact when they
 * are exercised together, and the class of bug that produces is the one this deliverable found by
 * accident the first time round.
 *
 * 1. **Client validation fails.** Errors appear, focus moves to the first invalid control, the
 *    submit button becomes unavailable.
 * 2. **A server error bound to a field.** It renders under that field, and clears when the field is
 *    edited — which is what lets the submit button recover.
 * 3. **A server failure belonging to no field.** It renders once at form level, assertively.
 * 4. **Success.** The form-level message is gone and the values arrived.
 */
export const FullFlow: Story = {
	render: () => <AccountForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const email = canvas.getByRole('textbox', { name: /Email address/ });
		const terms = canvas.getByRole('checkbox', { name: /Accept the terms/ });
		const submit = canvas.getByRole('button', { name: 'Create account' });
		const formErrorRegion = canvasElement.querySelector('[data-slot="form-error"]');

		await step('1. Validation fails, focus moves, the button becomes unavailable', async () => {
			await expect(submit).toBeEnabled();
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
					'Enter a valid email address.'
				);
			});

			await expect(canvasElement.querySelector('[id="terms-message"]')).toHaveTextContent(
				'You must accept the terms.'
			);
			await expect(email).toHaveFocus();
			await expect(submit).toBeDisabled();
		});

		await step('The form becomes submittable again as the fields are fixed', async () => {
			await userEvent.type(email, 'taken@example.com');
			await userEvent.click(terms);

			await waitFor(async () => {
				await expect(submit).toBeEnabled();
			});
		});

		await step('2. A server error binds to the field it belongs to', async () => {
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
					'That address is already registered.'
				);
			});

			// It belonged to a field, so nothing appears at form level.
			await expect(formErrorRegion).toBeEmptyDOMElement();
		});

		await step('3. A failure belonging to no field renders once, at form level', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'boom@example.com');
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(formErrorRegion).toHaveTextContent(
					'Our server is having a moment. Try again shortly.'
				);
			});

			// Assertive, and not doubled by a nested role='alert'.
			await expect(formErrorRegion).toHaveAttribute('aria-live', 'assertive');
			await expect(formErrorRegion?.querySelector('[data-slot="alert"]')).not.toHaveAttribute(
				'role'
			);
		});

		await step('4. Success clears the form-level message and the values arrive', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'new@example.com');
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(canvas.getByTestId('saved')).toHaveTextContent('Created new@example.com.');
			});

			await expect(formErrorRegion).toBeEmptyDOMElement();
		});
	}
};
