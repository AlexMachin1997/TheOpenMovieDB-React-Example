import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Video from './Video';

export const Default = () => <Video />;

export const Title = () => <Video title='Marvel Agents of S.H.I.E.L.D' />;

export const Overview = () => (
	<Video overview="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer" />
);

export const Thumbnail = () => (
	<Video thumbnail='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg' />
);

export const ThumbnailContainerAction = () => (
	<Video thumbnailContainerAction={action('You have hovered over the Video card')} />
);

export const EntertainmentVideoAction = () => (
	<Video entertainmentVideoAction={action('You have clicked the Video card')} />
);

export const VideoTVExample = () => (
	<Video
		title='Marvel Agents of S.H.I.E.L.D'
		overview="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer"
		thumbnail='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg'
		thumbnailContainerAction={action('You have hovered over Marvel Agents of S.H.I.E.L.D')}
		entertainmentVideoAction={action('You have clicked over Marvel Agents of S.H.I.E.L.D video')}
	/>
);

export const GroupedExample = () => (
	<div className='w-100 flex overflow-x-auto overflow-y-auto'>
		<Video
			title='Marvel Agents of S.H.I.E.L.D'
			overview="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer"
			thumbnail='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg'
			entertainmentVideoAction={action('You have clicked over Marvel Agents of S.H.I.E.L.D video')}
		/>

		<Video
			title='The Umbrella Academy'
			overview='The Umbrella Academy Season 2 | Official Trailer | Netflix'
			thumbnail='https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg'
			entertainmentVideoAction={action('You have clicked over The Umbrella Academy video')}
		/>
	</div>
);

export default {
	component: Video,
	title: 'Design System/Cards/Entertainment/Video'
};
