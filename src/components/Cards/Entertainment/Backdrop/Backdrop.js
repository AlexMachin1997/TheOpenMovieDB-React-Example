import styled from 'styled-components';

export const BackdropContainer = styled.div`
	&:hover {
		cursor: pointer;
	}

	margin: 1rem;

	background: white;

	@media (max-width: 900px) {
		img {
			height: 200px;
		}

		h1 {
			font-size: 1.1rem;
		}
	}
`;

export const ContentContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const RatingContainer = styled.div`
	margin: 0 1rem 0;

	@media (max-width: 900px) {
		margin-left: 0.5rem;
	}
`;

export const CardInformation = styled.div`
	display: flex;
	flex-direction: column;
`;
