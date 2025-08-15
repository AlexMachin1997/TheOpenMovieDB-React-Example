import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Textarea } from '~/components/textarea/textarea';
import { Label } from '~/components/label/label';

const meta: Meta<typeof Textarea> = {
	title: 'Components/Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
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

export const Default: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='default-textarea'>Message</Label>
			<Textarea id='default-textarea' placeholder='Type your message here...' {...args} />
		</div>
	),
	args: {
		placeholder: 'Type your message here...'
	}
};

export const WithLabel: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='labeled-textarea'>Your Message</Label>
			<Textarea id='labeled-textarea' placeholder='Type your message here...' {...args} />
		</div>
	),
	args: {
		placeholder: 'Type your message here...'
	}
};

export const WithHelperText: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='helper-textarea'>Your Message</Label>
			<Textarea id='helper-textarea' placeholder='Type your message here...' {...args} />
			<p className='text-sm text-muted-foreground'>
				Your message will be copied to the support team.
			</p>
		</div>
	),
	args: {
		placeholder: 'Type your message here...'
	}
};

export const Disabled: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='disabled-textarea'>Disabled Textarea</Label>
			<Textarea id='disabled-textarea' placeholder='Cannot enter text' disabled {...args} />
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
			<Label htmlFor='required-textarea'>Required Field *</Label>
			<Textarea id='required-textarea' placeholder='This field is required' required {...args} />
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
			<Label htmlFor='error-textarea'>Message</Label>
			<Textarea
				id='error-textarea'
				placeholder='Type your message here...'
				aria-invalid='true'
				{...args}
			/>
			<p className='text-sm text-red-500'>Please enter a message (minimum 10 characters)</p>
		</div>
	),
	args: {
		placeholder: 'Type your message here...',
		'aria-invalid': true
	}
};

export const CustomRows: Story = {
	render: (args) => (
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='rows-textarea'>Large Textarea</Label>
			<Textarea id='rows-textarea' placeholder='Type your message here...' rows={20} {...args} />
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
		<div className='grid w-full max-w-sm items-center gap-3'>
			<Label htmlFor='controlled-textarea'>Controlled Textarea</Label>
			<Textarea
				id='controlled-textarea'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder='Type something...'
				{...args}
			/>
			<p className='text-sm text-muted-foreground'>Character count: {value.length}</p>
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
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const handleChange =
		(field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
						<input
							id='name'
							type='text'
							placeholder='John Doe'
							value={formData.name}
							onChange={handleChange('name')}
							required
							className='flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='email'>Email Address</Label>
						<input
							id='email'
							type='email'
							placeholder='john@example.com'
							value={formData.email}
							onChange={handleChange('email')}
							required
							className='flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='subject'>Subject</Label>
					<input
						id='subject'
						type='text'
						placeholder='How can we help you?'
						value={formData.subject}
						onChange={handleChange('subject')}
						required
						className='flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='message'>Message</Label>
					<Textarea
						id='message'
						placeholder='Tell us more about your inquiry...'
						value={formData.message}
						onChange={handleChange('message')}
						required
						rows={6}
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
					'A contact form example showing how to integrate Textarea with other form elements like inputs and buttons.'
			}
		}
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
		(field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value
			}));
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Feedback form submitted:', formData);
	};

	return (
		<div className='w-full max-w-2xl space-y-6'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>Product Feedback</h2>
				<p className='text-muted-foreground'>Help us improve our product</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='space-y-2'>
					<Label htmlFor='rating'>Overall Rating</Label>
					<select
						id='rating'
						value={formData.rating}
						onChange={(e) => setFormData((prev) => ({ ...prev, rating: e.target.value }))}
						required
						className='flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
					>
						<option value=''>Select a rating</option>
						<option value='5'>5 - Excellent</option>
						<option value='4'>4 - Very Good</option>
						<option value='3'>3 - Good</option>
						<option value='2'>2 - Fair</option>
						<option value='1'>1 - Poor</option>
					</select>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='experience'>Tell us about your experience</Label>
					<Textarea
						id='experience'
						placeholder='What did you like or dislike about our product?'
						value={formData.experience}
						onChange={handleChange('experience')}
						required
						rows={4}
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='suggestions'>Suggestions for improvement</Label>
					<Textarea
						id='suggestions'
						placeholder='What features would you like to see added or improved?'
						value={formData.suggestions}
						onChange={handleChange('suggestions')}
						rows={4}
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='additionalComments'>Additional Comments</Label>
					<Textarea
						id='additionalComments'
						placeholder="Any other thoughts or feedback you'd like to share?"
						value={formData.additionalComments}
						onChange={handleChange('additionalComments')}
						rows={3}
					/>
					<p className='text-sm text-muted-foreground'>
						Optional: Share any additional thoughts or suggestions
					</p>
				</div>

				<button
					type='submit'
					className='w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-4 rounded-md font-medium transition-colors'
				>
					Submit Feedback
				</button>
			</form>
		</div>
	);
};

export const FeedbackForm: Story = {
	render: () => <FeedbackFormComponent />,
	parameters: {
		docs: {
			description: {
				story:
					'A comprehensive feedback form example demonstrating multiple textarea fields with different purposes and helper text.'
			}
		}
	}
};

const BioFormComponent = () => {
	const [bio, setBio] = useState('');
	const maxLength = 160;

	return (
		<div className='w-full max-w-md space-y-4'>
			<div className='space-y-2'>
				<Label htmlFor='bio'>Bio</Label>
				<Textarea
					id='bio'
					placeholder='Tell us a little bit about yourself'
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					rows={4}
					maxLength={maxLength}
				/>
				<div className='flex justify-between text-sm'>
					<p className='text-muted-foreground'>You can @mention other users and organizations.</p>
					<p className={bio.length > maxLength * 0.9 ? 'text-orange-500' : 'text-muted-foreground'}>
						{bio.length}/{maxLength}
					</p>
				</div>
			</div>
		</div>
	);
};

export const BioForm: Story = {
	render: () => <BioFormComponent />,
	parameters: {
		docs: {
			description: {
				story:
					'A bio form example with character count and helper text, demonstrating textarea with maxLength and validation feedback.'
			}
		}
	}
};

const ResizableTextareaComponent = () => {
	const [value, setValue] = useState('');

	return (
		<div className='w-full max-w-md space-y-4'>
			<div className='space-y-2'>
				<Label htmlFor='resizable-textarea'>Resizable Textarea</Label>
				<Textarea
					id='resizable-textarea'
					placeholder='This textarea can be resized by dragging the bottom-right corner'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					rows={3}
					style={{ resize: 'both' }}
				/>
			</div>
		</div>
	);
};

export const Resizable: Story = {
	render: () => <ResizableTextareaComponent />,
	parameters: {
		docs: {
			description: {
				story:
					'A resizable textarea example demonstrating the resize functionality with custom styling.'
			}
		}
	}
};
