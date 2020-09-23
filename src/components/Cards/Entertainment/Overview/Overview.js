import styled from 'styled-components';

export const OverviewContainer = styled.div`
	display: flex;
	border-radius: 1rem;
	height: 100%;
`;

export const OverviewContentContainer = styled.div`
	padding: 1rem;
	display: flex;
	justify-content: center;
	flex-direction: column;

	div {
		margin-top: 0.5rem;
	}

	@media (min-width: 700px) {
	}
`;

export const OverviewInformation = styled.div`
	p {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`;
