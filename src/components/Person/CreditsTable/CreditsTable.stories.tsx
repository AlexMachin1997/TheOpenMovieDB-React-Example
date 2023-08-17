import { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';

import CreditsTable from './CreditsTable';
import ActingGroupData from './ActingGroupData';
import CreditsTableTitle from './CreditsTableTitle';
import { MEDIA_TYPE } from '../../../types/RoutingTypes';

const meta: Meta<typeof CreditsTable> = {
	component: CreditsTable,
	title: 'Person/Credits Table',
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};

export default meta;

type Story = StoryObj<typeof CreditsTable>;

const Template = (args: Story['args']) => (
	<div>
		<CreditsTableTitle
			allDropdownOptions={[
				{
					label: 'Movies',
					value: 'movies'
				},
				{
					label: 'TV Shows',
					value: 'tv-shows'
				}
			]}
			departmentDropdownOptions={[
				{
					label: 'Acting (40)',
					value: 'acting'
				},
				{
					label: 'Production (1)',
					value: 'production'
				}
			]}
			showClearAll
		/>
		<div style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
			<CreditsTable credits={args?.credits ?? []} year={args?.year ?? 0} />
		</div>
	</div>
);

export const TVActingTableExample: Story = {
	render: Template,
	args: {
		year: 2020,
		credits: [
			{
				year: 2020,
				title: 'The Late Show with Stephen Colbert',
				episodeCount: 1,
				mediaType: MEDIA_TYPE.TV,
				character: 'Self'
			},
			{
				year: 2020,
				title: 'Close Up with The Hollywood Reporter',
				episodeCount: 1,
				mediaType: MEDIA_TYPE.TV,
				character: 'Self'
			}
		]
	}
};

export const MovieActingTableExample: Story = {
	render: Template,
	args: {
		year: 2021,
		credits: [
			{
				year: 2021,
				title: 'Black Widow',
				mediaType: MEDIA_TYPE.MOVIE,
				character: 'Natasha Romanoff / Black Widow'
			},
			{
				year: 2021,
				title: 'Sing 2',
				mediaType: MEDIA_TYPE.MOVIE,
				character: 'Ash (voice)'
			}
		]
	}
};

export const MovieAndTVExample = () => {
	// Generate a table for each credit year e.g. 2021, 2022(Credits are grouped into years)
	const ActingCreditTables = ActingGroupData.map((data) => (
		<CreditsTable credits={data.credits} year={data.year} key={data.year} />
	));

	return (
		<div>
			<CreditsTableTitle
				allDropdownOptions={[
					{
						label: 'Movies',
						value: 'movies'
					},
					{
						label: 'TV Shows',
						value: 'tv-shows'
					}
				]}
				departmentDropdownOptions={[
					{
						label: 'Acting (40)',
						value: 'acting'
					},
					{
						label: 'Production (1)',
						value: 'production'
					}
				]}
				showClearAll
			/>
			<div style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>{ActingCreditTables}</div>
		</div>
	);
};
