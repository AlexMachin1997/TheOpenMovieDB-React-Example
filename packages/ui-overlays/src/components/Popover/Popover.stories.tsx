import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button, Input, Label } from '@repo/ui-core';

import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover';

const meta = {
	title: 'UI Overlays/Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
		// Every story opens its popover in `play()`. A closed popover is not rendered at all, so a
		// story that never opened one would hand this gate an empty page and pass for that reason.
		a11y: { test: 'error' }
	}
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Open a story's popover and return its content element.
 *
 * Resolved through the trigger's `aria-controls` rather than by role, because an unnamed popover has
 * no role to query by — which is one of the things these stories exist to show.
 */
const openPopover = async (canvasElement: HTMLElement, trigger: RegExp) => {
	const button = within(canvasElement).getByRole('button', { name: trigger });

	await userEvent.click(button);
	await expect(button).toHaveAttribute('aria-expanded', 'true');

	return waitFor(() => {
		const content = document.getElementById(button.getAttribute('aria-controls') ?? '');
		if (!content) throw new Error('The trigger does not control a rendered popover');
		return content;
	});
};

/** Close the open popover with Escape and wait until its trigger says so. */
const closePopover = async (canvasElement: HTMLElement, trigger: RegExp) => {
	const button = within(canvasElement).getByRole('button', { name: trigger });

	await userEvent.keyboard('{Escape}');
	await expect(button).toHaveAttribute('aria-expanded', 'false');
};

/** The contents of a typical content popover: a small form whose fields label themselves. */
const DimensionsForm = () => {
	const widthId = React.useId();
	const heightId = React.useId();

	return (
		<div className='grid gap-2'>
			<div className='grid grid-cols-3 items-center gap-4'>
				<Label htmlFor={widthId}>Width</Label>
				<Input id={widthId} defaultValue='100%' className='col-span-2 h-8' />
			</div>
			<div className='grid grid-cols-3 items-center gap-4'>
				<Label htmlFor={heightId}>Height</Label>
				<Input id={heightId} defaultValue='25px' className='col-span-2 h-8' />
			</div>
		</div>
	);
};

/** Contents that already say what they are, so the popover around them needs no name. */
const ShareLinkField = () => {
	const linkId = React.useId();

	return (
		<div className='flex items-center gap-2'>
			<Label htmlFor={linkId} className='sr-only'>
				Link
			</Label>
			<Input id={linkId} defaultValue='https://example.com/s/abc123' readOnly />
			<Button size='sm'>Copy</Button>
		</div>
	);
};

/** A caller writing its own header markup, and pointing `aria-labelledby` at it. */
const SavedFiltersContent = () => {
	const headingId = React.useId();

	return (
		<PopoverContent title='Filters' aria-label='Search filters' aria-labelledby={headingId}>
			<p id={headingId} className='text-sm'>
				Saved filters
			</p>
		</PopoverContent>
	);
};

/* -------------------------------------------------------------------------------------------------
 * Naming
 * ---------------------------------------------------------------------------------------------- */

/**
 * The normal way to write a content popover: give it a `title`. The title names the popover, so it
 * is announced as a group on entry, and `description` describes it.
 */
export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>Open popover</Button>
			</PopoverTrigger>
			<PopoverContent title='Dimensions' description='Set the dimensions for the layer.'>
				<DimensionsForm />
			</PopoverContent>
		</Popover>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Button } from '@repo/ui-core';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui-overlays';

<Popover>
  <PopoverTrigger asChild>
    <Button variant='outline'>Open popover</Button>
  </PopoverTrigger>
  <PopoverContent title='Dimensions' description='Set the dimensions for the layer.'>
    <DimensionsForm />
  </PopoverContent>
</Popover>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const trigger = within(canvasElement).getByRole('button', { name: /open popover/i });

		await step('The trigger does not claim to open a dialog', async () => {
			await expect(trigger).not.toHaveAttribute('aria-haspopup');
		});

		const content = await openPopover(canvasElement, /open popover/i);

		await step('A popover with a title is a group, named by that title', async () => {
			await expect(content).toHaveAttribute('role', 'group');
			await expect(content).toHaveAccessibleName('Dimensions');
			await expect(content).toHaveAccessibleDescription('Set the dimensions for the layer.');
		});

		await step('The title is text, not a heading', async () => {
			await expect(within(content).queryByRole('heading')).not.toBeInTheDocument();
		});
	}
};

/**
 * A popover whose contents already say what they are needs no name. With none, it has no role
 * either, so it adds no announcement of its own and is read as its contents.
 */
export const WithoutAName: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>Share</Button>
			</PopoverTrigger>
			<PopoverContent>
				<ShareLinkField />
			</PopoverContent>
		</Popover>
	),
	play: async ({ canvasElement, step }) => {
		const content = await openPopover(canvasElement, /share/i);

		await step('An unnamed popover renders no role at all', async () => {
			await expect(content).not.toHaveAttribute('role');
			await expect(content).not.toHaveAttribute('aria-labelledby');
			await expect(content).not.toHaveAttribute('aria-label');
		});
	}
};

/**
 * Three things can name a popover, ranked: the caller's `aria-labelledby`, then the caller's
 * `aria-label`, then the `title` prop. A title that loses still renders.
 *
 * `aria-label` is also the route for a popover with no visible title at all.
 */
export const NamingPrecedence: Story = {
	render: () => (
		<div className='flex gap-2'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Label and title</Button>
				</PopoverTrigger>
				<PopoverContent title='Filters' aria-label='Search filters'>
					<DimensionsForm />
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Labelledby, label and title</Button>
				</PopoverTrigger>
				<SavedFiltersContent />
			</Popover>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		await step('`aria-label` beats `title`, and the title still renders', async () => {
			const content = await openPopover(canvasElement, /^label and title$/i);

			await expect(content).toHaveAttribute('role', 'group');
			await expect(content).toHaveAccessibleName('Search filters');
			await expect(within(content).getByText('Filters')).toBeInTheDocument();

			await closePopover(canvasElement, /^label and title$/i);
		});

		await step('`aria-labelledby` beats both', async () => {
			const content = await openPopover(canvasElement, /labelledby, label and title/i);

			await expect(content).toHaveAttribute('role', 'group');
			await expect(content).toHaveAccessibleName('Saved filters');
		});
	}
};
