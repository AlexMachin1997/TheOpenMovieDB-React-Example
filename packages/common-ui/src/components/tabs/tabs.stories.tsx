import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const meta: Meta<typeof Tabs> = {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		defaultValue: {
			control: 'text'
		},
		value: {
			control: 'text'
		}
	}
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic Tabs
export const Default: Story = {
	render: () => (
		<Tabs defaultValue='account' className='w-[400px]'>
			<TabsList>
				<TabsTrigger value='account'>Account</TabsTrigger>
				<TabsTrigger value='password'>Password</TabsTrigger>
			</TabsList>
			<TabsContent value='account' className='mt-4'>
				<p className='text-sm text-muted-foreground'>
					Make changes to your account here. Click save when you&apos;re done.
				</p>
			</TabsContent>
			<TabsContent value='password' className='mt-4'>
				<p className='text-sm text-muted-foreground'>
					Change your password here. After saving, you&apos;ll be logged out.
				</p>
			</TabsContent>
		</Tabs>
	)
};

// Tabs with Icons
export const WithIcons: Story = {
	render: () => (
		<Tabs defaultValue='overview' className='w-[400px]'>
			<TabsList>
				<TabsTrigger value='overview' className='flex items-center gap-2'>
					<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 6h16M4 12h16M4 18h16'
						/>
					</svg>
					Overview
				</TabsTrigger>
				<TabsTrigger value='analytics' className='flex items-center gap-2'>
					<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
						/>
					</svg>
					Analytics
				</TabsTrigger>
				<TabsTrigger value='reports' className='flex items-center gap-2'>
					<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
						/>
					</svg>
					Reports
				</TabsTrigger>
			</TabsList>
			<TabsContent value='overview' className='mt-4'>
				<div className='rounded-lg border p-4'>
					<h3 className='text-lg font-semibold mb-2'>Overview</h3>
					<p className='text-sm text-muted-foreground'>
						Get a bird&apos;s eye view of your business metrics and performance indicators.
					</p>
				</div>
			</TabsContent>
			<TabsContent value='analytics' className='mt-4'>
				<div className='rounded-lg border p-4'>
					<h3 className='text-lg font-semibold mb-2'>Analytics</h3>
					<p className='text-sm text-muted-foreground'>
						Dive deep into your data with advanced analytics and insights.
					</p>
				</div>
			</TabsContent>
			<TabsContent value='reports' className='mt-4'>
				<div className='rounded-lg border p-4'>
					<h3 className='text-lg font-semibold mb-2'>Reports</h3>
					<p className='text-sm text-muted-foreground'>
						Generate comprehensive reports and export your data for further analysis.
					</p>
				</div>
			</TabsContent>
		</Tabs>
	)
};

// Tabs with Transitions
export const WithTransitions: Story = {
	render: () => (
		<Tabs defaultValue='profile' className='w-[400px]'>
			<TabsList>
				<TabsTrigger value='profile'>Profile</TabsTrigger>
				<TabsTrigger value='settings'>Settings</TabsTrigger>
				<TabsTrigger value='notifications'>Notifications</TabsTrigger>
			</TabsList>
			<TabsContent
				value='profile'
				className='mt-4 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-top-2 transition-all duration-300'
			>
				<div className='rounded-lg border p-4 bg-gradient-to-r from-blue-50 to-indigo-50'>
					<h3 className='text-lg font-semibold mb-2'>Profile Information</h3>
					<p className='text-sm text-muted-foreground'>
						Manage your profile information and personal details.
					</p>
				</div>
			</TabsContent>
			<TabsContent
				value='settings'
				className='mt-4 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-top-2 transition-all duration-300'
			>
				<div className='rounded-lg border p-4 bg-gradient-to-r from-green-50 to-emerald-50'>
					<h3 className='text-lg font-semibold mb-2'>Account Settings</h3>
					<p className='text-sm text-muted-foreground'>
						Configure your account preferences and security settings.
					</p>
				</div>
			</TabsContent>
			<TabsContent
				value='notifications'
				className='mt-4 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-top-2 transition-all duration-300'
			>
				<div className='rounded-lg border p-4 bg-gradient-to-r from-purple-50 to-pink-50'>
					<h3 className='text-lg font-semibold mb-2'>Notification Preferences</h3>
					<p className='text-sm text-muted-foreground'>
						Customize how and when you receive notifications.
					</p>
				</div>
			</TabsContent>
		</Tabs>
	)
};

