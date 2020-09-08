import styled from 'styled-components';

export const PosterContainer = styled.div`
	border-radius: 1rem;
	background: white;
	margin: 1rem;
	width: 100%;

	@media (min-width: 600px) {
		max-width: 300px;
	}

	&:hover {
		cursor: pointer;
	}
`;

export const RatingContainer = styled.div`
	position: absolute;
	top: -29px;
	left: 8px;

	/* text {
		font-size: 0.9rem;
		font-weight: 600;
	} */
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
