import * as React from 'react';

import { MemoryRouter } from 'react-router-dom';

import TableRow from './TableRow';

const Template = (args) => (
	<table>
		<tbody>
			<TableRow {...args} />
		</tbody>
	</table>
);

export const Default = Template.bind({});

export const Year = Template.bind({});
Year.args = {
	year: '2022'
};

export const MediaType = Template.bind({});
MediaType.args = {
	mediaType: 'tv'
};

export const Title = Template.bind({});
Title.args = {
	title: 'Black Widow'
};

export const EpisodeCount = Template.bind({});
EpisodeCount.args = {
	mediaType: 'tv',
	episodeCount: 100
};

export const Character = Template.bind({});
Character.args = {
	character: 'Herself'
};

export const Id = Template.bind({});
Id.args = {
	id: '747188'
};

export default {
	title: 'Design System/Person/Credits Table/Table Row',
	component: TableRow,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
