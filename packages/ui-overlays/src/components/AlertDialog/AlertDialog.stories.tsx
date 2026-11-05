import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, fn, userEvent, waitFor, within } from 'storybook/test';
import { Alert, AlertDescription, AlertTitle, Button, Icon } from '@repo/ui-core';

import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogTrigger
} from '~/components/AlertDialog';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '~/components/Sheet';

const meta: Meta<typeof AlertDialog> = {
	title: 'UI Overlays/AlertDialog',
	component: AlertDialog,
	parameters: {
		layout: 'centered',
		// Promoted from the global `todo`, as Dialog's and Sheet's metas are.
		a11y: { test: 'error' }
	},
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Controls the open state of the alert dialog'
		},
		onOpenChange: {
			action: 'onOpenChange',
			description: 'Called when the alert dialog open state changes'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Open a story's alert dialog and confirm the two things every one of them must get right.
 *
 * Queried as `alertdialog` rather than `dialog`, which is the assertion: the role is read off the
 * accessibility tree, so a markup change that lost it fails here and not only in the axe gate.
 */
const openAlertDialog = async (canvasElement: HTMLElement, trigger: RegExp, name: RegExp) => {
	const canvas = within(canvasElement);

	await userEvent.click(canvas.getByRole('button', { name: trigger }));

	const alertDialog = await within(document.body).findByRole<HTMLDialogElement>('alertdialog');
	await expect(alertDialog).toHaveAccessibleName(name);

	return alertDialog;
};

/**
 * A refusal has to leave the overlay *genuinely* open. Visually open but internally closed is the
 * failure these assertions exist to catch, and only the element's own `open` property tells the two
 * apart.
 */
const expectStillOpen = async (alertDialog: HTMLDialogElement) => {
	await expect(alertDialog).toHaveAttribute('data-state', 'open');
	await expect(alertDialog.open).toBe(true);
};

/* -------------------------------------------------------------------------------------------------
 * The plain case
 * ---------------------------------------------------------------------------------------------- */

/**
 * One question, two answers. This is `Dialog`'s former `ConfirmationDialog`, which had to assemble
 * the same thing by hand out of a title, a description and a footer — and still shipped with
 * `role="dialog"`, an `X`, and a backdrop that dismissed it.
 *
 * Note what the `cancel` slot is: a bare `Button`. It dismisses the overlay without being wrapped in
 * `AlertDialogClose`, because naming the slot tells the component which action is the cancel. The
 * confirming action is wrapped, because closing after it runs is the caller's decision.
 */
export const Default: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive'>Delete account</Button>
			</AlertDialogTrigger>
			<AlertDialogContent
				title='Are you absolutely sure?'
				description='This will permanently delete your account and remove your data from our servers. This action cannot be undone.'
				cancel={<Button variant='outline'>Keep my account</Button>}
				confirm={
					<AlertDialogClose asChild>
						<Button variant='destructive'>Delete account</Button>
					</AlertDialogClose>
				}
			/>
		</AlertDialog>
	),
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogTrigger
} from '@repo/ui-overlays';
import { Button } from '@repo/ui-core';

<AlertDialog>
	<AlertDialogTrigger asChild>
		<Button variant='destructive'>Delete account</Button>
	</AlertDialogTrigger>
	<AlertDialogContent
		title='Are you absolutely sure?'
		description='This will permanently delete your account and remove your data from our servers. This action cannot be undone.'
		cancel={<Button variant='outline'>Keep my account</Button>}
		confirm={
			<AlertDialogClose asChild>
				<Button variant='destructive' onClick={() => deleteAccount()}>
					Delete account
				</Button>
			</AlertDialogClose>
		}
	/>
</AlertDialog>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const alertDialog = await openAlertDialog(
			canvasElement,
			/^delete account$/i,
			/are you absolutely sure/i
		);
		const scope = within(alertDialog);

		await step('it is described as well as named — the APG pattern requires both', async () => {
			await expect(alertDialog).toHaveAccessibleDescription(/cannot be undone/i);
		});

		await step('there is no close button, and nothing else to press either', async () => {
			await expect(scope.queryByRole('button', { name: /^close$/i })).not.toBeInTheDocument();
			await expect(scope.getAllByRole('button')).toHaveLength(2);
		});

		await step('focus is on the cancelling action, so a reflexive Enter backs out', async () => {
			await expect(scope.getByRole('button', { name: /keep my account/i })).toHaveFocus();
		});

		await step('and that action dismisses, unwrapped', async () => {
			await userEvent.click(scope.getByRole('button', { name: /keep my account/i }));

			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'closed');
			});
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Dismissal
 * ---------------------------------------------------------------------------------------------- */

