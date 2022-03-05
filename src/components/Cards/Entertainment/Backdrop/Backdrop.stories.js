import * as React from 'react';

import BackdropCard from './Backdrop.jsx';

const Template = (args) => (
	<div className='flex'>
		<BackdropCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'Dark'
};

export const ReleaseDate = Template.bind({});
ReleaseDate.args = {
	releaseDate: '17th February 2021'
};

export const Rating = Template.bind({});
Rating.args = {
	rating: 50
};

export const Image = Template.bind({});
Image.args = {
	image: 'https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
};

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click example'
};

export default {
	component: BackdropCard,
	title: 'Design System/Cards/Entertainment/Backdrop',
	argTypes: { onClick: { action: 'onClick click' } }
};
