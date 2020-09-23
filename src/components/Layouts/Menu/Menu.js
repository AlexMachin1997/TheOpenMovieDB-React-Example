import styled from 'styled-components';

import hexToRGBA from '../../../utils/formatters/hexToRGBA';

/* Desktop Menu Styled-Components */
export const DesktopHeader = styled.nav`
	background: ${(props) => props.theme.primary};
	position: fixed;
	top: 0;
	right: 0;
	left: 0;

	/* Move the desktop image down to be level with the content */
	img {
		position: relative;
		top: 5px;
		right: 12px;
	}
`;

export const DesktopHeaderContent = styled.div`
	display: none;
	justify-content: space-between;
	align-items: center;
	background: ${(props) => props.theme.primary};
	padding: 1rem;
	max-width: 1400px;
	margin: 0 auto;

	li {
		padding: 0 1rem;
	}

	li:first-child {
		padding: 0;
	}

	@media (min-width: 900px) {
		display: flex;
	}
`;

export const HeaderSection = styled.ul`
	display: flex;
	align-items: center;
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

/* Mobile Sidebar Styled-Components */

export const MobileHeader = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${(props) => props.theme.primary};
	padding: 1rem;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;

	@media (min-width: 900px) {
		display: none;
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
	backdrop-filter: blur(20px);
`;
