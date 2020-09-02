import React from 'react';
import PropTypes from 'prop-types';

import { DropdownContainer, Dropdown } from './DesktopMenuItem';

import Typography from '../../../Core/Typography';

const DesktopMenuItem = ({ content, items, textColour, headingType, linkType }) => {
	let links = null;

	// Internal or external link
	if (items.length !== 0 && linkType === 'internal') {
		links = (
			<Dropdown>
				{items.map((data, index) => (
					<Typography
						key={index}
						text={data.text}
						weight='400'
						colour={textColour}
						size='1rem'
						height='2.3rem'
						type='li'
					/>
				))}
			</Dropdown>
		);
	}

	if (items.length !== 0 && linkType === 'external') {
		links = (
			<Dropdown>
				{items.map((data, index) => (
					<Typography
						type='a'
						href={data.link}
						key={index}
						text={data.text}
						weight='lighter'
						colour={textColour}
						size='1rem'
						height='2.3rem'
					/>
				))}
			</Dropdown>
		);
	}

	return (
		<>
			<DropdownContainer tabIndex='0'>
				{headingType === 'text' ? (
					<Typography text={content} weight='bolder' colour='white' size='1rem' height='2.3rem' />
				) : (
					content
				)}
				{links}
			</DropdownContainer>
		</>
	);
};

DesktopMenuItem.propTypes = {
	content: PropTypes.string,
	items: PropTypes.array,
	textColour: PropTypes.string,
	headingType: PropTypes.string,
	linkType: PropTypes.string
};

DesktopMenuItem.defaultProps = {
	content: '',
	items: [],
	textColour: '#000',
	headingType: 'text',
	linkType: 'internal'
};

export default DesktopMenuItem;
