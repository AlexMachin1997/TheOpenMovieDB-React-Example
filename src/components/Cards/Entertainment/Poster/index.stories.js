import React from 'react';
import { action } from '@storybook/addon-actions';

import PosterCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import Column from '../../../Layouts/Column';
import Row from '../../../Layouts/Row';

export const Default = () => <Preview content={<PosterCard />} background='#F5F5F5' />;

export const Title = () => (
	<Preview content={<PosterCard title='The Walking Dead' />} background='#F5F5F5' />
);

export const ReleaseDate = () => (
	<Preview content={<PosterCard releaseDate='2010' />} background='#F5F5F5' />
);

export const Rating = () => <Preview content={<PosterCard rating={75} />} background='#F5F5F5' />;

export const image = () => (
	<Preview
		content={
			<PosterCard image='https://image.tmdb.org/t/p/original/lAwLmgq1zy0xJnusszmvWTLjFlO.jpg' />
		}
		background='#F5F5F5'
	/>
);

export const onClick = () => (
	<Preview
		content={<PosterCard onClick={action('Poster card has been clicked')} />}
		background='#F5F5F5'
	/>
);

export const MultipleCards = () => (
	<Preview
		content={
			<Row>
				<Column autoWidth>
					<PosterCard
						title='Westworld'
						image='https://image.tmdb.org/t/p/original/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg'
						rating={75}
					/>
				</Column>
				<Column autoWidth>
					<PosterCard
						title='The Walking Dead'
						image='https://image.tmdb.org/t/p/original/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg'
						rating={25}
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
