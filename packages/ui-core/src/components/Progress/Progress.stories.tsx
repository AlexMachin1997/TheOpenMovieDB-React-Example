import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '~/components/Progress/Progress';

const meta: Meta<typeof Progress> = {
	title: 'Components/Progress',
	component: Progress,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Progress value (0-100)'
		},
		indeterminate: {
			control: { type: 'boolean' },
			description: 'Shows an indeterminate loading animation'
		},
		indicatorClassName: {
			control: { type: 'text' },
			description:
				'Additional CSS classes for the progress indicator (use for custom colors like bg-red-500)'
		},
		showValue: {
			control: { type: 'boolean' },
			description: 'Show percentage value as text overlay'
		},
		className: {
			control: { type: 'text' },
			description: 'Additional CSS classes'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 50
	}
};

export const Empty: Story = {
	args: {
		value: 0
	}
};

export const Quarter: Story = {
	args: {
		value: 25
	}
};

export const Half: Story = {
	args: {
		value: 50
	}
};

export const ThreeQuarters: Story = {
	args: {
		value: 75
	}
};

export const Complete: Story = {
	args: {
		value: 100
	}
};

export const Indeterminate: Story = {
	args: {
		indeterminate: true
	}
};

export const CustomColors: Story = {
	args: {
		value: 60,
		indicatorClassName: 'bg-green-500'
	}
};

export const CustomStyling: Story = {
	args: {
		value: 60,
		className: 'h-4 bg-slate-200',
		indicatorClassName: 'bg-purple-500'
	}
};

export const ProgressExamples: Story = {
	render: () => (
		<div className='w-96 space-y-6'>
			<div>
				<h3 className='text-sm font-medium mb-2'>File Upload Progress</h3>
				<Progress value={75} />
				<p className='text-xs text-muted-foreground mt-1'>75% complete</p>
			</div>

			<div>
				<h3 className='text-sm font-medium mb-2'>Download Progress</h3>
				<Progress value={45} />
				<p className='text-xs text-muted-foreground mt-1'>Downloading... 45%</p>
			</div>

			<div>
				<h3 className='text-sm font-medium mb-2'>Loading Content</h3>
				<Progress indeterminate />
				<p className='text-xs text-muted-foreground mt-1'>Please wait...</p>
			</div>

			<div>
				<h3 className='text-sm font-medium mb-2'>Installation Progress</h3>
				<Progress value={90} className='h-3' />
				<p className='text-xs text-muted-foreground mt-1'>Installing packages... 90%</p>
			</div>
		</div>
	)
};

export const ColorExamples: Story = {
	render: () => (
		<div className='w-96 space-y-4'>
			<div>
				<h4 className='text-sm font-medium mb-2'>Default</h4>
				<Progress value={60} />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Success</h4>
				<Progress value={80} indicatorClassName='bg-green-500' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Warning</h4>
				<Progress value={45} indicatorClassName='bg-yellow-500' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Error</h4>
				<Progress value={25} indicatorClassName='bg-red-500' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Info</h4>
				<Progress value={70} indicatorClassName='bg-blue-500' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Secondary</h4>
				<Progress value={55} indicatorClassName='bg-gray-500' />
			</div>
		</div>
	)
};

export const VariantUseCase: Story = {
	render: () => (
		<div className='w-96 space-y-6'>
			<div>
				<h3 className='text-sm font-medium mb-2'>System Health Check</h3>
				<div className='space-y-3'>
					<div>
						<div className='flex justify-between text-xs mb-1'>
							<span>CPU Usage</span>
							<span>45%</span>
						</div>
						<Progress value={45} indicatorClassName='bg-yellow-500' />
					</div>
					<div>
						<div className='flex justify-between text-xs mb-1'>
							<span>Memory</span>
							<span>25%</span>
						</div>
						<Progress value={25} indicatorClassName='bg-green-500' />
					</div>
					<div>
						<div className='flex justify-between text-xs mb-1'>
							<span>Disk Space</span>
							<span>90%</span>
						</div>
						<Progress value={90} indicatorClassName='bg-red-500' />
					</div>
				</div>
			</div>

			<div>
				<h3 className='text-sm font-medium mb-2'>Task Progress</h3>
				<div className='space-y-3'>
					<div>
						<div className='flex justify-between text-xs mb-1'>
							<span>Data Processing</span>
							<span>100%</span>
						</div>
						<Progress value={100} indicatorClassName='bg-green-500' />
					</div>
					<div>
						<div className='flex justify-between text-xs mb-1'>
							<span>Report Generation</span>
							<span>65%</span>
						</div>
						<Progress value={65} indicatorClassName='bg-blue-500' />
					</div>
					<div>
						<div className='flex justify-between text-xs mb-1'>
							<span>Background Sync</span>
							<span>35%</span>
						</div>
						<Progress value={35} indicatorClassName='bg-gray-500' />
					</div>
				</div>
			</div>
		</div>
	)
};

export const WithTextOverlay: Story = {
	render: () => (
		<div className='w-96 space-y-4'>
			<div>
				<h4 className='text-sm font-medium mb-2'>Show Percentage</h4>
				<Progress value={75} showValue className='h-6' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Custom Text</h4>
				<Progress value={40} className='h-6' showValue />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>File Upload</h4>
				<Progress value={65} className='h-6' indicatorClassName='bg-green-500' showValue />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Step Progress</h4>
				<Progress value={60} className='h-6' indicatorClassName='bg-blue-500' showValue />
			</div>
		</div>
	)
};

export const Sizes: Story = {
	render: () => (
		<div className='w-96 space-y-4'>
			<div>
				<h4 className='text-sm font-medium mb-2'>Small (h-1)</h4>
				<Progress value={60} className='h-1' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Default (h-2)</h4>
				<Progress value={60} />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Medium (h-3)</h4>
				<Progress value={60} className='h-3' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Large (h-4)</h4>
				<Progress value={60} className='h-4' />
			</div>

			<div>
				<h4 className='text-sm font-medium mb-2'>Extra Large with Text (h-6)</h4>
				<Progress value={60} className='h-6' showValue />
			</div>
		</div>
	)
};
