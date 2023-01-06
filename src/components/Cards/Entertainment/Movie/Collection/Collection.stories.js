import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import CollectionCard from './Collection';

export default {
	component: CollectionCard,
	title: 'Design System/Cards/Entertainment/Movie/Collection'
};

const Template = (args) => <CollectionCard {...args} />;

const StoryArgs = {
	title: 'The Avengers',
	subtitle: 'Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War',
	image: 'https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg',
	renderLink: null
};

export const Example = Template.bind({});
Example.args = { ...StoryArgs };

export const ReactRouterLinkExample = Template.bind({});
ReactRouterLinkExample.args = {
	...Example.args,
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
ReactRouterLinkExample.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];
