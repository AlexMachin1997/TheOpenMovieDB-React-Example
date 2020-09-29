import styled from 'styled-components';

/*

Title Section
*/

export const EntertainmentInfoContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding-left: 40px;
	flex-direction: column;
	justify-content: center;
`;

export const Title = styled.div`
	display: flex;
	margin-bottom: 1.3rem;

	P {
		opacity: 0.8;
	}
`;

/*

Actions Section

*/

export const Actions = styled.ul`
	display: flex;
	align-items: center;
	padding: 0;
	list-style-type: none;
	color: white;

	li {
		padding: 0 0.5rem;
	}
`;

export const RatingContainer = styled.li`
	display: flex;
	align-items: center;
	color: white;
`;

export const RatingText = styled.div`
	margin-left: 0.2rem;
	font-weight: 700;
`;

export const AddToList = styled.li``;

export const AddToFavorites = styled.li``;

export const AddToBookmarks = styled.li``;

export const RateIt = styled.li``;

export const PlayTrailer = styled.li`
	display: flex;
	align-items: center;
`;
