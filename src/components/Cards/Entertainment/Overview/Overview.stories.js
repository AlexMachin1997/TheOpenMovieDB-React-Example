import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Overview from './Overview';

export const Default = () => <Overview />;

export const Image = () => (
	<div className='flex'>
		<Overview image='https://image.tmdb.org/t/p/original/q3rlhCrawPHssE5kY7GeI2hN0GB.jpg' />
	</div>
);

export const Title = () => (
	<div className='flex'>
		<Overview title='The Walking Dead' />
	</div>
);

export const OverviewProperty = () => (
	<div className='flex'>
		<Overview overview='Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.' />
	</div>
);

export const ReleaseDate = () => (
	<div className='flex'>
		<Overview releaseDate='10th October, 2010' />
	</div>
);

export const OnClick = () => (
	<div className='flex'>
		<Overview onClick={action('Search Result')} />
	</div>
);

export const Rating = () => (
	<div className='flex'>
		<Overview rating={100} />
	</div>
);

export default {
	component: Overview,
	title: 'Design System/Cards/Entertainment/Overview'
};
