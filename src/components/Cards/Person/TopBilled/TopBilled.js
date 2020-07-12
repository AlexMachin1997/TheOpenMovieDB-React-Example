import styled from 'styled-components';

export const TopBilledContainer = styled.div`
	border-radius: 1rem;
	background: white;
	margin: 1rem;
	max-width: 140px;
	height: 100%;
	border: 0.5px solid lightgrey;

	&:hover {
		cursor: pointer;
	}
`;

export const ContentContainer = styled.div`
	padding: 0.5rem 0 1.5rem 0.7rem;
	display: flex;
	flex-direction: column;

	h1,
	p {
		margin-bottom: 0.3rem;
	}
`;
