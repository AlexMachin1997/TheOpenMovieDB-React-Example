import * as React from 'react';

import Menu from './index';

export const Default = () => (
	<div style={{ background: 'white', height: '100vh' }}>
		<Menu />
	</div>
);

export default {
	title: 'Layouts -> Menu',
	component: Menu
};
