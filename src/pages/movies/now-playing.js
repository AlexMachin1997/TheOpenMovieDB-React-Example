import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import NowPlayingMovieQuery from '../../graphql/queries/Movies/NowPlaying';

import Loader from '../../components/Core/Loader';

const NowPlaying = () => {
	const { loading, error, data } = useQuery(NowPlayingMovieQuery, {
		displayName: 'Now playing movie query'
	});

	if (loading) return <Loader />;

	if (error) return <p>Error</p>;

	return (
		<div>
			<h2>Now playing movies</h2>
			{JSON.stringify(data)}
		</div>
	);
};

export default NowPlaying;
