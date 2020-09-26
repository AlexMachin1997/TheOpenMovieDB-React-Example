import React from 'react';

import CreditsTable from './index';

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

export default {
	title: 'Person -> CreditTable',
	component: CreditsTable
};
