import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import ViewPersonResource from './ViewPersonResource';
import { SOCIAL } from '../../../types/Social';
import ActingGroupData from '../../Person/CreditsTable/ActingGroupData';

const meta: Meta<typeof ViewPersonResource> = {
	title: 'Templates/View Person',
	component: ViewPersonResource,
	decorators: [
		(StoryComponent) => (
			<MemoryRouter>
				<StoryComponent />
			</MemoryRouter>
		)
	]
};

export default meta;

type Story = StoryObj<typeof ViewPersonResource>;

export const ProjectPowerExample: Story = {
	args: {
		person: {
			name: 'Dwayne Johnson',
			headshotUrl: 'https://image.tmdb.org/t/p/original/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
			knownForDepartment: 'Acting',
			numberOfCredits: 256,
			gender: 'Male',
			birthday: '2nd May 1972 (48 years old)',
			biography: '',
			knownAs: [
				'The Rock',
				'Rock Maivia',
				'The Rock 1',
				'Dwayne ‘The Rock’ Johnson',
				'The Corporate Champion',
				'The Rock',
				'Rock Maivia',
				'The Rock 1',
				'Dwayne ‘The Rock’ Johnson',
				'The Corporate Champion',
				'The Rock',
				'Rock Maivia',
				'The Rock 1',
				'Dwayne ‘The Rock’ Johnson',
				'The Corporate Champion'
			],
			socials: [
				{
					type: SOCIAL.FACEBOOK,
					link: 'https://www.facebook.com/DwayneJohnson'
				},
				{
					type: SOCIAL.TWITTER,
					link: 'https://twitter.com/therock'
				},
				{
					type: SOCIAL.INSTAGRAM,
					link: 'https://instagram.com/therock/'
				},
				{
					type: SOCIAL.TIKTOK,
					link: 'https://instagram.com/therock/'
				},
				{
					type: SOCIAL.YOUTUBE,
					link: 'https://instagram.com/therock/'
				},
				{
					type: SOCIAL.HOMEPAGE,
					link: 'https://www.wwe.com/superstars/the-rock'
				}
			],
			placeOfBirth: 'Hayward, California, USA'
		},
		knownFor: [
			{
				title: 'Jumanji: Welcome to the Jungle',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/pSgXKPU5h6U89ipF7HBYajvYt7j.jpg'
			},
			{
				title: 'San Andreas',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/2Gfjn962aaFSD6eST6QU3oLDZTo.jpg'
			},
			{
				title: 'Jumanji: The Next Level',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/jyw8VKYEiM1UDzPB7NsisUgBeJ8.jpg'
			},
			{
				title: 'Baywatch',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6HE4xd8zloDqmjMZuhUCCw2UcY1.jpg'
			},
			{
				title: 'Fast & Furious Presents: Hobbs & Shaw',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg'
			},
			{
				title: 'Rampage',
				posterUrl:
					'	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/MGADip4thVSErP34FAAfzFBTZ5.jpg'
			},
			{
				title: 'Moana',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/vNJFiwtsl7Twww7C0uM4qPnygNw.jpg'
			},
			{
				title: 'Central Intelligence',
				posterUrl:
					'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/7irCMBIivXAqjZ7MgZoGVLrgACR.jpg'
			}
		],
		credits: ActingGroupData
	}
};
