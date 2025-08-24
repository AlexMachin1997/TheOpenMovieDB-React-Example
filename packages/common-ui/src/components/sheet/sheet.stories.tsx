import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Button } from '~/components/button/button';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetInnerContent,
	SheetTitle,
	SheetTrigger,
	type SheetRef
} from '~/components/sheet/sheet';

const meta: Meta<typeof Sheet> = {
	title: 'Components/Sheet',
	component: Sheet,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Sheet</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</SheetDescription>
				</SheetHeader>
				<SheetInnerContent className='grid gap-4 p-6'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<label htmlFor='name' className='text-right'>
							Name
						</label>
						<input
							id='name'
							defaultValue='Pedro Duarte'
							className='col-span-3 rounCded-md border px-3 py-2'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<label htmlFor='username' className='text-right'>
							Username
						</label>
						<input
							id='username'
							defaultValue='@peduarte'
							className='col-span-3 rounded-md border px-3 py-2'
						/>
					</div>
				</SheetInnerContent>
				<SheetFooter>
					<Button type='submit'>Save changes</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

const ControlledSheet = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-2'>
				<Button onClick={() => setOpen(true)} variant='outline'>
					Open Sheet
				</Button>
				<Button onClick={() => setOpen(false)} variant='outline'>
					Close Sheet
				</Button>
				<Button onClick={() => setOpen(!open)} variant='outline'>
					Toggle Sheet
				</Button>
			</div>
			<div className='text-sm text-muted-foreground'>
				Sheet is currently: <span className='font-medium'>{open ? 'Open' : 'Closed'}</span>
			</div>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Controlled Sheet</SheetTitle>
						<SheetDescription>
							This sheet is controlled externally. You can open, close, or toggle it using the
							buttons above.
						</SheetDescription>
					</SheetHeader>
					<SheetInnerContent className='grid gap-4 p-6'>
						<div className='space-y-2'>
							<h4 className='font-medium'>Current State</h4>
							<p className='text-sm text-muted-foreground'>
								The sheet is currently {open ? 'open' : 'closed'}. You can control this state from
								outside the component.
							</p>
						</div>
						<div className='space-y-2'>
							<h4 className='font-medium'>Usage</h4>
							<p className='text-sm text-muted-foreground'>
								This pattern is useful when you need to control the sheet state from a parent
								component or based on external events.
							</p>
						</div>
					</SheetInnerContent>
					<SheetFooter>
						<Button variant='outline' onClick={() => setOpen(false)}>
							Close
						</Button>
						<Button onClick={() => setOpen(false)}>Save & Close</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export const Controlled: Story = {
	render: () => <ControlledSheet />
};

const RefBasedSheet = () => {
	const sheetRef = React.useRef<SheetRef>(undefined);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-2'>
				<Button onClick={() => sheetRef.current?.open()} variant='outline'>
					Open via Ref
				</Button>
				<Button onClick={() => sheetRef.current?.close()} variant='outline'>
					Close via Ref
				</Button>
				<Button onClick={() => sheetRef.current?.toggle()} variant='outline'>
					Toggle via Ref
				</Button>
			</div>

			<Sheet ref={sheetRef}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Ref-Based Sheet</SheetTitle>
						<SheetDescription>
							This sheet is controlled via ref. The SheetClose component still works perfectly!
						</SheetDescription>
					</SheetHeader>
					<SheetInnerContent className='grid gap-4 p-6'>
						<div className='space-y-2'>
							<h4 className='font-medium'>Imperative API</h4>
							<p className='text-sm text-muted-foreground'>
								Use the ref to programmatically control the sheet:{' '}
								<code>sheetRef.current?.open()</code>
							</p>
						</div>
						<div className='space-y-2'>
							<h4 className='font-medium'>SheetClose Compatibility</h4>
							<p className='text-sm text-muted-foreground'>
								The existing SheetClose component works seamlessly with the new ref-based approach.
							</p>
						</div>
					</SheetInnerContent>
					<SheetFooter>
						<Button variant='outline' onClick={() => sheetRef.current?.close()}>
							Close via Ref
						</Button>
						<Button onClick={() => sheetRef.current?.close()}>Save & Close</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export const RefBased: Story = {
	render: () => <RefBasedSheet />
};

export const LeftSide: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Left Sheet</Button>
			</SheetTrigger>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle>Navigation Menu</SheetTitle>
					<SheetDescription>Access your account settings and preferences.</SheetDescription>
				</SheetHeader>
				<div className='flex flex-col gap-4'>
					<Button variant='ghost' className='justify-start'>
						Profile Settings
					</Button>
					<Button variant='ghost' className='justify-start'>
						Account Security
					</Button>
					<Button variant='ghost' className='justify-start'>
						Notifications
					</Button>
					<Button variant='ghost' className='justify-start'>
						Help & Support
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
};

export const TopSide: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Top Sheet</Button>
			</SheetTrigger>
			<SheetContent side='top'>
				<SheetHeader>
					<SheetTitle>Quick Actions</SheetTitle>
					<SheetDescription>Common actions you can perform.</SheetDescription>
				</SheetHeader>
				<div className='flex gap-4'>
					<Button>New Document</Button>
					<Button variant='outline'>Import</Button>
					<Button variant='outline'>Export</Button>
					<Button variant='outline'>Share</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
};

