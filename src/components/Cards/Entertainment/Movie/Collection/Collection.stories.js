import * as React from 'react';

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

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click example'
};

export default {
	component: CollectionCard,
	title: 'Design System/Cards/Entertainment/Movie/Collection',
	argTypes: { onClick: { action: 'clicked' } }
};
