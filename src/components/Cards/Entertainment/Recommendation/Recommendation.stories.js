import * as React from 'react';

import { action } from '@storybook/addon-actions';

import Recommendation from './Recommendation';

export const Default = () => <Recommendation />;

export const Title = () => <Recommendation title='Thor: Ragnarok' />;

export const ReleaseDate = () => <Recommendation releaseDate='25/10/2017' />;

export const Image = () => (
	<Recommendation image='https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg' />
);

export const OnClick = () => (
	<Recommendation onClick={action('You have clicked a Recommendation card')} />
);

export const OnKeyDown = () => (
	<Recommendation onKeyDown={action('You have keyed down on a Recommendation card')} />
);

export const Rating = () => <Recommendation rating={75} />;

export const GroupedExample = () => (
	<div className='w-100 overflow-x-auto overflow-y-auto flex'>
		<Recommendation
			title='Black Panther'
			releaseDate='13/02/2018'
			image='https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg'
			rating={50}
		/>
		<Recommendation
			title='Deadpool 2'
			releaseDate='0/5/10/2018'
			image='https://image.tmdb.org/t/p/original/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg'
			rating={64}
		/>
		<Recommendation
			title='Spider-man: Homecoming'
			releaseDate='05/07/2018'
			image='https://image.tmdb.org/t/p/original/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg'
			rating={45}
		/>
	</div>
);

export default {
	component: Recommendation,
	title: 'Design System/Cards/Entertainment/Recommendation'
};
