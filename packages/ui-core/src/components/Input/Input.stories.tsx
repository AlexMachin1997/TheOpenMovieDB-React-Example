import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from '~/components/Input/Input';
import { Field } from '~/components/Field/Field';
import { Textarea } from '~/components/Textarea/Textarea';
import { Button } from '~/components/Button/Button';

const meta: Meta<typeof Input> = {
	title: 'UI Core/Input',
	component: Input,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file']
		},
		placeholder: {
			control: 'text'
		},
		disabled: {
			control: 'boolean'
		},
		required: {
			control: 'boolean'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Every story below composes `Field` rather than hand-assembling a <Label htmlFor> beside an
// <Input id> inside a wrapper div. That hand-assembly is what this deliverable exists to remove:
// this file alone carried 13 copies of it, and the copies had already drifted — `WithError` showed
// an error with no `aria-describedby`, and `Required` faked the indicator with a literal asterisk in
// the label text. See docs/05-ui-forms-field-pattern/plan.md.

export const Default: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Username' id='default-input'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'text',
		placeholder: 'Enter your username'
	},
	parameters: {
		docs: {
			source: {
				code: `import { Field, Input } from '@repo/ui-core';

<Field label='Username' id='default-input'>
  {(control) => <Input {...control} placeholder='Enter your username' />}
</Field>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox', { name: 'Username' });

		await step('The label names the input via a native association', async () => {
			await expect(input).toHaveAttribute('id', 'default-input');
			await userEvent.click(canvas.getByText('Username'));
			await expect(input).toHaveFocus();
		});

		await step('Typing works', async () => {
			await userEvent.type(input, 'ada');
			await expect(input).toHaveValue('ada');
		});
	}
};

export const Email: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Email address' id='email-input'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'email',
		placeholder: 'Enter your email'
	},
	parameters: {
		docs: {
			source: {
				code: `import { Field, Input } from '@repo/ui-core';

<Field label='Email address' id='email-input'>
  {(control) => <Input {...control} type='email' />}
</Field>`
			}
		}
	}
};

export const Password: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Password' id='password-input' description='At least twelve characters.'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'password',
		placeholder: 'Enter your password'
	}
};

export const Number: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Age' id='number-input'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'number',
		placeholder: 'Enter your age',
		min: 0,
		max: 120
	}
};

export const Telephone: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Phone number' id='tel-input'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'tel',
		placeholder: 'Enter your phone number'
	}
};

export const URL: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Website' id='url-input'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'url',
		placeholder: 'Enter your website URL'
	}
};

export const Search: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Search' id='search-input'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'search',
		placeholder: 'Search for something...'
	}
};

export const File: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Profile picture' id='file-input' description='PNG or JPG, up to 2MB.'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'file',
		accept: 'image/*'
	}
};

export const Disabled: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Username' id='disabled-input' description='Sign in to change this.'>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		disabled: true,
		placeholder: 'Cannot enter text'
	}
};

export const Required: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			{/* The indicator comes from `Field`/`Label` now. It used to be a literal `*` typed into
			the label text, which no assistive technology could distinguish from a name. */}
			<Field label='Full name' id='required-input' required>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		placeholder: 'This field is required'
	}
};

export const WithError: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			{/* This story previously rendered its own <p className='text-sm text-red-500'> next to an
			`aria-invalid` input, with nothing connecting the two — visible, and invisible to a screen
			reader. `Field` owns both halves. */}
			<Field
				label='Email address'
				id='error-input'
				error='Please enter a valid email address.'
			>
				{(control) => <Input {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		type: 'email',
		placeholder: 'Enter your email'
	},
	parameters: {
		docs: {
			source: {
				code: `import { Field, Input } from '@repo/ui-core';

<Field label='Email address' id='error-input' error='Please enter a valid email address.'>
  {(control) => <Input {...control} type='email' />}
</Field>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox', { name: 'Email address' });

		await step('The control reports itself invalid', async () => {
			await expect(input).toHaveAttribute('aria-invalid', 'true');
		});

		await step('And the error is actually reachable from it', async () => {
			await expect(input).toHaveAttribute('aria-describedby', 'error-input-message');
			await expect(canvasElement.querySelector('[id="error-input-message"]')).toHaveTextContent(
				'Please enter a valid email address.'
			);
		});
	}
};

const ControlledComponent = (args: React.ComponentProps<typeof Input>) => {
	const [value, setValue] = useState('');

	return (
		<div className='w-full max-w-sm'>
			<Field
				label='Controlled input'
				id='controlled-input'
				description={value === '' ? 'Type something to see it here.' : `Current value: ${value}`}
			>
				{(control) => (
					<Input
						{...control}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						{...args}
					/>
				)}
			</Field>
		</div>
	);
};

export const Controlled: Story = {
	render: (args) => <ControlledComponent {...args} />,
	args: {
		placeholder: 'Type something...'
	},
	parameters: {
		docs: {
			source: {
				code: `import { useState } from 'react';
import { Field, Input } from '@repo/ui-core';

const [value, setValue] = useState('');

<Field label='Controlled input' id='controlled-input'>
  {(control) => (
    <Input {...control} value={value} onChange={(event) => setValue(event.target.value)} />
  )}
</Field>`
			}
		}
	}
};

const SignUpFormComponent = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((previous) => ({ ...previous, [field]: event.target.value }));
	};

	const passwordsMatch =
		formData.confirmPassword === '' || formData.confirmPassword === formData.password;

	return (
		<div className='w-full max-w-md space-y-6'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>Create account</h2>
				<p className='text-muted-foreground'>Join us today.</p>
			</div>

			{/* `noValidate`: `required` renders a native attribute, and the browser's own constraint
			validation would otherwise block submission before any of this runs. */}
			<form noValidate className='space-y-4' onSubmit={(event) => event.preventDefault()}>
				<Field label='Username' id='signup-username' required>
					{(control) => (
						<Input
							{...control}
							type='text'
							placeholder='Enter your username'
							value={formData.username}
							onChange={handleChange('username')}
						/>
					)}
				</Field>

				<Field label='Email address' id='signup-email' required>
					{(control) => (
						<Input
							{...control}
							type='email'
							placeholder='Enter your email'
							value={formData.email}
							onChange={handleChange('email')}
						/>
					)}
				</Field>

				<Field
					label='Password'
					id='signup-password'
					description='At least twelve characters.'
					required
				>
					{(control) => (
						<Input
							{...control}
							type='password'
							placeholder='Enter your password'
							value={formData.password}
							onChange={handleChange('password')}
						/>
					)}
				</Field>

				<Field
					label='Confirm password'
					id='signup-confirm'
					required
					error={passwordsMatch ? undefined : 'Passwords do not match.'}
				>
					{(control) => (
						<Input
							{...control}
							type='password'
							placeholder='Confirm your password'
							value={formData.confirmPassword}
							onChange={handleChange('confirmPassword')}
						/>
					)}
				</Field>

				{/* Was a raw <button> with a hand-copied bg-primary class string. */}
				<Button type='submit' className='w-full'>
					Sign up
				</Button>
			</form>
		</div>
	);
};

