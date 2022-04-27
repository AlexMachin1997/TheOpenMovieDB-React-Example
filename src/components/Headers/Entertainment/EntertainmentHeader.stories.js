import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import EntertainmentHeader from './EntertainmentHeader';

const Template = (args) => <EntertainmentHeader {...args} />;

const ProjectPowerProps = {
	posterImage: 'https://image.tmdb.org/t/p/original/TnOeov4w0sTtV2gqICqIxVi74V.jpg',
	backgroundImage: 'https://image.tmdb.org/t/p/original/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg',
	title: 'Project Power',
	releaseDate: '14/08/2020 (ES)',
	releaseYear: '2020',
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
			roles: 'Director'
		},
		{
			name: 'Ariel Schulman',
			roles: 'Director'
		},
		{
			name: 'Mattson Tomlin',
			roles: 'Writer'
		}
	],
	isAuthenticated: false
};

export const ProjectPowerExample = Template.bind({});
ProjectPowerExample.args = {
	...ProjectPowerProps
};

export const ProjectPowerAuthenticatedExample = Template.bind({});
ProjectPowerAuthenticatedExample.args = {
	...ProjectPowerProps,
	isAuthenticated: true
};

export default {
	title: 'Design System/Headers/Entertainment Header',
	component: EntertainmentHeader,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
