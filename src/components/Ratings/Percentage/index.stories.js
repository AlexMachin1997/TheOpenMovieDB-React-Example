import React from 'react';

import Rating from './index';

export const Default = () => <Rating />;

export const RedRating = () => <Rating percentage={10} />;

export const YellowRating = () => <Rating percentage={50} />;

export const GreenRating = () => <Rating percentage={75} />;

export default {
<<<<<<< HEAD:src/components/Ratings/Percentage/index.stories.js
	title: 'Rating -> Percentage',
=======
	title: 'Rating - Circle',
>>>>>>> 69ca42d4ec3b98b139feebc68236943d1716d6a6:src/components/Ratings/Circle/index.stories.js
	component: Rating
};
