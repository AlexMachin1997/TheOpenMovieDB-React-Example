import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import PopularPeopleQuery from '../../graphql/queries/People';

import Loader from '../../components/loader';

const People = () => {
	const { loading, error, data } = useQuery(PopularPeopleQuery, {
		displayName: 'Popular people query',
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
