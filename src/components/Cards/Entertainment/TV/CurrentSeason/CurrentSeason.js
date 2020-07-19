import styled from 'styled-components';

export const CurrentSeasonContainer = styled.div`
	display: flex;
	border: 1px solid lightgrey;
	margin: 1rem;
	border-radius: 1rem;

	img {
		display: flex;
	}
`;

export const CurrentSeasonContentContainer = styled.div`
	padding: 1rem;

	display: flex;
	justify-content: center;
	flex-direction: column;

	p {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	/* When no desktop show all avaliable lines */
	@media (min-width: 700px) {
		p {
			-webkit-line-clamp: 6;
			height: 2;
		}
	}
`;

export const CurrentSeasonContentOverview = styled.div`
	padding-top: 0.5rem;
`;
