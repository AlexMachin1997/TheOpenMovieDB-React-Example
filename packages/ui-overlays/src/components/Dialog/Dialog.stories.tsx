import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, fn, userEvent, waitFor, within } from 'storybook/test';
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
import type { DialogRef } from '~/components/Dialog';
import type { OverlayCloseSource } from '~/components/Overlay/types/overlay-ref';
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
		// Promoted from the global `todo` deliberately. A native `<dialog>` carries `role="dialog"`
		// from the moment it exists, so one with no accessible name fails `aria-dialog-name` here
		// rather than shipping silently. Every story below opens its overlay: a closed `<dialog>` is
		// `display: none`, and axe reports nothing about what it cannot see.
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

	// The pair of invariants behind an overlay arriving in one movement, neither of which any
	// assertion about state can see. The panel positions against the viewport, and the dialog runs no
	// keyframe animation — so nothing can hand the panel a different containing block partway through
	// its entrance. Sheet is where this was visible, but both share the surface, so both assert it.
	// `Overlay.variants.ts` has the why.
	const panel = dialog.querySelector<HTMLElement>('[data-slot="dialog-content"]');
	const panelPosition = panel ? window.getComputedStyle(panel).position : null;

	await expect(panel).not.toBeNull();
	await expect(panelPosition).toBe('fixed');
	await expect(window.getComputedStyle(dialog).animationName).toBe('none');

	return dialog;
};

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open Dialog</Button>
			</DialogTrigger>
			<DialogContent
				title='Default Dialog'
				description='This dialog now has fixed header/footer with scrollable content by default.'
				footer={
					<>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						<Button>Continue</Button>
					</>
				}
			>
				<div className='space-y-4'>
					<p>This is the main content area that will scroll if needed.</p>
					<p>
						You can add any content here and it will be scrollable while keeping the header and
						footer fixed.
					</p>
				</div>
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

/**
 * The plain case: a question, two answers, and no gate on anything.
 *
 * Escape, the backdrop, the X and both footer buttons all close it. Sheet's `Confirmation` is the
 * deliberate contrast — same shape, but with the footer action and ambient dismissal both held shut
 * until a condition is met. Reach for this one unless the flow is destructive enough to warrant that.
 */
export const ConfirmationDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive'>Delete Account</Button>
			</DialogTrigger>
			<DialogContent
				title='Are you absolutely sure?'
				description='This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
				footer={
					<>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						{/* A real caller does the deleting in `onClick`; wrapping in `DialogClose` is what
						    dismisses the dialog afterwards. */}
						<DialogClose asChild>
							<Button variant='destructive'>Delete Account</Button>
						</DialogClose>
					</>
				}
			>
				<Alert variant='destructive'>
					<AlertTitle>This action cannot be undone.</AlertTitle>
					<AlertDescription>
						This will permanently delete your account and remove your data from our servers.
					</AlertDescription>
				</Alert>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement, step }) => {
		const dialog = await openDialog(canvasElement, /delete account/i, /are you absolutely sure/i);

		await step('Cancel closes it', async () => {
			await userEvent.click(within(dialog).getByRole('button', { name: /cancel/i }));

			await waitFor(async () => {
				await expect(dialog).toHaveAttribute('data-state', 'closed');
			});
		});
	}
};

export const LongContentDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>View Long Content</Button>
			</DialogTrigger>
			<DialogContent
				className='sm:max-w-[600px]'
				title='Terms and Conditions'
				description='Please read our terms and conditions carefully.'
				footer={
					<>
						<DialogClose asChild>
							<Button variant='outline'>Decline</Button>
						</DialogClose>
						<Button>Accept Terms</Button>
					</>
				}
			>
				<div className='space-y-4'>
					<section>
						<h3 className='font-semibold mb-2'>1. Acceptance of Terms</h3>
						<p className='text-sm text-muted-foreground'>
							By accessing and using this website, you accept and agree to be bound by the terms and
							provision of this agreement.
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
							warranties, expressed or implied, and hereby disclaim and negate all other warranties
							including without limitation, implied warranties or conditions of merchantability,
							fitness for a particular purpose, or non-infringement of intellectual property or
							other violation of rights.
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
			<DialogContent
				showCloseButton={false}
				title='Important Notice'
				description='This dialog requires explicit user action to close.'
				footer={
					<>
						<DialogClose asChild>
							<Button>I Understand</Button>
						</DialogClose>
					</>
				}
			>
				<p>This is an important message that requires user acknowledgment.</p>
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

