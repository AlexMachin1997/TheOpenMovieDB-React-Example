import * as React from 'react';
import { useQuery } from '@apollo/client';

import TopRatedMoviesQuery from '../../graphql/queries/Movies/TopRated';

import { Loader } from '../../components';

const TopRated = () => {
	const { loading, error, data } = useQuery(TopRatedMoviesQuery, {
		displayName: 'Top rated movies query'
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Top rated movies</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default TopRated;
