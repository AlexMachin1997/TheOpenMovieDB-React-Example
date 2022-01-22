import gql from 'graphql-tag';

const Movie = gql`
	query ($search: String!, $id: Int!) {
		SearchForAMovie(search: $search, id: $id) {
			backdrop_path
			poster_path
			original_title
			original_language
			vote_average
			budget
			status
			homepage
			genres {
				id
				name
			}
			id
			overview
			status
			budget
			revenue
			vote_average
			social {
				facebook_id
				twitter_id
				instagram_id
			}
			cast {
				cast_id
				character
				image
			}
			crew {
				credit_id
				name
				job
			}
			reviews {
				content
				author
			}
			recomendations {
				release_date
				poster_path
				original_title
			}
			keywords {
				name
			}
			videos {
				key
				name
				url
			}
			production_companies {
				id
				name
				logo
			}
		}
	}
`;

export default Movie;
