import styled from 'styled-components';

export const Container = styled.div`
	margin: 1rem 0;

	h1:hover {
		cursor: pointer;
	}
`;

export const InternalLinks = styled.ul`
	padding: 0;

	p {
		cursor: pointer;
	}
`;

export const ExternalLinks = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0;
`;
