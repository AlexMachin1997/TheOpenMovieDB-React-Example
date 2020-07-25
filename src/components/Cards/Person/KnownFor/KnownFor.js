import styled from 'styled-components';

export const KnownForContainer = styled.div`
	border-radius: 1rem;
	background: white;
	margin: 1rem;
	max-width: 138px;
	min-width: 138px;
	height: 100%;

	&:hover {
		cursor: pointer;
	}

	/* KnownFor specific */
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	h2 {
		margin: 0.5rem 0;
	}
`;

export const ContentContainer = styled.div``;
