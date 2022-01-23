import * as React from 'react';
import { useQuery } from '@apollo/client';

import PersonQuery from '../../graphql/queries/People/Person';

import Loader from '../../components/Core/Loader';

const Person = () => {
	const { loading, error, data } = useQuery(PersonQuery, {
		displayName: 'Single person query'
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Single Person</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default Person;
