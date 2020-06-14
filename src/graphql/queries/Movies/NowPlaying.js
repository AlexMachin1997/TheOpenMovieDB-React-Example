import gql from 'graphql-tag';

const NowPaying = gql`
	query {
		NowPlayingMovies {
			id
			original_title
			poster_path
			release_date
			vote_average
		}
	}
`;

export default NowPaying;
