import gql from 'graphql-tag';

const TopRated = gql`
	query {
		TopRatedMovies {
			id
			original_title
			poster_path
			vote_average
			release_date
		}
	}
`;

export default TopRated;
