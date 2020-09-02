import React from 'react';

import Menu from './index';

export const Default = () => (
	<div style={{ background: 'lightgrey', height: '100vh' }}>
		<Menu />
	</div>
);

export default {
	title: 'Layouts -> Menu',
	component: Menu
};