/**
 * The one route an alert dialog refuses, and the one it does not.
 *
 * `showModal()` never dismissed on a backdrop click — the shared surface added that by hand, so this
 * component opts back out of it. There is no prop to configure that: a stray click is the accidental
 * way out, and an alert dialog is the one overlay where losing the question by accident matters.
 */
export const BackdropIsRefused: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive'>Discard draft</Button>
			</AlertDialogTrigger>
			<AlertDialogContent
				title='Discard this draft?'
				description='The draft and everything typed into it will be thrown away.'
				cancel={<Button variant='outline'>Keep editing</Button>}
				confirm={
					<AlertDialogClose asChild>
						<Button variant='destructive'>Discard</Button>
					</AlertDialogClose>
				}
			/>
		</AlertDialog>
	),
	play: async ({ canvasElement, step }) => {
		const alertDialog = await openAlertDialog(
			canvasElement,
			/discard draft/i,
			/discard this draft/i
		);

		await step('a backdrop click leaves it genuinely open', async () => {
			/*
			 * The panel is a child, so a click landing on the `<dialog>` itself is a click outside it.
			 * `userEvent.click` aims at the element's centre, which is where the panel is.
			 */
			fireEvent.click(alertDialog);

			await expectStillOpen(alertDialog);
		});

		await step('and the actions still work afterwards', async () => {
			await userEvent.click(within(alertDialog).getByRole('button', { name: /keep editing/i }));

			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'closed');
			});
		});
	}
};

const confirmDeletion = fn();

/**
 * Both ways out, side by side, so "Escape has the same effect as cancel" is checked rather than
 * asserted in prose: neither route runs the confirming action, and both leave the same state behind.
 */
const EscapableAlertDialog = () => {
	const [deleted, setDeleted] = React.useState(false);

	return (
		<div className='flex flex-col items-start gap-4'>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant='destructive'>Delete project</Button>
				</AlertDialogTrigger>
				<AlertDialogContent
					title='Delete this project?'
					description='Everything in it goes too. This cannot be undone.'
					cancel={<Button variant='outline'>Keep it</Button>}
					confirm={
						<AlertDialogClose asChild>
							<Button
								variant='destructive'
								onClick={() => {
									confirmDeletion();
									setDeleted(true);
								}}
							>
								Delete
							</Button>
						</AlertDialogClose>
					}
				/>
			</AlertDialog>
			<p className='text-muted-foreground text-sm'>
				{deleted ? 'Project deleted.' : 'Project intact.'}
			</p>
		</div>
	);
};

export const EscapeCancels: Story = {
	render: () => <EscapableAlertDialog />,
	beforeEach: () => {
		confirmDeletion.mockClear();
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole('button', { name: /delete project/i });
		const alertDialog = await openAlertDialog(
			canvasElement,
			/delete project/i,
			/delete this project/i
		);

		await step('Escape closes it', async () => {
			await userEvent.keyboard('{Escape}');

			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'closed');
			});
		});

		await step('nothing was confirmed', async () => {
			await expect(confirmDeletion).not.toHaveBeenCalled();
			await expect(canvas.getByText('Project intact.')).toBeInTheDocument();
		});

		await step('and pressing cancel reaches exactly the same state', async () => {
			await userEvent.click(trigger);
			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'open');
			});

			await userEvent.click(within(alertDialog).getByRole('button', { name: /keep it/i }));

			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'closed');
			});
			await expect(confirmDeletion).not.toHaveBeenCalled();
			await expect(canvas.getByText('Project intact.')).toBeInTheDocument();
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * Nesting
 * ---------------------------------------------------------------------------------------------- */

/**
 * The shape `Sheet`'s `WithConfirmationDialog` reaches for, with the confirmation now being the
 * component built for it.
 *
 * Nesting works because `useDialogElement` guards on `event.target !== event.currentTarget`: React
 * collects `onCancel` and `onClose` from every ancestor with the prop even though the DOM events do
 * not bubble, so without that guard the inner overlay closing would close the sheet around it.
 */
