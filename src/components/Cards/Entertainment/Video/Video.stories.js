import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import VideoCard from './Video';

export default {
	component: VideoCard,
	title: 'Design System/Cards/Entertainment/Video',
	argTypes: {
		thumbnailAction: { action: 'entertainmentVideoAction click' }
	}
};

const Template = (args) => <VideoCard {...args} />;

const StoryArgs = {
	title: 'The Umbrella Academy',
	overview: 'The Umbrella Academy Season 2 | Official Trailer | Netflix',
	thumbnail: 'https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg',
	renderLink: null,
	thumbnailAction: null
};

export const Example = Template.bind({});
Example.args = { ...StoryArgs };

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

export const ReactRouterLinkExample = Template.bind({});
ReactRouterLinkExample.args = {
	...Example.args,
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};
ReactRouterLinkExample.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];
