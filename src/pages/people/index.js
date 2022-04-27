import * as React from 'react';
import { useQuery } from '@apollo/client';

import PopularPeopleQuery from '../../graphql/queries/People';

import { Loader } from '../../components';

const People = () => {
	const { loading, error, data } = useQuery(PopularPeopleQuery, {
		displayName: 'Popular people query'
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Popular people</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default People;
