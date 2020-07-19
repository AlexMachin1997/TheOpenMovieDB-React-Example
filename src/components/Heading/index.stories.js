import React from 'react';

import Heading from './index';
import Preview from '../Blocks/Storybook/Preview';

export const Default = () => <Preview content={<Heading />} />;

export const CustomType = () => <Preview content={<Heading type='h4' />} />;

export const CustomHeight = () => <Preview content={<Heading height={2} />} />;

export const CustomFontSize = () => <Preview content={<Heading size='4rem' />} />;

export const CustomText = () => <Preview content={<Heading text='Popular Movies' />} />;

export const CustomColour = () => <Preview content={<Heading colour='red' />} />;

export default {
	component: Heading,
	title: 'Heading',
};
