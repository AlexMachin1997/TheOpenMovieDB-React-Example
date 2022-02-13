import * as React from 'react';
import { action } from '@storybook/addon-actions';

import BackdropCard from './Backdrop.jsx';
import Preview from '../../../Blocks/Storybook/Preview';
import { GroupedExample, SingleExample } from '../../Shared';

export const Default = () => (
	<div className='flex'>
		<BackdropCard />
	</div>
);

export const Title = () => (
	<div className='flex'>
		<BackdropCard title='Dark' />
	</div>
);

export const ReleaseDate = () => (
	<div className='flex'>
		<BackdropCard releaseDate='2020' />
	</div>
);

export const Rating = () => (
	<div className='flex'>
		<BackdropCard rating={75} />
	</div>
);

export const Image = () => (
	<div className='flex'>
		<BackdropCard image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg' />
	</div>
);

export const OnClick = () => (
	<div className='flex'>
		<BackdropCard onClick={action('Card clicked')} />
	</div>
);

export const GroupedBackdrops = () => (
	<Preview
		content={
			<GroupedExample>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
				<BackdropCard
					image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg'
					title='Supernatural'
					releaseDate='4th July 2010'
					rating={50}
				/>
			</GroupedExample>
		}
	/>
);

export default {
	title: 'Design System/Cards/Entertainment/Backdrop',
	component: BackdropCard
};
