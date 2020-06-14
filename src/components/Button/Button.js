import styled from 'styled-components';
import generateColours from '../../utils/theming/generateColours';

const Button = styled.button`
	width: 100%;
	text-transform: ${(props) => props.textTransform};
	font-weight: bold;
	font-size: 1.3rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 16px;
	border: ${(props) => (props.border !== '' ? props.border : '1px solid transparent')};
	background-color: ${(props) =>
		generateColours(props.theme, props.backgroundColour, props.backgroundColour)};
	color: ${(props) => generateColours(props.theme, props.textColour, props.textColour)};
	transition: 0.6s;
	outline: transparent;
	border-radius: ${(props) => props.borderRadius};

	&:hover,
	&:active {
		outline: transparent;
		background-color: ${(props) => {
			if (props.hoverBackgroundColour === '') {
				return props.background;
			}

			return generateColours(props.theme, props.hoverBackgroundColour, props.hoverBackgroundColour);
		}};
	}

	&:disabled {
		cursor: not-allowed;
	}
`;

export default Button;
