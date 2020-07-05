import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import OnTvQuery from '../../graphql/queries/Shows/OnTv';

import Loader from '../../components/loader';

const OnTv = () => {
	const { loading, error, data } = useQuery(OnTvQuery, {
		displayName: 'On tv query',
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>On tv</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default OnTv;
