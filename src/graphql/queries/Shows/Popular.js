import { gql } from '@apollo/client';

const Popular = gql`
	query {
		PopularShows {
			id
			original_name
			release_date
			poster_path
			vote_average
		}
	}
`;

export default Popular;
