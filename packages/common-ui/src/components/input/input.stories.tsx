import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from '~/components/input/input';
import { Label } from '~/components/label/label';

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
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

export const Default: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='default-input'>Username</Label>
			<Input id='default-input' placeholder='Enter your username' {...args} />
		</div>
	),
	args: {
		type: 'text',
		placeholder: 'Enter your username'
	}
};

export const Email: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='email-input'>Email Address</Label>
			<Input id='email-input' type='email' placeholder='Enter your email' {...args} />
		</div>
	),
	args: {
		type: 'email',
		placeholder: 'Enter your email'
	}
};

export const Password: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='password-input'>Password</Label>
			<Input id='password-input' type='password' placeholder='Enter your password' {...args} />
		</div>
	),
	args: {
		type: 'password',
		placeholder: 'Enter your password'
	}
};

export const Number: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='number-input'>Age</Label>
			<Input id='number-input' type='number' placeholder='Enter your age' {...args} />
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
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='tel-input'>Phone Number</Label>
			<Input id='tel-input' type='tel' placeholder='Enter your phone number' {...args} />
		</div>
	),
	args: {
		type: 'tel',
		placeholder: 'Enter your phone number'
	}
};

export const URL: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='url-input'>Website</Label>
			<Input id='url-input' type='url' placeholder='Enter your website URL' {...args} />
		</div>
	),
	args: {
		type: 'url',
		placeholder: 'Enter your website URL'
	}
};

export const Search: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='search-input'>Search</Label>
			<Input id='search-input' type='search' placeholder='Search for something...' {...args} />
		</div>
	),
	args: {
		type: 'search',
		placeholder: 'Search for something...'
	}
};

export const File: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='file-input'>Profile Picture</Label>
			<Input id='file-input' type='file' accept='image/*' {...args} />
		</div>
	),
	args: {
		type: 'file',
		accept: 'image/*'
	}
};

export const Disabled: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='disabled-input'>Disabled Input</Label>
			<Input id='disabled-input' placeholder='Cannot enter text' disabled {...args} />
		</div>
	),
	args: {
		disabled: true,
		placeholder: 'Cannot enter text'
	}
};

export const Required: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='required-input'>Required Field *</Label>
			<Input id='required-input' placeholder='This field is required' required {...args} />
		</div>
	),
	args: {
		required: true,
		placeholder: 'This field is required'
	}
};

export const WithError: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='error-input'>Email Address</Label>
			<Input
				id='error-input'
				type='email'
				placeholder='Enter your email'
				aria-invalid='true'
				{...args}
			/>
			<p className='text-sm text-red-500'>Please enter a valid email address</p>
		</div>
	),
	args: {
		type: 'email',
		placeholder: 'Enter your email',
		'aria-invalid': true
	}
};

const ControlledComponent = (args: React.ComponentProps<typeof Input>) => {
	const [value, setValue] = useState('');

	return (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='controlled-input'>Controlled Input</Label>
			<Input
				id='controlled-input'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder='Type something...'
				{...args}
			/>
			<p className='text-sm text-muted-foreground'>Current value: {value}</p>
		</div>
	);
};

export const Controlled: Story = {
	render: (args) => <ControlledComponent {...args} />,
	args: {
		placeholder: 'Type something...'
	}
};

const SignUpFormComponent = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[field]: e.target.value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
	};

	return (
		<div className='w-full max-w-md space-y-6'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>Create Account</h2>
				<p className='text-muted-foreground'>Join us today!</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='space-y-2'>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						type='text'
						placeholder='Enter your username'
						value={formData.username}
						onChange={handleChange('username')}
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='email'>Email Address</Label>
					<Input
						id='email'
						type='email'
						placeholder='Enter your email'
						value={formData.email}
						onChange={handleChange('email')}
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						type='password'
						placeholder='Enter your password'
						value={formData.password}
						onChange={handleChange('password')}
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='confirm-password'>Confirm Password</Label>
					<Input
						id='confirm-password'
						type='password'
						placeholder='Confirm your password'
						value={formData.confirmPassword}
						onChange={handleChange('confirmPassword')}
						required
					/>
				</div>

				<button
					type='submit'
					className='w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-4 rounded-md font-medium transition-colors'
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export const SignUpForm: Story = {
	render: () => <SignUpFormComponent />,
	parameters: {
		docs: {
			description: {
				story:
					'A complete sign-up form example demonstrating how to use Input components with proper labeling and form handling.'
			}
		}
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

	const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[field]: e.target.value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Contact form submitted:', formData);
	};

	return (
		<div className='w-full max-w-lg space-y-6'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>Contact Us</h2>
				<p className='text-muted-foreground'>We&apos;d love to hear from you</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='grid grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='name'>Full Name</Label>
						<Input
							id='name'
							type='text'
							placeholder='John Doe'
							value={formData.name}
							onChange={handleChange('name')}
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='phone'>Phone Number</Label>
						<Input
							id='phone'
							type='tel'
							placeholder='+1 (555) 123-4567'
							value={formData.phone}
							onChange={handleChange('phone')}
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='contact-email'>Email Address</Label>
					<Input
						id='contact-email'
						type='email'
						placeholder='john@example.com'
						value={formData.email}
						onChange={handleChange('email')}
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='subject'>Subject</Label>
					<Input
						id='subject'
						type='text'
						placeholder='How can we help you?'
						value={formData.subject}
						onChange={handleChange('subject')}
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='message'>Message</Label>
					<textarea
						id='message'
						placeholder='Tell us more about your inquiry...'
						value={formData.message}
						onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
						required
						className='flex w-full rounded-md border border-input bg-transparent px-4 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
					/>
				</div>

				<button
					type='submit'
					className='w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-4 rounded-md font-medium transition-colors'
				>
					Send Message
				</button>
			</form>
		</div>
	);
};

export const ContactForm: Story = {
	render: () => <ContactFormComponent />,
	parameters: {
		docs: {
			description: {
				story:
					'A contact form example showing various input types including text, email, telephone, and textarea integration.'
			}
		}
	}
};
