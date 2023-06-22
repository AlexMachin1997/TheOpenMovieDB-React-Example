import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Menu from './Menu';

const Template = (args) => <Menu {...args} />;

export const Default = Template.bind({});

export const IsAuthenticated = Template.bind({});
IsAuthenticated.args = {
	isAuthenticated: true
};

export default {
	title: 'Design System/Layouts/Menu',
	component: Menu,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
