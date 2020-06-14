import gql from 'graphql-tag';

const Popular = gql`
	query {
		PopularMovies {
			id
			original_title
			poster_path
			release_date
			vote_average
		}
	}
`;

export default Popular;
