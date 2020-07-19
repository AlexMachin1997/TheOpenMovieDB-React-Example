import React from 'react';
import { action } from '@storybook/addon-actions';

import BackdropCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import Column from '../../../Layouts/Column';
import Row from '../../../Layouts/Row';

export const Default = () => <Preview content={<BackdropCard />} background='#F5F5F5' />;

export const Title = () => <Preview content={<BackdropCard title='Dark' />} background='#F5F5F5' />;

export const ReleaseDate = () => (
	<Preview content={<BackdropCard releaseDate='2020' />} background='#F5F5F5' />
);

export const Rating = () => <Preview content={<BackdropCard rating={75} />} background='#F5F5F5' />;

export const Image = () => (
	<Preview
		content={
			<BackdropCard image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg' />
		}
		background='#F5F5F5'
	/>
);

export const OnClick = () => (
	<Preview content={<BackdropCard onClick={action('Card clicked')} />} />
);

export const MultipleBackdropCards = () => (
	<Preview
		content={
			<Row>
				<Column>
					<BackdropCard
						image='https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg'
						title='Dark'
						releaseDate='4th July 2020'
						rating={90}
					/>
				</Column>
				<Column>
					<BackdropCard
						image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
						title='Supernatural'
						releaseDate='4th July 2010'
						rating={50}
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
