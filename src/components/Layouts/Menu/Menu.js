import styled from 'styled-components';

import hexToRGBA from '../../../utils/formatters/hexToRGBA';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${(props) => props.theme.primary};
	padding: 1rem;
	color: white;
	position: relative;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;

	svg {
		&:hover {
			cursor: pointer;
		}
	}
`;

export const Sidebar = styled.div`
	position: fixed;
	top: 75px;
	left: ${(props) => (props.isSideBarOpen ? '0' : '-90%')};
	width: ${(props) => (props.isSideBarOpen ? '100%' : '0%')};
	background: ${(props) => hexToRGBA(props.theme.primary, '0.9')};
	padding: 1rem;
	transition: ease 0.6s;
	bottom: 0;
	overflow-y: scroll;
`;
