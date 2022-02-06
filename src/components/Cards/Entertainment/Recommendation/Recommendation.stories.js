import * as React from 'react';

import Recommendation from './Recommendation';
import { CardGroup } from '../../Shared';

export const Default = () => <Recommendation />;

export const Title = () => <Recommendation title='Thor: Ragnarok' />;

export const ReleaseDate = () => <Recommendation releaseDate='25/10/2017' />;

export const Image = () => (
	<Recommendation image='https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg' />
);

export const Rating = () => <Recommendation rating={75} />;

export const GroupedExample = () => (
	<CardGroup>
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
	</CardGroup>
);

export default {
	component: Recommendation,
	title: 'Design System/Cards/Entertainment/Recommendation'
};
