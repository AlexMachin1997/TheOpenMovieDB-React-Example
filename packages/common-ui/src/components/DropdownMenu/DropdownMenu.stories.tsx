import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuGroup
} from '~/components/DropdownMenu/DropdownMenu';
import { Button } from '~/components/Button/Button';
import {
	User,
	CreditCard,
	Settings,
	Keyboard,
	LogOut,
	ChevronDown,
	MoreHorizontal,
	Sun,
	Moon,
	Monitor
} from 'lucide-react';

const meta: Meta<typeof DropdownMenu> = {
	title: 'Components/DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					Open Menu
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const WithIconsAndShortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					Account Settings
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<User className='mr-2 h-4 w-4' />
					Profile
					<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CreditCard className='mr-2 h-4 w-4' />
					Billing
					<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className='mr-2 h-4 w-4' />
					Settings
					<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Keyboard className='mr-2 h-4 w-4' />
					Keyboard shortcuts
					<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className='mr-2 h-4 w-4' />
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const WithSubmenus: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					More Options
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Team</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Invite Members</DropdownMenuItem>
						<DropdownMenuItem>Manage Team</DropdownMenuItem>
						<DropdownMenuItem>Team Settings</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

const WithCheckboxesComponent = () => {
	const [showStatusBar, setShowStatusBar] = React.useState(true);
	const [showActivityBar, setShowActivityBar] = React.useState(false);
	const [showPanel, setShowPanel] = React.useState(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					View Options
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Appearance</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
					Status Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={showActivityBar}
					onCheckedChange={setShowActivityBar}
					disabled
				>
					Activity Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
					Panel
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const WithCheckboxes: Story = {
	render: () => <WithCheckboxesComponent />
};

const WithRadioGroupComponent = () => {
	const [position, setPosition] = React.useState('bottom');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					Theme Settings
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Theme</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem value='light'>
						<Sun className='mr-2 h-4 w-4' />
						Light
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='dark'>
						<Moon className='mr-2 h-4 w-4' />
						Dark
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='system'>
						<Monitor className='mr-2 h-4 w-4' />
						System
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const WithRadioGroup: Story = {
	render: () => <WithRadioGroupComponent />
};

export const WithGroups: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>File</DropdownMenuLabel>
					<DropdownMenuItem>New File</DropdownMenuItem>
					<DropdownMenuItem>Open File</DropdownMenuItem>
					<DropdownMenuItem>Save File</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Edit</DropdownMenuLabel>
					<DropdownMenuItem>Undo</DropdownMenuItem>
					<DropdownMenuItem>Redo</DropdownMenuItem>
					<DropdownMenuItem>Cut</DropdownMenuItem>
					<DropdownMenuItem>Copy</DropdownMenuItem>
					<DropdownMenuItem>Paste</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const WithDestructiveActions: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					Actions
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Project Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Edit Project</DropdownMenuItem>
				<DropdownMenuItem>Duplicate Project</DropdownMenuItem>
				<DropdownMenuItem>Archive Project</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant='destructive'>Delete Project</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const WithInsetItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					Navigation
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Navigation</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Home</DropdownMenuItem>
				<DropdownMenuItem inset>Dashboard</DropdownMenuItem>
				<DropdownMenuItem inset>Analytics</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem inset>Profile</DropdownMenuItem>
				<DropdownMenuItem inset>Account</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

const ComplexComponent = () => {
	const [showStatusBar, setShowStatusBar] = React.useState(true);
	const [theme, setTheme] = React.useState('system');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					<Settings className='mr-2 h-4 w-4' />
					Settings
					<ChevronDown className='ml-2 h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Application Settings</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuLabel>Appearance</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
						<DropdownMenuRadioItem value='light'>
							<Sun className='mr-2 h-4 w-4' />
							Light
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='dark'>
							<Moon className='mr-2 h-4 w-4' />
							Dark
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='system'>
							<Monitor className='mr-2 h-4 w-4' />
							System
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuLabel>Interface</DropdownMenuLabel>
					<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
						Status Bar
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuSub>
					<DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Advanced Settings</DropdownMenuItem>
						<DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
						<DropdownMenuItem>Extensions</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<LogOut className='mr-2 h-4 w-4' />
					Sign Out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const Complex: Story = {
	render: () => <ComplexComponent />
};

export const EdgeCaseStressTests: Story = {
	render: () => (
		<div className='space-y-8 p-8'>
			<h3 className='text-lg font-semibold'>Edge Case Stress Tests</h3>

			<div className='flex justify-start'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm'>
							Top Left
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
						<DropdownMenuItem>Item 4</DropdownMenuItem>
						<DropdownMenuItem>Item 5</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex justify-end'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm'>
							Top Right
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
						<DropdownMenuItem>Item 4</DropdownMenuItem>
						<DropdownMenuItem>Item 5</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex justify-start'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm'>
							Bottom Left
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
						<DropdownMenuItem>Item 4</DropdownMenuItem>
						<DropdownMenuItem>Item 5</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex justify-end'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm'>
							Bottom Right
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
						<DropdownMenuItem>Item 4</DropdownMenuItem>
						<DropdownMenuItem>Item 5</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	),
	parameters: {
		layout: 'fullscreen'
	}
};

export const VeryLongContent: Story = {
	render: () => (
		<div className='space-y-8 p-8'>
			<h3 className='text-lg font-semibold'>Very Long Content Stress Test</h3>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>
						Long Content Test
						<ChevronDown className='ml-2 h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Very Long Menu Label That Might Overflow</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						This is a very long menu item text that should test how the dropdown handles overflow
						and wrapping
					</DropdownMenuItem>
					<DropdownMenuItem>
						Another extremely long menu item with lots of text content that might cause layout
						issues
					</DropdownMenuItem>
					<DropdownMenuItem>Short item</DropdownMenuItem>
					<DropdownMenuItem>
						Yet another very long menu item that pushes the boundaries of what the dropdown can
						handle gracefully
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<User className='mr-2 h-4 w-4' />
						Profile with very long text that might cause icon alignment issues
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>
						Many Items Test
						<ChevronDown className='ml-2 h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Many Menu Items</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{Array.from({ length: 20 }, (_, i) => (
						<DropdownMenuItem key={i}>Menu Item {i + 1}</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
};

export const NestedSubmenuEdgeCases: Story = {
	render: () => (
		<div className='space-y-8 p-8'>
			<h3 className='text-lg font-semibold'>Nested Submenu Edge Cases</h3>

			<div className='flex justify-end'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							Right Edge Nested
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Nested Menu</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Nested Item 1</DropdownMenuItem>
								<DropdownMenuItem>Nested Item 2</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Deep Nested</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuItem>Deep Item 1</DropdownMenuItem>
										<DropdownMenuItem>Deep Item 2</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex justify-start'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							Left Edge Nested
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Nested Menu</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Nested Item 1</DropdownMenuItem>
								<DropdownMenuItem>Nested Item 2</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Deep Nested</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuItem>Deep Item 1</DropdownMenuItem>
										<DropdownMenuItem>Deep Item 2</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
};

export const ScrollableContainerTest: Story = {
	render: () => (
		<div className='h-96 w-full overflow-auto border border-gray-300 p-4'>
			<div className='h-[200vh] space-y-4'>
				<h3 className='text-lg font-semibold sticky top-0 bg-white p-2'>
					Scrollable Container Test
				</h3>

				{/* Top of scrollable area */}
				<div className='flex justify-center'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>
								Top of Scroll Area
								<ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
							<DropdownMenuItem>Item 2</DropdownMenuItem>
							<DropdownMenuItem>Item 3</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className='flex justify-center pt-32'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>
								Middle of Scroll Area
								<ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
							<DropdownMenuItem>Item 2</DropdownMenuItem>
							<DropdownMenuItem>Item 3</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className='flex justify-center pt-32'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>
								Bottom of Scroll Area
								<ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
							<DropdownMenuItem>Item 2</DropdownMenuItem>
							<DropdownMenuItem>Item 3</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	),
	parameters: {
		layout: 'fullscreen'
	}
};

const UltimateStressTestComponent = () => {
	const [showStatusBar, setShowStatusBar] = React.useState(true);
	const [theme, setTheme] = React.useState('system');

	return (
		<div className='space-y-8 p-8'>
			<h3 className='text-lg font-semibold'>Ultimate Stress Test - All Features at Screen Edges</h3>

			<div className='flex justify-start'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							<Settings className='mr-2 h-4 w-4' />
							Complex Top Left
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-64'>
						<DropdownMenuLabel>Complex Settings Panel</DropdownMenuLabel>
						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuLabel>Appearance</DropdownMenuLabel>
							<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
								<DropdownMenuRadioItem value='light'>
									<Sun className='mr-2 h-4 w-4' />
									Light Theme
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='dark'>
									<Moon className='mr-2 h-4 w-4' />
									Dark Theme
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='system'>
									<Monitor className='mr-2 h-4 w-4' />
									System Theme
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
							Show Status Bar
						</DropdownMenuCheckboxItem>

						<DropdownMenuSeparator />

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Advanced Options</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Performance Settings</DropdownMenuItem>
								<DropdownMenuItem>Security Options</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Developer Tools</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuItem>Debug Mode</DropdownMenuItem>
										<DropdownMenuItem>Console Access</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuSeparator />

						<DropdownMenuItem variant='destructive'>
							<LogOut className='mr-2 h-4 w-4' />
							Reset All Settings
							<DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex justify-end'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							<Settings className='mr-2 h-4 w-4' />
							Complex Top Right
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-64'>
						<DropdownMenuLabel>Complex Settings Panel</DropdownMenuLabel>
						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuLabel>Appearance</DropdownMenuLabel>
							<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
								<DropdownMenuRadioItem value='light'>
									<Sun className='mr-2 h-4 w-4' />
									Light Theme
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='dark'>
									<Moon className='mr-2 h-4 w-4' />
									Dark Theme
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='system'>
									<Monitor className='mr-2 h-4 w-4' />
									System Theme
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
							Show Status Bar
						</DropdownMenuCheckboxItem>

						<DropdownMenuSeparator />

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Advanced Options</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Performance Settings</DropdownMenuItem>
								<DropdownMenuItem>Security Options</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Developer Tools</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuItem>Debug Mode</DropdownMenuItem>
										<DropdownMenuItem>Console Access</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuSeparator />

						<DropdownMenuItem variant='destructive'>
							<LogOut className='mr-2 h-4 w-4' />
							Reset All Settings
							<DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export const UltimateStressTest: Story = {
	render: () => <UltimateStressTestComponent />,
	parameters: {
		layout: 'fullscreen'
	}
};
