import gql from 'graphql-tag';

const DiscoverMovies = gql`
	query {
		DiscoverMovies {
			id
			original_title
			release_date
			poster_path
			vote_average
		}
	}
`;

export default DiscoverMovies;