// Controlled Tabs
export const Controlled: Story = {
	render: () => {
		const ControlledTabs = () => {
			const [activeTab, setActiveTab] = useState('tab1');

			return (
				<div className='w-[400px] space-y-4'>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList>
							<TabsTrigger value='tab1'>Tab 1</TabsTrigger>
							<TabsTrigger value='tab2'>Tab 2</TabsTrigger>
							<TabsTrigger value='tab3'>Tab 3</TabsTrigger>
						</TabsList>
						<TabsContent value='tab1' className='mt-4'>
							<div className='rounded-lg border p-4'>
								<h3 className='text-lg font-semibold mb-2'>Tab 1 Content</h3>
								<p className='text-sm text-muted-foreground'>
									This is the content for tab 1. Current active tab: {activeTab}
								</p>
							</div>
						</TabsContent>
						<TabsContent value='tab2' className='mt-4'>
							<div className='rounded-lg border p-4'>
								<h3 className='text-lg font-semibold mb-2'>Tab 2 Content</h3>
								<p className='text-sm text-muted-foreground'>
									This is the content for tab 2. Current active tab: {activeTab}
								</p>
							</div>
						</TabsContent>
						<TabsContent value='tab3' className='mt-4'>
							<div className='rounded-lg border p-4'>
								<h3 className='text-lg font-semibold mb-2'>Tab 3 Content</h3>
								<p className='text-sm text-muted-foreground'>
									This is the content for tab 3. Current active tab: {activeTab}
								</p>
							</div>
						</TabsContent>
					</Tabs>

					<div className='flex gap-2'>
						<button
							onClick={() => setActiveTab('tab1')}
							className='px-3 py-1 text-sm border rounded hover:bg-gray-50'
						>
							Go to Tab 1
						</button>
						<button
							onClick={() => setActiveTab('tab2')}
							className='px-3 py-1 text-sm border rounded hover:bg-gray-50'
						>
							Go to Tab 2
						</button>
						<button
							onClick={() => setActiveTab('tab3')}
							className='px-3 py-1 text-sm border rounded hover:bg-gray-50'
						>
							Go to Tab 3
						</button>
					</div>
				</div>
			);
		};

		return <ControlledTabs />;
	}
};

// Vertical Tabs
export const Vertical: Story = {
	render: () => (
		<Tabs defaultValue='account' className='w-[600px] flex gap-6'>
			<TabsList className='flex-col h-auto w-48'>
				<TabsTrigger value='account' className='w-full justify-start'>
					Account
				</TabsTrigger>
				<TabsTrigger value='password' className='w-full justify-start'>
					Password
				</TabsTrigger>
				<TabsTrigger value='billing' className='w-full justify-start'>
					Billing
				</TabsTrigger>
				<TabsTrigger value='team' className='w-full justify-start'>
					Team
				</TabsTrigger>
			</TabsList>
			<div className='flex-1'>
				<TabsContent value='account' className='mt-0'>
					<div className='rounded-lg border p-6'>
						<h3 className='text-lg font-semibold mb-4'>Account Settings</h3>
						<p className='text-sm text-muted-foreground mb-4'>
							Manage your account settings and preferences.
						</p>
						<div className='space-y-4'>
							<div>
								<label htmlFor='email-input' className='text-sm font-medium'>
									Email
								</label>
								<input
									id='email-input'
									type='email'
									className='mt-1 w-full px-3 py-2 border rounded-md'
									placeholder='your@email.com'
								/>
							</div>
							<div>
								<label htmlFor='name-input' className='text-sm font-medium'>
									Name
								</label>
								<input
									id='name-input'
									type='text'
									className='mt-1 w-full px-3 py-2 border rounded-md'
									placeholder='Your name'
								/>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='password' className='mt-0'>
					<div className='rounded-lg border p-6'>
						<h3 className='text-lg font-semibold mb-4'>Password Settings</h3>
						<p className='text-sm text-muted-foreground mb-4'>
							Update your password to keep your account secure.
						</p>
						<div className='space-y-4'>
							<div>
								<label htmlFor='current-password' className='text-sm font-medium'>
									Current Password
								</label>
								<input
									id='current-password'
									type='password'
									className='mt-1 w-full px-3 py-2 border rounded-md'
								/>
							</div>
							<div>
								<label htmlFor='new-password' className='text-sm font-medium'>
									New Password
								</label>
								<input
									id='new-password'
									type='password'
									className='mt-1 w-full px-3 py-2 border rounded-md'
								/>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='billing' className='mt-0'>
					<div className='rounded-lg border p-6'>
						<h3 className='text-lg font-semibold mb-4'>Billing Information</h3>
						<p className='text-sm text-muted-foreground mb-4'>
							Manage your billing and subscription details.
						</p>
						<div className='space-y-4'>
							<div>
								<label htmlFor='plan-select' className='text-sm font-medium'>
									Plan
								</label>
								<select id='plan-select' className='mt-1 w-full px-3 py-2 border rounded-md'>
									<option>Free Plan</option>
									<option>Pro Plan</option>
									<option>Enterprise Plan</option>
								</select>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='team' className='mt-0'>
					<div className='rounded-lg border p-6'>
						<h3 className='text-lg font-semibold mb-4'>Team Management</h3>
						<p className='text-sm text-muted-foreground mb-4'>
							Manage your team members and their permissions.
						</p>
						<div className='space-y-4'>
							<div>
								<label htmlFor='team-members' className='text-sm font-medium'>
									Team Members
								</label>
								<div className='mt-2 space-y-2'>
									<div className='flex items-center justify-between p-2 bg-gray-50 rounded'>
										<span className='text-sm'>john@example.com</span>
										<button className='text-red-600 text-sm'>Remove</button>
									</div>
									<div className='flex items-center justify-between p-2 bg-gray-50 rounded'>
										<span className='text-sm'>jane@example.com</span>
										<button className='text-red-600 text-sm'>Remove</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
			</div>
		</Tabs>
	)
};

