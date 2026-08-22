import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Field } from '~/components/Field/Field';
import { Input } from '~/components/Input/Input';
import { Textarea } from '~/components/Textarea/Textarea';
import { Checkbox } from '~/components/Checkbox';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '~/components/Slider';

const meta: Meta<typeof Field> = {
	title: 'UI Core/Field',
	// `<Controls />` and the primary block in the MDX page both resolve their args from here.
	component: Field,
	parameters: {
		layout: 'centered',
		// Blocking axe for this file specifically. `Field` is new code with no inherited violations,
		// and a component whose entire purpose is correct labelling should fail loudly when it isn't.
		// `Button.stories.tsx` set the precedent; the rest of the library has pre-existing violations
		// and stays on the global 'todo'.
		a11y: { test: 'error' }
	},
	argTypes: {
		label: { control: 'text' },
		description: { control: 'text' },
		error: { control: 'text' },
		required: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
		nativeLabel: { control: 'boolean', table: { defaultValue: { summary: 'true' } } }
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className='w-80'>
			<Field label='Email address' id='email'>
				{(control) => <Input {...control} type='email' placeholder='john@example.com' />}
			</Field>
		</div>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Field, Input } from '@repo/ui-core';

<Field label='Email address' id='email'>
  {(control) => <Input {...control} type='email' />}
</Field>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox', { name: 'Email address' });

		await step('Shows only the label and the control', async () => {
			await expect(input).toBeInTheDocument();
			await expect(canvasElement.querySelectorAll('[data-slot="field-message"]')).toHaveLength(0);
		});

		await step('The control is valid and not required', async () => {
			await expect(input).not.toHaveAttribute('aria-invalid');
			await expect(input).not.toBeRequired();
		});

		await step('The message region still exists, ready for an error to arrive in', async () => {
			// Empty, but present and already live. An error inserted into a region that only appears
			// at the same moment is announced unreliably — see Field.tsx.
			const region = canvasElement.querySelector('[data-slot="field-messages"]');
			await expect(region).toBeInTheDocument();
			await expect(region).toHaveAttribute('aria-live', 'polite');
			await expect(region).toBeEmptyDOMElement();
			await expect(input).toHaveAttribute('aria-describedby', region?.id ?? '');
		});
	}
};

export const WithDescription: Story = {
	render: () => (
		<div className='w-80'>
			<Field
				label='Email address'
				id='email-described'
				description='We only use this to send you a receipt.'
			>
				{(control) => <Input {...control} type='email' />}
			</Field>
		</div>
	)
};

export const WithError: Story = {
	render: () => (
		<div className='w-80'>
			<Field label='Email address' id='email-invalid' error='Enter a valid email address.'>
				{(control) => <Input {...control} type='email' defaultValue='not-an-email' />}
			</Field>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox', { name: 'Email address' });

		await step('The control reports itself invalid', async () => {
			await expect(input).toHaveAttribute('aria-invalid', 'true');
		});

		await step('The error is associated with the control, and is the visible text', async () => {
			const describedBy = input.getAttribute('aria-describedby');
			await expect(describedBy).toBe('email-invalid-message');

			// Compared by attribute rather than by CSS selector on purpose: when no `id` is supplied
			// React 19 generates one containing «guillemets», which are legal in an attribute value
			// and a syntax error in `querySelector('#' + id)`.
			const region = canvasElement.querySelector(`[id="${describedBy}"]`);
			await expect(region).toHaveTextContent('Enter a valid email address.');
		});
	}
};

export const WithDescriptionAndError: Story = {
	render: () => (
		<div className='w-80'>
			<Field
				label='Password'
				id='password-both'
				description='At least twelve characters.'
				error='That password is too short.'
			>
				{(control) => <Input {...control} type='password' defaultValue='short' />}
			</Field>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		await step('Both messages render, description first', async () => {
			const messages = Array.from(
				canvasElement.querySelectorAll('[data-slot="field-message"]')
			).map((message) => message.getAttribute('data-variant'));

			await expect(messages).toEqual(['info', 'error']);
		});
	}
};

