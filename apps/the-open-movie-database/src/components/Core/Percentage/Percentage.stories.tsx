import type { Meta, StoryObj } from '@storybook/react-vite';

import Percentage from '~/components/Core/Percentage/Percentage';

const meta: Meta<typeof Percentage> = {
	component: Percentage,
	title: 'Core/Percentage'
};

export default meta;

type Story = StoryObj<typeof Percentage>;

export const NoRating: Story = {
	render: (args) => <Percentage {...args} />,
	args: {
		percentage: 0
	}
};

export const RedRating: Story = {
	render: (args) => <Percentage {...args} />,
	args: {
		percentage: 10
	}
};

export const YellowRating: Story = {
	render: (args) => <Percentage {...args} />,
	args: {
		percentage: 50
	}
};

export const GreenRating: Story = {
	render: (args) => <Percentage {...args} />,
	args: {
		percentage: 100
	}
};

export const StrokeWidth: Story = {
	render: (args) => <Percentage {...args} />,
	args: {
		strokeWidth: 10
	}
};
