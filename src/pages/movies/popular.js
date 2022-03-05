import * as React from 'react';
import { useQuery } from '@apollo/client';

import PopularMoviesQuery from '../../graphql/queries/Movies/Popular';

import { Loader } from '../../components';

const Popular = () => {
	const { loading, error, data } = useQuery(PopularMoviesQuery, {
		displayName: 'Popular movies query'
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Popular movies</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default Popular;
