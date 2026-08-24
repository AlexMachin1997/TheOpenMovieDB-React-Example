import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import { Button, Alert, AlertDescription, AlertTitle } from '@repo/ui-core';
import {
	Dialog,
	DialogContent,
	DialogContentArea,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from '~/components/Dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '~/components/DropdownMenu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/HoverCard';

const meta: Meta<typeof Dialog> = {
	title: 'UI Overlays/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
		// Promoted from the global `todo` deliberately. Radix requires every dialog to have an
		// accessible name, and nothing in the component enforces it — so axe is what enforces it.
		// A Title rendered outside the content, or omitted, fails `aria-dialog-name` here rather
		// than shipping silently.
		a11y: { test: 'error' }
	},
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Controls the open state of the dialog'
		},
		onOpenChange: {
			action: 'onOpenChange',
			description: 'Called when the dialog open state changes'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Open a story's dialog and confirm the accessible name reached the rendered element.
 *
 * Every Dialog story calls this. The `a11y: { test: 'error' }` gate above only inspects what is
 * rendered, and a closed `<dialog>` is `display: none` — so before these existed the gate was
 * running against a page with no dialog on it at all and passing for that reason.
 */
const openDialog = async (canvasElement: HTMLElement, trigger: RegExp, name: RegExp) => {
	const canvas = within(canvasElement);

	await userEvent.click(canvas.getByRole('button', { name: trigger }));

	const dialog = await within(document.body).findByRole('dialog');
	await expect(dialog).toHaveAccessibleName(name);

	return dialog;
};

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Default Dialog</DialogTitle>
					<DialogDescription>
						This dialog now has fixed header/footer with scrollable content by default.
					</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<div className='space-y-4'>
						<p>This is the main content area that will scroll if needed.</p>
						<p>
							You can add any content here and it will be scrollable while keeping the header and
							footer fixed.
						</p>
					</div>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement, step }) => {
		const dialog = await openDialog(canvasElement, /open dialog/i, /default dialog/i);

		await step('the page behind the dialog is locked, and does not shift', async () => {
			await expect(document.body).toHaveStyle({ overflow: 'hidden' });
		});

		await step('a backdrop click dismisses', async () => {
			// Dispatched on the element rather than driven through `userEvent`, because that is the
			// distinction being tested: the panel is a child, so a click that lands on the `<dialog>`
			// itself is by definition a click outside the panel. `userEvent.click` aims at the centre
			// of the element, which is where the panel is.
			fireEvent.click(dialog);

			await waitFor(async () => {
				await expect(dialog).toHaveAttribute('data-state', 'closed');
			});
		});

		await step('and the page is released once it has finished closing', async () => {
			await waitFor(async () => {
				await expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
			});
		});
	}
};

export const ConfirmationDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive'>Delete Account</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<Alert variant='destructive'>
						<AlertTitle>This action cannot be undone.</AlertTitle>
						<AlertDescription>
							This will permanently delete your account and remove your data from our servers.
						</AlertDescription>
					</Alert>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button variant='destructive'>Delete Account</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /delete account/i, /are you absolutely sure/i);
	}
};

