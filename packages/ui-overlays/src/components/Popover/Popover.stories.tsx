import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Button, Input, Label } from '@repo/ui-core';

import { Dialog, DialogContent, DialogTrigger } from '~/components/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover';

const meta = {
	title: 'UI Overlays/Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
		// Every story opens its popover in `play()`. A closed popover renders no contents, so a story
		// that never opened one would hand this gate an empty page and pass for that reason.
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
		if (!content?.matches(':popover-open')) throw new Error('The trigger opened no popover');
		return content;
	});
};

/** Wait until a trigger reports its popover closed. */
const expectClosed = (trigger: HTMLElement) =>
	waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

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

/** A form whose second control asks for focus, so honouring it is distinguishable from not. */
const RenameForm = () => {
	const nameId = React.useId();

	return (
		<div className='grid gap-2'>
			<Button variant='outline' size='sm'>
				Use the default name
			</Button>
			<Label htmlFor={nameId}>Layer name</Label>
			<Input id={nameId} defaultValue='Background' autoFocus />
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
		const canvas = within(canvasElement);

		await step('`aria-label` beats `title`, and the title still renders', async () => {
			const content = await openPopover(canvasElement, /^label and title$/i);

			await expect(content).toHaveAttribute('role', 'group');
			await expect(content).toHaveAccessibleName('Search filters');
			await expect(within(content).getByText('Filters')).toBeInTheDocument();

			await userEvent.keyboard('{Escape}');
			await expectClosed(canvas.getByRole('button', { name: /^label and title$/i }));
		});

		await step('`aria-labelledby` beats both', async () => {
			const content = await openPopover(canvasElement, /labelledby, label and title/i);

			await expect(content).toHaveAttribute('role', 'group');
			await expect(content).toHaveAccessibleName('Saved filters');
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Opening and closing
 * ---------------------------------------------------------------------------------------------- */

/**
 * Opening a popover moves focus into it: to an element that asks for it with `autoFocus`, or failing
 * that to the first one that can take it.
 */
export const FocusOnOpen: Story = {
	render: () => (
		<div className='flex gap-2'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Edit dimensions</Button>
				</PopoverTrigger>
				<PopoverContent title='Dimensions'>
					<DimensionsForm />
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Rename layer</Button>
				</PopoverTrigger>
				<PopoverContent title='Rename'>
					<RenameForm />
				</PopoverContent>
			</Popover>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);

		await step('A popover holding a form focuses its first field', async () => {
			await openPopover(canvasElement, /edit dimensions/i);
			await waitFor(() => expect(documentScope.getByLabelText('Width')).toHaveFocus());

			await userEvent.keyboard('{Escape}');
			await expectClosed(canvas.getByRole('button', { name: /edit dimensions/i }));
		});

		await step('An element marked `autoFocus` wins over the first one', async () => {
			await openPopover(canvasElement, /rename layer/i);
			await waitFor(() => expect(documentScope.getByLabelText('Layer name')).toHaveFocus());
		});
	}
};

const onFiltersOpenChange = fn();

/**
 * Every way out: Escape, a click outside, focus moving outside, the close button and the trigger.
 * Each reports through `onOpenChange` exactly once, and none of them can be refused.
 */
export const CloseRoutes: Story = {
	beforeEach: () => {
		onFiltersOpenChange.mockReset();
	},
	render: () => (
		<div className='flex flex-col items-start gap-4'>
			<p className='text-sm'>Somewhere outside the popover</p>
			<Popover onOpenChange={onFiltersOpenChange}>
				<PopoverTrigger asChild>
					<Button variant='outline'>Filters</Button>
				</PopoverTrigger>
				<PopoverContent title='Filters' showCloseButton>
					<DimensionsForm />
				</PopoverContent>
			</Popover>
			<Button variant='outline'>Something else</Button>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole('button', { name: /filters/i });

		/** Open the popover, then forget the open, so each step counts only its own close. */
		const reopen = async () => {
			const content = await openPopover(canvasElement, /filters/i);
			await waitFor(() => expect(within(content).getByLabelText('Width')).toHaveFocus());
			onFiltersOpenChange.mockClear();
			return content;
		};

		const expectClosedOnce = async () => {
			await expectClosed(trigger);
			await expect(onFiltersOpenChange).toHaveBeenCalledTimes(1);
			await expect(onFiltersOpenChange).toHaveBeenCalledWith(false);
		};

		await step('Escape closes it', async () => {
			await reopen();
			await userEvent.keyboard('{Escape}');
			await expectClosedOnce();
		});

		// Text rather than a control, so the press moves focus nowhere and only the click route acts.
		await step('A click outside closes it', async () => {
			await reopen();
			await userEvent.click(canvas.getByText('Somewhere outside the popover'));
			await expectClosedOnce();
		});

		// Programmatic focus rather than a click, so only the focus route acts.
		await step('Focus moving outside closes it', async () => {
			await reopen();
			canvas.getByRole('button', { name: /something else/i }).focus();
			await expectClosedOnce();
		});

		await step('The close button closes it', async () => {
			const content = await reopen();
			await userEvent.click(within(content).getByRole('button', { name: 'Close' }));
			await expectClosedOnce();
		});

		await step(
			'Clicking the trigger of an open popover closes it, and it stays closed',
			async () => {
				await reopen();
				await userEvent.click(trigger);
				await expectClosedOnce();

				// Reopening would happen on the same click, so a moment is enough to catch it.
				await new Promise((resolve) => setTimeout(resolve, 100));
				await expect(trigger).toHaveAttribute('aria-expanded', 'false');
			}
		);
	}
};

/**
 * Tab never loops inside a popover. Past the last field it moves on to whatever follows, and the
 * popover closes behind it; Shift+Tab from the first field does the same in reverse.
 */
export const TabMovesOut: Story = {
	render: () => (
		<div className='flex gap-2'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Dimensions</Button>
				</PopoverTrigger>
				<PopoverContent title='Dimensions'>
					<DimensionsForm />
				</PopoverContent>
			</Popover>
			<Button variant='outline'>Next field</Button>
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);
		const trigger = canvas.getByRole('button', { name: /^dimensions$/i });

		await step('Tab from the last field leaves the popover and closes it', async () => {
			await openPopover(canvasElement, /^dimensions$/i);
			await waitFor(() => expect(documentScope.getByLabelText('Width')).toHaveFocus());

			await userEvent.tab();
			await expect(documentScope.getByLabelText('Height')).toHaveFocus();

			await userEvent.tab();
			await expect(canvas.getByRole('button', { name: /next field/i })).toHaveFocus();
			await expectClosed(trigger);
		});

		await step('Shift+Tab from the first field does the same, back to the trigger', async () => {
			await openPopover(canvasElement, /^dimensions$/i);
			await waitFor(() => expect(documentScope.getByLabelText('Width')).toHaveFocus());

			await userEvent.tab({ shift: true });
			await expect(trigger).toHaveFocus();
			await expectClosed(trigger);
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Inside a modal
 * ---------------------------------------------------------------------------------------------- */

/**
 * A popover inside a modal dialog paints above it and takes clicks, and closing the popover never
 * closes the dialog with it.
 */
export const InsideADialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Edit layer</Button>
			</DialogTrigger>
			<DialogContent title='Edit layer' description='Change how the layer is laid out.'>
				<div className='flex items-center gap-4 py-4'>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant='outline'>Dimensions</Button>
						</PopoverTrigger>
						<PopoverContent title='Dimensions'>
							<DimensionsForm />
						</PopoverContent>
					</Popover>
					<p className='text-sm'>Inside the dialog</p>
				</div>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button', { name: /edit layer/i }));
		const dialog = await within(document.body).findByRole('dialog', { name: 'Edit layer' });
		const trigger = within(dialog).getByRole('button', { name: /^dimensions$/i });

		await step('The popover paints above the dialog and takes clicks', async () => {
			const content = await openPopover(dialog, /^dimensions$/i);
			const width = within(content).getByLabelText('Width');

			// What a real click at the field's centre would land on. A popover painted behind the modal
			// still renders and still reads correctly; only hit-testing gives it away.
			await waitFor(() => {
				const { left, top, width: boxWidth, height } = width.getBoundingClientRect();
				expect(document.elementFromPoint(left + boxWidth / 2, top + height / 2)).toBe(width);
			});
		});

		await step('Escape closes the popover and leaves the dialog open', async () => {
			await userEvent.keyboard('{Escape}');
			await expectClosed(trigger);
			await expect(dialog).toHaveAttribute('open');
		});

		await step('So does a click inside the dialog but outside the popover', async () => {
			await openPopover(dialog, /^dimensions$/i);
			await userEvent.click(within(dialog).getByText('Inside the dialog'));
			await expectClosed(trigger);
			await expect(dialog).toHaveAttribute('open');
		});
	}
};
