import * as React from 'react';

import PosterCard from './Poster';

const Template = (args) => (
	<div className='flex'>
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

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click example'
};

export const OnKeyDown = Template.bind({});
OnKeyDown.args = {
	onKeyDown: () => 'Click'
};

export default {
	title: ' Design System/Cards/Entertainment/Poster',
	component: PosterCard,
	argTypes: { onClick: { action: 'onClick click' }, onKeyDown: { action: 'onKeyDown event' } }
};
