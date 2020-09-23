import styled from 'styled-components';

export const CardGroup = styled.div`
	width: 100%;
	overflow-x: auto; /* Automatically hides and reshows the scrollbar */
	overflow-y: auto; /* Prevents the y axios scrollbar from appearing */
	transition: height 0.5s linear;
	display: flex;
	/*
	::-webkit-scrollbar {
		display: none;
	} */
`;

export const GroupedExample = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 50px;
	row-gap: 50px;

	@media (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 900px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1400px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

export const SingleExample = styled.div`
	display: grid;
	grid-template-columns: 1fr;
`;
