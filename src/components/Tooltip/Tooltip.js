import styled from 'styled-components';

export const Tooltip = styled.div`
	position: relative;
	display: inline-block;

	&:hover {
		span {
			visibility: visible;
			opacity: 1;
		}
	}
`;

export const TooltipText = styled.span`
	visibility: hidden;
	width: 120px;
	background-color: ${(props) => props.theme.primary};
	color: white;
	text-align: center;
	padding: 5px 0;
	border-radius: 6px;

	/* Position the tooltip text */
	position: absolute;
	z-index: 1;
	bottom: 125%;
	left: 50%;
	margin-left: -60px;

	/* Fade in tooltip */
	opacity: 0;
	transition: opacity 0.3s;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: #555 transparent transparent transparent;
	}
`;

export const StoryPreview = styled.div`
	margin-top: 3rem;
	margin-left: 2rem;
`;
