import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Label } from '@repo/ui-core';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui-overlays';
import { SettingsIcon } from 'lucide-react';
import { Input } from '@repo/ui-forms';

const meta: Meta<typeof Popover> = {
	title: 'Components/Form/PopoverForm',
	component: Popover,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Popover with complex content
export const PopoverWithForm: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>
					<SettingsIcon className='mr-2 h-4 w-4' />
					Settings
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Account Settings</h4>
						<p className='text-sm text-muted-foreground'>
							Manage your account preferences and settings.
						</p>
					</div>
					<div className='grid gap-2'>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' defaultValue='John Doe' className='col-span-2 h-8' />
						</div>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' defaultValue='john@example.com' className='col-span-2 h-8' />
						</div>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='username'>Username</Label>
							<Input id='username' defaultValue='@johndoe' className='col-span-2 h-8' />
						</div>
					</div>
					<div className='flex gap-2'>
						<Button size='sm' className='flex-1'>
							Save
						</Button>
						<Button size='sm' variant='outline' className='flex-1'>
							Cancel
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
};
