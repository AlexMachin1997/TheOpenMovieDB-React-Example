import * as React from 'react';

import { MemoryRouter } from 'react-router-dom';

import Entertainment from './EntertainmentSidebar';

export const DefaultEntertainmentSidebar = () => <Entertainment />;

export const EntertainmentTVSidebar = () => (
	<div className='mt-4'>
		<Entertainment
			facebookLink='https://www.facebook.com/RickandMorty'
			twitterLink='https://www.twitter.com/RickandMorty'
			instagramLink='https://www.instagram.com/rickandmorty/'
			homePageLink='https://www.adultswim.com/videos/rick-and-morty'
			status='Returning Series'
			networkImage='https://image.tmdb.org/t/p/h30/9AKyspxVzywuaMuZ1Bvilu8sXly.png'
			type='Scripted'
			keywords={[
				{ name: 'Egypt', id: 1 },
				{ name: 'Comic', id: 2 },
				{ name: 'Based On Comic', id: 3 },
				{
					name: 'Gods',
					id: 4
				},
				{
					name: 'Marvel Cinematic Universe (mcu)',
					id: 5
				},
				{
					name: 'Dissociative Identity Disorder',
					id: 6
				}
			]}
			originalLanguage='English'
			entertainmentType='tv'
			entertainmentName='Rick and Morty'
		/>
	</div>
);

export const EntertainmentMovieSidebar = () => (
	<div className='mt-4'>
		<Entertainment
			facebookLink='https://www.facebook.com/RickandMorty'
			twitterLink='https://www.twitter.com/RickandMorty'
			instagramLink='https://www.instagram.com/rickandmorty/'
			homePageLink='https://www.adultswim.com/videos/rick-and-morty'
			status='Released'
			budget='£20,000,000'
			keywords={[
				{ name: 'Egypt', id: 1 },
				{ name: 'Comic', id: 2 },
				{ name: 'Based On Comic', id: 3 },
				{
					name: 'Gods',
					id: 4
				},
				{
					name: 'Marvel Cinematic Universe (mcu)',
					id: 5
				},
				{
					name: 'Dissociative Identity Disorder',
					id: 6
				}
			]}
			originalLanguage='English'
			entertainmentType='movie'
			entertainmentName='My Spy'
		/>
	</div>
);

export default {
	component: Entertainment,
	title: 'Design System/Sidebars/Entertainment',
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
