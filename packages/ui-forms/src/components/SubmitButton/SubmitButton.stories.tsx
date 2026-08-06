import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Input } from '@repo/ui-core';
import { Form, useForm } from '~/components/Form';
import { FormField } from '~/components/FormField/FormField';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';

const meta = {
	title: 'UI Forms/Submit button',
	component: SubmitButton,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const emailRequired = {
	onSubmit: ({ value }: { value: string }) =>
		value.includes('@') ? undefined : 'Enter a valid email address.'
};

const SignUpForm = ({ onSave }: { onSave?: () => Promise<void> }) => {
	const [saved, setSaved] = React.useState(false);

	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async () => {
			await onSave?.();
			setSaved(true);
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<FormField form={form} name='email' label='Email address' required validators={emailRequired}>
				{(control) => <Input {...control} type='email' />}
			</FormField>

			<SubmitButton>Create account</SubmitButton>

			{saved && <p data-testid='saved'>Saved.</p>}
		</Form>
	);
};

/**
 * The caller writes `<SubmitButton>Create account</SubmitButton>` and nothing else — no `type`, no
 * `onClick`, no `handleSubmit`.
 *
 * `Button` defaults to `type='button'` deliberately, so the equivalent plain `Button` would render
 * correctly and do nothing at all. That silent failure is the reason this component exists.
 */
export const Default: Story = {
	render: () => <SignUpForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Form, SubmitButton, TextField, useForm } from '@repo/ui-forms';

const form = useForm({
  defaultValues: { email: '' },
  onSubmit: async ({ value }) => save(value)
});

<Form form={form} className='grid gap-4'>
  <TextField name='email' label='Email address' required />
  <SubmitButton>Create account</SubmitButton>
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const submit = canvas.getByRole('button', { name: 'Create account' });

		await step('It carries submit semantics without being told to', async () => {
			await expect(submit).toHaveAttribute('type', 'submit');
		});

		await step('Pressing it submits the form', async () => {
			await userEvent.type(canvas.getByRole('textbox', { name: /Email address/ }), 'a@b.com');
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(canvas.getByTestId('saved')).toBeInTheDocument();
			});
		});
	}
};

/**
 * The disable rule, both halves, in one sequence.
 *
 * It is **live before the first submission even when the form is invalid** — a button that dies on
 * the first bad keystroke gives no reason and leaves someone stuck. It becomes unavailable only once
 * the user has actually asked for a result and the answer was "not yet". And it **re-enables itself**
 * as the last outstanding field clears, which is the half that makes the whole rule safe: without it
 * a disabled button could never be pressed again, and nothing else would clear the state keeping it
 * disabled.
 */
export const UnavailableOnlyAfterAFailedSubmission: Story = {
	render: () => <SignUpForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const submit = canvas.getByRole('button', { name: 'Create account' });
		const email = canvas.getByRole('textbox', { name: /Email address/ });

		await step('Live before the first submission, even while invalid', async () => {
			await userEvent.type(email, 'nope');
			await expect(submit).toBeEnabled();
		});

		await step('Unavailable once a submission has failed', async () => {
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(submit).toBeDisabled();
			});
		});

		await step('Re-enables itself as the field is corrected', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'a@b.com');

			await waitFor(async () => {
				await expect(submit).toBeEnabled();
			});
		});

		await step('And then submits', async () => {
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(canvas.getByTestId('saved')).toBeInTheDocument();
			});
		});
	}
};

/**
 * Holds the request open until the story releases it, so the in-flight state can be inspected rather
 * than raced. The resolver lives in a ref because `render` runs again on every state change, and a
 * promise rebuilt each time would leave the release button holding a stale resolver.
 */
const HeldRequestForm = () => {
	const release = React.useRef<(() => void) | undefined>(undefined);
	const held = React.useRef<Promise<void> | undefined>(undefined);

	held.current ??= new Promise<void>((resolve) => {
		release.current = resolve;
	});

	return (
		<div className='grid gap-4'>
			<SignUpForm onSave={() => held.current ?? Promise.resolve()} />
			<button type='button' data-testid='release' onClick={() => release.current?.()}>
				Release the request
			</button>
		</div>
	);
};

/**
 * While a submission is in flight the button is genuinely disabled, reports `aria-busy`, and shows a
 * spinner — so a second press cannot start a second request.
 */
export const WhileSubmitting: Story = {
	render: () => <HeldRequestForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const submit = canvas.getByRole('button', { name: 'Create account' });

		await userEvent.type(canvas.getByRole('textbox', { name: /Email address/ }), 'a@b.com');
		await userEvent.click(submit);

		await step('It reports itself busy and unavailable', async () => {
			await waitFor(async () => {
				await expect(submit).toHaveAttribute('aria-busy', 'true');
			});

			await expect(submit).toBeDisabled();
		});

		await step('A second press starts nothing', async () => {
			await userEvent.click(submit, { pointerEventsCheck: 0 });
			await expect(canvas.queryByTestId('saved')).not.toBeInTheDocument();
		});

		await step('Releasing the request completes the submission', async () => {
			await userEvent.click(canvas.getByTestId('release'));

			await waitFor(async () => {
				await expect(canvas.getByTestId('saved')).toBeInTheDocument();
			});
		});
	}
};
