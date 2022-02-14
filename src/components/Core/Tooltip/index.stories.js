import * as React from 'react';

import Tooltip from './index';

export const Default = () => <Tooltip />;

export const CustomContentWithText = () => (
	<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
		<Tooltip content='Facebook' />
	</div>
);

export const CustomContentWithJSX = () => (
	<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
		<Tooltip content={<p style={{ color: 'red', margin: 0, fontSize: '1rem' }}>Custom JSX</p>} />
	</div>
);

export const CustomTooltipTextWithText = () => (
	<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
		<Tooltip tooltipText='Visit facebook' />
	</div>
);

export const FacebookTooltip = () => (
	<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
		<Tooltip content='Facebook' tooltipText='Visit Facebook' />
	</div>
);

export default {
	component: Tooltip,
	title: 'Core -> Tooltip'
};
