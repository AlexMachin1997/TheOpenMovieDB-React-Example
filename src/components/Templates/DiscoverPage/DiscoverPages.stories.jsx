import DiscoverPage from './DiscoverPage';

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

export const MoviesPopular = {
	args: {
		...DefaultStoryArgs,
		resourceType: 'popular'
	}
};

export const MoviesNowPlaying = {
	args: {
		DefaultStoryArgs,
		resourceType: 'now-playing'
	}
};

export const MoviesUpcoming = {
	args: {
		...DefaultStoryArgs,
		resourceType: 'upcoming'
	}
};

export const MoviesTopRated = {
	args: {
		...DefaultStoryArgs,
		resourceType: 'top-rated'
	}
};

export const ShowsPopular = {
	args: {
		...DefaultStoryArgs,
		resourceType: 'popular',
		mediaType: 'tv'
	}
};

export const ShowsAiringToday = {
	args: {
		...DefaultStoryArgs,
		resourceType: 'airing-today',
		mediaType: 'tv'
	}
};

export const ShowsOnTv = {
	args: {
		...DefaultStoryArgs,
		resourceType: 'on-the-air',
		mediaType: 'tv'
	}
};

export const ShowsTopRated = {
	args: {
		...DefaultStoryArgs,
		resourceType: 'top-rated',
		mediaType: 'tv'
	}
};

export default {
	component: DiscoverPage,
	title: 'Design System/Templates/DiscoverPage'
};
