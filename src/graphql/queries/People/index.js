import gql from 'graphql-tag';

const PopularPeople = gql`
	query {
		PopularPeople {
			profile_path
			name
			id
			known_for {
				title
			}
		}
	}
`;

export default PopularPeople;
