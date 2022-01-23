import { gql } from '@apollo/client';

const Upcoming = gql`
	query {
		UpcomingShows {
			id
			original_name
			poster_path
			vote_average
			release_date
		}
	}
`;

export default Upcoming;
