import styled from 'styled-components';

/*

Featured Crew

*/

export const FeaturedCrew = styled.ol`
	margin-top: 1.3rem;
	padding: 0;
	list-style: none;
	display: grid;

	grid-template-columns: repeat(2, 1fr);

	@media (min-width: 900px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const FeaturedCrewMember = styled.li``;
