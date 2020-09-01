import styled from 'styled-components';

export const ReccomendationContainer = styled.div`
	cursor: pointer;
	max-width: 300px; /* Prevents the image from going beyond 300px wide */
	min-width: 300px; /* Required for the card not to wrap when squashed down to mobile view */
	padding: 1rem; /* Adds padding between each Video card */
`;

export const ReccomendationContentContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ReccomendationImageContent = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background: rgba(255, 255, 255, 0.9);
	height: 40px;
	display: flex;
	align-items: center;
	visibility: hidden;
`;

export const ReccomendationImageContainer = styled.div`
	position: relative;

	/* When the image container is hoverd over make the content visible */
	&:hover ${ReccomendationImageContent} {
		visibility: visible;
	}
`;
