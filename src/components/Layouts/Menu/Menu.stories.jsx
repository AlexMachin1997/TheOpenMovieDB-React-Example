import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Menu from './Menu';

export const Default = {};

export const IsAuthenticated = {
	args: {
		isAuthenticated: true
	}
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
