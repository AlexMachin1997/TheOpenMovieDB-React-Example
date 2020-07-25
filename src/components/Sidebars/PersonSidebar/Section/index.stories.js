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
<<<<<<< HEAD
	title: 'Sidebars -> PersonSidebar -> Section',
=======
	title: 'Person Sidebar Section',
>>>>>>> 69ca42d4ec3b98b139feebc68236943d1716d6a6
	component: Section
};
