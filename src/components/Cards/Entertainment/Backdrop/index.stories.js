import React from 'react';
import { action } from '@storybook/addon-actions';

import BackdropCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import Column from '../../../Layouts/Column';
import Row from '../../../Layouts/Row';

export const Default = () => <Preview content={<BackdropCard />} background='#F5F5F5' />;

export const entertainmentTitle = () => (
	<Preview content={<BackdropCard entertainmentTitle='Dark' />} background='#F5F5F5' />
);

export const entertainmentReleaseDate = () => (
	<Preview content={<BackdropCard entertainmentReleaseDate='2020' />} background='#F5F5F5' />
);

export const entertainmentRating = () => (
	<Preview content={<BackdropCard entertainmentRating={75} />} background='#F5F5F5' />
);

export const entertainmentImage = () => (
	<Preview
		content={
			<BackdropCard entertainmentImage='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg' />
		}
		background='#F5F5F5'
	/>
);

export const entertainmentAction = () => (
	<Preview content={<BackdropCard entertainmentAction={action('Card clicked')} />} />
);

export const MultipleBackdropCards = () => (
	<Preview
		content={
			<Row>
				<Column>
					<BackdropCard
						entertainmentImage='https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg'
						entertainmentTitle='Dark'
						entertainmentReleaseDate='4th July 2020'
						entertainmentRating={90}
					/>
				</Column>
				<Column>
					<BackdropCard
						entertainmentImage='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
						entertainmentTitle='Supernatural'
						entertainmentReleaseDate='4th July 2010'
						entertainmentRating={50}
					/>
				</Column>
			</Row>
		}
		background='#F5F5F5'
	/>
);

export default {
	title: 'Card - Backdrop',
	component: BackdropCard,
};
