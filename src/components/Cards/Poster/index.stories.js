import React from 'react';
import { action } from '@storybook/addon-actions';

import PosterCard from './index';
import Preview from '../../Blocks/Storybook/Preview';
import Column from '../../Layouts/Column';
import Row from '../../Layouts/Row';

export const Default = () => <Preview content={<PosterCard />} background="#F5F5F5" />;

export const CustomTitle = () => (
	<Preview content={<PosterCard title="The Walking Dead" />} background="#F5F5F5" />
);

export const CustomReleaseDate = () => (
	<Preview content={<PosterCard releaseDate="2010" />} background="#F5F5F5" />
);

export const CustomRating = () => (
	<Preview content={<PosterCard rating={75} />} background="#F5F5F5" />
);

export const CustomImage = () => (
	<Preview
		content={
			<PosterCard img="https://image.tmdb.org/t/p/original/lAwLmgq1zy0xJnusszmvWTLjFlO.jpg" />
		}
		background="#F5F5F5"
	/>
);

export const CustomOnClick = () => (
	<Preview
		content={<PosterCard onClick={action('Poster card has been clicked')} />}
		background="#F5F5F5"
	/>
);

export const CustomHasInformation = () => (
	<Preview content={<PosterCard hasInformation={false} />} background="#F5F5F5" />
);

export default {
	title: 'Card - Poster',
	component: PosterCard
};