export const BottomSide: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Bottom Sheet</Button>
			</SheetTrigger>
			<SheetContent side='bottom'>
				<SheetHeader>
					<SheetTitle>Share Options</SheetTitle>
					<SheetDescription>Choose how you want to share this content.</SheetDescription>
				</SheetHeader>
				<div className='flex flex-col gap-4'>
					<Button variant='outline' className='justify-start'>
						📧 Share via Email
					</Button>
					<Button variant='outline' className='justify-start'>
						Share via Message
					</Button>
					<Button variant='outline' className='justify-start'>
						🔗 Copy Link
					</Button>
					<Button variant='outline' className='justify-start'>
						Export as PDF
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
};

export const CustomWidth: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Wide Sheet</Button>
			</SheetTrigger>
			<SheetContent className='w-[400px] sm:w-[540px]'>
				<SheetHeader>
					<SheetTitle>Advanced Settings</SheetTitle>
					<SheetDescription>Configure advanced options for your application.</SheetDescription>
				</SheetHeader>
				<div className='grid gap-6 p-6'>
					<div className='space-y-2'>
						<h4 className='font-medium'>Performance</h4>
						<div className='space-y-2'>
							<label className='flex items-center space-x-2'>
								<input type='checkbox' className='rounded' />
								<span>Enable hardware acceleration</span>
							</label>
							<label className='flex items-center space-x-2'>
								<input type='checkbox' className='rounded' />
								<span>Use GPU rendering</span>
							</label>
						</div>
					</div>
					<div className='space-y-2'>
						<h4 className='font-medium'>Privacy</h4>
						<div className='space-y-2'>
							<label className='flex items-center space-x-2'>
								<input type='checkbox' className='rounded' />
								<span>Allow analytics</span>
							</label>
							<label className='flex items-center space-x-2'>
								<input type='checkbox' className='rounded' />
								<span>Send crash reports</span>
							</label>
						</div>
					</div>
				</div>
				<SheetFooter>
					<Button variant='outline'>Reset to Defaults</Button>
					<Button>Save Settings</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

