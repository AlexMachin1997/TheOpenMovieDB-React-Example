import * as React from 'react';

import Section from './index';

export const Default = () => <Section />;

export const CustomTitle = () => <Section title='Custom title' />;

export const CustomContentWithText = () => <Section content='Custom section' />;

export const CustomContentWithJSX = () => (
	<Section content={<p style={{ color: 'red', margin: 0, fontSize: '1rem' }}>Custom JSX</p>} />
);

export const CustomDisplay = () => <Section display={false} />;

export default {
	title: 'Sidebars -> Entertainment -> Section',
	component: Section
};
