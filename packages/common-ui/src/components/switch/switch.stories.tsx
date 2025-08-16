import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '~/components/switch/switch';

const meta: Meta<typeof Switch> = {
	title: 'Components/Switch',
	component: Switch,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		checked: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	}
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic Switch
export const Default: Story = {
	args: {}
};

// Switch with controlled state
export const Controlled: Story = {
	render: () => {
		const ControlledSwitch = () => {
			const [checked, setChecked] = useState(false);
			return (
				<div className='flex items-center space-x-2'>
					<Switch id='controlled-switch' checked={checked} onCheckedChange={setChecked} />
					<label
						htmlFor='controlled-switch'
						className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
					>
						{checked ? 'On' : 'Off'}
					</label>
				</div>
			);
		};
		return <ControlledSwitch />;
	}
};

// Switch with label
export const WithLabel: Story = {
	render: () => {
		const LabeledSwitch = () => {
			const [checked, setChecked] = useState(false);
			return (
				<div className='flex items-center space-x-2'>
					<Switch id='airplane-mode' checked={checked} onCheckedChange={setChecked} />
					<label
						htmlFor='airplane-mode'
						className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
					>
						Airplane Mode
					</label>
				</div>
			);
		};
		return <LabeledSwitch />;
	}
};

// Disabled Switch
export const Disabled: Story = {
	args: {
		disabled: true
	}
};

// Disabled checked Switch
export const DisabledChecked: Story = {
	args: {
		disabled: true,
		checked: true
	}
};

// Multiple switches example
export const MultipleSwitches: Story = {
	render: () => {
		const MultipleSwitchesExample = () => {
			const [notifications, setNotifications] = useState({
				marketing: false,
				security: true,
				updates: false
			});

			return (
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<div className='space-y-0.5'>
							<label htmlFor='marketing-switch' className='text-sm font-medium'>
								Marketing emails
							</label>
							<p className='text-xs text-muted-foreground'>
								Receive emails about new products, features, and more.
							</p>
						</div>
						<Switch
							id='marketing-switch'
							checked={notifications.marketing}
							onCheckedChange={(checked) =>
								setNotifications((prev) => ({ ...prev, marketing: checked }))
							}
						/>
					</div>
					<div className='flex items-center justify-between'>
						<div className='space-y-0.5'>
							<label htmlFor='security-switch' className='text-sm font-medium'>
								Security emails
							</label>
							<p className='text-xs text-muted-foreground'>
								Receive emails about your account security.
							</p>
						</div>
						<Switch
							id='security-switch'
							checked={notifications.security}
							onCheckedChange={(checked) =>
								setNotifications((prev) => ({ ...prev, security: checked }))
							}
						/>
					</div>
					<div className='flex items-center justify-between'>
						<div className='space-y-0.5'>
							<label htmlFor='updates-switch' className='text-sm font-medium'>
								System updates
							</label>
							<p className='text-xs text-muted-foreground'>
								Receive emails about system updates and maintenance.
							</p>
						</div>
						<Switch
							id='updates-switch'
							checked={notifications.updates}
							onCheckedChange={(checked) =>
								setNotifications((prev) => ({ ...prev, updates: checked }))
							}
						/>
					</div>
				</div>
			);
		};
		return <MultipleSwitchesExample />;
	}
};

// Switch with custom styling
export const CustomStyling: Story = {
	render: () => {
		const CustomStyledSwitch = () => {
			const [checked, setChecked] = useState(false);
			return (
				<div className='flex items-center space-x-2'>
					<Switch
						id='custom-switch'
						checked={checked}
						onCheckedChange={setChecked}
						className='data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300'
					/>
					<label htmlFor='custom-switch' className='text-sm font-medium'>
						Custom colored switch
					</label>
				</div>
			);
		};
		return <CustomStyledSwitch />;
	}
};

// Switch with description
export const WithDescription: Story = {
	render: () => {
		const DescriptionSwitch = () => {
			const [checked, setChecked] = useState(false);
			return (
				<div className='flex items-center justify-between rounded-lg border p-4 shadow-sm'>
					<div className='space-y-0.5'>
						<label htmlFor='description-switch' className='text-sm font-medium'>
							Dark mode
						</label>
						<p className='text-xs text-muted-foreground'>Toggle between light and dark theme</p>
					</div>
					<Switch id='description-switch' checked={checked} onCheckedChange={setChecked} />
				</div>
			);
		};
		return <DescriptionSwitch />;
	}
};
