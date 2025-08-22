import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

const meta: Meta<typeof Alert> = {
	title: 'Components/Alert',
	component: Alert,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'destructive', 'success', 'warning', 'error']
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'default',
		children: (
			<>
				<InfoIcon width={20} height={20} />
				<AlertTitle>Information</AlertTitle>
				<AlertDescription>
					This is a default alert with an informational message. It provides general information to
					the user.
				</AlertDescription>
			</>
		)
	}
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		children: (
			<>
				<AlertTriangleIcon width={20} height={20} />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					This is a destructive alert indicating an error or critical issue that requires attention.
				</AlertDescription>
			</>
		)
	}
};

export const Success: Story = {
	args: {
		variant: 'success',
		children: (
			<>
				<CheckCircleIcon width={20} height={20} />
				<AlertTitle>Success</AlertTitle>
				<AlertDescription>
					Your action was completed successfully. The changes have been saved and applied.
				</AlertDescription>
			</>
		)
	}
};

export const Warning: Story = {
	args: {
		variant: 'warning',
		children: (
			<>
				<AlertTriangleIcon width={20} height={20} />
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>
					Please review your input before proceeding. Some fields may need attention.
				</AlertDescription>
			</>
		)
	}
};

export const Error: Story = {
	args: {
		variant: 'error',
		children: (
			<>
				<XCircleIcon width={20} height={20} />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					An error occurred while processing your request. Please try again or contact support.
				</AlertDescription>
			</>
		)
	}
};

export const WithLongContent: Story = {
	args: {
		variant: 'default',
		children: (
			<>
				<AlertTriangleIcon width={20} height={20} />
				<AlertTitle>Important Notice</AlertTitle>
				<AlertDescription>
					This alert contains a longer description to demonstrate how the component handles extended
					content. The text should wrap appropriately and maintain proper spacing and readability.
					This is useful for displaying detailed information or instructions to users.
				</AlertDescription>
			</>
		)
	}
};

export const WithoutIcon: Story = {
	args: {
		variant: 'default',
		children: (
			<>
				<AlertTitle>No Icon Alert</AlertTitle>
				<AlertDescription>
					This alert doesn&apos;t include an icon, showing how the component adapts its layout.
				</AlertDescription>
			</>
		)
	}
};

export const TitleOnly: Story = {
	args: {
		variant: 'default',
		children: (
			<>
				<AlertTriangleIcon width={20} height={20} />
				<AlertTitle>Success</AlertTitle>
			</>
		)
	}
};

export const DescriptionOnly: Story = {
	args: {
		variant: 'default',
		children: (
			<>
				<CheckCircleIcon width={20} height={20} />
				<AlertDescription>
					This alert only has a description without a title, showing the component&apos;s
					flexibility.
				</AlertDescription>
			</>
		)
	}
};

export const DestructiveWithLongContent: Story = {
	args: {
		variant: 'destructive',
		children: (
			<>
				<svg
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
				>
					<circle cx='12' cy='12' r='10' />
					<path d='m6 18L18 6M6 6l12 12' />
				</svg>
				<AlertTitle>Critical Error</AlertTitle>
				<AlertDescription>
					This is a destructive alert with extended content to show how error messages can be
					displayed with more detailed information. The destructive styling should make it clear
					that this is an important error that needs immediate attention.
				</AlertDescription>
			</>
		)
	}
};

export const AllVariants: Story = {
	render: () => (
		<div className='space-y-4 w-full max-w-md'>
			<Alert variant='default'>
				<InfoIcon width={20} height={20} />
				<AlertTitle>Default Alert</AlertTitle>
				<AlertDescription>
					This is the default alert variant with standard styling.
				</AlertDescription>
			</Alert>

			<Alert variant='success'>
				<CheckCircleIcon width={20} height={20} />
				<AlertTitle>Success Alert</AlertTitle>
				<AlertDescription>
					This is the success alert variant for positive feedback.
				</AlertDescription>
			</Alert>

			<Alert variant='warning'>
				<AlertTriangleIcon width={20} height={20} />
				<AlertTitle>Warning Alert</AlertTitle>
				<AlertDescription>
					This is the warning alert variant for cautionary messages.
				</AlertDescription>
			</Alert>

			<Alert variant='error'>
				<XCircleIcon width={20} height={20} />
				<AlertTitle>Error Alert</AlertTitle>
				<AlertDescription>This is the error alert variant for critical issues.</AlertDescription>
			</Alert>

			<Alert variant='destructive'>
				<AlertTriangleIcon width={20} height={20} />
				<AlertTitle>Destructive Alert</AlertTitle>
				<AlertDescription>
					This is the destructive alert variant for errors and warnings.
				</AlertDescription>
			</Alert>
		</div>
	)
};
