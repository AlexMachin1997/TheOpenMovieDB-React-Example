import type { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';

const meta: Meta<typeof Loader> = {
	component: Loader,
	title: 'Core/Loader'
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const FixedLoader: Story = {};

export const NoneFixedLoader: Story = {
	args: {
		isFixed: false
	}
};