export const InsideASheet: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Edit settings</Button>
			</SheetTrigger>
			<SheetContent
				title='Project settings'
				description='Change the name, or delete the project entirely.'
				footer={
					<SheetClose asChild>
						<Button variant='outline'>Done</Button>
					</SheetClose>
				}
			>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant='destructive'>Delete project</Button>
					</AlertDialogTrigger>
					<AlertDialogContent
						title='Delete this project?'
						description='Everything in it goes too. This cannot be undone.'
						cancel={<Button variant='outline'>Keep it</Button>}
						confirm={
							<AlertDialogClose asChild>
								<Button variant='destructive'>Delete</Button>
							</AlertDialogClose>
						}
					/>
				</AlertDialog>
			</SheetContent>
		</Sheet>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);

		await userEvent.click(canvas.getByRole('button', { name: /edit settings/i }));
		const sheet = (await documentScope.findByRole('dialog')) as HTMLDialogElement;

		await step('the alert dialog opens on top of the sheet', async () => {
			await userEvent.click(within(sheet).getByRole('button', { name: /delete project/i }));

			const alertDialog = (await documentScope.findByRole('alertdialog')) as HTMLDialogElement;
			await expectStillOpen(alertDialog);
			await expectStillOpen(sheet);
		});

		await step('Escape closes only the alert dialog', async () => {
			await userEvent.keyboard('{Escape}');

			await waitFor(async () => {
				await expect(documentScope.queryByRole('alertdialog')).not.toBeInTheDocument();
			});
			await expectStillOpen(sheet);
		});

		await step('and so does its cancelling action', async () => {
			await userEvent.click(within(sheet).getByRole('button', { name: /delete project/i }));
			const alertDialog = await documentScope.findByRole('alertdialog');

			await userEvent.click(within(alertDialog).getByRole('button', { name: /keep it/i }));

			await waitFor(async () => {
				await expect(documentScope.queryByRole('alertdialog')).not.toBeInTheDocument();
			});
			await expectStillOpen(sheet);
		});
	}
};

/* -------------------------------------------------------------------------------------------------
 * What the component deliberately does not do
 *
 * Three cases a caller actually hits, none of which the component has a prop for: a slow action, a
 * gated action, and a failed one. They are here as acceptance criteria rather than as documentation
 * extras, because they are what the spec declined to build features for.
 * ---------------------------------------------------------------------------------------------- */

/**
 * A confirming action that takes time, held together by two lines of ordinary React.
 *
 * `disabled` on the caller's own `Button` stops a second submission; `onRequestClose` with
 * `preventDefault()` stops the overlay going anywhere while the request is in flight. **Both halves
 * are needed.** The cancelling action dismisses automatically, so without the veto a user can cancel
 * out from under their own request and watch the dialog vanish while the delete carries on.
 *
 * Note what is *not* here: no `pending` prop, no promise contract, no spinner the component owns.
 * `Button` already takes `disabled`, and a contract would have needed its own answer for a
 * rejection, for a close arriving mid-flight and for a programmatic one.
 */
const SlowAlertDialog = () => {
	const [isDeleting, setIsDeleting] = React.useState(false);
	const [deleted, setDeleted] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		await new Promise((resolve) => setTimeout(resolve, 300));
		setIsDeleting(false);
		setDeleted(true);
		setOpen(false);
	};

	return (
		<div className='flex flex-col items-start gap-4'>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger asChild>
					<Button variant='destructive'>Delete workspace</Button>
				</AlertDialogTrigger>
				<AlertDialogContent
					title='Delete this workspace?'
					description='Every project in it is deleted too. This cannot be undone.'
					onRequestClose={(event) => {
						if (isDeleting) event.preventDefault();
					}}
					cancel={
						<Button variant='outline' disabled={isDeleting}>
							Keep it
						</Button>
					}
					confirm={
						<Button variant='destructive' disabled={isDeleting} onClick={handleDelete}>
							{isDeleting ? 'Deleting…' : 'Delete workspace'}
						</Button>
					}
				/>
			</AlertDialog>
			<p className='text-muted-foreground text-sm'>
				{deleted ? 'Workspace deleted.' : 'Workspace active.'}
			</p>
		</div>
	);
};

