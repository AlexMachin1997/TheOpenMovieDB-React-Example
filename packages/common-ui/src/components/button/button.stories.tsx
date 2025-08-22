import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '~/components/button/button';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
		},
		size: {
			control: { type: 'select' },
			options: ['default', 'sm', 'lg', 'icon']
		},
		disabled: { control: { type: 'boolean' } },
		asChild: { control: { type: 'boolean' } }
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Button'
	}
};

export const Variants: Story = {
	render: () => (
		<div className='flex flex-wrap gap-4'>
			<Button variant='default'>Default</Button>
			<Button variant='destructive'>Destructive</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='link'>Link</Button>
		</div>
	)
};

export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-4'>
			<Button size='sm'>Small</Button>
			<Button size='default'>Default</Button>
			<Button size='lg'>Large</Button>
			<Button size='icon'>🔍</Button>
		</div>
	)
};

export const WithIcons: Story = {
	render: () => (
		<div className='flex flex-wrap gap-4'>
			<Button>
				<svg
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
				>
					<path d='M12 5v14M5 12h14' />
				</svg>
				Add Item
			</Button>
			<Button variant='outline'>
				<svg
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
				>
					<path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
					<polyline points='7,10 12,15 17,10' />
					<line x1='12' y1='15' x2='12' y2='3' />
				</svg>
				Download
			</Button>
			<Button variant='ghost' size='icon'>
				<svg
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
				>
					<circle cx='11' cy='11' r='8' />
					<path d='m21 21-4.35-4.35' />
				</svg>
			</Button>
		</div>
	)
};

// Disabled states
export const Disabled: Story = {
	render: () => (
		<div className='flex flex-wrap gap-4'>
			<Button disabled>Disabled Default</Button>
			<Button variant='destructive' disabled>
				Disabled Destructive
			</Button>
			<Button variant='outline' disabled>
				Disabled Outline
			</Button>
			<Button variant='secondary' disabled>
				Disabled Secondary
			</Button>
			<Button variant='ghost' disabled>
				Disabled Ghost
			</Button>
			<Button variant='link' disabled>
				Disabled Link
			</Button>
		</div>
	)
};

// Interactive example
export const Interactive: Story = {
	args: {
		children: 'Click me!',
		variant: 'default',
		size: 'default'
	},
	parameters: {
		docs: {
			description: {
				story: 'This is an interactive button that you can control using the controls panel.'
			}
		}
	}
};

// As child example
export const AsChild: Story = {
	render: () => (
		<div className='flex gap-4'>
			<Button asChild>
				<a href='#example'>Link Button</a>
			</Button>
			<Button asChild variant='outline'>
				<span>Span Button</span>
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Using the `asChild` prop allows the button to render as a different element while maintaining button styling and behavior.'
			}
		}
	}
};
