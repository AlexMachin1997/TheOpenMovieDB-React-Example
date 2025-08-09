import { Meta, StoryObj } from '@storybook/react-vite';

import Button from '~/components/Core/Button/Button';

const meta: Meta<typeof Button> = {
	component: Button,
	title: 'Core/Button'
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: 'Login'
	}
};

export const AdditionalProperties: Story = {
	args: {
		className: 'text-orange-400 p-2',
		children: 'Login'
	}
};
