import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, ItemLinks } from './SidebarDropdown';
import Typography from '../../../Core/Typography';

const SidebarDropdown = ({ title, children }) => {
	const [showLinks, setShowLinks] = useState(false);

	return (
		<Container onClick={() => setShowLinks(!showLinks)}>
			<Typography text={title} weight='bolder' colour='white' size='1.3rem' height='2.3rem' />
			<ItemLinks display={showLinks}>{children}</ItemLinks>
		</Container>
	);
};

SidebarDropdown.propTypes = {
	title: PropTypes.string,
	children: PropTypes.array
};

SidebarDropdown.defaultProps = {
	title: 'Default Title',
	children: <p>Child item</p>
};

export default SidebarDropdown;
