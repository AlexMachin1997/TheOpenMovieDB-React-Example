import styled from 'styled-components';

export const OverviewContainer = styled.div`
	display: flex;
	margin: 1rem;
	border-radius: 1rem;
`;

export const OverviewContentContainer = styled.div`
	padding: 1rem;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;

	div {
		margin-top: 0.5rem;
	}

	@media (min-width: 700px) {
		div {
			margin-top: 1rem;
		}

		div:first-child {
			margin-top: 0;
		}
	}
`;
