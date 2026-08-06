import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Form, useForm } from '~/components/Form';
import { SubmitButton } from '~/components/SubmitButton/SubmitButton';
import { TextField } from '~/components/fields/TextField';
import type { ITextField } from '~/components/fields/fields.types';

const meta = {
	title: 'UI Forms/Fields/Text field',
	component: TextField,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof TextField>;

export default meta;
/**
 * `StoryObj<Partial<ITextField>>` rather than `StoryObj<typeof meta>`: `name` and `label` are required, so
 * `typeof meta` makes `args` mandatory on every story, and each story here renders a component that
 * builds its own form. `component:` stays on the meta so `<Controls />` resolves.
 */
type Story = StoryObj<Partial<ITextField>>;

const SignUpForm = () => {
	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: () => undefined
	});

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField
				name='email'
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

			<SubmitButton>Create account</SubmitButton>
		</Form>
	);
};

/**
 * A text `Input` bound to a form field by name.
 *
 * The label, the description, the error, the accessibility wiring and the value binding all come
 * from naming the field. There is no render prop, no `value`, no `onChange`, and no `form`.
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
  <TextField
    name='email'
    label='Email address'
    type='email'
    required
    description='We only use this to send you a receipt.'
    validators={{
      onChange: ({ value }) => (value.includes('@') ? undefined : 'Enter a valid email address.')
    }}
  />
  <SubmitButton>Create account</SubmitButton>
</Form>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const email = canvas.getByRole('textbox', { name: /Email address/ });

		await step('The id defaults to the name, and the wiring follows from it', async () => {
			await expect(email).toHaveAttribute('id', 'email');
			await expect(email).toHaveAttribute('aria-describedby', 'email-message');
			await expect(email).toBeRequired();
		});

		await step('Typing an invalid value surfaces the message', async () => {
			await userEvent.type(email, 'nope');

			await waitFor(async () => {
				await expect(email).toHaveAttribute('aria-invalid', 'true');
			});

			await expect(canvasElement.querySelector('[id="email-message"]')).toHaveTextContent(
				'Enter a valid email address.'
			);
		});

		await step('Correcting it clears the message', async () => {
			await userEvent.clear(email);
			await userEvent.type(email, 'john@example.com');

			await waitFor(async () => {
				await expect(email).not.toHaveAttribute('aria-invalid');
			});
		});
	}
};

const PasswordForm = () => {
	const form = useForm({ defaultValues: { password: '' }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField name='password' label='Password' type='password' required />
		</Form>
	);
};

/**
 * `type` is forwarded to the underlying `Input`, so a password, a telephone number or a URL are all
 * the same component.
 */
export const Password: Story = {
	render: () => <PasswordForm />,
	play: async ({ canvasElement }) => {
		// A password input exposes no `textbox` role, so it is queried by id — which is the field's
		// name, and one of the reasons that default exists.
		const password = canvasElement.querySelector('#password');
		await expect(password).toHaveAttribute('type', 'password');
		await expect(password).toBeRequired();
	}
};

const DisabledForm = () => {
	const form = useForm({ defaultValues: { email: 'set@example.com' }, onSubmit: () => undefined });

	return (
		<Form form={form} className='grid w-96 gap-4'>
			<TextField
				name='email'
				label='Email address'
				description='Contact support to change this.'
				disabled
			/>
		</Form>
	);
};

/**
 * `disabled` reaches the control, and the field keeps its label and description.
 */
export const Disabled: Story = {
	render: () => <DisabledForm />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole('textbox', { name: /Email address/ })).toBeDisabled();
	}
};