// Disabled Tabs
export const Disabled: Story = {
	render: () => (
		<Tabs defaultValue='active' className='w-[400px]'>
			<TabsList>
				<TabsTrigger value='active'>Active Tab</TabsTrigger>
				<TabsTrigger value='disabled' disabled>
					Disabled Tab
				</TabsTrigger>
				<TabsTrigger value='another'>Another Tab</TabsTrigger>
			</TabsList>
			<TabsContent value='active' className='mt-4'>
				<div className='rounded-lg border p-4'>
					<h3 className='text-lg font-semibold mb-2'>Active Tab</h3>
					<p className='text-sm text-muted-foreground'>This tab is active and fully functional.</p>
				</div>
			</TabsContent>
			<TabsContent value='disabled' className='mt-4'>
				<div className='rounded-lg border p-4 opacity-50'>
					<h3 className='text-lg font-semibold mb-2'>Disabled Tab</h3>
					<p className='text-sm text-muted-foreground'>
						This tab is disabled and cannot be accessed.
					</p>
				</div>
			</TabsContent>
			<TabsContent value='another' className='mt-4'>
				<div className='rounded-lg border p-4'>
					<h3 className='text-lg font-semibold mb-2'>Another Tab</h3>
					<p className='text-sm text-muted-foreground'>This is another active tab with content.</p>
				</div>
			</TabsContent>
		</Tabs>
	)
};

// Custom Styled Tabs
export const CustomStyled: Story = {
	render: () => (
		<Tabs defaultValue='design' className='w-[400px]'>
			<TabsList className='bg-gradient-to-r from-purple-500 to-pink-500 p-1'>
				<TabsTrigger
					value='design'
					className='data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=inactive]:text-white data-[state=inactive]:hover:bg-white/20'
				>
					Design
				</TabsTrigger>
				<TabsTrigger
					value='code'
					className='data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=inactive]:text-white data-[state=inactive]:hover:bg-white/20'
				>
					Code
				</TabsTrigger>
				<TabsTrigger
					value='preview'
					className='data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=inactive]:text-white data-[state=inactive]:hover:bg-white/20'
				>
					Preview
				</TabsTrigger>
			</TabsList>
			<TabsContent value='design' className='mt-4'>
				<div className='rounded-lg border-2 border-purple-200 p-4 bg-gradient-to-br from-purple-50 to-pink-50'>
					<h3 className='text-lg font-semibold mb-2 text-purple-800'>Design Mode</h3>
					<p className='text-sm text-purple-600'>
						Create beautiful designs with our intuitive design tools.
					</p>
				</div>
			</TabsContent>
			<TabsContent value='code' className='mt-4'>
				<div className='rounded-lg border-2 border-purple-200 p-4 bg-gradient-to-br from-purple-50 to-pink-50'>
					<h3 className='text-lg font-semibold mb-2 text-purple-800'>Code Editor</h3>
					<p className='text-sm text-purple-600'>
						Write and edit code with syntax highlighting and autocomplete.
					</p>
				</div>
			</TabsContent>
			<TabsContent value='preview' className='mt-4'>
				<div className='rounded-lg border-2 border-purple-200 p-4 bg-gradient-to-br from-purple-50 to-pink-50'>
					<h3 className='text-lg font-semibold mb-2 text-purple-800'>Live Preview</h3>
					<p className='text-sm text-purple-600'>
						See your changes in real-time with live preview.
					</p>
				</div>
			</TabsContent>
		</Tabs>
	)
};
