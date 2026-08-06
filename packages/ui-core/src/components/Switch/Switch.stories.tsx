import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Switch } from '~/components/Switch/Switch';
import { Field } from '~/components/Field/Field';

const meta: Meta<typeof Switch> = {
	title: 'UI Core/Switch',
	component: Switch,
	parameters: {
		layout: 'centered'
	},
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

const SwitchWithField = () => {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className='w-80'>
			<Field
				label='Email me offers'
				id='marketing'
				description='You can turn this off at any time.'
			>
				{(control) => (
					<Switch {...control} checked={enabled} onCheckedChange={setEnabled} />
				)}
			</Field>
		</div>
	);
};

export const WithField: Story = {
	render: () => <SwitchWithField />,
	parameters: {
		docs: {
			source: {
				language: 'tsx',
				code: `import { Field, Switch } from '@repo/ui-core';

<Field label='Email me offers' id='marketing'>
  {(control) => <Switch {...control} checked={enabled} onCheckedChange={setEnabled} />}
</Field>`
			}
		}
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const toggle = canvas.getByRole('switch', { name: 'Email me offers' });

		await step('It is labelled and described', async () => {
			await expect(toggle).toHaveAttribute('id', 'marketing');
			await expect(toggle).toHaveAttribute('aria-describedby', 'marketing-message');
		});

		await step('And toggles', async () => {
			await expect(toggle).not.toBeChecked();
			await userEvent.click(toggle);
			await expect(toggle).toBeChecked();
		});
	}
};
