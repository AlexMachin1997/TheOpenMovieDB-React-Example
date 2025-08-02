import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import Menu from './Menu';

const meta: Meta<typeof Menu> = {
	component: Menu,
	title: 'Layout/Navigation Menu',
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const NoneAuthenticated: Story = {
	args: {
		isAuthenticated: false
	}
};

export const IsAuthenticated = {
	args: {
		...NoneAuthenticated.args,
		isAuthenticated: true
	}
};
