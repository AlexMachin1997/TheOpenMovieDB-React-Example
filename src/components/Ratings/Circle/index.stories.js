import React from 'react';

import Rating from './index';

export const Default = () => <Rating />;

export const RedRating = () => <Rating percentage={10} />;

export const YellowRating = () => <Rating percentage={50} />;

export const GreenRating = () => <Rating percentage={75} />;

export default {
	title: 'Rating - Circle',
	component: Rating
};
