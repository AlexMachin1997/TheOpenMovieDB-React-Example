import * as React from 'react';

import Rating from './Percentage';

const Template = (args) => <Rating {...args} />;

export const Default = () => <Rating percentage={66} />;

export const RedRating = Template.bind({});
RedRating.args = {
	percentage: 10
};

export const YellowRating = Template.bind({});
YellowRating.args = {
	percentage: 50
};

export const GreenRating = Template.bind({});
GreenRating.args = {
	percentage: 100
};

export const StrokeWidth = Template.bind({});
StrokeWidth.args = {
	strokeWidth: 10
};

export default {
	component: Rating,
	title: 'Design System/Core/Ratings/Percentage'
};
