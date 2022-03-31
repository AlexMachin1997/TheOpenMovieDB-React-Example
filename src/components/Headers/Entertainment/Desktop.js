import styled from 'styled-components';

export const BackgroundImage = styled.section`
	@media (min-width: 768px) {
		background-image: url(${(props) => props.backgroundImage});
		border-bottom: 1px solid rgba(15.69%, 18.63%, 20.39%, 1);
		/* background-position: calc((((100vw / 2.222222) - 20px) / 1.5) / 2) 0; */
		background-size: cover;
		background-repeat: no-repeat;
		background-position: right -200px top;
	}
`;

/* TODO: Dynamic RGB values - https://trello.com/c/6Id3kyzf/45-dynamic-entertainment-header-colour-functionality */
export const BackgroundOverlay = styled.div`
	/* Desktop Mode */
	/* @media (min-width: 900px) { */
	background-image: linear-gradient(
		to right,
		rgba(11.76%, 15.29%, 17.25%, 1) 150px,
		rgba(19.61%, 21.96%, 23.53%, 0.84) 100%
	);
	/* } */
`;
