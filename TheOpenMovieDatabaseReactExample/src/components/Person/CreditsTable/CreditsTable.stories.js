import * as React from 'react';

import { MemoryRouter } from 'react-router-dom';

import CreditsTable from './CreditsTable';
import ActingGroupData from './ActingGroupData';

const Template = (args) => (
	<div>
		<div style={{ margin: '1rem 0' }}>
			<p className='text-2xl font-bold text-black'>Acting</p>
		</div>
		<div style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
			<CreditsTable {...args} />
		</div>
	</div>
);

export const TVActingTableExample = Template.bind({});
TVActingTableExample.args = {
	year: '2020',
	credits: [
		{
			releaseDate: '2015',
			title: 'The Late Show with Stephen Colbert',
			episodeCount: '1',
			mediaType: 'tv',
			role: 'Self'
		},
		{
			releaseDate: '2015',
			title: 'Close Up with The Hollywood Reporter',
			episodeCount: '1',
			mediaType: 'tv',
			role: 'Self'
		}
	]
};

export const MovieActingTableExample = Template.bind({});
MovieActingTableExample.args = {
	year: '2021',
	credits: [
		{
			releaseDate: '2021',
			title: 'Black Widow',
			episodeCount: '0',
			mediaType: 'movie',
			role: 'Natasha Romanoff / Black Widow'
		},
		{
			releaseDate: '2021',
			title: 'Sing 2',
			episodeCount: '0',
			mediaType: 'movie',
			role: 'Ash (voice)'
		}
	]
};

export const MovieAndTVExample = () => {
	// Generate a table for each credit year e.g. 2021, 2022(Credits are grouped into years)
	const ActingCreditTables = ActingGroupData.map((data) => (
		<CreditsTable credits={data.credits} year={data.year} key={data.year} />
	));

	return (
		<div>
			<div style={{ margin: '1rem 0' }}>
				<p className='text-2xl font-bold text-black'>Acting</p>
			</div>
			<div style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>{ActingCreditTables}</div>
		</div>
	);
};

export default {
	title: 'Design System/Person/Credits Table',
	component: CreditsTable,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
