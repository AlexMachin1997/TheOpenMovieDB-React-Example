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

export const Default = {
	render: Template
};

export const Year = {
	render: Template,

	args: {
		year: '2022'
	}
};

export const MediaType = {
	render: Template,

	args: {
		mediaType: 'tv'
	}
};

export const Title = {
	render: Template,

	args: {
		title: 'Black Widow'
	}
};

export const EpisodeCount = {
	render: Template,

	args: {
		mediaType: 'tv',
		episodeCount: 100
	}
};

export const Character = {
	render: Template,

	args: {
		character: 'Herself'
	}
};

export const Id = {
	render: Template,

	args: {
		id: '747188'
	}
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
