import styled from 'styled-components';

export const Container = styled.div`
	margin: 1rem 0;

	h1:hover {
		cursor: pointer;
	}
`;

export const InternalLinks = styled.ul`
	display: ${(props) => (props.display === true ? 'block' : 'none')};
	padding: 0;
`;

export const ExternalLinks = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0;
`;
