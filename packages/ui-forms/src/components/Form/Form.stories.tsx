import * as React from 'react';
import { createPortal } from 'react-dom';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { z } from 'zod';
import { Form, useForm } from '~/components/Form';
import { FormError } from '~/components/FormError/FormError';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';
import { CheckboxField } from '~/components/fields/CheckboxField';
import { RadioGroupField } from '~/components/fields/RadioGroupField';
import { SelectField } from '~/components/fields/SelectField';
import { SwitchField } from '~/components/fields/SwitchField';
import { TextField } from '~/components/fields/TextField';
import { TextareaField } from '~/components/fields/TextareaField';
import { countries, plans } from '~/components/fields/__fixtures__/options';
import { getOption, openSelect } from '~/components/Selects/__fixtures__/interactions';
import type { IForm } from '~/components/Form/Form.types';

const meta: Meta<typeof Form> = {
	title: 'UI Forms/Form',
	component: Form,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		form: { control: false, description: 'The form instance, from `useForm`.' },
		className: {
			control: 'text',
			description: '`Form` ships no layout of its own — this is where it comes from.'
		},
		children: { control: false, description: 'Fields, a `FormError` and a `SubmitButton`.' }
	}
};

export default meta;

/**
 * `form` is required, so `StoryObj<typeof meta>` would make `args` mandatory on every story — and
 * each story here renders a component that builds its own form with `useForm`.
 */
type Story = StoryObj<Partial<IForm>>;

/* -------------------------------------------------------------------------------------------------
 * 1. Simple
 * ---------------------------------------------------------------------------------------------- */

const signInSchema = z.object({
	email: z.string().min(1, 'Email address is required.').email('Enter a valid email address.'),
	password: z.string().min(8, 'Use at least 8 characters.')
});

const SignInForm = () => {
	const [signedIn, setSignedIn] = React.useState(false);

	const form = useForm({
		defaultValues: { email: '', password: '' },
		// One schema, checked on every change and again on submit. Checking it on change is what
		// keeps each message accurate while the user is still typing.
		validators: { onChange: signInSchema, onSubmit: signInSchema },
		onSubmit: () => setSignedIn(true)
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField name='email' label='Email address' type='email' required />
			<TextField name='password' label='Password' type='password' required />

			<SubmitButton>Sign in</SubmitButton>

			{signedIn && <p data-testid='signed-in'>Signed in.</p>}
		</Form>
	);
};

/**
 * The smallest useful form: a schema, two fields, a submit button.
 *
 * Each field is bound by name — no `value`, no `onChange`, no `form`. The schema supplies every
 * message, so no validation logic is written at the call site.
 */
export const Simple: Story = {
	render: () => <SignInForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { z } from 'zod';
import { Form, SubmitButton, TextField, useForm } from '@repo/ui-forms';

const signInSchema = z.object({
  email: z.string().min(1, 'Email address is required.').email('Enter a valid email address.'),
  password: z.string().min(8, 'Use at least 8 characters.')
});

const form = useForm({
  defaultValues: { email: '', password: '' },
  validators: { onChange: signInSchema, onSubmit: signInSchema },
  onSubmit: async ({ value }) => signIn(value)
});

<Form form={form} className='grid gap-4'>
  <TextField name='email' label='Email address' type='email' required />
  <TextField name='password' label='Password' type='password' required />
  <SubmitButton>Sign in</SubmitButton>
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const email = canvas.getByRole('textbox', { name: /Email address/ });
		const submit = canvas.getByRole('button', { name: 'Sign in' });

		await step('The submit button is sized to its label, not to the form', async () => {
			const formElement = canvasElement.querySelector('form');
			await expect(submit.getBoundingClientRect().width).toBeLessThan(
				(formElement?.getBoundingClientRect().width ?? 0) / 2
			);
		});

		await step('A schema message appears as soon as the value is wrong', async () => {
			await userEvent.type(email, 'nope');

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
					'Enter a valid email address.'
				);
			});
		});

		await step('and stays while the value is still wrong', async () => {
			// The regression this guards: with a submit-only validator, the message vanished on the
			// next keystroke whether or not the value had become valid — the field re-validated
			// against nothing and cleared its own submit-cause error.
			await userEvent.type(email, '-still-wrong');

			await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
				'Enter a valid email address.'
			);
		});

		await step('and clears only once it is actually valid', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'ada@example.com');

			await waitFor(async () => {
				await expect(email).not.toHaveAttribute('aria-invalid');
			});
		});

		await step('Submitting works once the whole schema passes', async () => {
			await userEvent.type(
				canvasElement.querySelector('#password') as HTMLElement,
				'correct-horse'
			);
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(canvas.getByTestId('signed-in')).toBeInTheDocument();
			});
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * 2. Intermediate
 * ---------------------------------------------------------------------------------------------- */

