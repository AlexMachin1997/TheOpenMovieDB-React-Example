import React from 'react';

import Section from './index';

export const Default = () => <Section />;

export const CustomTitle = () => <Section title='Custom title' />;

export const CustomContentWithText = () => <Section content='Custom section' />;

export const CustomContentWithJSX = () => (
	<Section content={<p style={{ color: 'red', margin: 0, fontSize: '1rem' }}>Custom JSX</p>} />
);

export const CustomDisplay = () => <Section display={false} />;

export default {
<<<<<<< HEAD
	title: 'Sidebars -> Entertainment -> Section',
=======
	title: 'Entertainment Sidebar Section',
>>>>>>> 69ca42d4ec3b98b139feebc68236943d1716d6a6
	component: Section
};
