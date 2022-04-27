import * as React from 'react';
import { useQuery } from '@apollo/client';
import MovieQuery from '../../graphql/queries/Movies/Movie';

import { Loader } from '../../components';

const Single = () => {
	const { loading, error, data } = useQuery(MovieQuery, {
		displayName: 'Single movie query',
		variables: {
			search: 'birds-of-prey-and-the-fantabulous-emancipation-of-one-harley-quinn',
			id: 495764
		}
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Single movie</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default Single;
