import * as React from 'react';
import { createPortal } from 'react-dom';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button, Input } from '@repo/ui-core';
import { Form } from '~/components/Form/Form';
import { useForm } from '~/components/Form';
import { FormField } from '~/components/FormField/FormField';
import type { IForm } from '~/components/Form/Form.types';

const meta: Meta<typeof Form> = {
	title: 'UI Forms/Form',
	component: Form,
	parameters: {
		layout: 'centered'
	}
};

export default meta;

/**
 * `StoryObj<Partial<IForm>>` rather than `StoryObj<typeof meta>`.
 *
 * `form` is a required prop, so `typeof meta` makes `args` mandatory on every story — and every
 * story here renders a component that builds its own form with `useForm`, which cannot be called at
 * module scope. `component: Form` stays on the meta so `<Controls />` still resolves.
 */
type Story = StoryObj<Partial<IForm>>;

interface IAccount {
	email: string;
	password: string;
}

const required = (label: string) => ({
	onSubmit: ({ value }: { value: string }) => (value === '' ? `${label} is required.` : undefined)
});

/**
 * The two fields still take `form` explicitly here. The prop is removed a phase later, once every
 * field reads the surrounding `Form` from context — passing it twice is harmless in the meantime.
 */
const AccountForm = () => {
	const form = useForm({
		defaultValues: { email: '', password: '' } as IAccount,
		onSubmit: () => undefined
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<FormField<string>
				name='email'
				label='Email address'
				required
				validators={required('Email address')}
			>
				{(control) => <Input {...control} type='email' />}
			</FormField>

			<FormField<string>
				name='password'
				label='Password'
				required
				validators={required('Password')}
			>
				{(control) => <Input {...control} type='password' />}
			</FormField>

			<Button type='submit'>Create account</Button>
		</Form>
	);
};

/**
 * `noValidate` is set by `Form` and cannot be removed — it is omitted from the props type entirely,
 * and applied after the props spread.
 *
 * Without it, a `required` field that is empty makes the browser block the `submit` event outright:
 * React's handler never runs, the form library never validates, and no message ever appears. This
 * story submits an empty required form and proves a message *does* appear.
 */
export const Default: Story = {
	render: () => <AccountForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Input } from '@repo/ui-core';
import { Form, SubmitButton, useForm } from '@repo/ui-forms';

const form = useForm({
  defaultValues: { email: '', password: '' },
  onSubmit: async ({ value }) => save(value)
});

<Form form={form} className='grid gap-4'>
  <TextField name='email' label='Email address' required />
  <TextField name='password' label='Password' type='password' required />
  <SubmitButton>Create account</SubmitButton>
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The element carries noValidate', async () => {
			const formElement = canvasElement.querySelector('form');
			await expect(formElement).toHaveAttribute('novalidate');
		});

		await step(
			'Submitting an empty required form validates rather than being blocked',
			async () => {
				await userEvent.click(canvas.getByRole('button', { name: 'Create account' }));

				await waitFor(async () => {
					await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
						'Email address is required.'
					);
				});
			}
		);

		await step('Ids default to field names, so the message region resolves', async () => {
			const email = canvas.getByRole('textbox', { name: /Email address/ });
			await expect(email).toHaveAttribute('id', 'email');
			await expect(email).toHaveAttribute('aria-describedby', 'email-message');
		});
	}
};

/**
 * A failed submission moves focus to the first invalid control **in document order** — restoring
 * what the browser's own constraint validation used to do, and what `noValidate` removed.
 *
 * Both fields here are invalid. Focus must land on the first, not on whichever the form library
 * happens to have registered first.
 */
export const FocusesFirstInvalidControl: Story = {
	render: () => <AccountForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Both fields are invalid, and focus lands on the first', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Create account' }));

			await waitFor(async () => {
				await expect(canvas.getByRole('textbox', { name: /Email address/ })).toHaveFocus();
			});
		});

		await step('Correcting the first moves focus to the next one down', async () => {
			await userEvent.type(canvas.getByRole('textbox', { name: /Email address/ }), 'a@b.com');
			await userEvent.click(canvas.getByRole('button', { name: 'Create account' }));

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="password"]')).toHaveFocus();
			});
		});
	}
};

