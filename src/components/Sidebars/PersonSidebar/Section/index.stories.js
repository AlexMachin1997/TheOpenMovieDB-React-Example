import React from 'react';

import Section from './index';

export const Default = () => <Section />;

export const CustomTitle = () => <Section title='Custom title' />;

export const CustomText = () => <Section content='Custom content' />;

export const CustomTextArray = () => (
	<Section content={['Alex Machin', 'Skins', 'Biscuits', 'Broc']} />
);

export const CustomDisplay = () => <Section content='' />;

export default {
	title: 'Person Sidebar Section',
	component: Section
};
