import * as React from 'react';
import { action } from '@storybook/addon-actions';

import BackdropCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import { GroupedExample, SingleExample } from '../../Shared';

export const Default = () => (
	<Preview
		content={
			<SingleExample>
				<BackdropCard />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const Title = () => (
	<Preview
		content={
			<SingleExample>
				<BackdropCard title='Dark' />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const ReleaseDate = () => (
	<Preview
		content={
			<SingleExample>
				<BackdropCard releaseDate='2020' />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const Rating = () => (
	<Preview
		content={
			<SingleExample>
				<BackdropCard rating={75} />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const Image = () => (
	<Preview
		content={
			<SingleExample>
				<BackdropCard image='https://image.tmdb.org/t/p/original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg' />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const OnClick = () => (
	<Preview
		content={
			<SingleExample>
				<BackdropCard onClick={action('Card clicked')} />
			</SingleExample>
		}
	/>
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
	title: 'Card -> Entertainment -> Backdrop',
	component: BackdropCard
};
