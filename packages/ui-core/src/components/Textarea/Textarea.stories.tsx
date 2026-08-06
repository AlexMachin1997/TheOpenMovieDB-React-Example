import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Textarea } from '~/components/Textarea/Textarea';
import { Field } from '~/components/Field/Field';
import { Input } from '~/components/Input/Input';
import { Button } from '~/components/Button/Button';

const meta: Meta<typeof Textarea> = {
	title: 'UI Core/Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		placeholder: {
			control: 'text'
		},
		disabled: {
			control: 'boolean'
		},
		required: {
			control: 'boolean'
		},
		rows: {
			control: 'number'
		},
		cols: {
			control: 'number'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Every story composes `Field`. This file carried 12 hand-rolled label/control wrappers, and — the
// mirror image of the drift recorded against `Input.stories.tsx` — its `ContactForm` hand-wrote raw
// `<input>` elements with copied border/ring classes, inside the package that exports `Input`.

export const Default: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Message' id='default-textarea'>
				{(control) => <Textarea {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		placeholder: 'Type your message here...'
	},
	parameters: {
		docs: {
			source: {
				code: `import { Field, Textarea } from '@repo/ui-core';

<Field label='Message' id='default-textarea'>
  {(control) => <Textarea {...control} placeholder='Type your message here...' />}
</Field>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole('textbox', { name: 'Message' });

		await step('The label names the textarea natively', async () => {
			await userEvent.click(canvas.getByText('Message'));
			await expect(textarea).toHaveFocus();
		});

		await step('Typing works', async () => {
			await userEvent.type(textarea, 'Hello there');
			await expect(textarea).toHaveValue('Hello there');
		});
	}
};

export const WithLabel: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Your message' id='labeled-textarea'>
				{(control) => <Textarea {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		placeholder: 'Type your message here...'
	}
};

export const WithHelperText: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			{/* The helper text used to be a loose <p> with nothing connecting it to the control.
			`Field`'s `description` puts it in the region the textarea's `aria-describedby` points at. */}
			<Field
				label='Your message'
				id='helper-textarea'
				description='Your message will be copied to the support team.'
			>
				{(control) => <Textarea {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		placeholder: 'Type your message here...'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole('textbox', { name: 'Your message' });

		await expect(textarea).toHaveAttribute('aria-describedby', 'helper-textarea-message');
		await expect(canvasElement.querySelector('[id="helper-textarea-message"]')).toHaveTextContent(
			'Your message will be copied to the support team.'
		);
	}
};

export const Disabled: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Message' id='disabled-textarea' description='Sign in to leave a message.'>
				{(control) => <Textarea {...control} {...args} />}
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
			{/* Was `<Label>Required Field *</Label>` — an asterisk typed into the name, which assistive
			technology reads as part of the label rather than as a requirement. */}
			<Field label='Message' id='required-textarea' required>
				{(control) => <Textarea {...control} {...args} />}
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
			<Field
				label='Message'
				id='error-textarea'
				error='Please enter a message of at least 10 characters.'
			>
				{(control) => <Textarea {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		placeholder: 'Type your message here...'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole('textbox', { name: 'Message' });

		await expect(textarea).toHaveAttribute('aria-invalid', 'true');
		await expect(textarea).toHaveAttribute('aria-describedby', 'error-textarea-message');
		await expect(canvasElement.querySelector('[id="error-textarea-message"]')).toHaveTextContent(
			'Please enter a message of at least 10 characters.'
		);
	}
};

export const CustomRows: Story = {
	render: (args) => (
		<div className='w-full max-w-sm'>
			<Field label='Large textarea' id='rows-textarea'>
				{(control) => <Textarea {...control} {...args} />}
			</Field>
		</div>
	),
	args: {
		placeholder: 'Type your message here...',
		rows: 20
	}
};

const ControlledComponent = (args: React.ComponentProps<typeof Textarea>) => {
	const [value, setValue] = useState('');

	return (
		<div className='w-full max-w-sm'>
			<Field
				label='Controlled textarea'
				id='controlled-textarea'
				description={`Character count: ${value.length}`}
			>
				{(control) => (
					<Textarea
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
	}
};

const ContactFormComponent = () => {
	const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

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

			{/* `noValidate`: `required` renders a native attribute, and the browser's own constraint
			validation would otherwise block submission before anything here runs. */}
			<form noValidate className='space-y-4' onSubmit={(event) => event.preventDefault()}>
				<div className='grid grid-cols-2 gap-4'>
					{/* These three were raw <input> elements carrying their own copy of Input's
					border/ring/disabled classes — the same drift this deliverable exists to remove,
					pointing the other way. */}
					<Field label='Full name' id='textarea-contact-name' required>
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

					<Field label='Email address' id='textarea-contact-email' required>
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
				</div>

				<Field label='Subject' id='textarea-contact-subject' required>
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

				<Field label='Message' id='textarea-contact-message' required>
					{(control) => (
						<Textarea
							{...control}
							placeholder='Tell us more about your inquiry...'
							value={formData.message}
							onChange={handleChange('message')}
							rows={6}
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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// The three name/email/subject fields are real `Input`s now, not hand-rolled elements.
		for (const name of [/Full name/, /Email address/, /Subject/]) {
			const control = canvas.getByRole('textbox', { name });
			await expect(control.tagName).toBe('INPUT');
			await expect(control).toHaveAttribute('data-slot', 'input');
		}

		const message = canvas.getByRole('textbox', { name: /Message/ });
		await expect(message.tagName).toBe('TEXTAREA');
	}
};

const FeedbackFormComponent = () => {
	const [formData, setFormData] = useState({
		rating: '',
		experience: '',
		suggestions: '',
		additionalComments: ''
	});

	const handleChange =
		(field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((previous) => ({ ...previous, [field]: event.target.value }));
		};

	return (
		<div className='w-full max-w-2xl space-y-6'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>Product feedback</h2>
				<p className='text-muted-foreground'>Help us improve our product.</p>
			</div>

			<form noValidate className='space-y-6' onSubmit={(event) => event.preventDefault()}>
				<Field label='Overall rating' id='feedback-rating' required>
					{(control) => (
						/*
						 * A native <select>, deliberately. The library's `Select` lives in
						 * `@repo/ui-forms`, which sits *above* `ui-core` in the dependency graph — so
						 * this package cannot reach it without inverting the arrow. `Field` wires it up
						 * regardless: a <select> is a labelable element like any other.
						 */
						<select
							{...control}
							value={formData.rating}
							onChange={(event) =>
								setFormData((previous) => ({ ...previous, rating: event.target.value }))
							}
							className='border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 aria-invalid:border-destructive flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'
						>
							<option value=''>Select a rating</option>
							<option value='5'>5 — Excellent</option>
							<option value='4'>4 — Very good</option>
							<option value='3'>3 — Good</option>
							<option value='2'>2 — Fair</option>
							<option value='1'>1 — Poor</option>
						</select>
					)}
				</Field>

				<Field label='Tell us about your experience' id='feedback-experience' required>
					{(control) => (
						<Textarea
							{...control}
							placeholder='What did you like or dislike about our product?'
							value={formData.experience}
							onChange={handleChange('experience')}
							rows={4}
						/>
					)}
				</Field>

				<Field label='Suggestions for improvement' id='feedback-suggestions'>
					{(control) => (
						<Textarea
							{...control}
							placeholder='What features would you like to see added or improved?'
							value={formData.suggestions}
							onChange={handleChange('suggestions')}
							rows={4}
						/>
					)}
				</Field>

				<Field
					label='Additional comments'
					id='feedback-additional'
					description='Optional: share any other thoughts or suggestions.'
				>
					{(control) => (
						<Textarea
							{...control}
							placeholder="Any other thoughts or feedback you'd like to share?"
							value={formData.additionalComments}
							onChange={handleChange('additionalComments')}
							rows={3}
						/>
					)}
				</Field>

				<Button type='submit' className='w-full'>
					Submit feedback
				</Button>
			</form>
		</div>
	);
};

export const FeedbackForm: Story = {
	render: () => <FeedbackFormComponent />
};

const BioFormComponent = () => {
	const [bio, setBio] = useState('');
	const maxLength = 160;

	return (
		<div className='w-full max-w-md'>
			<Field
				label='Bio'
				id='bio'
				description={`You can @mention other users and organizations. ${bio.length}/${maxLength}`}
				error={bio.length >= maxLength ? 'You have reached the character limit.' : undefined}
			>
				{(control) => (
					<Textarea
						{...control}
						placeholder='Tell us a little bit about yourself'
						value={bio}
						onChange={(event) => setBio(event.target.value)}
						rows={4}
						maxLength={maxLength}
					/>
				)}
			</Field>
		</div>
	);
};

export const BioForm: Story = {
	render: () => <BioFormComponent />
};

const ResizableTextareaComponent = () => {
	const [value, setValue] = useState('');

	return (
		<div className='w-full max-w-md'>
			<Field
				label='Resizable textarea'
				id='resizable-textarea'
				description='Drag the bottom-right corner to resize.'
			>
				{(control) => (
					<Textarea
						{...control}
						placeholder='This textarea can be resized by dragging the bottom-right corner'
						value={value}
						onChange={(event) => setValue(event.target.value)}
						rows={3}
						style={{ resize: 'both' }}
					/>
				)}
			</Field>
		</div>
	);
};

export const Resizable: Story = {
	render: () => <ResizableTextareaComponent />
};
