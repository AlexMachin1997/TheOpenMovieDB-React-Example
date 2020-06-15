import React from 'react';

import Tooltip from './index';
import Preview from '../Blocks/Storybook/Preview';

export const Default = () => <Preview content={<Tooltip />} />;

export const CustomContentWithText = () => (
	<Preview
		content={
			<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
				<Tooltip content="Facebook" />
			</div>
		}
	/>
);

export const CustomContentWithJSX = () => (
	<Preview
		content={
			<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
				<Tooltip
					content={<p style={{ color: 'red', margin: 0, fontSize: '1rem' }}>Custom JSX</p>}
				/>
			</div>
		}
	/>
);

export const CustomTooltipTextWithText = () => (
	<Preview
		content={
			<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
				<Tooltip tooltipText="Visit facebook" />
			</div>
		}
	/>
);

export const FacebookTooltip = () => (
	<Preview
		content={
			<div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
				<Tooltip content="Facebook" tooltipText="Visit Facebook" />
			</div>
		}
	/>
);

export default {
	component: Tooltip,
	title: 'Tooltip'
};
