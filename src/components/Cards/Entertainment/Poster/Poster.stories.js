import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import PosterCard from './Poster';

const Template = (args) => (
	<div className='flex max-w-[12rem]'>
		<PosterCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'The Walking Dead'
};

export const ReleaseDate = Template.bind({});
ReleaseDate.args = {
	releaseDate: '2010'
};

export const Rating = Template.bind({});
Rating.args = {
	rating: 75
};

export const Image = Template.bind({});
Image.args = {
	image: 'https://image.tmdb.org/t/p/w220_and_h330_face/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg'
};

export const PosterWithLinkElementAsButton = Template.bind({});
PosterWithLinkElementAsButton.args = {
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const PosterWithLinkElementAsReactRouterLink = Template.bind({});
PosterWithLinkElementAsReactRouterLink.args = {
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
PosterWithLinkElementAsReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

export default {
	title: ' Design System/Cards/Entertainment/Poster',
	component: PosterCard
};
