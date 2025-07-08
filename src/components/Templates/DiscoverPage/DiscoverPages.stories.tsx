import { Meta, StoryObj } from '@storybook/react-vite';

import DiscoverPage from './DiscoverPage';
import { MEDIA_TYPE, RESOURCE_TYPE } from '../../../types/RoutingTypes';

const meta: Meta<typeof DiscoverPage> = {
	component: DiscoverPage,
	title: 'Templates/DiscoverPage'
};

export default meta;

type Story = StoryObj<typeof DiscoverPage>;

export const MoviesPopular: Story = {
	args: {
		resourceType: RESOURCE_TYPE.POPULAR,
		mediaType: MEDIA_TYPE.MOVIE,
		isAuthenticated: false,
		resources: Array(20)
			.fill([])
			.map(() => ({
				title: 'Black Adam',
				subtitle: '21 Oct 2022',
				rating: 69,
				image: 'https://image.tmdb.org/t/p/original/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
			}))
	}
};

export const ShowsPopular: Story = {
	args: {
		...MoviesPopular.args,
		resourceType: RESOURCE_TYPE.POPULAR,
		mediaType: MEDIA_TYPE.TV
	}
};

export const MoviesTopRated: Story = {
	args: {
		...MoviesPopular.args,
		resourceType: RESOURCE_TYPE.TOP_RATED
	}
};

export const ShowsTopRated: Story = {
	args: {
		...MoviesPopular.args,
		resourceType: RESOURCE_TYPE.TOP_RATED,
		mediaType: MEDIA_TYPE.TV
	}
};

export const MoviesNowPlaying: Story = {
	args: {
		...MoviesPopular.args,
		resourceType: RESOURCE_TYPE.NOW_PLAYING
	}
};

export const MoviesUpcoming: Story = {
	args: {
		...MoviesPopular.args,
		resourceType: RESOURCE_TYPE.UPCOMING
	}
};

export const ShowsAiringToday: Story = {
	args: {
		...MoviesPopular.args,
		resourceType: RESOURCE_TYPE.AIRING_TODAY,
		mediaType: MEDIA_TYPE.TV
	}
};

export const ShowsOnTheAir: Story = {
	args: {
		...MoviesPopular.args,
		resourceType: RESOURCE_TYPE.ON_THE_AIR,
		mediaType: MEDIA_TYPE.TV
	}
};
