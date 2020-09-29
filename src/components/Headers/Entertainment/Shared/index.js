import styled from 'styled-components';

/*

Header Containers

- Sets max-width

- Sets the background-image

- Applies the background overlay

*/
export const BackgroundImage = styled.section`
	border-bottom: 1px solid rgba(15.69%, 18.63%, 20.39%, 1);
	background-position: calc((((100vw / 2.222222) - 20px) / 1.5) / 2) 0;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url(${(props) => props.backgroundImage});

	@media (min-width: 900px) {
		background-position: right -200px top;
	}
`;

export const BackgroundOverlay = styled.div`
	@media (min-width: 900px) {
		background-image: linear-gradient(
			to right,
			rgba(11.76%, 15.29%, 17.25%, 1) 150px,
			rgba(19.61%, 21.96%, 23.53%, 0.84) 100%
		);
	}

	background-image: linear-gradient(
		to right,
		rgba(11.76%, 15.29%, 17.25%, 1) 20%,
		rgba(11.76%, 15.29%, 17.25%, 0) 50%
	);
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-wrap: nowrap;
	max-width: 1400px;
	margin: 0 auto;
	padding: 30px 40px;
`;
