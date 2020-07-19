import styled from 'styled-components';

export const CardGroup = styled.div`
	width: 100%;
	overflow-x: auto; /* Automatically hides and reshows the scrollbar */
	overflow-y: hidden; /* Prevents the y axios scrollbar from appearing */
	transition: height 0.5s linear;
	display: flex;
`;