export const LongContentDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>View Long Content</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Terms and Conditions</DialogTitle>
					<DialogDescription>Please read our terms and conditions carefully.</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<div className='space-y-4'>
						<section>
							<h3 className='font-semibold mb-2'>1. Acceptance of Terms</h3>
							<p className='text-sm text-muted-foreground'>
								By accessing and using this website, you accept and agree to be bound by the terms
								and provision of this agreement.
							</p>
						</section>
						<section>
							<h3 className='font-semibold mb-2'>2. Use License</h3>
							<p className='text-sm text-muted-foreground'>
								Permission is granted to temporarily download one copy of the materials (information
								or software) on this website for personal, non-commercial transitory viewing only.
							</p>
						</section>
						<section>
							<h3 className='font-semibold mb-2'>3. Disclaimer</h3>
							<p className='text-sm text-muted-foreground'>
								The materials on this website are provided on an &apos;as is&apos; basis. We make no
								warranties, expressed or implied, and hereby disclaim and negate all other
								warranties including without limitation, implied warranties or conditions of
								merchantability, fitness for a particular purpose, or non-infringement of
								intellectual property or other violation of rights.
							</p>
						</section>
						<section>
							<h3 className='font-semibold mb-2'>4. Limitations</h3>
							<p className='text-sm text-muted-foreground'>
								In no event shall we or our suppliers be liable for any damages (including, without
								limitation, damages for loss of data or profit, or due to business interruption)
								arising out of the use or inability to use the materials on this website.
							</p>
						</section>
						<section>
							<h3 className='font-semibold mb-2'>5. Revisions and Errata</h3>
							<p className='text-sm text-muted-foreground'>
								The materials appearing on this website could include technical, typographical, or
								photographic errors. We do not warrant that any of the materials on this website are
								accurate, complete or current.
							</p>
						</section>
						<section>
							<h3 className='font-semibold mb-2'>6. Links</h3>
							<p className='text-sm text-muted-foreground'>
								We have not reviewed all of the sites linked to this website and are not responsible
								for the contents of any such linked site. The inclusion of any link does not imply
								endorsement by us of the site.
							</p>
						</section>
					</div>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Decline</Button>
					</DialogClose>
					<Button>Accept Terms</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /view long content/i, /terms and conditions/i);
	}
};

export const WithoutCloseButton: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Show Important Message</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Important Notice</DialogTitle>
					<DialogDescription>This dialog requires explicit user action to close.</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<p>This is an important message that requires user acknowledgment.</p>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button>I Understand</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /show important message/i, /important notice/i);
	}
};

export const CustomStyledDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Custom Styled Dialog</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[500px] bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200'>
				<DialogHeader className='text-center border-blue-200'>
					<DialogTitle className='text-2xl font-bold text-blue-900'>
						Welcome to Our Platform
					</DialogTitle>
					<DialogDescription className='text-blue-700'>
						We&apos;re excited to have you here! Let&apos;s get started.
					</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<div className='text-center'>
						<div className='w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center'>
							<span className='text-white text-2xl'></span>
						</div>
						<p className='text-blue-800'>
							Your account has been successfully created. You can now explore all the features
							available on our platform.
						</p>
					</div>
				</DialogContentArea>
				<DialogFooter className='justify-center border-blue-200'>
					<DialogClose asChild>
						<Button className='bg-blue-600 hover:bg-blue-700'>Get Started</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /custom styled dialog/i, /welcome to our platform/i);
	}
};

export const AlertDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive'>Show Alert</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[400px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<span className='text-red-500'>⚠️</span>
						Warning
					</DialogTitle>
					<DialogDescription>
						You are about to perform an action that cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<Alert variant='destructive'>
						<AlertTitle>This action cannot be undone.</AlertTitle>
						<AlertDescription>
							This will permanently delete your account and remove your data from our servers.
						</AlertDescription>
					</Alert>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button variant='destructive'>Delete Permanently</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /show alert/i, /warning/i);
	}
};

export const SuccessDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Show Success</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[400px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<span className='text-green-500'>✅</span>
						Success!
					</DialogTitle>
					<DialogDescription>Your action has been completed successfully.</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<div className='py-4 text-center'>
						<div className='w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center'>
							<span className='text-green-600 text-xl'>✓</span>
						</div>
						<p className='text-green-800'>
							Your profile has been updated successfully. All changes have been saved.
						</p>
					</div>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button className='bg-green-700 hover:bg-green-800'>Continue</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /show success/i, /success/i);
	}
};

const LoadingDialogComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsLoading(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Process Data</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Processing Data</DialogTitle>
					<DialogDescription>Please wait while we process your request.</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					{isLoading ? (
						<div className='space-y-4'>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
							<p className='text-sm text-muted-foreground'>Processing...</p>
						</div>
					) : (
						<p>Ready to process your data.</p>
					)}
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline' disabled={isLoading}>
							Cancel
						</Button>
					</DialogClose>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? 'Processing...' : 'Start Processing'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export const LoadingDialog: Story = {
	render: () => <LoadingDialogComponent />,
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /process data/i, /processing data/i);
	}
};