const ThrowingForm = () => {
	const [succeeded, setSucceeded] = React.useState(false);
	const attempts = React.useRef(0);

	const form = useForm({
		defaultValues: { email: 'a@b.com', password: 'hunter2' } as IAccount,
		onSubmit: async () => {
			attempts.current += 1;

			// Fails once, then succeeds — which is what proves the failure did not leave the form
			// permanently unsubmittable.
			if (attempts.current === 1) {
				throw new Error('We could not reach the server.');
			}

			setSucceeded(true);
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<FormField<string> name='email' label='Email address'>
				{(control) => <Input {...control} type='email' />}
			</FormField>

			{succeeded && <p data-testid='succeeded'>Saved.</p>}

			<Button type='submit'>Save</Button>
		</Form>
	);
};

/**
 * A submit handler that throws does not leave the form stuck. `Form` catches it, and the next
 * submission runs normally.
 *
 * The message itself is rendered by `FormError`, which is a separate component — this story covers
 * only the recovery half.
 */
export const RecoversFromAThrownSubmission: Story = {
	render: () => <ThrowingForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The first submission throws', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
			await expect(canvas.queryByTestId('succeeded')).not.toBeInTheDocument();
		});

		await step('The second submission runs anyway', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

			await waitFor(async () => {
				await expect(canvas.getByTestId('succeeded')).toBeInTheDocument();
			});
		});
	}
};

const ServerErrorForm = () => {
	const form = useForm({
		defaultValues: { email: 'taken@example.com', password: 'hunter2' } as IAccount,
		onSubmit: async ({ value, formApi }) => {
			if (value.email === 'taken@example.com') {
				formApi.setErrorMap({ onSubmit: { fields: { email: 'That address is already taken.' } } });
			}
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<FormField<string> name='email' label='Email address'>
				{(control) => <Input {...control} type='email' />}
			</FormField>

			<Button type='submit'>Save</Button>
		</Form>
	);
};

/**
 * A server error bound to a field clears as soon as the user edits or leaves that field — including
 * on a field that declares **no validators of its own**, as this one does.
 *
 * That is not incidental. The form library resets the submit-cause error on any non-submit
 * validation pass, and blurring always triggers one. Without it, a field-bound server error would
 * survive every keystroke, `isFieldsValid` would never recover, and a submit button disabled on
 * validity could never re-enable — so this is the regression guard for that whole mechanism.
 */
export const FieldBoundServerErrorClearsOnBlur: Story = {
	render: () => <ServerErrorForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const email = canvas.getByRole('textbox', { name: /Email address/ });

		await step('The server error is bound to the field', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
					'That address is already taken.'
				);
			});
		});

		await step('Editing the field clears it, with no validators involved', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'fresh@example.com');
			await userEvent.tab();

			await waitFor(async () => {
				await expect(email).not.toHaveAttribute('aria-invalid');
			});
		});
	}
};

const PortalledForms = () => {
	const [target, setTarget] = React.useState<HTMLElement | null>(null);
	const [outerRan, setOuterRan] = React.useState(false);
	const [innerRan, setInnerRan] = React.useState(false);

	const outer = useForm({ defaultValues: {}, onSubmit: () => setOuterRan(true) });
	const inner = useForm({ defaultValues: {}, onSubmit: () => setInnerRan(true) });

	return (
		<div className='grid w-96 gap-4'>
			<Form form={outer} className='grid gap-2 border p-4'>
				<p className='text-sm'>Outer form</p>
				<Button type='submit'>Save outer</Button>

				{/*
				 * The inner form is authored inside the outer form's JSX but rendered into a DOM node
				 * that is nowhere near it — which is exactly what a Dialog or Sheet does. React events
				 * propagate through the React tree rather than the DOM tree, so without
				 * `stopPropagation` in Form's submit handler, submitting the inner form would submit
				 * the outer one too. Nothing about the DOM would show why.
				 */}
				{target !== null &&
					createPortal(
						<Form form={inner} className='grid gap-2 border p-4'>
							<p className='text-sm'>Inner form (portalled)</p>
							<Button type='submit'>Save inner</Button>
						</Form>,
						target
					)}
			</Form>

			<div ref={setTarget} />

			{outerRan && <p data-testid='outer-ran'>Outer submitted</p>}
			{innerRan && <p data-testid='inner-ran'>Inner submitted</p>}
		</div>
	);
};

/**
 * Submitting a `Form` that is rendered through a portal — a `Dialog`, a `Sheet` — does not also
 * submit the `Form` it was authored inside.
 *
 * HTML forbids nesting `<form>` elements, so this is not that case. It is the one where the two
 * elements are nowhere near each other in the DOM and the nesting exists only in the React tree,
 * which is where React's own event propagation happens.
 */
export const DoesNotSubmitAnOuterFormThroughAPortal: Story = {
	render: () => <PortalledForms />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Submitting the inner form leaves the outer one alone', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save inner' }));

			await waitFor(async () => {
				await expect(canvas.getByTestId('inner-ran')).toBeInTheDocument();
			});

			await expect(canvas.queryByTestId('outer-ran')).not.toBeInTheDocument();
		});

		await step('The outer form still submits on its own', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save outer' }));

			await waitFor(async () => {
				await expect(canvas.getByTestId('outer-ran')).toBeInTheDocument();
			});
		});
	}
};
