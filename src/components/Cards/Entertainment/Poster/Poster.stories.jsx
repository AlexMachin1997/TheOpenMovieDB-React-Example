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

export const Example = {
	render: Template,
	args: { ...StoryArgs }
};

export const BadRatingExample = {
	render: Template,
	args: { ...Example.args, rating: 10 }
};

export const MediumRatingExample = {
	render: Template,
	args: { ...Example.args, rating: 50 }
};

export const GoodRatingExample = {
	render: Template,
	args: { ...Example.args, rating: 100 }
};

export const ReactRouterLinkExample = {
	render: Template,

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
