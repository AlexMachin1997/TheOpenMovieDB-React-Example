import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import VideoCard from './Video';

const Template = (args) => <VideoCard {...args} />;

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
	title: 'Marvel Agents of S.H.I.E.L.D'
};

export const Overview = Template.bind({});
Overview.args = {
	thumbnail: 'https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg'
};

export const ThumbnailAction = Template.bind({});
ThumbnailAction.args = {
	thumbnailAction: () => 'Click example'
};

export const GroupedExample = () => (
	<div className='flex w-full overflow-auto'>
		<VideoCard
			title='Marvel Agents of S.H.I.E.L.D'
			overview="Marvel's Agents of S.H.I.E.L.D. - Official Season 7 Trailer"
			thumbnail='https://image.tmdb.org/t/p/original/mUCV0W6TaAk8UWA5yAmqCywC63F.jpg'
		/>

		<VideoCard
			title='The Umbrella Academy'
			overview='The Umbrella Academy Season 2 | Official Trailer | Netflix'
			thumbnail='https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg'
		/>
	</div>
);

export const VideoCardWithLinkElementAsButton = Template.bind({});
VideoCardWithLinkElementAsButton.args = {
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const VideoCardCardWithLinkElementAsReactRouterLink = Template.bind({});
VideoCardCardWithLinkElementAsReactRouterLink.args = {
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
VideoCardCardWithLinkElementAsReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

export default {
	component: VideoCard,
	title: 'Design System/Cards/Entertainment/Video',
	argTypes: {
		thumbnailAction: { action: 'entertainmentVideoAction click' }
	}
};
