import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { FieldMessage } from '~/components/FieldMessage/FieldMessage';

const meta: Meta<typeof FieldMessage> = {
	title: 'UI Core/Field message',
	// `<Controls />` and the primary block in the MDX page both resolve their args from here.
	component: FieldMessage,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['info', 'error', 'warning', 'success'],
			description: 'The state the message conveys — picks both the colour and the icon.',
			table: { defaultValue: { summary: 'info' } }
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'We only use this to send you a receipt.'
	},
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `<FieldMessage>We only use this to send you a receipt.</FieldMessage>`
			}
		}
	}
};

export const Error: Story = {
	args: {
		variant: 'error',
		children: 'Enter a valid email address.'
	}
};

export const Warning: Story = {
	args: {
		variant: 'warning',
		children: 'This address has bounced before.'
	}
};

export const Success: Story = {
	args: {
		variant: 'success',
		children: 'Address verified.'
	}
};

export const LongContent: Story = {
	args: {
		variant: 'error',
		children:
			'Passwords must be at least twelve characters long and contain an uppercase letter, a lowercase letter, a number and a symbol. Spaces are allowed and count towards the length.'
	},
	render: (args) => (
		<div className='max-w-sm'>
			<FieldMessage {...args} />
		</div>
	)
};

export const AllStates: Story = {
	render: () => (
		<div className='grid max-w-sm gap-3'>
			<FieldMessage variant='info'>Neutral, the default — a plain description.</FieldMessage>
			<FieldMessage variant='error'>Something is wrong and must be fixed.</FieldMessage>
			<FieldMessage variant='warning'>Allowed, but worth a second look.</FieldMessage>
			<FieldMessage variant='success'>Confirmed as valid.</FieldMessage>
		</div>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `<FieldMessage variant='info'>Neutral, the default</FieldMessage>
<FieldMessage variant='error'>Something is wrong</FieldMessage>
<FieldMessage variant='warning'>Worth a second look</FieldMessage>
<FieldMessage variant='success'>Confirmed as valid</FieldMessage>`
			}
		}
	},
	// FieldMessage has no user interaction — it is a static line of text. The coverage bar asks for a
	// play() exercising the "primary user interaction", and there honestly isn't one, so this asserts
	// the properties that actually matter instead: four distinct icon shapes so the state survives
	// without colour, and no assertive live region.
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const messages = Array.from(
			canvasElement.querySelectorAll<HTMLElement>('[data-slot="field-message"]')
		);

		await step('Every state renders, in order', async () => {
			await expect(
				canvas.getAllByText(/Neutral|Something is wrong|second look|Confirmed/)
			).toHaveLength(4);
			await expect(messages.map((message) => message.getAttribute('data-variant'))).toEqual([
				'info',
				'error',
				'warning',
				'success'
			]);
		});

		await step('No two states share an icon', async () => {
			// Read the resolved name off `data-icon` rather than the rendered <svg>: Iconify fetches
			// glyph data over the network and paints an identically-classed placeholder until it
			// arrives, so inspecting the element would test the CDN rather than this mapping.
			const icons = messages.map((message) => message.getAttribute('data-icon'));

			await expect(icons).toEqual(['info', 'x-circle', 'alert-triangle', 'check-circle']);
			await expect(new Set(icons).size).toBe(4);
		});

		await step('None of them is an assertive live region', async () => {
			// `Alert` defaults to role='alert'. Under a field that would interrupt a screen reader
			// mid-keystroke, and `Field` already provides a polite region around these.
			for (const message of messages) {
				await expect(message).not.toHaveAttribute('role', 'alert');
			}
		});
	}
};