const contactSchema = z.object({
	name: z.string().min(1, 'Tell us your name.'),
	country: z.string().min(1, 'Choose a country.'),
	message: z.string().min(20, 'A little more detail, please — at least 20 characters.')
});

const ContactForm = () => {
	const [sent, setSent] = React.useState(false);

	const form = useForm({
		defaultValues: { name: '', country: '', message: '' },
		validators: { onChange: contactSchema, onSubmit: contactSchema },
		onSubmit: async ({ value }) => {
			// A failure belonging to no field: throw, and <FormError /> renders it.
			if (value.country === 'fr') {
				throw new Error('We are not accepting enquiries from that region yet.');
			}

			setSent(true);
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField name='name' label='Your name' required />

			<SelectField
				name='country'
				label='Country'
				options={countries}
				placeholder='Choose a country…'
				required
				description='So we can route your enquiry.'
			/>

			<TextareaField
				name='message'
				label='Message'
				rows={4}
				required
				description='What can we help with?'
			/>

			<FormError />

			<SubmitButton>Send enquiry</SubmitButton>

			{sent && <p data-testid='sent'>Thanks — we will be in touch.</p>}
		</Form>
	);
};

/**
 * Adds the two things most real forms need next: descriptions under the fields, and somewhere for a
 * failure that belongs to no field to go.
 *
 * Choose France to see the form-level failure.
 */
export const Intermediate: Story = {
	render: () => <ContactForm />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `const contactSchema = z.object({
  name: z.string().min(1, 'Tell us your name.'),
  country: z.string().min(1, 'Choose a country.'),
  message: z.string().min(20, 'A little more detail, please — at least 20 characters.')
});

const form = useForm({
  defaultValues: { name: '', country: '', message: '' },
  validators: { onChange: contactSchema, onSubmit: contactSchema },
  onSubmit: async ({ value }) => {
    const response = await send(value);
    // Belongs to nobody -> throw, and <FormError /> renders it.
    if (!response.ok) throw new Error(response.message);
  }
});

<Form form={form} className='grid gap-4'>
  <TextField name='name' label='Your name' required />
  <SelectField name='country' label='Country' options={countries} required
    description='So we can route your enquiry.' />
  <TextareaField name='message' label='Message' rows={4} required
    description='What can we help with?' />
  {/* Always rendered, never conditionally. */}
  <FormError />
  <SubmitButton>Send enquiry</SubmitButton>
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const region = canvasElement.querySelector('[data-slot="form-error"]');

		await step('Descriptions are wired to their controls', async () => {
			await expect(canvas.getByRole('textbox', { name: /Message/ })).toHaveAttribute(
				'aria-describedby',
				'message-message'
			);
			await expect(region).toBeEmptyDOMElement();
		});

		await step('Validation messages come from the schema', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Send enquiry' }));

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="name-message"]')).toHaveTextContent(
					'Tell us your name.'
				);
			});
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * 3. Advanced
 * ---------------------------------------------------------------------------------------------- */

const accountSchema = z.object({
	email: z.string().min(1, 'Email address is required.').email('Enter a valid email address.'),
	bio: z.string().max(140, 'Keep it under 140 characters.'),
	country: z.string().min(1, 'Choose a country.'),
	plan: z.string().min(1, 'Choose a plan.'),
	marketing: z.boolean(),
	terms: z.boolean().refine((accepted) => accepted, 'You must accept the terms.')
});

type IAccount = z.infer<typeof accountSchema>;

/** Stands in for an API, driving each failure shape off the submitted email. */
const createAccount = async (value: IAccount) => {
	if (value.email === 'taken@example.com') {
		return { ok: false as const, fieldErrors: { email: 'That address is already registered.' } };
	}

	if (value.email === 'boom@example.com') {
		return { ok: false as const, formError: 'Our server is having a moment. Try again shortly.' };
	}

	return { ok: true as const };
};

const AccountForm = () => {
	const [created, setCreated] = React.useState<IAccount | undefined>(undefined);

	const form = useForm({
		defaultValues: {
			email: '',
			bio: '',
			country: '',
			plan: 'monthly',
			marketing: false,
			terms: false
		} as IAccount,
		validators: { onChange: accountSchema, onSubmit: accountSchema },
		onSubmit: async ({ value, formApi }) => {
			const response = await createAccount(value);

			if (response.ok) {
				setCreated(value);
				return;
			}

			// Belongs to a field -> bind it to the field. Prefer this: the message lands next to the
			// thing the user has to change.
			if (response.fieldErrors) {
				formApi.setErrorMap({ onSubmit: { fields: response.fieldErrors } });
			}

			// Belongs to nobody -> throw.
			if (response.formError) throw new Error(response.formError);
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-5'>
			<TextField
				name='email'
				label='Email address'
				type='email'
				required
				description='Try taken@example.com or boom@example.com.'
			/>

			<TextareaField name='bio' label='Short bio' rows={3} description='Optional.' />

			<SelectField
				name='country'
				label='Country'
				options={countries}
				placeholder='Choose a country…'
				required
			/>

			<RadioGroupField name='plan' label='Billing plan' options={plans} />

			<SwitchField name='marketing' label='Email me offers' />

			<CheckboxField name='terms' label='Accept the terms' required />

			<FormError />

			<SubmitButton>Create account</SubmitButton>

			{created !== undefined && <p data-testid='created'>Created {created.email}.</p>}
		</Form>
	);
};

/**
 * All six field components in one form, and every outcome a submission can have.
 *
 * The `play()` walks the whole sequence — validation failure, a server error bound to a field, a
 * form-level failure, then success — because those four only interact when exercised together.
 */
export const Advanced: Story = {
	render: () => <AccountForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const email = canvas.getByRole('textbox', { name: /Email address/ });
		const terms = canvas.getByRole('checkbox', { name: /Accept the terms/ });
		const submit = canvas.getByRole('button', { name: 'Create account' });
		const region = canvasElement.querySelector('[data-slot="form-error"]');

		await step('Every field type renders and is labelled', async () => {
			await expect(email).toBeInTheDocument();
			await expect(canvas.getByRole('textbox', { name: /Short bio/ })).toBeInTheDocument();
			await expect(canvas.getByRole('combobox', { name: /Country/ })).toBeInTheDocument();
			await expect(canvas.getByRole('radiogroup', { name: /Billing plan/ })).toBeInTheDocument();
			await expect(canvas.getByRole('switch', { name: /Email me offers/ })).toBeInTheDocument();
			await expect(terms).toBeInTheDocument();
		});

		await step('1. Validation fails, focus moves, the button goes unavailable', async () => {
			await expect(submit).toBeEnabled();
			await userEvent.click(submit);

			// Every outstanding error, not just the first — three fields are invalid here, and a
			// user who only sees one of them fixes it and gets refused again.
			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
					'Email address is required.'
				);
			});

			await expect(canvasElement.querySelector('[id="country-message"]')).toHaveTextContent(
				'Choose a country.'
			);
			await expect(canvasElement.querySelector('[id="terms-message"]')).toHaveTextContent(
				'You must accept the terms.'
			);

			await expect(email).toHaveFocus();
			await expect(submit).toBeDisabled();
		});

		await step('Fixing every field makes it submittable again', async () => {
			await userEvent.type(email, 'taken@example.com');

			// The select's popover renders in a portal on document.body, so it is out of reach of a
			// canvas-scoped query — these helpers already handle that.
			await openSelect(canvasElement);
			await userEvent.click(await getOption('United Kingdom'));

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

			await expect(region).toBeEmptyDOMElement();
		});

		await step('3. A failure belonging to no field renders once, at form level', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'boom@example.com');
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(region).toHaveTextContent('Our server is having a moment.');
			});
		});

		await step('4. Success clears it and the values arrive', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'ada@example.com');
			await userEvent.click(submit);

			await waitFor(async () => {
				await expect(canvas.getByTestId('created')).toHaveTextContent('Created ada@example.com.');
			});

			await expect(region).toBeEmptyDOMElement();
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Behaviour guards — one rule each
 * ---------------------------------------------------------------------------------------------- */

/**
 * `noValidate` is set by `Form` and cannot be removed. Without it, an empty `required` field makes
 * the browser block the submit event outright — the handler never runs and no message appears.
 */
export const AlwaysSetsNoValidate: Story = {
	render: () => <SignInForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The element carries noValidate', async () => {
			await expect(canvasElement.querySelector('form')).toHaveAttribute('novalidate');
		});

		await step('so an empty required form validates rather than being blocked', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
					'Email address is required.'
				);
			});
		});
	}
};

/** Email is already valid here, so the only invalid control is the second one. */
const PartlyValidForm = () => {
	const form = useForm({
		defaultValues: { email: 'ada@example.com', password: '' },
		validators: { onChange: signInSchema, onSubmit: signInSchema },
		onSubmit: () => undefined
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField name='email' label='Email address' type='email' required />
			<TextField name='password' label='Password' type='password' required />
			<SubmitButton>Sign in</SubmitButton>
		</Form>
	);
};

/**
 * A failed submission moves focus to the first **invalid** control in document order — restoring
 * what the browser's constraint validation did before `noValidate` removed it.
 *
 * Two stories in one, because "first" has to mean two things at once: first among the invalid ones,
 * and first in the order they appear on the page.
 */
export const FocusesFirstInvalidControl: Story = {
	render: () => <SignInForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('With both fields invalid, focus lands on the earlier one', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));

			await waitFor(async () => {
				await expect(canvas.getByRole('textbox', { name: /Email address/ })).toHaveFocus();
			});
		});

		await step(
			'and the button then guides the user rather than letting them retry blind',
			async () => {
				// Worth knowing: after a failed submission the button stays unavailable until every field
				// is valid, so there is no second failed submit to focus from. It re-enables on its own.
				await expect(canvas.getByRole('button', { name: 'Sign in' })).toBeDisabled();
			}
		);
	}
};

/** Skips the valid first field and focuses the invalid second one. */
export const FocusesPastValidFields: Story = {
	render: () => <PartlyValidForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Focus skips the valid email and lands on the empty password', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));

			await waitFor(async () => {
				await expect(canvasElement.querySelector('#password')).toHaveFocus();
			});

			await expect(canvas.getByRole('textbox', { name: /Email address/ })).not.toHaveFocus();
		});
	}
};

const ThrowingForm = () => {
	const [succeeded, setSucceeded] = React.useState(false);
	const attempts = React.useRef(0);

	const form = useForm({
		defaultValues: { email: 'ada@example.com' },
		onSubmit: async () => {
			attempts.current += 1;
			if (attempts.current === 1) throw new Error('We could not reach the server.');
			setSucceeded(true);
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField name='email' label='Email address' />
			<FormError />
			<SubmitButton>Save</SubmitButton>
			{succeeded && <p data-testid='succeeded'>Saved.</p>}
		</Form>
	);
};

/** A submit handler that throws does not leave the form stuck — the next submission runs normally. */
export const RecoversFromAThrownSubmission: Story = {
	render: () => <ThrowingForm />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The first submission fails and says so', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

			await waitFor(async () => {
				await expect(canvasElement.querySelector('[data-slot="form-error"]')).toHaveTextContent(
					'We could not reach the server.'
				);
			});
		});

		await step('The second one runs anyway', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

			await waitFor(async () => {
				await expect(canvas.getByTestId('succeeded')).toBeInTheDocument();
			});
		});
	}
};

const PortalledForms = () => {
	const [target, setTarget] = React.useState<HTMLElement | null>(null);
	const [outerRan, setOuterRan] = React.useState(false);
	const [innerRan, setInnerRan] = React.useState(false);

	const outer = useForm({ defaultValues: { note: '' }, onSubmit: () => setOuterRan(true) });
	const inner = useForm({ defaultValues: { note: '' }, onSubmit: () => setInnerRan(true) });

	return (
		<div className='grid w-96 gap-4'>
			<Form form={outer} className='grid gap-2 border p-4'>
				<p className='text-sm'>Outer form</p>
				<SubmitButton>Save outer</SubmitButton>

				{/*
				 * Authored inside the outer form, rendered somewhere else entirely — which is what a
				 * Dialog or Sheet does. React events propagate through the React tree, not the DOM
				 * tree, so without `stopPropagation` this would submit both.
				 */}
				{target !== null &&
					createPortal(
						<Form form={inner} className='grid gap-2 border p-4'>
							<p className='text-sm'>Inner form (portalled)</p>
							<SubmitButton>Save inner</SubmitButton>
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
 * A `Form` rendered through a portal — a `Dialog`, a `Sheet` — submits only itself, even when it was
 * authored inside another `Form`'s JSX.
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

const ServerErrorForm = () => {
	const form = useForm({
		defaultValues: { email: 'taken@example.com' },
		onSubmit: async ({ value, formApi }) => {
			if (value.email === 'taken@example.com') {
				formApi.setErrorMap({ onSubmit: { fields: { email: 'That address is already taken.' } } });
			}
		}
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField name='email' label='Email address' />
			<SubmitButton>Save</SubmitButton>
		</Form>
	);
};

/**
 * A server error bound to a field clears as soon as the user edits that field — including on a field
 * with no validators of its own, as this one has.
 *
 * That is what lets the submit button recover: the state keeping it unavailable clears itself.
 */
export const FieldBoundServerErrorClearsOnEdit: Story = {
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

		await step('Editing the field clears it, and the button recovers', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'fresh@example.com');
			await userEvent.tab();

			await waitFor(async () => {
				await expect(email).not.toHaveAttribute('aria-invalid');
			});

			await expect(canvas.getByRole('button', { name: 'Save' })).toBeEnabled();
		});
	}
};
