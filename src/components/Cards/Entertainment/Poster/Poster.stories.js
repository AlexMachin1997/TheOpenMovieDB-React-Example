import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import PosterCard from './Poster';

export default {
	title: ' Design System/Cards/Entertainment/Poster',
	component: PosterCard
};

const Template = (args) => (
	<div className='flex max-w-[12rem]'>
		<PosterCard {...args} />
	</div>
);

const StoryArgs = {
	title: 'Dark',
	releaseDate: 'Dec 01, 2017',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	renderLink: null
};

export const Example = Template.bind({});
Example.args = { ...StoryArgs };

export const BadRatingExample = Template.bind({});
BadRatingExample.args = { ...Example.args, rating: 10 };

export const MediumRatingExample = Template.bind({});
MediumRatingExample.args = { ...Example.args, rating: 50 };

export const GoodRatingExample = Template.bind({});
GoodRatingExample.args = { ...Example.args, rating: 100 };

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