export const SignUpForm: Story = {
	render: () => <SignUpFormComponent />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('An error appears and associates itself as the user types', async () => {
			await userEvent.type(canvas.getByLabelText(/^Password/), 'correct-horse-battery');
			await userEvent.type(canvas.getByLabelText(/Confirm password/), 'nope');

			const confirm = canvas.getByLabelText(/Confirm password/);
			await expect(confirm).toHaveAttribute('aria-invalid', 'true');
			await expect(confirm).toHaveAttribute('aria-describedby', 'signup-confirm-message');
		});

		await step('And clears once the two match', async () => {
			await userEvent.clear(canvas.getByLabelText(/Confirm password/));
			await userEvent.type(canvas.getByLabelText(/Confirm password/), 'correct-horse-battery');
			await expect(canvas.getByLabelText(/Confirm password/)).not.toHaveAttribute('aria-invalid');
		});
	}
};

const ContactFormComponent = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: ''
	});

	const handleChange =
		(field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((previous) => ({ ...previous, [field]: event.target.value }));
		};

	return (
		<div className='w-full max-w-lg space-y-6'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>Contact us</h2>
				<p className='text-muted-foreground'>We&apos;d love to hear from you.</p>
			</div>

			<form noValidate className='space-y-4' onSubmit={(event) => event.preventDefault()}>
				<div className='grid grid-cols-2 gap-4'>
					<Field label='Full name' id='contact-name' required>
						{(control) => (
							<Input
								{...control}
								type='text'
								placeholder='John Doe'
								value={formData.name}
								onChange={handleChange('name')}
							/>
						)}
					</Field>

					<Field label='Phone number' id='contact-phone'>
						{(control) => (
							<Input
								{...control}
								type='tel'
								placeholder='+1 (555) 123-4567'
								value={formData.phone}
								onChange={handleChange('phone')}
							/>
						)}
					</Field>
				</div>

				<Field label='Email address' id='contact-email' required>
					{(control) => (
						<Input
							{...control}
							type='email'
							placeholder='john@example.com'
							value={formData.email}
							onChange={handleChange('email')}
						/>
					)}
				</Field>

				<Field label='Subject' id='contact-subject' required>
					{(control) => (
						<Input
							{...control}
							type='text'
							placeholder='How can we help you?'
							value={formData.subject}
							onChange={handleChange('subject')}
						/>
					)}
				</Field>

				{/*
				 * THE story this deliverable exists for. This field used to hand-write a raw
				 * <textarea> with its own copy of the border/ring/disabled classes — inside the very
				 * package that exports `Textarea`. See docs/05-ui-forms-field-pattern/spec.md,
				 * Design References.
				 */}
				<Field label='Message' id='contact-message' required>
					{(control) => (
						<Textarea
							{...control}
							placeholder='Tell us more about your inquiry...'
							value={formData.message}
							onChange={handleChange('message')}
						/>
					)}
				</Field>

				<Button type='submit' className='w-full'>
					Send message
				</Button>
			</form>
		</div>
	);
};

export const ContactForm: Story = {
	render: () => <ContactFormComponent />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The message field is a real Textarea, not a hand-rolled element', async () => {
			const message = canvas.getByRole('textbox', { name: /Message/ });
			await expect(message.tagName).toBe('TEXTAREA');
			await expect(message).toHaveAttribute('data-slot', 'textarea');
			await expect(message).toHaveAttribute('id', 'contact-message');
		});

		await step('And it is wired up like every other field', async () => {
			await userEvent.type(canvas.getByRole('textbox', { name: /Message/ }), 'Hello');
			await expect(canvas.getByRole('textbox', { name: /Message/ })).toHaveValue('Hello');
		});
	}
};
