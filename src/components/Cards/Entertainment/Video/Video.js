import styled from 'styled-components';

import { Play } from 'styled-icons/fa-solid';

export const VideoContainer = styled.div`
	cursor: pointer;
	max-width: 300px;
	min-width: 300px; /* Required for the card not to wrap when squashed down to mobile view */
	padding: 1rem; /* Adds padding between each Video card */
`;

export const ImageContainer = styled.div`
	width: 100%;
	max-width: 300px;
	position: relative;

	&:hover {
		img {
			transition: 0.6s;
			transform: scale(1.05);
		}
	}
`;

export const VideoContentContainer = styled.div`
	text-align: center;
`;

export const PlayIcon = styled(Play)`
	color: white;
`;

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
