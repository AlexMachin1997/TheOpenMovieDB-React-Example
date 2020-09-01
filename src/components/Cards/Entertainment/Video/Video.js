import styled from 'styled-components';

import { Play } from 'styled-icons/fa-solid';

/*

Video card container

Applies spacing and add's makes the Card a specific width

Note the min and max width are the same, this is to prevent the items from being squashed inide the CardGroup container

*/
export const VideoContainer = styled.div`
	cursor: pointer;
	max-width: 300px; /* Prevents the image from going beyond 300px wide */
	min-width: 300px; /* Required for the card not to wrap when squashed down to mobile view */
	padding: 1rem; /* Adds padding between each Video card */
`;

export const ImageContainer = styled.div`
	width: 100%;
	max-width: 300px; /* Makes the same width of the VideoContainer */
	position: relative; /* THe icon needs to be relative to the Image */

	/* On hover of the image increase the height */
	&:hover {
		img {
			transition: 0.6s;
			transform: scale(1.05);
		}
	}
`;

/*

Puts the text in the center of the card.

*/
export const VideoContentContainer = styled.div`
	text-align: center;
`;

/*

Modifies the Styled-Icons being used

*/
export const PlayIcon = styled(Play)`
	color: white;
`;

/*

Puts the Play icon in the center of the image

*/
export const PlayIconContainer = styled.div`
	width: 300px;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
