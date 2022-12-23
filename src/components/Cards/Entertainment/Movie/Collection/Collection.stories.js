import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import CollectionCard from './Collection';

const Template = (args) => <CollectionCard {...args} />;

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'The Fast and the Furious'
};

export const Subtitle = Template.bind({});
Subtitle.args = {
	subtitle:
		'Includes The Fast and the Furious, 2 Fast 2 Furious, The Fast and the Furious: Tokyo Drift'
};

export const Image = Template.bind({});
Image.args = {
	image: 'https://image.tmdb.org/t/p/original/z5A5W3WYJc3UVEWljSGwdjDgQ0j.jpg'
};

export const CollectionCardWithLinkElementAsButton = Template.bind({});
CollectionCardWithLinkElementAsButton.args = {
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const CollectionCardCardWithLinkElementAsReactRouterLink = Template.bind({});
CollectionCardCardWithLinkElementAsReactRouterLink.args = {
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
CollectionCardCardWithLinkElementAsReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

export default {
	component: CollectionCard,
	title: 'Design System/Cards/Entertainment/Movie/Collection'
};
