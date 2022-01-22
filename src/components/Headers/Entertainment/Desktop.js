import styled from 'styled-components';

export const BackgroundImage = styled.section`
	/* Mobile Mode */
	border-bottom: 1px solid rgba(15.69%, 18.63%, 20.39%, 1);
	background-position: calc((((100vw / 2.222222) - 20px) / 1.5) / 2) 0;
	background-size: cover;
	background-repeat: no-repeat;

	/* Dynamic header background */
	background-image: url(${(props) => props.backgroundImage});

	/* Desktop Mode */
	@media (min-width: 900px) {
		background-position: right -200px top;
	}
`;

/* TODO: Dynamic RGB values - https://trello.com/c/6Id3kyzf/45-dynamic-entertainment-header-colour-functionality */
export const BackgroundOverlay = styled.div`
	/* Super small mobile */
	background-image: linear-gradient(
		to right,
		rgba(11.76%, 15.29%, 17.25%, 1) 20%,
		rgba(11.76%, 15.29%, 17.25%, 0) 50%
	);

	/* Desktop Mode */
	@media (min-width: 900px) {
		background-image: linear-gradient(
			to right,
			rgba(11.76%, 15.29%, 17.25%, 1) 150px,
			rgba(19.61%, 21.96%, 23.53%, 0.84) 100%
		);
	}

	/*
		Super small mobile
		- Remove the background and just apply the base color
	*/
	@media (max-width: 400px) {
		background-color: rgb(11.76%, 15.29%, 17.25%);
	}
`;

export const PosterImage = styled.div`
	/* When at 400px center the image (The background is full) */
	@media (max-width: 400px) {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* When at 600px make the image smaller */
	@media (max-width: 600px) {
		img {
			width: 150px;
			height: 200px;
		}
	}

	/* Desktop Mode */
	@media (min-width: 900px) {
		img {
			width: 300px;
			height: 450px;
		}
	}
`;

export const ContentContainer = styled.div`
	/* Mobile Mode */
	display: block;
	position: relative;
	top: 0;
	left: 0;
	padding: 1rem;

	/* Desktop Mode */
	@media (min-width: 900px) {
		display: flex;
		flex-wrap: nowrap;
		max-width: 1400px;
		margin: 0 auto;
		padding: 30px 40px;
	}
`;

export const Title = styled.div`
	/* Mobile Mode */
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 1.1rem 0;
	flex-wrap: wrap;
	background: rgba(11.76%, 15.29%, 17.25%, 0.96);

	p {
		opacity: 0.8;
	}

	/* Desktop Mode */
	@media (min-width: 900px) {
		background: transparent;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 1.3rem;
		padding: 0;
	}
`;

export const Actions = styled.ul`
	/* Mobile Mode */
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: rgba(11.76%, 15.29%, 17.25%, 0.96);
	padding: 1rem;
	margin: 0;
	list-style-type: none;

	li {
		display: flex;
		align-items: center;
	}

	/* Desktop Mode */
	@media (min-width: 900px) {
		display: flex;
		justify-content: flex-start;
		padding: 0;
		color: white;
		background: transparent;
		margin: 1rem 0;

		li {
			padding: 0 0.5rem;
		}
	}
`;

export const Pipe = styled.div`
	/* Mobile And Desktop Mode */
	width: 1px;
	height: 24px;
	display: inline-block;
	border-left: 1px solid rgba(255, 255, 255, 0.3);
`;

export const RatingText = styled.div`
	/* Mobile And Desktop Mode */
	margin-left: 0.2rem;
	font-weight: 700;
`;

/*

Title Section
*/

export const DesktopPosterContent = styled.div`
	/* Mobile Mode */
	display: none;
	flex-wrap: wrap;
	padding-left: 40px;
	flex-direction: column;
	justify-content: center;

	/* Desktop Mode */
	@media (min-width: 900px) {
		display: flex;
	}
`;

export const MobilePosterContent = styled.div`
	/* Mobile Mode */
	display: block;
	background: rgba(11.76%, 15.29%, 17.25%, 0.96);

	/* Desktop Mode */
	@media (min-width: 900px) {
		display: none;
	}
`;
