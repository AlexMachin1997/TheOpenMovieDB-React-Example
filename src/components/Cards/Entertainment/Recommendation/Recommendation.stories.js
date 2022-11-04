import * as React from 'react';

import RecommendationCard from './Recommendation';

const Template = (args) => (
	<div className='flex'>
		<RecommendationCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'Thor'
};

export const ReleaseDate = Template.bind({});
ReleaseDate.args = {
	releaseDate: '05/3/2022'
};

export const Image = Template.bind({});
Image.args = {
	image: 'https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg'
};

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click example'
};

export const OnKeyDown = Template.bind({});
OnClick.args = {
	onKeyDown: () => 'Keydown example'
};

export const Rating = Template.bind({});
Rating.args = {
	rating: 75
};

export const GroupedExample = () => (
	<div className='flex w-full overflow-auto'>
		<RecommendationCard
			title='Black Panther'
			releaseDate='13/02/2018'
			image='https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg'
			rating={50}
		/>
		<RecommendationCard
			title='Deadpool 2'
			releaseDate='0/5/10/2018'
			image='https://image.tmdb.org/t/p/original/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg'
			rating={64}
		/>
		<RecommendationCard
			title='Spider-man: Homecoming'
			releaseDate='05/07/2018'
			image='https://image.tmdb.org/t/p/original/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg'
			rating={45}
		/>
	</div>
);

export default {
	component: RecommendationCard,
	title: 'Design System/Cards/Entertainment/Recommendation',
	argTypes: { onClick: { action: 'onClick click' } }
};
