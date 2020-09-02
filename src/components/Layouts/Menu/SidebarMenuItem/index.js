import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, InternalLinks, ExternalLinks } from './SidebarDropdown';
import Typography from '../../../Core/Typography';

/*

TODO LIST:

1) Replace the internal


*/
const SidebarMenuItem = ({ title, items, textColour, contentType, onItemClick, display }) => {
	let links = null;

	// Internal or external links
	if (items.length !== 0 && contentType === 'internal') {
		links = (
			<InternalLinks display={display}>
				{items.map((data, index) => (
					<Typography
						key={index}
						text={data.text}
						weight='lighter'
						colour={textColour}
						size='1rem'
						height='2.3rem'
						type='p'
					/>
				))}
			</InternalLinks>
		);
	}

	if (items.length !== 0 && contentType === 'external') {
		links = (
			<ExternalLinks>
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
			</ExternalLinks>
		);
	}

	return (
		<Container onClick={onItemClick}>
			{title.length !== 0 && (
				<Typography text={title} weight='bolder' colour='white' size='1.3rem' height='2.3rem' />
			)}
			{links}
		</Container>
	);
};

SidebarMenuItem.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
	textColour: PropTypes.string,
	contentType: PropTypes.string,
	onItemClick: PropTypes.func,
	display: PropTypes.bool
};

SidebarMenuItem.defaultProps = {
	title: '',
	items: [],
	textColour: 'white',
	contentType: 'internal',
	onItemClick: () => false,
	display: false
};

export default SidebarMenuItem;
