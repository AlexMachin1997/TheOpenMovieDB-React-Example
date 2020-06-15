import React from 'react';

import Paragraph from './index';
import Preview from '../Blocks/Storybook/Preview';

export const DefaultParagraph = () => <Preview content={<Paragraph />} />;

export const CustomHeight = () => <Preview content={<Paragraph height={2} />} />;

export const CustomFontSize = () => <Preview content={<Paragraph size="4rem" />} />;

export const CustomText = () => <Preview content={<Paragraph text="Popular Shows" />} />;

export const CustomColour = () => <Preview content={<Paragraph colour="red" />} />;

export default {
	component: Paragraph,
	title: 'Paragraphs'
};
