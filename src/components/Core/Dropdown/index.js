import React from 'react';
import PropTypes from 'prop-types';

import { DropdownLinks, DropdownContainer, Dropdown } from './Dropdown';

import Typography from '../Typography';

const DesktopMenuItem = ({
	content,
	contentType,
	items,
	linkType,
	dropdownBackground,
	dropdownBorderColour,
	itemHoverBackground,
	background,
	colour,
	dropdownItemColour
}) => {
	let links = null;

	// Internal or external link
	if (items.length !== 0) {
		links = (
			<Dropdown
				dropdownBackground={dropdownBackground}
				dropdownBorderColour={dropdownBorderColour}
				itemHoverBackground={itemHoverBackground}
			>
				{items.map((data, index) => {
					if (linkType === 'internal') {
						return (
							<Typography
								key={index}
								text={data.text}
								weight='lighter'
								colour={dropdownItemColour}
								size='1rem'
								height='2.3rem'
								type='li'
							/>
						);
					}

					return (
						<Typography
							key={index}
							text={data.text}
							href={data.link}
							weight='lighter'
							colour={dropdownItemColour}
							size='1rem'
							height='2.3rem'
							type='a'
						/>
					);
				})}
			</Dropdown>
		);
	}

	return (
		<DropdownContainer tabIndex='0' background={background}>
			{contentType === 'text' ? (
				<Typography text={content} weight='bolder' colour={colour} size='1rem' height='2.3rem' />
			) : (
				content
			)}
			{items.length !== 0 && <DropdownLinks>{links}</DropdownLinks>}
		</DropdownContainer>
	);
};

DesktopMenuItem.propTypes = {
	content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	contentType: PropTypes.string,
	items: PropTypes.array,
	linkType: PropTypes.string,
	dropdownBackground: PropTypes.string,
	dropdownBorderColour: PropTypes.string,
	itemHoverBackground: PropTypes.string,
	background: PropTypes.string,
	colour: PropTypes.string,
	dropdownItemColour: PropTypes.string
};

DesktopMenuItem.defaultProps = {
	content: 'Default Heading',
	contentType: 'text',
	items: [],
	linkType: 'internal',
	dropdownBackground: 'grey',
	dropdownBorderColour: 'black',
	itemHoverBackground: 'white',
	background: 'black',
	colour: 'white',
	dropdownItemColour: '#000'
};

export default DesktopMenuItem;
