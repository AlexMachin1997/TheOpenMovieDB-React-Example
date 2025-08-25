import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CalendarIcon, InfoIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Label } from '~/components/Label/Label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover/Popover';

const meta: Meta<typeof Popover> = {
	title: 'Components/Popover',
	component: Popover,
	subcomponents: { PopoverTrigger, PopoverContent },
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		defaultOpen: {
			control: 'boolean',
			description: 'Whether the popover is open by default'
		},
		open: {
			control: 'boolean',
			description: 'Controlled open state'
		},
		onOpenChange: {
			action: 'openChange',
			description: 'Callback when open state changes'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic popover with simple content
export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>Open Popover</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Dimensions</h4>
						<p className='text-sm text-muted-foreground'>Set the dimensions for the layer.</p>
					</div>
					<div className='grid gap-2'>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='width'>Width</Label>
							<Input id='width' defaultValue='100%' className='col-span-2 h-8' />
						</div>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='maxWidth'>Max. width</Label>
							<Input id='maxWidth' defaultValue='300px' className='col-span-2 h-8' />
						</div>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='height'>Height</Label>
							<Input id='height' defaultValue='25px' className='col-span-2 h-8' />
						</div>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='maxHeight'>Max. height</Label>
							<Input id='maxHeight' defaultValue='none' className='col-span-2 h-8' />
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
};

// Popover with controlled state
const ControlledPopover = () => {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline'>{open ? 'Close' : 'Open'} Controlled Popover</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<div className='space-y-4'>
					<h4 className='font-medium leading-none'>Controlled Popover</h4>
					<p className='text-sm text-muted-foreground'>
						This popover is controlled by React state. The open state is managed externally.
					</p>
					<Button onClick={() => setOpen(false)} size='sm'>
						Close Popover
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export const Controlled: Story = {
	render: () => <ControlledPopover />
};

// Popover with different alignments
export const Alignments: Story = {
	render: () => (
		<div className='flex gap-4 flex-wrap'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Top</Button>
				</PopoverTrigger>
				<PopoverContent align='start' side='top' className='w-60'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Top Aligned</h4>
						<p className='text-sm text-muted-foreground'>
							This popover appears above the trigger and is left-aligned.
						</p>
					</div>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Bottom</Button>
				</PopoverTrigger>
				<PopoverContent align='center' side='bottom' className='w-60'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Bottom Aligned</h4>
						<p className='text-sm text-muted-foreground'>
							This popover appears below the trigger and is center-aligned.
						</p>
					</div>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Right</Button>
				</PopoverTrigger>
				<PopoverContent align='start' side='right' className='w-60'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Right Aligned</h4>
						<p className='text-sm text-muted-foreground'>
							This popover appears to the right of the trigger.
						</p>
					</div>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>Left</Button>
				</PopoverTrigger>
				<PopoverContent align='end' side='left' className='w-60'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Left Aligned</h4>
						<p className='text-sm text-muted-foreground'>
							This popover appears to the left of the trigger.
						</p>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
};

// Popover with icon trigger
export const WithIcon: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='icon'>
					<InfoIcon className='h-4 w-4' />
					<span className='sr-only'>Open info</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<div className='space-y-2'>
					<h4 className='font-medium leading-none'>Information</h4>
					<p className='text-sm text-muted-foreground'>
						This is an informational popover triggered by an icon button. It&apos;s useful for
						providing additional context or help text.
					</p>
				</div>
			</PopoverContent>
		</Popover>
	)
};

// Popover with complex content
export const ComplexContent: Story = {
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

// Popover with user profile
export const UserProfile: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<UserIcon className='h-4 w-4' />
					<span className='sr-only'>Open user menu</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80' align='end'>
				<div className='flex items-center gap-4'>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
						<UserIcon className='h-4 w-4' />
					</div>
					<div className='space-y-1'>
						<p className='text-sm font-medium leading-none'>John Doe</p>
						<p className='text-xs text-muted-foreground'>john@example.com</p>
					</div>
				</div>
				<div className='mt-4 space-y-2'>
					<Button variant='ghost' className='w-full justify-start'>
						<UserIcon className='mr-2 h-4 w-4' />
						Profile
					</Button>
					<Button variant='ghost' className='w-full justify-start'>
						<SettingsIcon className='mr-2 h-4 w-4' />
						Settings
					</Button>
					<Button variant='ghost' className='w-full justify-start text-destructive'>
						Sign out
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
};

// Popover with date picker simulation
export const DatePicker: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' className='w-[240px] justify-start text-left font-normal'>
					<CalendarIcon className='mr-2 h-4 w-4' />
					Pick a date
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<div className='p-3'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Select Date</h4>
						<p className='text-sm text-muted-foreground'>Choose a date from the calendar below.</p>
					</div>
					<div className='mt-4 grid grid-cols-7 gap-1 text-center text-sm'>
						{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
							<div key={day} className='p-2 font-medium text-muted-foreground'>
								{day}
							</div>
						))}
						{Array.from({ length: 35 }, (_, i) => (
							<Button
								key={i}
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0'
								disabled={i < 1 || i > 28}
							>
								{i > 0 && i <= 28 ? i : ''}
							</Button>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
};

// Popover with custom styling
export const CustomStyling: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>Custom Styled</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80 border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5'>
				<div className='space-y-2'>
					<h4 className='font-medium leading-none text-primary'>Custom Styled Popover</h4>
					<p className='text-sm text-muted-foreground'>
						This popover has custom styling with gradients and borders.
					</p>
					<div className='mt-4 rounded-lg bg-background p-3 border'>
						<p className='text-sm'>Custom content area with background</p>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
};

// Popover with collision detection
export const CollisionDetection: Story = {
	render: () => (
		<div className='space-y-8'>
			<div className='text-center'>
				<h3 className='text-lg font-medium mb-4'>Collision Detection Demo</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					Try positioning the popover near the edges of the viewport to see automatic alignment
					adjustment.
				</p>
			</div>

			{/* Top edge collision */}
			<div className='flex justify-center'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline'>Near Top Edge</Button>
					</PopoverTrigger>
					<PopoverContent side='top' align='center' collisionPadding={16} className='w-80'>
						<div className='space-y-2'>
							<h4 className='font-medium leading-none'>Top Edge Collision</h4>
							<p className='text-sm text-muted-foreground'>
								This popover prefers to appear above the trigger, but will automatically flip to the
								bottom if there&apos;s not enough space at the top.
							</p>
							<div className='mt-4 p-3 bg-muted rounded'>
								<p className='text-sm'>Additional content to make the popover larger</p>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			{/* Bottom edge collision */}
			<div className='flex justify-center'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline'>Near Bottom Edge</Button>
					</PopoverTrigger>
					<PopoverContent side='bottom' align='center' collisionPadding={16} className='w-80'>
						<div className='space-y-2'>
							<h4 className='font-medium leading-none'>Bottom Edge Collision</h4>
							<p className='text-sm text-muted-foreground'>
								This popover prefers to appear below the trigger, but will automatically flip to the
								top if there&apos;s not enough space at the bottom.
							</p>
							<div className='mt-4 p-3 bg-muted rounded'>
								<p className='text-sm'>Additional content to make the popover larger</p>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			{/* Left edge collision */}
			<div className='flex justify-center'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline'>Near Left Edge</Button>
					</PopoverTrigger>
					<PopoverContent
						side='right'
						align='center'
						collisionPadding={16}
						avoidCollisions={true}
						className='w-80'
					>
						<div className='space-y-2'>
							<h4 className='font-medium leading-none'>Left Edge Collision</h4>
							<p className='text-sm text-muted-foreground'>
								This popover prefers to appear to the right of the trigger, but will automatically
								flip to the left if there&apos;s not enough space. It also adjusts alignment to
								center.
							</p>
							<div className='mt-4 p-3 bg-muted rounded'>
								<p className='text-sm'>Additional content to make the popover larger</p>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			{/* Right edge collision */}
			<div className='flex justify-center'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline'>Near Right Edge</Button>
					</PopoverTrigger>
					<PopoverContent
						side='left'
						align='center'
						collisionPadding={16}
						avoidCollisions={true}
						className='w-80'
					>
						<div className='space-y-2'>
							<h4 className='font-medium leading-none'>Right Edge Collision</h4>
							<p className='text-sm text-muted-foreground'>
								This popover prefers to appear to the left of the trigger, but will automatically
								flip to the right if there&apos;s not enough space. It also adjusts alignment to
								center.
							</p>
							<div className='mt-4 p-3 bg-muted rounded'>
								<p className='text-sm'>Additional content to make the popover larger</p>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
};
