import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DebouncableInput } from '~/components/DebouncableInput/DebouncableInput';

const onValueChangeMock = fn();

const meta: Meta<typeof DebouncableInput> = {
	title: 'UI Core/DebouncableInput',
	component: DebouncableInput,
	parameters: {
		layout: 'centered'
	},
	args: {
		onValueChange: onValueChangeMock,
		placeholder: 'Type something...'
	},
	beforeEach: () => {
		onValueChangeMock.mockClear();
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};

export const WithCustomDebounce: Story = {
	args: {
		debounceMs: 1000,
		placeholder: '1 second debounce...'
	},
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');

		await step('Type rapidly into the input', async () => {
			await userEvent.type(input, 'Testing 1000ms');
		});

		await step('Wait for the debounce to settle and verify exactly one call', async () => {
			// This story's debounceMs (1000ms) is deliberately long, close to waitFor's default
			// 1000ms timeout — give it headroom rather than racing the two.
			await waitFor(
				() => {
					expect(args.onValueChange).toHaveBeenCalledTimes(1);
				},
				{ timeout: 2000 }
			);
			expect(args.onValueChange).toHaveBeenCalledWith('Testing 1000ms');
		});
	}
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Disabled input'
	},
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');

		await step('Verify input is functionally disabled', async () => {
			expect(input).toBeDisabled();
			expect(args.onValueChange).not.toHaveBeenCalled();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		defaultValue: 'Initial value'
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');

		await step('Verify default value is present immediately', async () => {
			expect(input).toHaveValue('Initial value');
		});
	}
};

export const InteractiveDebounceTest: Story = {
	args: {
		debounceMs: 300
	},
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');

		await step('Type rapidly into the input', async () => {
			await userEvent.type(input, 'Hello', { delay: 10 });
		});

		await step('Verify onValueChange is NOT called immediately', async () => {
			expect(args.onValueChange).not.toHaveBeenCalled();
		});

		await step(
			'Wait for debounce to settle and verify exactly one call with final value',
			async () => {
				await waitFor(() => {
					expect(args.onValueChange).toHaveBeenCalledTimes(1);
				});
				expect(args.onValueChange).toHaveBeenCalledWith('Hello');
			}
		);
	}
};
