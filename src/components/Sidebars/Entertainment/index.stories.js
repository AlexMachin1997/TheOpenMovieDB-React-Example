import * as React from 'react';

import Entertainment from './index';

export const DefaultEntertainmentSidebar = () => (
	<div style={{ marginTop: '5rem', marginLeft: '5rem' }}>
		<Entertainment />
	</div>
);

export const EntertainmentTVSidebar = () => (
	<div style={{ marginTop: '5rem', marginLeft: '5rem' }}>
		<Entertainment
			facebookLink='https://www.facebook.com/RickandMorty'
			twitterLink='https://www.twitter.com/RickandMorty'
			instagramLink='https://www.instagram.com/rickandmorty/'
			homePageLink='https://www.adultswim.com/videos/rick-and-morty'
			status='Returning Series'
			networkImage='https://image.tmdb.org/t/p/h30/9AKyspxVzywuaMuZ1Bvilu8sXly.png'
			type='Scripted'
			keywords={[
				'time travel',
				'grandfarther',
				'mad scientist',
				'alchoholism',
				'alien',
				'scitentist',
				'multiple dimensions',
				'spaceship'
			]}
			originalLanguage='English'
			entertainmentType='tv'
			entertainmentName='Rick and Morty'
		/>
	</div>
);

export const EntertainmentMovieSidebar = () => (
	<div style={{ marginTop: '5rem', marginLeft: '5rem' }}>
		<Entertainment
			facebookLink='https://www.facebook.com/RickandMorty'
			twitterLink='https://www.twitter.com/RickandMorty'
			instagramLink='https://www.instagram.com/rickandmorty/'
			homePageLink='https://www.adultswim.com/videos/rick-and-morty'
			status='Released'
			budget='-'
			keywords={['spy']}
			originalLanguage='English'
			entertainmentType='movie'
			entertainmentName='My Spy'
		/>
	</div>
);

export default {
	component: Entertainment,
	title: 'Sidebars -> Entertainment'
};
