import React from 'react';
import { action } from '@storybook/addon-actions';

import PosterCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import Column from '../../../Layouts/Column';
import Row from '../../../Layouts/Row';

export const Default = () => <Preview content={<PosterCard />} background='#F5F5F5' />;

export const entertainmentName = () => (
	<Preview content={<PosterCard entertainmentName='The Walking Dead' />} background='#F5F5F5' />
);

export const entertainmentReleaseDate = () => (
	<Preview content={<PosterCard entertainmentReleaseDate='2010' />} background='#F5F5F5' />
);

export const entertainmentRating = () => (
	<Preview content={<PosterCard entertainmentRating={75} />} background='#F5F5F5' />
);

export const entertainmentImage = () => (
	<Preview
		content={
			<PosterCard entertainmentImage='https://image.tmdb.org/t/p/original/lAwLmgq1zy0xJnusszmvWTLjFlO.jpg' />
		}
		background='#F5F5F5'
	/>
);

export const entertainmentAction = () => (
	<Preview
		content={<PosterCard entertainmentAction={action('Poster card has been clicked')} />}
		background='#F5F5F5'
	/>
);

export const MultipleCards = () => (
	<Preview
		content={
			<Row>
				<Column autoWidth>
					<PosterCard
						entertainmentName='Westworld'
						entertainmentImage='https://image.tmdb.org/t/p/original/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg'
						entertainmentRating={75}
					/>
				</Column>
				<Column autoWidth>
					<PosterCard
						entertainmentName='The Walking Dead'
						entertainmentImage='https://image.tmdb.org/t/p/original/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg'
						entertainmentRating={25}
					/>
				</Column>
			</Row>
		}
		background='#F5F5F5'
	/>
);

export default {
	title: 'Card -  Poster',
	component: PosterCard,
};
