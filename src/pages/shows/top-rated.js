import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import TopRatedShowsQuery from '../../graphql/queries/Shows/TopRated';

import Loader from '../../components/loader';

const TopRated = () => {
	const { loading, error, data } = useQuery(TopRatedShowsQuery, {
		displayName: 'Top rated shows query',
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Top rated shows</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default TopRated;
