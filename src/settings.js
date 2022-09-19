const SORT_BY_OPTIONS = [
	{
		label: 'Popularity Descending',
		id: 'popularity.desc',
		value: ' popularity.desc',
		order: 1
	},
	{
		label: 'Popularity Ascending',
		id: 'popularity.asc',
		value: ' popularity.asc',
		order: 2
	},
	{
		label: 'Rating Descending',
		id: 'vote_average.desc',
		value: 'vote_average.desc',
		order: 3
	},
	{
		label: 'Rating Ascending',
		id: 'vote_average.asc',
		value: 'vote_average.asc',
		order: 4
	},
	{
		label: 'Release Date Descending',
		id: 'primary_release_date.desc',
		value: ' primary_release_date.desc',
		order: 5
	},
	{
		label: 'Release Date Ascending',
		id: 'primary_release_date.asc',
		value: ' primary_release_date.asc',
		order: 6
	},
	{
		label: 'Title (Z-A)',
		id: 'original_title.desc',
		value: 'original_title.desc',
		order: 7
	},
	{
		label: 'Title (A-Z)',
		id: 'original_title.asc',
		value: 'original_title.asc',
		order: 8
	},
	{
		label: 'Revenue Descending',
		id: ' revenue.desc',
		value: ' revenue.desc',
		order: 9
	},
	{
		label: 'Revenue Ascending',
		id: ' revenue.asc',
		value: ' revenue.asc',
		order: 10
	},
	{
		label: 'Vote Count Descending',
		id: 'vote_count.desc',
		value: 'vote_count.desc',
		order: 11
	},
	{
		label: 'Vote Count Ascending',
		id: 'vote_count.asc',
		value: 'vote_count.asc',
		order: 12
	}
];

const SHOW_ME_OPTIONS = [
	{
		label: 'Everything',
		id: 'Everything-Option',
		value: 0,
		order: 1
	},
	{
		label: "Movies I haven't Seen",
		id: "Movies-I-Haven't-Seen-Option",
		value: 1,
		order: 2
	},
	{
		label: 'Movies I have Seen',
		id: 'Movies-I-Have-Seen-Option',
		value: 2,
		order: 3
	}
];

const AVAILABILITY_OPTIONS = [
	{
		label: 'Search all availabilities',
		id: 'Search-All-Availabilities-Option',
		value: 'all', // Special value, this just takes all the existing values
		order: 1,
		name: 'all'
	},
	{
		label: 'Stream',
		id: 'Stream-Option',
		value: 'flatrate',
		order: 2,
		name: 'stream'
	},
	{
		label: 'Free',
		id: 'Free-Option',
		value: 'free',
		order: 3,
		name: 'free'
	},
	{
		label: 'Ads',
		id: 'Ads-Option',
		value: 'ads',
		order: 4,
		name: 'ads'
	},
	{
		label: 'Rent',
		id: 'Rent-Option',
		value: 'rent',
		order: 5,
		name: 'rent'
	},
	{
		label: 'Buy',
		id: 'Buy-Option',
		value: 'buy',
		order: 6,
		name: 'buy'
	}
];

const GENRE_OPTIONS = [
	{
		label: 'Action',
		id: 'Action-Option',
		value: 28,
		order: 1
	},
	{
		label: 'Adventure',
		id: 'Adventure-Option',
		value: 12,
		order: 2
	},
	{
		label: 'Animation',
		id: 'Animation-Option',
		value: 16,
		order: 3
	},
	{
		label: 'Comedy',
		id: 'Comedy-Option',
		value: 35,
		order: 4
	},
	{
		label: 'Crime',
		id: 'Crime-Option',
		value: 80,
		order: 5
	},
	{
		label: 'Documentary',
		id: 'Documentary-Option',
		value: 99,
		order: 6
	},
	{
		label: 'Drama',
		id: 'Drama-Option',
		value: 18,
		order: 7
	},
	{
		label: 'Family',
		id: 'Family-Option',
		value: 10751,
		order: 8
	},
	{
		label: 'Fantasy',
		id: 'Fantasy-Option',
		value: 14,
		order: 9
	},
	{
		label: 'History',
		id: 'History-Option',
		value: 36,
		order: 10
	},
	{
		label: 'Horror',
		id: 'Horror-Option',
		value: 27,
		order: 11
	},
	{
		label: 'Music',
		id: 'Music-Option',
		value: 10402,
		order: 12
	},
	{
		label: 'Mystery',
		id: 'Mystery-Option',
		value: 9648,
		order: 13
	},
	{
		label: 'Romance',
		id: 'Romance-Option',
		value: 10749,
		order: 14
	},
	{
		label: 'Science Fiction',
		id: 'Science-Fiction-Option',
		value: 878,
		order: 15
	},
	{
		label: 'TV Movie',
		id: 'Music-Option',
		value: 10770,
		order: 16
	},
	{
		label: 'Thriller',
		id: 'Thriller-Option',
		value: 53,
		order: 17
	},
	{
		label: 'War',
		id: 'War-Option',
		value: 10752,
		order: 18
	},
	{
		label: 'Western',
		id: 'Western-Option',
		value: 37,
		order: 19
	}
];

const CERTIFICATION_OPTIONS = [
	{
		label: 'NR',
		id: 'NR-Option',
		value: 'NR',
		order: 1
	},
	{
		label: 'G',
		id: 'G-Option',
		value: 'G',
		order: 2
	},
	{
		label: 'pg',
		id: 'PG-Option',
		value: 'PG',
		order: 3
	},
	{
		label: 'PG-13',
		id: 'PG-13-Option',
		value: 'PG-13',
		order: 4
	},
	{
		label: 'R',
		id: 'R-Option',
		value: 'R',
		order: 5
	},
	{
		label: 'NC-17',
		id: 'N17-Option',
		value: 'NC-17',
		order: 6
	}
];

const RELEASE_TYPE_OPTIONS = [
	{
		label: 'Premiere',
		id: 'Premiere-Option',
		value: 1,
		order: 1
	},
	{
		label: 'Theatrical (Limited)',
		id: 'Theatrical-Limited-Option',
		value: 2,
		order: 2
	},
	{
		label: 'Theatrical',
		id: 'Theatrical-Option',
		value: 3,
		order: 3
	},
	{
		label: 'Digital',
		id: 'Digital-Option',
		value: 4,
		order: 4
	},
	{
		label: 'Physical',
		id: 'Physical-Option',
		value: 5,
		order: 5
	},
	{
		label: 'TV',
		id: 'TV-Option',
		value: 6,
		order: 6
	}
];

// Exports all the application configuration
export default {
	// Stores all the 'Sort By' dropdown options (Ordered based on the order property)
	SORT_BY_OPTIONS: SORT_BY_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Show Me' radio options (Ordered based on the order property)
	SHOW_ME_RADIO_OPTIONS: SHOW_ME_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Availabilities' checkbox options (Ordered based on the order property)
	AVAILABILITY_OPTIONS: AVAILABILITY_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Availabilities' dropdown options (Ordered based on the order property)
	GENRE_OPTIONS: GENRE_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Availabilities' dropdown options (Ordered based on the order property)
	CERTIFICATION_OPTIONS: CERTIFICATION_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Release types' checkbox options (Ordered based on the order property)
	RELEASE_TYPE_OPTIONS: RELEASE_TYPE_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores the application url's
	GRAPHQL_ENDPOINT_URI: 'http://localhost:4000/graphql'
};
