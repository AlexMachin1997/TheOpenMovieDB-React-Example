import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import CurrentSeasonCard from './CurrentSeason';

export default {
	component: CurrentSeasonCard,
	title: 'Design System/Cards/Entertainment/TV/Current Season'
};

const StoryArgs = {
	image: 'https://image.tmdb.org/t/p/original/eFWtQwYetPum9RvCmqkUk2aiBIi.jpg',
	title: 'Season Three: The New World',
	year: 2020,
	episodeCount: 8,
	overview:
		'Taking place immediately after the events of the second season, Dolores develops a relationship with Caleb in neo-Los Angeles, and learns how robots are treated in the real world. Meanwhile, Maeve finds herself in another Delos park, this one with a World War II theme and set in Fascist Italy.',
	renderLink: null
};

export const Example = {
	args: { ...StoryArgs }
};

export const ReactRouterLinkExample = {
	args: {
		...StoryArgs,
		renderLink: ({ content }) => <Link to='/'>{content}</Link>
	},

	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
