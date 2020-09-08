import React from 'react';
import { action } from '@storybook/addon-actions';

import PosterCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import { GroupedExample, SingleExample } from '../../Shared';
import DiscoverSidebar from '../../../Sidebars/DiscoverSidebar';

export const Default = () => (
	<Preview
		content={
			<SingleExample>
				<PosterCard />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const Title = () => (
	<Preview
		content={
			<SingleExample>
				<PosterCard title='The Walking Dead' />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const ReleaseDate = () => (
	<Preview
		content={
			<SingleExample>
				<PosterCard releaseDate='2010' />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const Rating = () => (
	<Preview
		content={
			<SingleExample>
				<PosterCard rating={75} />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const image = () => (
	<Preview
		content={
			<SingleExample>
				<PosterCard image='https://image.tmdb.org/t/p/original/lAwLmgq1zy0xJnusszmvWTLjFlO.jpg' />
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const onClick = () => (
	<Preview
		content={
			<SingleExample>
				<PosterCard onClick={action('Poster card has been clicked')} />{' '}
			</SingleExample>
		}
		background='#F5F5F5'
	/>
);

export const GroupedPosters = () => (
	<Preview
		content={
			<div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
				<div>
					<DiscoverSidebar />
				</div>
				<GroupedExample>
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
				</GroupedExample>
			</div>
		}
		background='white'
	/>
);

export default {
	title: 'Card -> Entertainment -> Poster',
	component: PosterCard
};
