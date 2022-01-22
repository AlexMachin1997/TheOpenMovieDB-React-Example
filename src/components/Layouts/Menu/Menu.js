import styled from 'styled-components';

import hexToRGBA from '../../../utils/formatters/hexToRGBA';

/* Desktop Menu Styled-Components */
export const DesktopMenu = styled.nav`
	background: ${(props) => props.theme.primary};
	padding: 1rem 2.5rem;

	/* Allows the menu to scroll to be fixed to the top of the screen, this could be extended to toggle between fixed and none fixed..... */
	position: fixed;
	top: 0;
	right: 0;
	left: 0;

	/* Move the desktop image down to be level with the content */
	img {
		position: relative;
		top: 3px;
		right: 12px;
	}

	/* When in desktop mode ie above 900px screen remove the padding for this elemen */
	@media (max-width: 900px) {
		padding: 0;
	}
`;

export const DesktopContainer = styled.div`
	display: none;
	justify-content: space-between; /* Adds Spacing between the HeaderSections  */
	align-items: center;
	background: ${(props) => props.theme.primary};
	max-width: 1400px;
	margin: 0 auto;

	/* Show only in desktop mode */
	@media (min-width: 900px) {
		display: flex;
	}
`;

export const MenuSection = styled.ul`
	display: flex;
	align-items: center;
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

export const MenuItem = styled.li`
	padding-right: 1rem;
`;

/* Mobile MobileSidebar Styled-Components */

export const MobileMenu = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${(props) => props.theme.primary};
	padding: 1rem;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;

	/* Hide when not in mobile mode */
	@media (min-width: 900px) {
		display: none;
	}
`;

export const MobileSidebar = styled.div`
	position: fixed;
	top: 75px;
	left: ${(props) => (props.isSideBarOpen ? '0' : '-90%')};
	width: ${(props) => (props.isSideBarOpen ? '100%' : '0%')};
	background: ${(props) => hexToRGBA(props.theme.primary, '0.9')};
	padding: 1rem;
	transition: ease 0.6s; /* While the background is */
	bottom: 0;
	overflow-y: scroll; /* Allow y axios scrolling */
	backdrop-filter: blur(20px); /* Blur the background behind the MobileSidebar*/
`;
