import { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';

import EntertainmentHeader from './EntertainmentHeader';
import { MEDIA_TYPE } from '../../../types/RoutingTypes';

type Story = StoryObj<typeof EntertainmentHeader>;

const meta: Meta<typeof EntertainmentHeader> = {
	component: EntertainmentHeader,
	title: 'Headers/Entertainment Header',
	decorators: [
		(StoryComponent) => (
			<MemoryRouter>
				<StoryComponent />
			</MemoryRouter>
		)
	]
};

export default meta;

export const ProjectPowerExample: Story = {
	args: {
		mediaType: MEDIA_TYPE.MOVIE,
		posterImageUrl: 'https://image.tmdb.org/t/p/original/TnOeov4w0sTtV2gqICqIxVi74V.jpg',
		backgroundImageUrl: 'https://image.tmdb.org/t/p/original/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg',
		title: 'Project Power',
		releaseDate: '14/08/2020 (ES)',
		releaseYear: 2020,
		genres: [
			{
				id: 'action',
				name: 'Action'
			},
			{
				id: 'crime',
				name: 'Crime'
			},
			{
				id: 'science-fiction',
				name: 'Science Fiction'
			}
		],
		runtime: '1h 53m',
		rating: 66,
		ageRating: 'R',
		// trailerLink:''
		tagline: 'What would you risk for five minutes of pure power?',
		overview:
			'An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.',
		featuredCrew: [
			{
				name: 'Henry Joost',
				role: 'Director'
			},
			{
				name: 'Ariel Schulman',
				role: 'Director'
			},
			{
				name: 'Mattson Tomlin',
				role: 'Writer'
			}
		],
		isAuthenticated: false
	}
};

export const ProjectPowerAuthenticatedExample: Story = {
	args: {
		...ProjectPowerExample.args,
		isAuthenticated: true
	}
};
