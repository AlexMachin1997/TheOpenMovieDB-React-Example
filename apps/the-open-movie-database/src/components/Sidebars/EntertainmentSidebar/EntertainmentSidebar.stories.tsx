import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import EntertainmentSidebar from '~/components/Sidebars/EntertainmentSidebar/EntertainmentSidebar';
import { MEDIA_TYPE } from '~/types/RoutingTypes';
import { SOCIAL } from '~/types/Social';

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
		socials: [
			{
				link: 'https://www.facebook.com/RickandMorty',
				type: SOCIAL.FACEBOOK
			},
			{
				link: 'https://www.twitter.com/RickandMorty',
				type: SOCIAL.TWITTER
			},
			{
				link: 'https://www.instagram.com/rickandmorty/',
				type: SOCIAL.INSTAGRAM
			},
			{
				link: 'https://www.adultswim.com/videos/rick-and-morty',
				type: SOCIAL.TIKTOK
			},
			{
				link: 'https://www.adultswim.com/videos/rick-and-morty',
				type: SOCIAL.YOUTUBE
			},
			{
				link: 'https://www.adultswim.com/videos/rick-and-morty',
				type: SOCIAL.HOMEPAGE
			}
		],
		status: 'Returning Series',
		networkImageUrl: 'https://image.tmdb.org/t/p/h30/9AKyspxVzywuaMuZ1Bvilu8sXly.png',
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
		...MediaTypeTV.args,
		mediaType: MEDIA_TYPE.MOVIE,
		budget: '£20,000,000',
		revenue: '£20,000,000'
	}
};
