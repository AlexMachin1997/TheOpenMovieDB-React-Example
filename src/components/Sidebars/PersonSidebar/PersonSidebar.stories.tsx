import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import PersonSidebar from './PersonSidebar';

const meta: Meta<typeof PersonSidebar> = {
	component: PersonSidebar,
	title: 'Sidebar/Person',
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

type Story = StoryObj<typeof PersonSidebar>;

export const TheRockSidebar: Story = {
	args: {
		actorName: 'Dwayne Johnson',
		actorImage: 'https://image.tmdb.org/t/p/original/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
		knownFor: 'Acting',
		knownCredits: '256',
		gender: 'Male',
		birthday: '1972-05-02 (48 years old)',
		placeOfBirth: 'Hayward, California, USA',
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
		facebookLink: 'https://www.facebook.com/DwayneJohnson',
		twitterLink: 'https://twitter.com/therock',
		instagramLink: 'https://instagram.com/therock/',
		homepageLink: 'https://www.wwe.com/superstars/the-rock'
	}
};

export const EmptyFields: Story = {
	args: {
		actorName: 'Dwayne Johnson',
		actorImage: 'https://image.tmdb.org/t/p/original/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
		knownFor: 'Acting',
		knownCredits: '0',
		gender: '',
		birthday: '1972-05-02 (48 years old)',
		placeOfBirth: 'Hayward, California, USA',
		knownAs: [],
		facebookLink: '',
		twitterLink: 'https://twitter.com/therock',
		instagramLink: '',
		homepageLink: ''
	}
};