export const SlowConfirmingAction: Story = {
	render: () => <SlowAlertDialog />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const alertDialog = await openAlertDialog(
			canvasElement,
			/delete workspace/i,
			/delete this workspace/i
		);
		const scope = within(alertDialog);

		await step('the request starts, and both actions go disabled', async () => {
			await userEvent.click(scope.getByRole('button', { name: /^delete workspace$/i }));

			await waitFor(async () => {
				await expect(scope.getByRole('button', { name: /deleting/i })).toBeDisabled();
			});
			await expect(scope.getByRole('button', { name: /keep it/i })).toBeDisabled();
		});

		await step('Escape is refused while it is in flight', async () => {
			await userEvent.keyboard('{Escape}');

			await expectStillOpen(alertDialog);
		});

		await step('and once it settles the caller closes the dialog itself', async () => {
			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'closed');
			});
			await expect(canvas.getByText('Workspace deleted.')).toBeInTheDocument();
		});
	}
};

const CONFIRMATION_PHRASE = 'delete';

/**
 * A confirming action gated behind a type-to-confirm input — `Sheet`'s former `Confirmation`, moved
 * here because a confirmation is centred and small and a sheet is neither.
 *
 * The gate is ordinary React: `confirmed` drives `disabled`, and nothing about the overlay is
 * involved. What *has* gone is the sheet's `onRequestClose` guard on Escape. It was there because a
 * sheet dismisses on a stray click or key and losing a half-finished destructive flow to one is
 * worth preventing — an alert dialog already refuses the backdrop, and refusing Escape as well would
 * leave a dialog with no obvious way out, which is what makes a guarded overlay feel broken.
 */
const TypeToConfirmAlertDialog = () => {
	const [confirmation, setConfirmation] = React.useState('');
	const [deleted, setDeleted] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const confirmed = confirmation.trim().toLowerCase() === CONFIRMATION_PHRASE;

	return (
		<div className='flex flex-col items-start gap-4'>
			<AlertDialog
				open={open}
				onOpenChange={(next) => {
					setOpen(next);

					// Opening starts the flow over. Without this it reopens already confirmed.
					if (next) setConfirmation('');
				}}
			>
				<AlertDialogTrigger asChild>
					<Button variant='destructive'>Delete repository</Button>
				</AlertDialogTrigger>
				<AlertDialogContent
					title='Delete this repository?'
					description='Every branch, issue and release goes with it. This cannot be undone.'
					cancel={<Button variant='outline'>Cancel</Button>}
					confirm={
						<Button
							variant='destructive'
							disabled={!confirmed}
							onClick={() => {
								setDeleted(true);
								setOpen(false);
							}}
						>
							Delete repository
						</Button>
					}
				>
					<div className='grid gap-2'>
						<label htmlFor='delete-confirmation' className='text-muted-foreground text-sm'>
							Type <span className='font-mono font-medium'>{CONFIRMATION_PHRASE}</span> to confirm.
						</label>
						<input
							id='delete-confirmation'
							value={confirmation}
							onChange={(event) => setConfirmation(event.target.value)}
							className='w-full rounded-md border px-3 py-2'
						/>
					</div>
				</AlertDialogContent>
			</AlertDialog>
			<p className='text-muted-foreground text-sm'>
				{deleted ? 'Repository deleted.' : 'Repository active.'}
			</p>
		</div>
	);
};

export const TypeToConfirm: Story = {
	render: () => <TypeToConfirmAlertDialog />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const alertDialog = await openAlertDialog(
			canvasElement,
			/delete repository/i,
			/delete this repository/i
		);
		const scope = within(alertDialog);
		const phrase = () => scope.getByLabelText(/type .* to confirm/i);
		const action = () => scope.getByRole('button', { name: /^delete repository$/i });

		await step('the confirming action starts disabled', async () => {
			await expect(action()).toBeDisabled();
		});

		await step('a partial phrase unlocks nothing', async () => {
			await userEvent.type(phrase(), 'delet');

			await expect(action()).toBeDisabled();
		});

		await step('the dialog stays usable throughout — the backdrop is still refused', async () => {
			fireEvent.click(alertDialog);

			await expectStillOpen(alertDialog);
			await expect(phrase()).toHaveValue('delet');
		});

		await step('completing the phrase releases the gate', async () => {
			await userEvent.type(phrase(), 'e');

			await waitFor(async () => {
				await expect(action()).toBeEnabled();
			});
		});

		await step('and the action runs and closes the dialog', async () => {
			await userEvent.click(action());

			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'closed');
			});
			await expect(canvas.getByText('Repository deleted.')).toBeInTheDocument();
		});
	}
};

