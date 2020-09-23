import styled from 'styled-components';
import generateColours from '../../../utils/theming/generateColours';

const Button = styled.button`
	text-transform: ${(props) => props.transform};
	font-weight: bold;
	font-size: 1.3rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
	border: ${(props) => (props.border !== '' ? props.border : 'none')};
	background-color: ${(props) => generateColours(props.theme, props.background)};
	color: ${(props) =>
		props.colour !== '' ? generateColours(props.theme, props.colour) : props.theme.textColour};
	outline: transparent;
	border-radius: ${(props) => props.borderRadius};
	cursor: pointer;

	&:hover,
	&:active {
		outline: transparent;
		background-color: ${(props) => {
			if (props.hoverbackground === '') {
				return props.background;
			}

			return generateColours(props.theme, props.hoverbackground, props.hoverbackground);
		}};
	}

	&:disabled {
		cursor: not-allowed;
	}
`;

export default Button;
