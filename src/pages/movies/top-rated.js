import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import TopRatedMoviesQuery from '../../graphql/queries/Movies/TopRated';

import Loader from '../../components/Core/Loader';

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
