import type { Meta, StoryObj } from '@storybook/react';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from '~/components/tooltip/tooltip';
import { Button } from '~/components/button/button';

const meta: Meta<typeof Tooltip> = {
	title: 'Components/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		delayDuration: {
			control: { type: 'number', min: 0, max: 5000, step: 100 }
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<TooltipProvider>
			<Tooltip {...args}>
				<TooltipTrigger asChild>
					<button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
						Hover me
					</button>
				</TooltipTrigger>
				<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
					<p>This is a basic tooltip</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
};

export const WithButton: Story = {
	render: (args) => (
		<TooltipProvider>
			<Tooltip {...args}>
				<TooltipTrigger asChild>
					<Button variant='default'>Click me</Button>
				</TooltipTrigger>
				<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
					<p>This tooltip is triggered by a Button component</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
};

export const WithButtonNoAsChild: Story = {
	render: (args) => (
		<TooltipProvider>
			<Tooltip {...args}>
				<TooltipTrigger>
					<Button variant='outline'>Hover me (no asChild)</Button>
				</TooltipTrigger>
				<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
					<p>This tooltip is triggered by a Button without asChild</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
};

export const WithButtonAsChild: Story = {
	render: (args) => (
		<TooltipProvider>
			<Tooltip {...args}>
				<TooltipTrigger asChild>
					<Button variant='secondary' asChild>
						<span>Hover me (Button with asChild)</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
					<p>This tooltip is triggered by a Button with asChild prop</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
};

export const LongContent: Story = {
	render: (args) => (
		<TooltipProvider>
			<Tooltip {...args}>
				<TooltipTrigger asChild>
					<button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
						Long tooltip
					</button>
				</TooltipTrigger>
				<TooltipContent className='bg-gray-800 text-white border border-gray-600 max-w-xs text-center'>
					<p>
						This tooltip contains a longer message to demonstrate how the component handles extended
						content and text wrapping.
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
};

export const WithDelay: Story = {
	render: (args) => (
		<TooltipProvider>
			<Tooltip delayDuration={1000} {...args}>
				<TooltipTrigger asChild>
					<button className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600'>
						Delayed tooltip
					</button>
				</TooltipTrigger>
				<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
					<p>This tooltip appears after a 1 second delay</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
};

export const MultipleTooltips: Story = {
	render: (args) => (
		<TooltipProvider>
			<div className='flex gap-4'>
				<Tooltip {...args}>
					<TooltipTrigger asChild>
						<Button variant='outline'>Info</Button>
					</TooltipTrigger>
					<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
						<p>Information tooltip</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip {...args}>
					<TooltipTrigger asChild>
						<Button variant='destructive'>Delete</Button>
					</TooltipTrigger>
					<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
						<p>Delete this item</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip {...args}>
					<TooltipTrigger asChild>
						<Button variant='secondary'>Settings</Button>
					</TooltipTrigger>
					<TooltipContent className='bg-gray-800 text-white border border-gray-600'>
						<p>Open settings panel</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	)
};
