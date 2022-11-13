import * as React from 'react';
import DiscoverFilterSidebar from './DiscoverFilterSidebar';

const Template = (args) => <DiscoverFilterSidebar {...args} />;

export const DefaultDiscoverFiltersSidebar = Template.bind({});
DefaultDiscoverFiltersSidebar.args = {};

export const MoviesPopular = Template.bind({});
MoviesPopular.args = {
	resourceType: 'popular',
	mediaType: 'movie'
};

export const MoviesNowPlaying = Template.bind({});
MoviesNowPlaying.args = {
	resourceType: 'now-playing',
	mediaType: 'movie'
};

export const MoviesUpcoming = Template.bind({});
MoviesUpcoming.args = {
	resourceType: 'upcoming',
	mediaType: 'movie'
};

export const MoviesTopRated = Template.bind({});
MoviesTopRated.args = {
	resourceType: 'top-rated',
	mediaType: 'movie'
};

export const ShowsPopular = Template.bind({});
ShowsPopular.args = {
	resourceType: 'popular',
	mediaType: 'tv'
};

export const ShowsAiringToday = Template.bind({});
ShowsAiringToday.args = {
	resourceType: 'airing-today',
	mediaType: 'tv'
};

export const ShowsOnTv = Template.bind({});
ShowsOnTv.args = {
	resourceType: 'on-the-air',
	mediaType: 'tv'
};

export const ShowsTopRated = Template.bind({});
ShowsTopRated.args = {
	resourceType: 'top-rated',
	mediaType: 'tv'
};

export default {
	component: DiscoverFilterSidebar,
	title: 'Design System/Forms/Filtering/Discover Filters Sidebar'
};
