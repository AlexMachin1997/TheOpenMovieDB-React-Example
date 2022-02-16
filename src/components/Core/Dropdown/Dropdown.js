import styled from 'styled-components';

import generateColours from '../../../utils/theming/generateColours';

export const DropdownLinks = styled.div`
	display: none;
`;

export const DropdownContainer = styled.div`
	position: relative;
	cursor: pointer;
	list-style-type: none;
	background: ${(props) => generateColours(props.theme, props.background)};

	&:hover ${DropdownLinks}, &:focus ${DropdownLinks} {
		display: block;
	}
`;

export const Dropdown = styled.div`
	padding: 0.5rem;
	position: absolute;
	z-index: 100000;
	width: 170px;
	background: ${(props) => generateColours(props.theme, props.dropdownBackground)};
	border-radius: 0.5rem;
	flex-direction: column;
	border: 1px solid ${(props) => generateColours(props.theme, props.dropdownBorderColour)};
	margin: 0;
	li {
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
