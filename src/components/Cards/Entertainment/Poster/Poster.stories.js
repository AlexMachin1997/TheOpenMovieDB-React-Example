import * as React from 'react';
import { action } from '@storybook/addon-actions';

import PosterCard from './Poster';

export const Default = () => (
	<div className='flex'>
		<PosterCard />
	</div>
);

export const Title = () => (
	<div className='flex'>
		<PosterCard title='The Walking Dead' />
	</div>
);

export const ReleaseDate = () => (
	<div className='flex'>
		<PosterCard releaseDate='2010' />
	</div>
);

export const Rating = () => (
	<div className='flex'>
		<PosterCard rating={75} />
	</div>
);

export const Image = () => (
	<div className='flex'>
		<PosterCard image='https://image.tmdb.org/t/p/original/lAwLmgq1zy0xJnusszmvWTLjFlO.jpg' />
	</div>
);

export const OnClick = () => (
	<div className='flex'>
		<PosterCard onClick={action('Poster card has been clicked')} />{' '}
	</div>
);

export const GroupedPosters = () => (
	<>
		<div>
			<h1>Popular Movies</h1>
		</div>
		<div className='flex flex-wrap'>
			<PosterCard
				title='Westworld'
				image='https://image.tmdb.org/t/p/original/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg'
				rating={75}
			/>
			<PosterCard
				title='Westworld'
				image='https://image.tmdb.org/t/p/original/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg'
				rating={75}
			/>
			<PosterCard
				title='Westworld'
				image='https://image.tmdb.org/t/p/original/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg'
				rating={75}
			/>
			<PosterCard
				title='Westworld'
				image='https://image.tmdb.org/t/p/original/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg'
				rating={75}
			/>

			<PosterCard
				title='The Walking Dead'
				image='https://image.tmdb.org/t/p/original/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg'
				rating={25}
			/>
			<PosterCard
				title='The Walking Dead'
				image='https://image.tmdb.org/t/p/original/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg'
				rating={25}
			/>
			<PosterCard
				title='The Walking Dead'
				image='https://image.tmdb.org/t/p/original/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg'
				rating={25}
			/>
			<PosterCard
				title='The Walking Dead'
				image='https://image.tmdb.org/t/p/original/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg'
				rating={25}
			/>
		</div>
	</>
);

export default {
	title: ' Design System/Cards/Entertainment/Poster',
	component: PosterCard
};
