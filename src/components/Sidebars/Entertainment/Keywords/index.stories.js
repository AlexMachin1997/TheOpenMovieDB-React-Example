import * as React from 'react';
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
	title: 'Sidebars -> Entertainment -> Keywords'
};
