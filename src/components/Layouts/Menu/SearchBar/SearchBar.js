import styled from 'styled-components';

export const Container = styled.div`
	position: fixed;
	top: 70px;
	right: 0;
	left: 0;
	visibility: ${(props) => (props.display ? 'visible' : 'hidden')};
`;

export const ContentContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem;
	background: white;
	border: 1px solid lightgrey;
`;