export const WithForm: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Create New Item</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create New Project</SheetTitle>
					<SheetDescription>Fill in the details below to create a new project.</SheetDescription>
				</SheetHeader>
				<SheetInnerContent className='grid gap-4 p-6'>
					<div className='grid gap-2'>
						<label htmlFor='project-name' className='text-sm font-medium'>
							Project Name
						</label>
						<input
							id='project-name'
							placeholder='Enter project name'
							className='rounded-md border px-3 py-2'
						/>
					</div>
					<div className='grid gap-2'>
						<label htmlFor='description' className='text-sm font-medium'>
							Description
						</label>
						<textarea
							id='description'
							placeholder='Enter project description'
							rows={3}
							className='rounded-md border px-3 py-2'
						/>
					</div>
					<div className='grid gap-2'>
						<label htmlFor='category' className='text-sm font-medium'>
							Category
						</label>
						<select id='category' className='rounded-md border px-3 py-2'>
							<option value=''>Select a category</option>
							<option value='web'>Web Development</option>
							<option value='mobile'>Mobile App</option>
							<option value='design'>Design</option>
							<option value='other'>Other</option>
						</select>
					</div>
				</SheetInnerContent>
				<SheetFooter>
					<Button variant='outline'>Cancel</Button>
					<Button>Create Project</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

export const Confirmation: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='destructive'>Delete Account</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</SheetDescription>
				</SheetHeader>
				<SheetInnerContent>
					<p className='text-sm text-muted-foreground'>
						Please type &quot;delete&quot; to confirm this action.
					</p>
					<input
						placeholder="Type 'delete' to confirm"
						className='mt-2 w-full rounded-md border px-3 py-2'
					/>
				</SheetInnerContent>
				<SheetFooter>
					<Button variant='outline'>Cancel</Button>
					<Button variant='destructive'>Delete Account</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

export const LongContent: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Long Content Sheet</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Terms of Service</SheetTitle>
					<SheetDescription>Please read our complete terms of service agreement.</SheetDescription>
				</SheetHeader>
				<SheetInnerContent className='space-y-4'>
					<section>
						<h3 className='font-semibold text-lg mb-2'>1. Acceptance of Terms</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							By accessing and using this website, you accept and agree to be bound by the terms and
							provision of this agreement. In addition, when using this website&apos;s particular
							services, you shall be subject to any posted guidelines or rules applicable to such
							services. Any participation in this service will constitute acceptance of this
							agreement.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>2. Use License</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							Permission is granted to temporarily download one copy of the materials (information
							or software) on this website for personal, non-commercial transitory viewing only.
							This is the grant of a license, not a transfer of title, and under this license you
							may not: modify or copy the materials; use the materials for any commercial purpose or
							for any public display (commercial or non-commercial); attempt to decompile or reverse
							engineer any software contained on this website; remove any copyright or other
							proprietary notations from the materials; or transfer the materials to another person
							or &quot;mirror&quot; the materials on any other server.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>3. Disclaimer</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							The materials on this website are provided on an &apos;as is&apos; basis. This website
							makes no warranties, expressed or implied, and hereby disclaims and negates all other
							warranties including without limitation, implied warranties or conditions of
							merchantability, fitness for a particular purpose, or non-infringement of intellectual
							property or other violation of rights.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>4. Limitations</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							In no event shall this website or its suppliers be liable for any damages (including,
							without limitation, damages for loss of data or profit, or due to business
							interruption) arising out of the use or inability to use the materials on this
							website, even if this website or a this website authorized representative has been
							notified orally or in writing of the possibility of such damage.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>5. Accuracy of Materials</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							The materials appearing on this website could include technical, typographical, or
							photographic errors. This website does not warrant that any of the materials on its
							website are accurate, complete or current. This website may make changes to the
							materials contained on its website at any time without notice.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>6. Links</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							This website has not reviewed all of the sites linked to its website and is not
							responsible for the contents of any such linked site. The inclusion of any link does
							not imply endorsement by this website of the site. Use of any such linked website is
							at the user&apos;s own risk.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>7. Modifications</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							This website may revise these terms of service for its website at any time without
							notice. By using this website you are agreeing to be bound by the then current version
							of these Terms and Conditions of Use.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>8. Governing Law</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							These terms and conditions are governed by and construed in accordance with the laws
							and you irrevocably submit to the exclusive jurisdiction of the courts in that State
							or location.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>9. Privacy Policy</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							Your privacy is important to us. It is this website&apos;s policy to respect your
							privacy regarding any information we may collect while operating our website.
							Accordingly, we have developed this privacy policy in order for you to understand how
							we collect, use, communicate, disclose and otherwise make use of personal information.
						</p>
					</section>

					<section>
						<h3 className='font-semibold text-lg mb-2'>10. Contact Information</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							If you have any questions about these Terms of Service, please contact us at
							legal@example.com. We will be happy to clarify any terms or conditions that may be
							unclear.
						</p>
					</section>
				</SheetInnerContent>
				<SheetFooter>
					<Button variant='outline'>Decline</Button>
					<Button>Accept Terms</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

