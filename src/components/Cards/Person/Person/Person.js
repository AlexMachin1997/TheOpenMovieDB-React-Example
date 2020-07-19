import styled from 'styled-components';

export const PersonContainer = styled.div`
	background: white;
	margin: 1rem;
	max-width: 235px;
	height: 100%;
	width: 100%;

	&:hover {
		cursor: pointer;
	}

	h2 {
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const ContentContainer = styled.div`
	padding: 0.5rem 0.6rem;
`;
