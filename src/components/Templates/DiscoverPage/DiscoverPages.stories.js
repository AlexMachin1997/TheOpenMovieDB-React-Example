import * as React from 'react';

import DiscoverPage from './DiscoverPage';

const Template = (args) => <DiscoverPage {...args} />;

const DefaultStoryArgs = {
	resourceType: 'popular',
	mediaType: 'movie',
	isAuthenticated: false,
	resources: Array(20)
		.fill()
		.map(() => ({
			title: 'Black Adam',
			releaseDate: '21 Oct 2022',
			rating: 69,
			image: 'https://image.tmdb.org/t/p/original/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
		}))
};

export const MoviesPopular = Template.bind({});
MoviesPopular.args = {
	...DefaultStoryArgs,
	resourceType: 'popular'
};

export const MoviesNowPlaying = Template.bind({});
MoviesNowPlaying.args = {
	DefaultStoryArgs,
	resourceType: 'now-playing'
};

export const MoviesUpcoming = Template.bind({});
MoviesUpcoming.args = {
	...DefaultStoryArgs,
	resourceType: 'upcoming'
};

export const MoviesTopRated = Template.bind({});
MoviesTopRated.args = {
	...DefaultStoryArgs,
	resourceType: 'top-rated'
};

export const ShowsPopular = Template.bind({});
ShowsPopular.args = {
	...DefaultStoryArgs,
	resourceType: 'popular',
	mediaType: 'tv'
};

export const ShowsAiringToday = Template.bind({});
ShowsAiringToday.args = {
	...DefaultStoryArgs,
	resourceType: 'airing-today',
	mediaType: 'tv'
};

export const ShowsOnTv = Template.bind({});
ShowsOnTv.args = {
	...DefaultStoryArgs,
	resourceType: 'on-the-air',
	mediaType: 'tv'
};

export const ShowsTopRated = Template.bind({});
ShowsTopRated.args = {
	...DefaultStoryArgs,
	resourceType: 'top-rated',
	mediaType: 'tv'
};

export default {
	component: DiscoverPage,
	title: 'Design System/Templates/DiscoverPage'
};
