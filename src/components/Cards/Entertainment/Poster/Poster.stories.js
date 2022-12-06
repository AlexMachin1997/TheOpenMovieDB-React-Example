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
	// Pass the tag we want, in this case it's a button
	linkElement: 'button',

	// Pass a styling property to append to the default styling
	linkElementClassName: 'text-left',

	// Any unknown properties can passed to the <LinkElement/>
	tabIndex: '0',
	role: 'button',
	type: 'button'
};

export const PosterWithLinkElementAsReactRouterLink = Template.bind({});
PosterWithLinkElementAsReactRouterLink.args = {
	// Pass the element that is wanted
	linkElement: Link,

	// Pass a styling property to append to the default styling
	linkElementClassName: 'text-left',

	// Any unknown properties can passed to the <LinkElement/>
	to: '/'
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
