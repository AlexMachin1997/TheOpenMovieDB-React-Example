import styled from 'styled-components';

export const Dropdown = styled.ul`
	display: none;
	padding: 1rem 0;
	position: absolute;
	z-index: 100000;
	width: 170px;
	background: white;
	border-radius: 0.5rem;
	flex-direction: column;
	border: 1px solid lightgrey;
	li {
		list-style-type: none;

		&:hover {
			background: lightgrey;
		}
	}
`;

export const DropdownContainer = styled.li`
	position: relative;
	cursor: pointer;
	padding: 0 1rem;
	list-style-type: none;

	&:hover ${Dropdown} {
		display: flex;
	}

	&:active ${Dropdown} {
		display: flex;
	}
`;
