import { gql } from '@apollo/client';

const Person = gql`
	query ($search: String!, $id: Int!) {
		SearchForAPerson(search: $search, id: $id) {
			birthday
			known_for_department
			deathday
			id
			name
			also_known_as
			gender
			biography
			popularity
			place_of_birth
			profile_path
			imdb_id
			homepage
			credits {
				ActingGroup {
					release_date
					original_title
					episode_count
					media_type
				}
				ProductionGroup {
					release_date
					original_title
					episode_count
					media_type
				}
				WritingGroup {
					release_date
					original_title
					episode_count
					media_type
				}
				DirectingGroup {
					release_date
					original_title
					episode_count
					media_type
				}
				CrewGroup {
					release_date
					original_title
					episode_count
					media_type
				}
			}
		}
	}
`;

export default Person;
