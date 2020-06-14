import gql from 'graphql-tag';

const FilterCredits = gql`
	query($personID: Int!, $mediaType: String) {
		FilterCredits(id: $personID, mediaType: $mediaType) {
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
				first_air_date
				media_type
			}
		}
	}
`;

export default FilterCredits;