export const NestedDialogs: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open Parent Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Parent Dialog</DialogTitle>
					<DialogDescription>This dialog contains another dialog inside it.</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<div className='py-4'>
						<p>This is the parent dialog content.</p>
						<div className='mt-4'>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant='outline' size='sm'>
										Open Nested Dialog
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Nested Dialog</DialogTitle>
										<DialogDescription>
											This is a dialog nested inside another dialog.
										</DialogDescription>
									</DialogHeader>
									<DialogContentArea>
										<div className='py-4'>
											<p>Nested dialog content goes here.</p>
										</div>
									</DialogContentArea>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant='outline'>Close</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Close Parent</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ step }) => {
		const documentScope = within(document.body);

		const openDialog = async (name: RegExp, expected: number) => {
			await userEvent.click(await documentScope.findByRole('button', { name }));
			await waitFor(async () => {
				await expect(documentScope.getAllByRole('dialog')).toHaveLength(expected);
			});
		};

		await step('both dialogs open, and stack', async () => {
			await openDialog(/open parent dialog/i, 1);
			await openDialog(/open nested dialog/i, 2);
		});

		await step('closing the nested dialog leaves the parent open', async () => {
			const [, nested] = documentScope.getAllByRole('dialog');
			// Scoped to the footer on purpose: the floating X is also named "Close", so an unscoped
			// query matches both.
			const footer = nested!.querySelector<HTMLElement>('[data-slot="dialog-footer"]');
			await userEvent.click(within(footer!).getByRole('button', { name: /^close$/i }));

			await waitFor(async () => {
				await expect(documentScope.getAllByRole('dialog')).toHaveLength(1);
			});
			await expect(documentScope.getByRole('heading', { name: /parent dialog/i })).toBeVisible();
		});

		await step('Escape closes only the topmost', async () => {
			await openDialog(/open nested dialog/i, 2);
			await userEvent.keyboard('{Escape}');

			await waitFor(async () => {
				await expect(documentScope.getAllByRole('dialog')).toHaveLength(1);
			});
			await expect(documentScope.getByRole('heading', { name: /parent dialog/i })).toBeVisible();
		});
	}
};

const AnchoredContentDialog = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Button variant='outline'>Open Dialog</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Anchored surfaces inside a modal</DialogTitle>
				<DialogDescription>
					A menu and a hover card, both opened from inside the dialog.
				</DialogDescription>
			</DialogHeader>
			<DialogContentArea>
				<div className='flex gap-2 py-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Rename</DropdownMenuItem>
							<DropdownMenuItem>Duplicate</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<HoverCard openDelay={0} closeDelay={0}>
						<HoverCardTrigger asChild>
							<Button variant='outline'>Hover Target</Button>
						</HoverCardTrigger>
						<HoverCardContent>Preview content</HoverCardContent>
					</HoverCard>
				</div>
			</DialogContentArea>
		</DialogContent>
	</Dialog>
);

export const AnchoredContentInsideADialog: Story = {
	render: () => <AnchoredContentDialog />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);

		await userEvent.click(canvas.getByRole('button', { name: /open dialog/i }));
		const dialog = await documentScope.findByRole('dialog');

		// These assert *where* the content landed, which is a DOM detail and deliberately so. A
		// modal dialog paints in the top layer and makes everything outside it inert, so anchored
		// content portalled to `document.body` still renders and still looks right in a screenshot
		// while sitting behind the backdrop and refusing every click. No behavioural assertion
		// catches that; containment does.
		// The hover card goes first and the menu last, so neither needs dismissing. A Radix menu is
		// modal and disables pointer events outside itself, so hovering anything while one is open
		// does nothing — and closing it with Escape closes the dialog too once the menu has already
		// gone, which is a race rather than a behaviour worth asserting.
		await step('a hover card opened inside the dialog is portalled into it', async () => {
			await userEvent.hover(within(dialog).getByRole('button', { name: /hover target/i }));

			await waitFor(async () => {
				const card = document.querySelector('[data-slot="hover-card-content"]');
				await expect(card).not.toBeNull();
				await expect(dialog.contains(card)).toBe(true);
			});
		});

		await step('and so is a menu', async () => {
			await userEvent.click(within(dialog).getByRole('button', { name: /open menu/i }));

			const menu = await documentScope.findByRole('menu');
			await expect(dialog.contains(menu)).toBe(true);
		});
	}
};

