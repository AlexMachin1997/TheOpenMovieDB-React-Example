import { gql } from '@apollo/client';

const DiscoverShows = gql`
	query {
		DiscoverShows {
			id
			original_name
			release_date
			poster_path
			vote_average
		}
	}
`;

export default DiscoverShows;
