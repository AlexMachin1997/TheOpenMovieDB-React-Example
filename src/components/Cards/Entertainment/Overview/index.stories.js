import React from 'react';
import { action } from '@storybook/addon-actions';

import Overview from './index';
import Row from '../../../Blocks/Flexbox/Row';
import Column from '../../../Blocks/Flexbox/Column';
import Preview from '../../../Blocks/Storybook/Preview';

export const Default = () => <Overview />;

export const Image = () => (
	<Preview
		content={
			<Overview image='https://image.tmdb.org/t/p/original/q3rlhCrawPHssE5kY7GeI2hN0GB.jpg' />
		}
	/>
);

export const Title = () => <Preview content={<Overview title='The Walking Dead' />} />;

export const Genres = () => <Preview content={<Overview genres='Action, Drama' />} />;

export const ReleaseDate = () => (
	<Preview content={<Overview releaseDate='10th October, 2010' />} />
);

export const OnClick = () => <Preview content={<Overview onClick={action('Search Result')} />} />;

export const Rating = () => <Preview content={<Overview rating={100} />} />;

export const GroupedExample = () => (
	<Preview
		content={
			<Row>
				<Column autoWidth>
					<Overview />
				</Column>

				<Column autoWidth>
					<Overview />
				</Column>
			</Row>
		}
		background='lightblue'
	/>
);

export default {
	component: Overview,
	title: 'Card -> Entertainment -> Overview'
};
