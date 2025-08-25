import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Label } from '~/components/Label/Label';
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
} from '~/components/Dialog/Dialog';
import { Alert, AlertDescription, AlertTitle } from '~/components/Alert/Alert';

const meta: Meta<typeof Dialog> = {
	title: 'Components/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered'
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
	)
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
	)
};

export const FormDialog: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<DialogContentArea>
					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' defaultValue='John Doe' />
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' type='email' defaultValue='john@example.com' />
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='username'>Username</Label>
							<Input id='username' defaultValue='@johndoe' />
						</div>
					</div>
				</DialogContentArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
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
	)
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
	)
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
	)
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
	)
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
						<Button className='bg-green-600 hover:bg-green-700'>Continue</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
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
	render: () => <LoadingDialogComponent />
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
	)
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
	render: () => <ControlledDialogComponent />
};

const ControlledDialogWithFormComponent = () => {
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = React.useState({ name: '', email: '' });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		setOpen(false);
		// Reset form
		setFormData({ name: '', email: '' });
	};

	return (
		<div className='space-y-4'>
			<Button onClick={() => setOpen(true)}>Open Form Dialog</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Controlled Form Dialog</DialogTitle>
						<DialogDescription>
							This form dialog is controlled by React state and handles form submission.
						</DialogDescription>
					</DialogHeader>
					<DialogContentArea>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='grid gap-2'>
								<Label htmlFor='controlled-name'>Name</Label>
								<Input
									id='controlled-name'
									value={formData.name}
									onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
									required
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='controlled-email'>Email</Label>
								<Input
									id='controlled-email'
									type='email'
									value={formData.email}
									onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
									required
								/>
							</div>
						</form>
					</DialogContentArea>
					<DialogFooter>
						<Button variant='outline' onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>Submit</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export const ControlledDialogWithForm: Story = {
	render: () => <ControlledDialogWithFormComponent />
};
