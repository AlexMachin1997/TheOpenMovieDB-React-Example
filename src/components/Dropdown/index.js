import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { DropdownContainer, Dropdown, ContentContainer } from './Dropdown';

import Typography from '../Core/Typography';

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

	const [isItemVisible, setIsItemVisible] = useState(false);

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
								weight='400'
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
		<DropdownContainer
			tabIndex='0'
			onMouseLeave={() => setIsItemVisible(false)}
			background={background}
		>
			{contentType === 'text' ? (
				<ContentContainer
					onClick={() => setIsItemVisible(!isItemVisible)}
					onMouseEnter={() => setIsItemVisible(!isItemVisible)}
					onFocus={() => setIsItemVisible(!isItemVisible)}
				>
					<Typography text={content} weight='bolder' colour={colour} size='1rem' height='2.3rem' />
				</ContentContainer>
			) : (
				content
			)}
			{isItemVisible === true && links}
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