export const NestedDialogs: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open Parent Dialog</Button>
			</DialogTrigger>
			<DialogContent
				title='Parent Dialog'
				description='This dialog contains another dialog inside it.'
				footer={
					<>
						<DialogClose asChild>
							<Button variant='outline'>Close Parent</Button>
						</DialogClose>
					</>
				}
			>
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

/** What to call each close route when telling someone their change is still unsaved. */
const CLOSE_ROUTE_LABELS: Record<OverlayCloseSource, string> = {
	escape: 'Escape',
	'close-button': 'the close button',
	backdrop: 'clicking outside',
	'close-part': 'that button'
};

const INITIAL_PROJECT_NAME = 'Quarterly report';

const GuardedDialog = () => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState(INITIAL_PROJECT_NAME);
	const [saved, setSaved] = React.useState(INITIAL_PROJECT_NAME);
	const [refusedRoute, setRefusedRoute] = React.useState<OverlayCloseSource | null>(null);

	const dirty = name !== saved;

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				setOpen(next);
				if (next) setRefusedRoute(null);
			}}
		>
			<DialogTrigger asChild>
				<Button variant='outline'>Edit project</Button>
			</DialogTrigger>
			<DialogContent
				title='Edit project'
				description='Edit the name, then try to leave without saving.'
				onRequestClose={(event) => {
					// Nothing to protect, so every route out behaves like any other dialog's.
					if (!dirty) return;

					// One handler covers Escape, the close button and the backdrop alike. Refusing here
					// leaves the dialog genuinely open rather than visually open and internally closed.
					event.preventDefault();
					setRefusedRoute(event.source);
				}}
				footer={
					<>
						<Button
							variant='outline'
							onClick={() => {
								setName(saved);
								setOpen(false);
							}}
						>
							Discard
						</Button>
						<Button
							disabled={!dirty}
							onClick={() => {
								setSaved(name);
								setOpen(false);
							}}
						>
							Save
						</Button>
					</>
				}
			>
				<div className='grid gap-2'>
					<label htmlFor='guarded-project-name' className='text-sm font-medium'>
						Project name
					</label>
					<input
						id='guarded-project-name'
						value={name}
						onChange={(event) => setName(event.target.value)}
						className='rounded-md border px-3 py-2'
					/>
				</div>
				{refusedRoute === null ? (
					<p className='text-sm text-muted-foreground'>
						{dirty ? 'Unsaved changes.' : 'No unsaved changes — this closes normally.'}
					</p>
				) : (
					<Alert variant='destructive'>
						<AlertTitle>You have unsaved changes</AlertTitle>
						<AlertDescription>
							Leaving via {CLOSE_ROUTE_LABELS[refusedRoute]} was refused. Save or discard first.
						</AlertDescription>
					</Alert>
				)}
			</DialogContent>
		</Dialog>
	);
};

export const GuardedClose: Story = {
	render: () => <GuardedDialog />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);
		const trigger = canvas.getByRole('button', { name: /edit project/i });

		await userEvent.click(trigger);
		const dialog = (await documentScope.findByRole('dialog')) as HTMLDialogElement;
		const scope = within(dialog);

		// Asserted on the element's own `open` property, not just on `data-state`. A veto has to
		// leave the dialog *genuinely* open — visually open but internally closed is the failure
		// this is guarding against, and only the DOM property tells the two apart.
		const stillOpen = async () => {
			await expect(dialog).toHaveAttribute('data-state', 'open');
			await expect(dialog.open).toBe(true);
		};

		await step('with nothing to protect, Escape closes it like any other dialog', async () => {
			await userEvent.keyboard('{Escape}');

			await waitFor(async () => {
				await expect(dialog).toHaveAttribute('data-state', 'closed');
			});
		});

		await step('reopen, and change the name', async () => {
			await userEvent.click(trigger);
			await waitFor(async () => {
				await expect(dialog).toHaveAttribute('data-state', 'open');
			});

			await userEvent.type(scope.getByLabelText(/project name/i), ' v2');
		});

		await step('now Escape is refused, and the dialog says why', async () => {
			await userEvent.keyboard('{Escape}');

			await stillOpen();
			await expect(await scope.findByText(/leaving via escape was refused/i)).toBeVisible();
		});

		await step('so is the close button', async () => {
			await userEvent.click(scope.getByRole('button', { name: /close/i }));

			await stillOpen();
			await expect(scope.getByText(/leaving via the close button was refused/i)).toBeVisible();
		});

		await step('and so is the backdrop', async () => {
			fireEvent.click(dialog);

			await stillOpen();
			await expect(scope.getByText(/leaving via clicking outside was refused/i)).toBeVisible();
		});

		await step('discarding the change lets it close', async () => {
			await userEvent.click(scope.getByRole('button', { name: /discard/i }));

			await waitFor(async () => {
				await expect(dialog).toHaveAttribute('data-state', 'closed');
			});
		});
	}
};

