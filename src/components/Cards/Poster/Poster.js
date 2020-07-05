import styled from 'styled-components';

export const PosterContainer = styled.div`
	border-radius: 1rem;
	background: white;
	margin: 1rem;
	max-width: 208px;
	height: 100%;

	&:hover {
		cursor: pointer;
	}
`;

export const PosterRatingContainer = styled.div`
	position: absolute;
	top: -25px;
	left: 10px;

	text {
		font-size: 0.7rem;
	}
`;

export const PosterInformation = styled.div`
	position: relative;
	padding: 20px 10px 12px 10px;
	height: 100%;
	display: ${(props) => (props.display === true ? 'flex' : 'none')};
	flex-direction: column;
`;
