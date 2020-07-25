import React from 'react';
import { action } from '@storybook/addon-actions';

import Keywords from './index';

export const DefaultKeywords = () => <Keywords />;

export const CustomKeywords = () => (
	<Keywords
		keywords={[
			'time travel',
			'grandfarther',
			'mad scientist',
			'alchoholism',
			'alien',
			'scitentist',
			'multiple dimensions',
			'spaceship'
		]}
		onClick={action('Click')}
	/>
);

export default {
	component: Keywords,
<<<<<<< HEAD
	title: 'Sidebars -> Entertainment -> Keywords'
=======
	title: 'Entertainment Sidebar Keywords'
>>>>>>> 69ca42d4ec3b98b139feebc68236943d1716d6a6
};
