import styled from 'styled-components';

export const Container = styled.div`
	margin: 1rem 0;
`;

export const ItemLinks = styled.div`
	display: ${(props) => (props.display === true ? 'block' : 'none')};
`;
