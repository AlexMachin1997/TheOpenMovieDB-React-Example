import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import FilterAction from './index';

export const Default = () => <FilterAction />;

export const CustomTitle = () => <FilterAction title='Custom title' />;

export const CustomOnClick = () => <FilterAction onClick={action('toggled')} />;

export const CustomContent = () => (
	<FilterAction content={<p style={{ color: 'red', margin: 0, fontSize: '1rem' }}>Custom JSX</p>} />
);

export const CustomIsToggled = () => <FilterAction isToggled />;

export const InteractiveAction = () => (
	<FilterAction
		title='Sort'
		onClick={action('toggled')}
		actions={<h1 style={{ margin: 0 }}>Hello</h1>}
		isToggled={boolean('toggled', false, 1)}
	/>
);

export default {
	component: FilterAction,
	title: 'Sidebars -> DiscoverSidebar -> Action'
};
