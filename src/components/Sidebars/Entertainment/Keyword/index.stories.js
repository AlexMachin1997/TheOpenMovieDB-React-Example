import React from 'react';
import { action } from '@storybook/addon-actions';

import Keyword from './index';

export const Default = () => <Keyword />;

export const KeywordProp = () => <Keyword keyword='Action' />;

export const OnClick = () => <Keyword onClick={action('Keyword clicked')} />;

export default {
	component: Keyword,
	title: 'Sidebars -> Entertainment -> Keyword'
};
