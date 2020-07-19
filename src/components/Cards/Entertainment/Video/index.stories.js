import React from 'react';
import { action } from '@storybook/addon-actions';

import Video from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import { CardGroup } from '../../Shared';

export const Default = () => <Preview content={<Video />} background='lightblue' />;

export const EntertainmenTitle = () => (
	<Preview
		content={<Video entertainmentTitle='Marvel Agents of S.H.I.E.L.D' />}
		background='lightblue'
	/>
);

export const EntertainmentOverview = () => (
	<Preview
		content={
			<Video entertainmentOverview="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer" />
		}
		background='lightblue'
	/>
);

export const EntertainmentImage = () => (
	<Preview
		content={
			<Video entertainmentImage='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg' />
		}
		background='lightblue'
	/>
);

export const EntertainmentBackdropAction = () => (
	<Preview
		content={<Video entertainmentBackdropAction={action('You have hovered over the Video card')} />}
		background='lightblue'
	/>
);

export const EntertainmentVideoAction = () => (
	<Preview
		content={<Video entertainmentVideoAction={action('You have clicked the Video card')} />}
		background='lightblue'
	/>
);

export const VideoTVExample = () => (
	<Preview
		content={
			<Video
				entertainmentTitle='Marvel Agents of S.H.I.E.L.D'
				entertainmentOverview="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer"
				entertainmentImage='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg'
				entertainmentBackdropAction={action('You have hovered over Marvel Agents of S.H.I.E.L.D')}
				entertainmentVideoAction={action(
					'You have clicked over Marvel Agents of S.H.I.E.L.D video',
				)}
			/>
		}
		background='lightblue'
	/>
);

export const GroupedExample = () => (
	<Preview
		content={
			<CardGroup>
				<Video
					entertainmentTitle='Marvel Agents of S.H.I.E.L.D'
					entertainmentOverview="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer"
					entertainmentImage='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg'
					entertainmentVideoAction={action(
						'You have clicked over Marvel Agents of S.H.I.E.L.D video',
					)}
				/>

				<Video
					entertainmentTitle='The Umbrella Academy'
					entertainmentOverview='The Umbrella Academy Season 2 | Official Trailer | Netflix'
					entertainmentImage='https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg'
					entertainmentVideoAction={action('You have clicked over The Umbrella Academy video')}
				/>
			</CardGroup>
		}
		background='lightblue'
	/>
);

export default {
	component: Video,
	title: 'Card - Video',
};
