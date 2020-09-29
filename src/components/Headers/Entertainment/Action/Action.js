import styled from 'styled-components';

export const Container = styled.div`
	width: 50px;
	height: 50px;
	background: ${(props) => props.theme.primary}; /* Dark blue background */
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%; /* Makes it a circle */
`;
