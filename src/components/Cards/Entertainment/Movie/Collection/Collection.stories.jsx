import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import CollectionCard from './Collection';

export default {
	component: CollectionCard,
	title: 'Design System/Cards/Entertainment/Movie/Collection'
};

const StoryArgs = {
	title: 'The Avengers',
	subtitle: 'Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War',
	image: 'https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg',
	renderLink: null
};

export const Example = {
	args: { ...StoryArgs }
};

export const ReactRouterLinkExample = {
	args: {
		...Example.args,
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
