import { gql } from '@apollo/client';

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
