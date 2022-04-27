import * as React from 'react';

import OverviewCard from './Overview';

const Template = (args) => (
	<div className='flex'>
		<OverviewCard {...args} />
	</div>
);

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'The Walking Dead'
};

export const Overview = Template.bind({});
Overview.args = {
	overview:
		'Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.'
};

export const ReleaseDate = Template.bind({});
ReleaseDate.args = {
	releaseDate: '10th October, 2020'
};

export const Rating = Template.bind({});
Rating.args = {
	rating: 95
};

// TODO: Output this in the "Storybook" Actions tab, it's currently not outputting.....
export const OnClick = Template.bind({});
OnClick.args = {
	onClick: () => 'Click example'
};

export default {
	component: OverviewCard,
	title: 'Design System/Cards/Entertainment/Overview',
	argTypes: { onClick: { action: 'onClick click' } }
};
