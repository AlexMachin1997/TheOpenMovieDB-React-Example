import React from 'react';

import Tooltip from './index';
import { StoryPreview } from './Tooltip';

export const Default = () => <Tooltip />;

export const CustomContentWithText = () => (
	<StoryPreview>
		<Tooltip content="Facebook" />
	</StoryPreview>
);

export const CustomContentWithJSX = () => (
	<StoryPreview>
		<Tooltip content={<p style={{ color: 'red', margin: 0, fontSize: '1rem' }}>Custom JSX</p>} />
	</StoryPreview>
);

export const CustomTooltipTextWithText = () => (
	<StoryPreview>
		<Tooltip tooltipText="Visit facebook" />
	</StoryPreview>
);

export const FacebookTooltip = () => (
	<StoryPreview>
		<Tooltip content="Facebook" tooltipText="Visit Facebook" />
	</StoryPreview>
);

export default {
	component: Tooltip,
	title: 'Tooltip'
};
