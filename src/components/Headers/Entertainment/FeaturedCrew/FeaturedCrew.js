import styled from 'styled-components';

/*

Featured Crew

*/

export const FeaturedCrew = styled.ol`
	padding: 0;
	list-style: none;
	display: grid;

	grid-template-columns: repeat(2, 1fr);
	row-gap: 10px;

	@media (min-width: 900px) {
		grid-template-columns: repeat(3, 1fr);
		row-gap: 0;
	}
`;

export const FeaturedCrewMember = styled.li``;
