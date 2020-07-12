import styled from 'styled-components';

export const PosterContainer = styled.div`
	border-radius: 1rem;
	background: white;
	margin: 1rem;
	max-width: 160px;
	height: 100%;

	&:hover {
		cursor: pointer;
	}
`;

export const RatingContainer = styled.div`
	position: absolute;
	top: -23px;
	left: 10px;

	text {
		font-size: 0.7rem;
	}
`;

export const ContentContainer = styled.div`
	position: relative;
	padding: 20px 10px 12px 10px;
	height: 100%;
	display: flex;
	flex-direction: column;
`;