const RefDrivenDialog = ({ controlled }: { controlled: boolean }) => {
	const dialogRef = React.useRef<DialogRef>(undefined);
	const [open, setOpen] = React.useState(false);

	// Two modes from one component: the uncontrolled branch leaves `open` to the Dialog, the
	// controlled one hands it back. The handle must work in both, which is the whole point —
	// driving internal state directly would make it a no-op the moment a caller controls the
	// overlay.
	const controlledProps = controlled ? { open, onOpenChange: setOpen } : {};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-2'>
				<Button variant='outline' onClick={() => dialogRef.current?.open()}>
					Open via Ref
				</Button>
				<Button variant='outline' onClick={() => dialogRef.current?.toggle()}>
					Toggle via Ref
				</Button>
			</div>
			{controlled && <p>Dialog is currently: {open ? 'Open' : 'Closed'}</p>}
			<Dialog ref={dialogRef} {...controlledProps}>
				<DialogContent
					title='Ref-Driven Dialog'
					description='Driven entirely from the imperative handle.'
					footer={
						<Button variant='outline' onClick={() => dialogRef.current?.close()}>
							Close via Ref
						</Button>
					}
				>
					<p>The same handle Sheet exposes, now on Dialog.</p>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export const RefBased: Story = {
	render: () => <RefDrivenDialog controlled={false} />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);

		await step('toggle() reads the current state rather than a stale one', async () => {
			await userEvent.click(canvas.getByRole('button', { name: /toggle via ref/i }));
			await waitFor(async () => {
				await expect(documentScope.getByRole('dialog')).toHaveAttribute('data-state', 'open');
			});
		});

		const dialog = await documentScope.findByRole('dialog');

		await step('close() closes it', async () => {
			await userEvent.click(within(dialog).getByRole('button', { name: /close via ref/i }));
			await waitFor(async () => {
				await expect(dialog).toHaveAttribute('data-state', 'closed');
			});
		});

		await step('open() still works after a full cycle', async () => {
			await waitFor(async () => {
				await expect(documentScope.queryByRole('dialog')).not.toBeInTheDocument();
			});

			await userEvent.click(canvas.getByRole('button', { name: /open via ref/i }));
			await waitFor(async () => {
				await expect(documentScope.getByRole('dialog')).toHaveAttribute('data-state', 'open');
			});
		});
	}
};

export const RefWithControlled: Story = {
	render: () => <RefDrivenDialog controlled />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const documentScope = within(document.body);

		// The regression guard. A handle that wrote to internal state would leave the controlled
		// render — and this readout — untouched while the dialog appeared to open.
		await expect(canvas.getByText(/currently: Closed/i)).toBeInTheDocument();

		await userEvent.click(canvas.getByRole('button', { name: /open via ref/i }));
		await waitFor(async () => {
			await expect(documentScope.getByRole('dialog')).toHaveAttribute('data-state', 'open');
		});
		await expect(canvas.getByText(/currently: Open/i)).toBeInTheDocument();

		const dialog = await documentScope.findByRole('dialog');
		await userEvent.click(within(dialog).getByRole('button', { name: /close via ref/i }));
		await waitFor(async () => {
			await expect(canvas.getByText(/currently: Closed/i)).toBeInTheDocument();
		});
	}
};

