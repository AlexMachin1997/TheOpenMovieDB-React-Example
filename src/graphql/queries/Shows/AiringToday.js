import { gql } from '@apollo/client';

const AiringToday = gql`
	query {
		NowPlayingShows {
			id
			original_name
			poster_path
			release_date
			vote_average
		}
	}
`;

export default AiringToday;
