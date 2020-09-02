import styled from 'styled-components';

import hexToRgba from '../../../../../utils/formatters/hexToRGBA';

export const CollectionContainer = styled.div`
	height: 260px;
`;

export const CollectionContentContainer = styled.div`
	height: 100%;
	background-size: cover;
	background-position: 50% 50%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	background-image: linear-gradient(
			to right,
			${(props) => hexToRgba(props.theme.primary, 1)} 0%,
			${(props) => hexToRgba(props.theme.primary, 0.6)} 100%
		),
		url(${(props) => props.image});

	button {
		font-size: 0.9rem;
	}

	@media (min-width: 500px) {
		div {
			margin-top: 1.5rem;
		}

		h2 {
			font-size: 2rem;
		}

		p {
			font-size: 1.5rem;
		}

		button {
			padding: 0.8rem 1rem;
		}

		padding: 2rem;
	}

	padding: 0 1rem;

	div {
		margin-top: 1rem;
	}
`;
