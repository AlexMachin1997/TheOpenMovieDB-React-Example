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

	@media (min-width: 700px) {
		max-width: 170px;
	}
`;

export const RatingContainer = styled.div`
	position: absolute;
	top: -23px;
	left: 10px;

	text {
		font-size: 0.7rem;
		font-weight: 600;
	}
`;

export const ContentContainer = styled.div`
	position: relative;
	padding: 20px 10px 12px 10px;
	height: 100%;
	display: flex;
	flex-direction: column;

	@media (min-width: 700px) {
		h1 {
			font-size: 1.1rem;
		}

		p {
			font-size: 1rem;
		}

		p {
			margin-top: 0.5rem;
		}
	}
`;
