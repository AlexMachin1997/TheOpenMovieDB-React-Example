import styled from 'styled-components';

import generateColours from '../../utils/theming/generateColours';

export const DropdownContainer = styled.li`
	position: relative;
	cursor: pointer;
	padding: 0 1rem;
	list-style-type: none;
	background: ${(props) => generateColours(props.theme, props.background)};
`;

export const Dropdown = styled.ul`
	padding: 1rem 0;
	position: absolute;
	z-index: 100000;
	width: 170px;
	background: ${(props) => generateColours(props.theme, props.dropdownBackground)};
	border-radius: 0.5rem;
	flex-direction: column;
	border: 1px solid ${(props) => generateColours(props.theme, props.dropdownBorderColour)};
	margin: 0;
	li {
		list-style-type: none;

		&:hover {
			background: ${(props) => generateColours(props.theme, props.itemHoverBackground)};
		}
	}

	a {
		display: block;
		&:hover {
			background: ${(props) => generateColours(props.theme, props.itemHoverBackground)};
		}
	}
`;

export const ContentContainer = styled.span``;
