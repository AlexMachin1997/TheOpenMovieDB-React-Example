import { gql } from '@apollo/client';

const TopRated = gql`
	query {
		TopRatedShows {
			id
			original_name
			poster_path
			vote_average
			release_date
		}
	}
`;

export default TopRated;
