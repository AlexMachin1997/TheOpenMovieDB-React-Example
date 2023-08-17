import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import EntertainmentSidebar from './EntertainmentSidebar';
import { MEDIA_TYPE } from '../../../types/RoutingTypes';

const meta: Meta<typeof EntertainmentSidebar> = {
	component: EntertainmentSidebar,
	title: 'Sidebar/Entertainment',
	decorators: [
		(Story) => (
			<div className='mt-4'>
				<MemoryRouter>
					<Story />
				</MemoryRouter>
			</div>
		)
	]
};

export default meta;

type Story = StoryObj<typeof EntertainmentSidebar>;

export const MediaTypeTV: Story = {
	args: {
		facebookLink: 'https://www.facebook.com/RickandMorty',
		twitterLink: 'https://www.twitter.com/RickandMorty',
		instagramLink: 'https://www.instagram.com/rickandmorty/',
		homePageLink: 'https://www.adultswim.com/videos/rick-and-morty',
		status: 'Returning Series',
		networkImage: 'https://image.tmdb.org/t/p/h30/9AKyspxVzywuaMuZ1Bvilu8sXly.png',
		type: 'Scripted',
		keywords: [
			{ name: 'Egypt', id: '1' },
			{ name: 'Comic', id: '2' },
			{ name: 'Based On Comic', id: '3' },
			{
				name: 'Gods',
				id: '4'
			},
			{
				name: 'Marvel Cinematic Universe (mcu)',
				id: '5'
			},
			{
				name: 'Dissociative Identity Disorder',
				id: '6'
			}
		],
		originalLanguage: 'English',
		mediaType: MEDIA_TYPE.TV,
		entertainmentName: 'Rick and Morty'
	}
};

export const MediaTypeMovie: Story = {
	args: {
		mediaType: MEDIA_TYPE.MOVIE,
		facebookLink: 'https://www.facebook.com/RickandMorty',
		twitterLink: 'https://www.twitter.com/RickandMorty',
		instagramLink: 'https://www.instagram.com/rickandmorty/',
		homePageLink: 'https://www.adultswim.com/videos/rick-and-morty',
		status: 'Released',
		budget: '£20,000,000',
		keywords: [
			{ name: 'Egypt', id: '1' },
			{ name: 'Comic', id: '2' },
			{ name: 'Based On Comic', id: '3' },
			{
				name: 'Gods',
				id: '4'
			},
			{
				name: 'Marvel Cinematic Universe (mcu)',
				id: '5'
			},
			{
				name: 'Dissociative Identity Disorder',
				id: '6'
			}
		],
		originalLanguage: 'English',
		entertainmentName: 'My Spy',
		revenue: '£20,000,000'
	}
};
