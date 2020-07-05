import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import UpcomingMoviesQuery from '../../graphql/queries/Movies/Upcoming';

import Loader from '../../components/loader';

const Upcoming = () => {
	const { loading, error, data } = useQuery(UpcomingMoviesQuery, {
		displayName: 'Upcoming movies query',
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Upcoming movies</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default Upcoming;
