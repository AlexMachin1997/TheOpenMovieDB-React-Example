import * as React from 'react';

import Reccomendation from './index';
import { CardGroup } from '../../Shared';

export const Default = () => <Reccomendation />;

export const Title = () => <Reccomendation title='Thor: Ragnarok' />;

export const ReleaseDate = () => <Reccomendation releaseDate='25/10/2017' />;

export const Image = () => (
	<Reccomendation image='https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg' />
);

export const Rating = () => <Reccomendation rating={75} />;

export const GroupedExample = () => (
	<CardGroup>
		<Reccomendation
			title='Black Panther'
			releaseDate='13/02/2018'
			image='https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg'
			rating={50}
		/>
		<Reccomendation
			title='Deadpool 2'
			releaseDate='0/5/10/2018'
			image='https://image.tmdb.org/t/p/original/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg'
			rating={64}
		/>
		<Reccomendation
			title='Spider-man: Homecoming'
			releaseDate='05/07/2018'
			image='https://image.tmdb.org/t/p/original/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg'
			rating={45}
		/>
	</CardGroup>
);

export default {
	component: Reccomendation,
	title: 'Cards -> Entertainment -> Reccomendation'
};
