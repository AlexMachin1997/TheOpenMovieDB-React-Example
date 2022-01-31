import * as React from 'react';
import PropTypes from 'prop-types';

import { DropdownLinks, DropdownContainer, Dropdown } from './Dropdown';

import Typography from '../Typography';

const DesktopMenuItem = ({
	title,
	titleType,
	dropdownBackground,
	dropdownBorderColour,
	itemHoverBackground,
	background,
	colour,
	children
}) => (
	<DropdownContainer tabIndex='0' background={background}>
		{titleType === 'text' ? (
			<Typography text={title} weight='bolder' colour={colour} size='1rem' height='2.3rem' />
		) : (
			title
		)}
		<DropdownLinks>
			<Dropdown
				dropdownBackground={dropdownBackground}
				dropdownBorderColour={dropdownBorderColour}
				itemHoverBackground={itemHoverBackground}
			>
				{children}
			</Dropdown>
		</DropdownLinks>
	</DropdownContainer>
);

DesktopMenuItem.propTypes = {
	title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	titleType: PropTypes.string,
	dropdownBackground: PropTypes.string,
	dropdownBorderColour: PropTypes.string,
	itemHoverBackground: PropTypes.string,
	background: PropTypes.string,
	colour: PropTypes.string,
	children: PropTypes.node.isRequired
};

DesktopMenuItem.defaultProps = {
	title: 'Default title',
	titleType: 'text',
	dropdownBackground: 'grey',
	dropdownBorderColour: 'black',
	itemHoverBackground: 'white',
	background: 'black',
	colour: 'white'
};

export default DesktopMenuItem;
