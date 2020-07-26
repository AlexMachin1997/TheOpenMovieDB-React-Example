import React from 'react';

import Stars from './index';

export const Default = () => <Stars rating={0} />;

export const OneStar = () => <Stars rating={20} />;

export const TwoStar = () => <Stars rating={40} />;

export const ThreeStar = () => <Stars rating={60} />;

export const FourStar = () => <Stars rating={80} />;

export const FiveStar = () => <Stars rating={100} />;

export default {
	component: Stars,
	title: 'Rating -> Stars'
};
