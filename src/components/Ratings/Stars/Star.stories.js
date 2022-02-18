import * as React from 'react';

import Stars from './Stars';

const Template = (args) => <Stars {...args} />;

export const Default = Template.bind({});

export const OneStar = Template.bind({});
OneStar.args = {
	rating: 20
};

export const TwoStar = Template.bind({});
TwoStar.args = {
	rating: 40
};

export const ThreeStar = Template.bind({});
ThreeStar.args = {
	rating: 60
};

export const FourStar = Template.bind({});
FourStar.args = {
	rating: 80
};

export const FiveStar = Template.bind({});
FiveStar.args = {
	rating: 100
};

export default {
	component: Stars,
	title: 'Rating/Starts'
};
