import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Input } from '@repo/ui-core';
import { Form, useForm } from '~/components/Form';
import { FormError } from '~/components/FormError/FormError';
import { FormField } from '~/components/FormField/FormField';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';

const meta = {
	title: 'UI Forms/Form error',
	component: FormError,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof FormError>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Fails on the first submission with a message of its own, then succeeds — the two things that have
 * to be shown together, since a form-level failure must not leave the form stuck.
 */
const FlakyForm = ({ message }: { message?: string }) => {
	const attempts = React.useRef(0);
	const [saved, setSaved] = React.useState(false);

	const form = useForm({
		defaultValues: { email: 'a@b.com' },
		onSubmit: async () => {
			attempts.current += 1;

			if (attempts.current === 1) {
				// A failure belonging to no field. Bound field errors go through
				// `formApi.setErrorMap({ onSubmit: { fields } })` instead and render under the control.
				if (message === undefined) throw new Error();
				throw new Error(message);
			}

			setSaved(true);
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<FormField<string> name='email' label='Email address'>
				{(control) => <Input {...control} type='email' />}
			</FormField>

			<FormError />

			<SubmitButton>Save</SubmitButton>

			{saved && <p data-testid='saved'>Saved.</p>}
		</Form>
	);
};

/**
 * The message the server actually sent, rendered once at form level, announced without the user
 * having to go looking for it — and gone on the next submission.
 */
export const Default: Story = {
	render: () => <FlakyForm message='We could not reach the server.' />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Form, FormError, SubmitButton, TextField, useForm } from '@repo/ui-forms';

const form = useForm({
  defaultValues: { email: '' },
  onSubmit: async ({ value, formApi }) => {
    const response = await save(value);
    if (response.ok) return;

    // Belongs to a field -> bind it to the field. This is the common case.
    if (response.fieldErrors) {
      formApi.setErrorMap({ onSubmit: { fields: response.fieldErrors } });
    }

    // Belongs to nobody -> throw. <FormError /> renders it.
    if (response.formError) throw new Error(response.formError);
  }
});

<Form form={form} className='grid gap-4'>
  <TextField name='email' label='Email address' required />
  {/* Always rendered, never conditionally — the live region must pre-exist its content. */}
  <FormError />
  <SubmitButton>Save</SubmitButton>
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const region = canvasElement.querySelector('[data-slot="form-error"]');

		await step('The live region exists before it has anything to say', async () => {
			await expect(region).toBeInTheDocument();
			await expect(region).toBeEmptyDOMElement();
			await expect(region).toHaveAttribute('aria-live', 'assertive');
		});

		await step("The server's own wording is shown, not a paraphrase", async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

			await waitFor(async () => {
				await expect(region).toHaveTextContent('We could not reach the server.');
			});
		});

		await step('The inner Alert carries no role of its own', async () => {
			// `Alert` hardcodes role='alert', itself an assertive live region. Left in place it would
			// nest inside the assertive region above and announce the message twice.
			await expect(region?.querySelector('[data-slot="alert"]')).not.toHaveAttribute('role');
		});

		await step('It is gone on the next submission, which runs normally', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

			await waitFor(async () => {
				await expect(canvas.getByTestId('saved')).toBeInTheDocument();
			});

			await expect(region).toBeEmptyDOMElement();
		});
	}
};

/**
 * A failure that produced no message at all — a thrown `Error` with nothing in it, a rejected fetch —
 * falls back to generic wording. That is the **only** case generic wording is used for: a message
 * the server did send is never paraphrased.
 */
export const FailureWithNoMessage: Story = {
	render: () => <FlakyForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Generic wording stands in, rather than an empty announcement', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[data-slot="form-error"]')).toHaveTextContent(
					'Something went wrong. Please try again.'
				);
			});
		});
	}
};
