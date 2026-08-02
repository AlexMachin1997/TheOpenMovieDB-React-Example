import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { Search } from '~/components/Search/Search';

const meta: Meta<typeof Search> = {
	title: 'UI Core/Search',
	component: Search,
	parameters: {
		layout: 'padded'
	},
	args: {
		onValueChange: fn(),
		placeholder: 'Search everywhere...'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};

export const WithClearButton: Story = {
	args: {
		showClearButton: true,
		placeholder: 'Type to see clear button...'
	}
};

export const InteractiveClearTest: Story = {
	args: {
		showClearButton: true,
		debounceMs: 50 // Short debounce for testing
	},
	play: async ({ canvasElement, args, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');

		await step('Verify clear button starts hidden', async () => {
			const clearButton = canvas.queryByRole('button', { name: /clear search/i });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Type "Matrix" into the input', async () => {
			await userEvent.type(input, 'Matrix');
		});

		await step('Wait for debounce and verify clear button appears', async () => {
			await waitFor(() => {
				expect(args.onValueChange).toHaveBeenLastCalledWith('Matrix');
			});

			const clearBtn = await canvas.findByRole('button', { name: /clear search/i });
			expect(clearBtn).toBeVisible();
		});

		await step('Click clear button', async () => {
			const clearBtn = canvas.getByRole('button', { name: /clear search/i });
			await userEvent.click(clearBtn);
		});

		await step('Verify input is empty and clear button hides', async () => {
			expect(input).toHaveValue('');
			expect(args.onValueChange).toHaveBeenLastCalledWith('');

			const clearBtn = canvas.queryByRole('button', { name: /clear search/i });
			expect(clearBtn).not.toBeInTheDocument();
		});
	}
};
