import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import AiringTodayQuery from '../../graphql/queries/Shows/AiringToday';

import Loader from '../../components/loader';

const AiringToday = () => {
	const { loading, error, data } = useQuery(AiringTodayQuery, {
		displayName: 'Airing today (show) query',
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Airing today</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default AiringToday;
