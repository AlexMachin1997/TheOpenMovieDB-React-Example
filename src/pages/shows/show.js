import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import ShowQuery from '../../graphql/queries/Shows/Show';

import Loader from '../../components/Core/Loader';

const Single = () => {
	const { loading, error, data } = useQuery(ShowQuery, {
		displayName: 'Single show query',
		variables: {
			search: 'Westworld',
			id: 63247
		}
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Single show</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default Single;
