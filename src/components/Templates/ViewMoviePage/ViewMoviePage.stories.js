import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import ViewMoviePage from './ViewMoviePage';

export default {
	title: 'Design System/Templates/View movie page',
	component: ViewMoviePage,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};

const Template = (args) => <ViewMoviePage {...args} />;

export const ProjectPowerExample = Template.bind({});