export const RequiredField: Story = {
	render: () => (
		<div className='w-80'>
			<Field label='Full name' id='full-name' required>
				{(control) => <Input {...control} type='text' />}
			</Field>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The control carries the native required attribute', async () => {
			await expect(canvas.getByRole('textbox', { name: /Full name/ })).toBeRequired();
		});

		await step('The indicator is conveyed by symbol and text, not colour alone', async () => {
			await expect(canvas.getByText('*')).toHaveAttribute('aria-hidden', 'true');
			await expect(canvas.getByText('(required)')).toHaveClass('sr-only');
		});
	}
};

export const Disabled: Story = {
	render: () => (
		<div className='w-80'>
			<Field label='Email address' id='email-disabled' description='Sign in to change your email.'>
				{(control) => <Input {...control} type='email' defaultValue='john@example.com' disabled />}
			</Field>
		</div>
	)
};

export const WithTextarea: Story = {
	render: () => (
		<div className='w-80'>
			<Field label='Message' id='message' description='Tell us what happened.'>
				{(control) => <Textarea {...control} placeholder='Start typing…' />}
			</Field>
		</div>
	)
};

export const WithCheckbox: Story = {
	render: () => (
		<div className='w-80'>
			<Field label='Accept the terms' id='terms' required error='You must accept the terms.'>
				{(control) => <Checkbox {...control} />}
			</Field>
		</div>
	)
};

export const NonNativeLabel: Story = {
	render: () => (
		<div className='w-80'>
			{/*
			 * A Slider's control is a `<span role='slider'>` several levels down from SliderRoot,
			 * which `htmlFor` cannot name — hence `nativeLabel={false}`, and hence the bag going on
			 * the thumb rather than the root. This is the case that rules out cloning a child.
			 */}
			<Field label='Budget' id='budget' nativeLabel={false} description='Drag to set a maximum.'>
				{(control) => (
					<SliderRoot defaultValue={[40]} max={100} step={1}>
						<SliderTrack>
							<SliderRange />
						</SliderTrack>
						<SliderThumb {...control} />
					</SliderRoot>
				)}
			</Field>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('The slider takes its name from the non-native label', async () => {
			const slider = canvas.getByRole('slider', { name: 'Budget' });
			await expect(slider).toHaveAttribute('aria-labelledby', 'budget-label');
			await expect(slider).toHaveAttribute('aria-describedby', 'budget-message');
		});
	}
};

const ErrorOnBlur = () => {
	const [value, setValue] = React.useState('');
	const [touched, setTouched] = React.useState(false);

	const error = touched && !value.includes('@') ? 'Enter a valid email address.' : undefined;

	return (
		<div className='w-80'>
			<Field label='Email address' id='email-blur' error={error}>
				{(control) => (
					<Input
						{...control}
						type='email'
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onBlur={() => setTouched(true)}
					/>
				)}
			</Field>
		</div>
	);
};

export const ErrorAppearsAfterBlur: Story = {
	render: () => <ErrorOnBlur />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox', { name: 'Email address' });
		const region = canvasElement.querySelector('[data-slot="field-messages"]');

		await step('The live region exists before there is any error', async () => {
			await expect(region).toBeInTheDocument();
			await expect(region).toBeEmptyDOMElement();
			await expect(input).toHaveAttribute('aria-describedby', 'email-blur-message');
		});

		await step('Typing something invalid does not yet complain', async () => {
			await userEvent.type(input, 'nope');
			await expect(input).not.toHaveAttribute('aria-invalid');
		});

		await step('Blurring surfaces the error into the region that was already there', async () => {
			await userEvent.tab();
			await expect(input).toHaveAttribute('aria-invalid', 'true');
			await expect(region).toHaveTextContent('Enter a valid email address.');
		});

		await step('Correcting it clears both the message and the invalid state', async () => {
			await userEvent.clear(input);
			await userEvent.type(input, 'john@example.com');
			await expect(input).not.toHaveAttribute('aria-invalid');
			await expect(region).toBeEmptyDOMElement();
		});
	}
};

export const GeneratedId: Story = {
	render: () => (
		<div className='w-80'>
			<Field label='Nickname' description='No id supplied — Field falls back to React.useId().'>
				{(control) => <Input {...control} type='text' />}
			</Field>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox', { name: 'Nickname' });

		await step('The association still holds with a generated id', async () => {
			const id = input.getAttribute('id') ?? '';
			await expect(id).not.toBe('');
			await expect(input).toHaveAttribute('aria-describedby', `${id}-message`);
		});
	}
};
