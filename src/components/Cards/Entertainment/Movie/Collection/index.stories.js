import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Collection from './index';

export const Default = () => <Collection />;

export const Title = () => <Collection title='The Fast and the Furious' />;

export const Subtitle = () => (
	<Collection subtitle='Includes The Fast and the Furious, 2 Fast 2 Furious, The Fast and the Furious: Tokyo Drift' />
);

export const Image = () => (
	<Collection image='https://image.tmdb.org/t/p/original/z5A5W3WYJc3UVEWljSGwdjDgQ0j.jpg' />
);

export const OnClick = () => <Collection onClick={action('Collection button clicked')} />;

export default {
	component: Collection,
	title: 'Cards -> Entertainment -> Movie -> Collection'
};
