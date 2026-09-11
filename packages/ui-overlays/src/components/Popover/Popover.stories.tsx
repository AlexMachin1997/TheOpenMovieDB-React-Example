import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Button, Input, Label } from '@repo/ui-core';

import { Dialog, DialogContent, DialogTrigger } from '~/components/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover';
import {
	OPPOSITE,
	SIDES,
	expectClosed,
	expectPlacedOn,
	openPopover,
	type Side
} from '~/components/Popover/__fixtures__/interactions';

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

		await step('Escape closes it, and focus goes back to the trigger', async () => {
			await reopen();
			await userEvent.keyboard('{Escape}');
			await expectClosedOnce();
			await expect(trigger).toHaveFocus();
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

		await step('The close button closes it, and focus goes back to the trigger', async () => {
			const content = await reopen();
			await userEvent.click(within(content).getByRole('button', { name: 'Close' }));
			await expectClosedOnce();
			await expect(trigger).toHaveFocus();
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

/* -------------------------------------------------------------------------------------------------
 * Positioning
 * ---------------------------------------------------------------------------------------------- */

/** Where each trigger in `Sides` goes, so its popover opens into the space in the middle. */
const SIDES_CELL: Record<Side, string> = {
	top: 'col-start-2 row-start-3 self-start',
	right: 'col-start-1 row-start-2 justify-self-end',
	bottom: 'col-start-2 row-start-1 self-end',
	left: 'col-start-3 row-start-2 justify-self-start'
};

/**
 * `side` chooses which side of the trigger a popover opens on. Every popover sits the same distance
 * from its trigger.
 *
 * The canvas fills the viewport and never scrolls, and the space in the middle shrinks with it, so
 * narrowing or shortening the panel is a way to watch each popover flip, then shrink.
 */
export const Sides: Story = {
	render: () => (
		<div className='grid h-dvh w-full place-items-center overflow-hidden'>
			<div className='grid grid-cols-[auto_minmax(0,20rem)_auto] grid-rows-[auto_minmax(0,12rem)_auto] place-items-center'>
				{SIDES.map((side) => (
					<Popover key={side}>
						<PopoverTrigger asChild>
							<Button variant='outline' className={SIDES_CELL[side]}>
								Open on the {side}
							</Button>
						</PopoverTrigger>
						<PopoverContent side={side} title={`Opened on the ${side}`}>
							<p className='text-sm'>The trigger is on the other side.</p>
						</PopoverContent>
					</Popover>
				))}
			</div>
		</div>
	),
	parameters: {
		layout: 'fullscreen',
		docs: {
			source: {
				language: 'tsx',
				code: `<PopoverContent side='top'>…</PopoverContent>
<PopoverContent side='right'>…</PopoverContent>
<PopoverContent side='bottom'>…</PopoverContent>
<PopoverContent side='left'>…</PopoverContent>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		for (const side of SIDES) {
			await step(`\`side='${side}'\` opens on the ${side}`, async () => {
				const name = new RegExp(`open on the ${side}`, 'i');
				const trigger = within(canvasElement).getByRole('button', { name });
				const content = await openPopover(canvasElement, name);

				await waitFor(() => expectPlacedOn(content, trigger, side));

				await userEvent.keyboard('{Escape}');
				await expectClosed(trigger);
			});
		}
	}
};

/**
 * Pinned to each edge of the viewport without transforms. Anchor positioning measures the
 * untransformed box, so a `translate` would move the trigger without moving the popover with it.
 */
const EDGE_POSITION: Record<Side, string> = {
	top: 'fixed inset-x-0 top-4 mx-auto w-fit',
	right: 'fixed inset-y-0 right-4 my-auto h-fit',
	bottom: 'fixed inset-x-0 bottom-4 mx-auto w-fit',
	left: 'fixed inset-y-0 left-4 my-auto h-fit'
};

/**
 * A popover with no room on its own side opens on the opposite one: each of these asks for the side
 * facing the edge its trigger is pinned to.
 */
export const FlipsWhenThereIsNoRoom: Story = {
	parameters: { layout: 'fullscreen' },
	render: () => (
		<>
			{SIDES.map((side) => (
				<Popover key={side}>
					<PopoverTrigger asChild>
						<Button variant='outline' className={EDGE_POSITION[side]}>
							Asks for the {side}
						</Button>
					</PopoverTrigger>
					<PopoverContent side={side} title={`Asked for the ${side}`}>
						<p className='text-sm'>There was no room there.</p>
					</PopoverContent>
				</Popover>
			))}
		</>
	),
	play: async ({ canvasElement, step }) => {
		for (const side of SIDES) {
			await step(
				`\`side='${side}'\` at the ${side} edge opens on the ${OPPOSITE[side]}`,
				async () => {
					const name = new RegExp(`asks for the ${side}`, 'i');
					const trigger = within(canvasElement).getByRole('button', { name });
					const content = await openPopover(canvasElement, name);

					await waitFor(() => expectPlacedOn(content, trigger, OPPOSITE[side]));

					await userEvent.keyboard('{Escape}');
					await expectClosed(trigger);
				}
			);
		}
	}
};

/** Thirty layers: far taller than the space either side of a trigger in the middle of the screen. */
const LayerList = () => (
	<div className='grid gap-1'>
		{Array.from({ length: 30 }, (_, index) => (
			<Button key={index} variant='ghost' size='sm' className='justify-start'>
				Layer {index + 1}
			</Button>
		))}
	</div>
);

/** A row of swatches far wider than the space either side of a trigger in the middle of the screen. */
const SwatchRow = () => (
	<div className='flex w-max gap-2'>
		{Array.from({ length: 24 }, (_, index) => (
			<Button key={index} variant='outline' size='sm'>
				Swatch {index + 1}
			</Button>
		))}
	</div>
);

/**
 * When neither side has room, a popover stays on the side it asked for and shrinks to the space
 * there, scrolling inside. It never runs off the screen and never covers its trigger.
 */
export const NoRoomOnEitherSide: Story = {
	parameters: { layout: 'fullscreen' },
	render: () => (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline' className='fixed inset-0 m-auto size-fit'>
						Too tall for either side
					</Button>
				</PopoverTrigger>
				<PopoverContent side='bottom' title='Layers'>
					<LayerList />
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline' className='fixed inset-x-0 top-16 mx-auto w-fit'>
						Too wide for either side
					</Button>
				</PopoverTrigger>
				<PopoverContent side='left' title='Swatches' className='w-auto'>
					<SwatchRow />
				</PopoverContent>
			</Popover>
		</>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		/** The part of a titled popover that scrolls, found by its published `data-slot`. */
		const bodyOf = (content: HTMLElement) =>
			waitFor(() => {
				const body = content.querySelector<HTMLElement>('[data-slot="popover-body"]');
				if (!body) throw new Error('The popover rendered no body');
				return body;
			});

		await step('Too tall: it stays below, shrinks to fit, and only the body scrolls', async () => {
			const trigger = canvas.getByRole('button', { name: /too tall/i });
			const content = await openPopover(canvasElement, /too tall/i);
			const body = await bodyOf(content);

			await waitFor(() => {
				expectPlacedOn(content, trigger, 'bottom');
				expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
			});

			// Scrolled to the end, the title has not moved: the header stays put while the body scrolls.
			const title = within(content).getByText('Layers');
			const titleTop = title.getBoundingClientRect().top;

			body.scrollTop = body.scrollHeight;
			await waitFor(() => expect(body.scrollTop).toBeGreaterThan(0));
			await expect(title.getBoundingClientRect().top).toBe(titleTop);

			await userEvent.keyboard('{Escape}');
			await expectClosed(trigger);
		});

		await step(
			'Too wide: it stays on the left, shrinks to fit, and only the body scrolls',
			async () => {
				const trigger = canvas.getByRole('button', { name: /too wide/i });
				const content = await openPopover(canvasElement, /too wide/i);
				const body = await bodyOf(content);

				await waitFor(() => {
					expectPlacedOn(content, trigger, 'left');
					expect(body.scrollWidth).toBeGreaterThan(body.clientWidth);
				});
			}
		);
	}
};
