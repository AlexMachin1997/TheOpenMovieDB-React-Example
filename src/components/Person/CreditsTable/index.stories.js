import * as React from 'react';

import CreditsTable from './index';
import ActingGroupData from './ActingGroupData';
import Typography from '../../Core/Typography';

export const TVExample = () => (
	<CreditsTable
		group={{
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
		}}
	/>
);

export const MovieExample = () => (
	<CreditsTable
		group={{
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
		}}
	/>
);

export const ActingTable = () => {
	const tables = ActingGroupData.map((data, index) => <CreditsTable group={data} key={index} />);

	return (
		<div>
			<div style={{ margin: '1rem 0' }}>
				<Typography text='Acting' size='1.5rem' colour='black' weight='bold' />
			</div>
			<div style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>{tables}</div>
		</div>
	);
};

export default {
	title: 'Person -> CreditTable',
	component: CreditsTable
};
