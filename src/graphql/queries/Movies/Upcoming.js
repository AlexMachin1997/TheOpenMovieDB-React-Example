import gql from 'graphql-tag';

const Upcoming = gql`
	query {
		UpcomingMovies {
			id
			original_title
			poster_path
			vote_average
			release_date
		}
	}
`;

export default Upcoming;