/**
 * A confirming action that fails. The overlay stays open and the component says nothing — both
 * deliberate.
 *
 * **Closing would read as success.** The user confirmed something destructive, it failed, and a
 * dialog that vanished would tell them it worked.
 *
 * **Where the failure is reported is the application's decision**, so the region below belongs to
 * the caller rather than to the component. A toast, a page-level banner and this inline message are
 * all legitimate, and there is no `Toast` in this library anyway. It is modelled on
 * [`FormError`](?path=/docs/ui-forms-formerror--docs), including the trap that matters most: the
 * live region is rendered **unconditionally** and only its contents come and go. Assistive
 * technology has to have seen the region before it becomes live, so `{error && <div aria-live…>}`
 * announces nothing.
 *
 * **Do not swap the `description` instead.** `aria-describedby` is resolved when focus arrives, not
 * on mutation, so a screen-reader user would never hear the new text.
 */
const FailingAlertDialog = () => {
	const [error, setError] = React.useState<string | undefined>(undefined);
	const [attempts, setAttempts] = React.useState(0);
	const [archived, setArchived] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const handleArchive = () => {
		// The first attempt fails, the second succeeds — enough to show both halves of the pattern.
		if (attempts === 0) {
			setAttempts(1);
			setError('The server refused the request. Nothing was archived.');
			return;
		}

		setError(undefined);
		setArchived(true);
		setOpen(false);
	};

	return (
		<div className='flex flex-col items-start gap-4'>
			<AlertDialog
				open={open}
				onOpenChange={(next) => {
					setOpen(next);

					if (next) {
						setAttempts(0);
						setError(undefined);
					}
				}}
			>
				<AlertDialogTrigger asChild>
					<Button variant='destructive'>Archive channel</Button>
				</AlertDialogTrigger>
				<AlertDialogContent
					title='Archive this channel?'
					description='Nobody can post in it again, and it drops out of search.'
					cancel={<Button variant='outline'>Leave it open</Button>}
					confirm={
						<Button variant='destructive' onClick={handleArchive}>
							Archive
						</Button>
					}
				>
					{/*
					 * Mounted whether or not there is anything to say, so assistive technology has seen
					 * the region before it becomes live. Only the spacing is conditional. `role` is
					 * cleared below because `Alert` hardcodes `role='alert'`, itself an assertive live
					 * region, and nesting one inside this one announces the message twice.
					 */}
					<div
						aria-live='assertive'
						aria-atomic='true'
						className={error === undefined ? undefined : 'mb-1'}
					>
						{error !== undefined && (
							<Alert variant='error' role={undefined}>
								<Icon name='x-circle' />
								<AlertTitle>Could not archive the channel</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
					</div>
				</AlertDialogContent>
			</AlertDialog>
			<p className='text-muted-foreground text-sm'>
				{archived ? 'Channel archived.' : 'Channel open.'}
			</p>
		</div>
	);
};

export const FailedAction: Story = {
	render: () => <FailingAlertDialog />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const alertDialog = await openAlertDialog(
			canvasElement,
			/archive channel/i,
			/archive this channel/i
		);
		const scope = within(alertDialog);

		await step('the live region is mounted before it has anything to say', async () => {
			const region = alertDialog.querySelector('[aria-live="assertive"]');

			await expect(region).not.toBeNull();
			await expect(region).toBeEmptyDOMElement();
		});

		await step('a failed action leaves the dialog open and reports itself', async () => {
			await userEvent.click(scope.getByRole('button', { name: /^archive$/i }));

			const message = await scope.findByText(/the server refused the request/i);

			/*
			 * Through `waitFor`: the panel arrives on a 200ms fade, and `toBeVisible` fails while an
			 * ancestor's computed opacity is exactly 0, which the first frame of that fade is.
			 */
			await waitFor(async () => {
				await expect(message).toBeVisible();
			});
			await expectStillOpen(alertDialog);
			await expect(canvas.getByText('Channel open.')).toBeInTheDocument();
		});

		await step('retrying from the same open dialog succeeds', async () => {
			await userEvent.click(scope.getByRole('button', { name: /^archive$/i }));

			await waitFor(async () => {
				await expect(alertDialog).toHaveAttribute('data-state', 'closed');
			});
			await expect(canvas.getByText('Channel archived.')).toBeInTheDocument();
		});
	}
};