const GuardedDialog = () => {
	const [refused, setRefused] = React.useState<string[]>([]);
	const [locked, setLocked] = React.useState(true);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open Guarded Dialog</Button>
			</DialogTrigger>
			<DialogContent
				title='Unsaved changes'
				description='Every route out is refused while this is locked.'
				onRequestClose={(event) => {
					setRefused((seen) => [...seen, event.source]);
					if (locked) event.preventDefault();
				}}
				footer={<Button onClick={() => setLocked(false)}>Allow closing</Button>}
			>
				<p>
					Refused so far: <span>{refused.join(', ') || 'nothing yet'}</span>
				</p>
			</DialogContent>
		</Dialog>
	);
};

export const GuardedClose: Story = {
	render: () => <GuardedDialog />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);

		await userEvent.click(canvas.getByRole('button', { name: /open guarded dialog/i }));
		const dialog = (await documentScope.findByRole('dialog')) as HTMLDialogElement;

		// Asserted on the element's own `open` property, not just on `data-state`. A veto has to
		// leave the dialog *genuinely* open — visually open but internally closed is the failure
		// this is guarding against, and only the DOM property tells the two apart.
		const stillOpen = async () => {
			await expect(dialog).toHaveAttribute('data-state', 'open');
			await expect(dialog.open).toBe(true);
		};

		await step('Escape is refused', async () => {
			await userEvent.keyboard('{Escape}');
			await stillOpen();
		});

		await step('the close button is refused', async () => {
			await userEvent.click(within(dialog).getByRole('button', { name: /close/i }));
			await stillOpen();
		});

		await step('backdrop dismissal is refused', async () => {
			fireEvent.click(dialog);
			await stillOpen();
		});

		await step('all three routes reached the one handler', async () => {
			await expect(dialog).toHaveTextContent('escape');
			await expect(dialog).toHaveTextContent('close-button');
			await expect(dialog).toHaveTextContent('backdrop');
		});

		await step('and the same routes close it once the guard lifts', async () => {
			await userEvent.click(within(dialog).getByRole('button', { name: /allow closing/i }));
			await userEvent.keyboard('{Escape}');

			await waitFor(async () => {
				await expect(dialog).toHaveAttribute('data-state', 'closed');
			});
		});
	}
};

const ControlledDialogComponent = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<div className='space-y-4'>
			<div className='flex gap-2'>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Button variant='outline' onClick={() => setOpen(false)}>
					Close Dialog
				</Button>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Manually Controlled Dialog</DialogTitle>
						<DialogDescription>
							This dialog is controlled by React state. You can open and close it programmatically.
						</DialogDescription>
					</DialogHeader>
					<DialogContentArea>
						<p>Current state: {open ? 'Open' : 'Closed'}</p>
						<p>You can control this dialog from outside without using DialogTrigger.</p>
					</DialogContentArea>
					<DialogFooter>
						<Button variant='outline' onClick={() => setOpen(false)}>
							Close
						</Button>
						<Button onClick={() => setOpen(false)}>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export const ControlledDialog: Story = {
	render: () => <ControlledDialogComponent />,
	play: async ({ canvasElement }) => {
		await openDialog(canvasElement, /^open dialog$/i, /manually controlled dialog/i);
	}
};