const ScrollableContentSheet = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Scrollable Sheet</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Scrollable Content</SheetTitle>
					<SheetDescription>
						This sheet uses SheetInnerContent for scrollable content with default padding.
					</SheetDescription>
				</SheetHeader>
				<SheetInnerContent>
					<div className='space-y-6'>
						<section>
							<h3 className='text-lg font-semibold mb-4'>Section 1</h3>
							<p className='text-muted-foreground mb-4'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>
							<div className='grid gap-4'>
								{Array.from({ length: 5 }).map((_, i) => (
									<div key={i} className='p-4 border rounded-lg'>
										<h4 className='font-medium'>Item {i + 1}</h4>
										<p className='text-sm text-muted-foreground'>
											This is item {i + 1} with some content to demonstrate scrolling.
										</p>
									</div>
								))}
							</div>
						</section>

						<section>
							<h3 className='text-lg font-semibold mb-4'>Section 2</h3>
							<p className='text-muted-foreground mb-4'>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
								ex ea commodo consequat.
							</p>
							<div className='grid gap-4'>
								{Array.from({ length: 8 }).map((_, i) => (
									<div key={i} className='p-4 border rounded-lg'>
										<h4 className='font-medium'>Another Item {i + 1}</h4>
										<p className='text-sm text-muted-foreground'>
											More content to ensure the sheet becomes scrollable.
										</p>
									</div>
								))}
							</div>
						</section>

						<section>
							<h3 className='text-lg font-semibold mb-4'>Section 3</h3>
							<p className='text-muted-foreground mb-4'>
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
								fugiat nulla pariatur.
							</p>
							<div className='grid gap-4'>
								{Array.from({ length: 6 }).map((_, i) => (
									<div key={i} className='p-4 border rounded-lg'>
										<h4 className='font-medium'>Final Item {i + 1}</h4>
										<p className='text-sm text-muted-foreground'>
											Final section to demonstrate the full scrolling capability.
										</p>
									</div>
								))}
							</div>
						</section>
					</div>
				</SheetInnerContent>
				<SheetFooter>
					<Button variant='outline'>Cancel</Button>
					<Button>Save Changes</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export const ScrollableContent: Story = {
	render: () => <ScrollableContentSheet />
};

const CustomStyledSheet = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Custom Styled Sheet</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Custom Styled Content</SheetTitle>
					<SheetDescription>This sheet uses custom styling on SheetInnerContent.</SheetDescription>
				</SheetHeader>
				<SheetInnerContent className='p-8 bg-gradient-to-br from-blue-50 to-indigo-100'>
					<div className='space-y-4'>
						<h3 className='text-xl font-bold text-blue-900'>Custom Styling</h3>
						<p className='text-blue-700'>
							This SheetInnerContent has custom padding (p-8) and a gradient background. The default
							p-6 padding has been overridden.
						</p>
						<div className='grid gap-3'>
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className='p-4 bg-white rounded-lg shadow-sm'>
									<h4 className='font-medium text-blue-900'>Custom Item {i + 1}</h4>
									<p className='text-sm text-blue-600'>
										This demonstrates how you can override the default styling.
									</p>
								</div>
							))}
						</div>
					</div>
				</SheetInnerContent>
				<SheetFooter>
					<Button variant='outline'>Cancel</Button>
					<Button>Save Changes</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export const CustomStyled: Story = {
	render: () => <CustomStyledSheet />
};
