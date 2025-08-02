import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import PersonSidebar from './PersonSidebar';
import { SOCIAL } from '../../../types/Social';

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
		name: 'Dwayne Johnson',
		headshotUrl: 'https://image.tmdb.org/t/p/original/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
		knownForDepartment: 'Acting',
		numberOfCredits: 256,
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
				type: SOCIAL.HOMEPAGE,
				link: 'https://www.wwe.com/superstars/the-rock'
			}
		]
	}
};

export const EmptyFields: Story = {
	args: {
		...TheRockSidebar.args,
		numberOfCredits: null,
		birthday: '1972-05-02 (48 years old)',
		placeOfBirth: 'Hayward, California, USA',
		knownAs: [],
		socials: []
	}
};