export const CallerSuppliedAria: Story = {
	render: () => (
		<Dialog defaultOpen>
			<DialogContent
				title='The prop heading'
				aria-labelledby='external-heading'
				aria-describedby='external-copy'
			>
				<h2 id='external-heading'>Named from outside</h2>
				<p id='external-copy'>Described from outside</p>
			</DialogContent>
		</Dialog>
	),
	play: async ({ step }) => {
		const dialog = await within(document.body).findByRole('dialog');

		await step('a caller-supplied aria-labelledby beats the title prop', async () => {
			await expect(dialog).toHaveAttribute('aria-labelledby', 'external-heading');
			await expect(dialog).toHaveAccessibleName('Named from outside');
		});

		await step('and a caller-supplied aria-describedby wins too', async () => {
			await expect(dialog).toHaveAttribute('aria-describedby', 'external-copy');
		});
	}
};

export const NoDescription: Story = {
	render: () => (
		<Dialog defaultOpen>
			<DialogContent title='Named, but not described'>
				<p>Nothing here describes the dialog.</p>
			</DialogContent>
		</Dialog>
	),
	play: async () => {
		const dialog = await within(document.body).findByRole('dialog');

		await expect(dialog).toHaveAccessibleName('Named, but not described');
		// Absent, not pointing at nothing. A dangling `aria-describedby` is worse than no attribute,
		// and axe grades it only as needs-review, so nothing else here would catch it.
		await expect(dialog).not.toHaveAttribute('aria-describedby');
	}
};

const unnamedWarnSpy = fn();

/**
 * Swaps `console.warn` for a spy for the lifetime of a story. The diagnostic fires as the overlay
 * opens, which is before `play()` runs, so the spy has to be installed in `beforeEach`.
 */
const captureConsoleWarn = (spy: ReturnType<typeof fn>) => () => {
	const original = console.warn;
	spy.mockClear();
	console.warn = spy;

	return () => {
		console.warn = original;
	};
};

export const WithoutAnAccessibleName: Story = {
	// Deliberately realistic rather than a stub. The omission this warns about is not someone
	// shipping an empty dialog — it is a real one whose heading was styled by hand and never given a
	// `title`, so nothing in the markup names it. Read the content and the bug is invisible; that is
	// the whole reason the diagnostic has to exist.
	render: () => (
		<Dialog defaultOpen>
			<DialogContent
				footer={
					<DialogClose asChild>
						<Button>Got it</Button>
					</DialogClose>
				}
			>
				<p className='text-lg font-semibold'>Keyboard shortcuts</p>
				<dl className='grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 text-sm'>
					<dt className='font-mono text-muted-foreground'>⌘K</dt>
					<dd>Open the command palette</dd>
					<dt className='font-mono text-muted-foreground'>⌘/</dt>
					<dd>Show this panel</dd>
					<dt className='font-mono text-muted-foreground'>Esc</dt>
					<dd>Close whatever is on top</dd>
				</dl>
			</DialogContent>
		</Dialog>
	),
	beforeEach: captureConsoleWarn(unnamedWarnSpy),
	parameters: {
		// This story exists to prove the diagnostic fires; the dialog it renders is, by design, the
		// broken case axe is right to reject.
		a11y: { test: 'off' }
	},
	play: async ({ step }) => {
		const dialog = await within(document.body).findByRole('dialog');

		await step('the dialog still renders — the diagnostic never throws', async () => {
			await expect(dialog).toBeInTheDocument();
		});

		await step('and a warning names the omission', async () => {
			await waitFor(async () => {
				const messages = unnamedWarnSpy.mock.calls.map((call) => String(call[0]));
				await expect(messages.some((m) => m.includes('no accessible name'))).toBe(true);
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
				<DialogContent
					title='Manually Controlled Dialog'
					description='This dialog is controlled by React state. You can open and close it programmatically.'
					footer={
						<>
							<Button variant='outline' onClick={() => setOpen(false)}>
								Close
							</Button>
							<Button onClick={() => setOpen(false)}>Confirm</Button>
						</>
					}
				>
					<p>Current state: {open ? 'Open' : 'Closed'}</p>
					<p>You can control this dialog from outside without using DialogTrigger.</p>
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
