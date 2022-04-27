import * as React from 'react';
import { useQuery } from '@apollo/client';

import PopularShowsQuery from '../../graphql/queries/Shows/Popular';

import { Loader } from '../../components';

const Popular = () => {
	const { loading, error, data } = useQuery(PopularShowsQuery, {
		displayName: 'Popular shows query'
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
