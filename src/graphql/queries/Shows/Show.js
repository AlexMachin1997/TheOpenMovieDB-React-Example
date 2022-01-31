import { gql } from '@apollo/client';

const Show = gql`
	query ($search: String!, $id: Int) {
		SearchForAShow(search: $search, id: $id) {
			backdrop_path
			poster_path
			homepage
			original_name
			id
			vote_average
			original_language
			genres {
				name
			}
			cast {
				character
				image
				id
				name
				order
			}
			reviews {
				author
				content
				id
				url
			}
			type
			networks {
				name
				logo_path
			}
			social {
				facebook_id
				twitter_id
				instagram_id
				imdb_id
			}
			videos {
				name
				key
			}
			recomendations {
				poster_path
				name
			}
			current_season {
				image
				season_number
				year
				episode_count
				overview
			}
		}
	}
`;

export default Show;
