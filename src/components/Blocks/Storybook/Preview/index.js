import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './Preview';

const Preview = ({ content, background }) => (
	<Container background={background}>{content}</Container>
);

Preview.defaultProps = {
	content: <p>Child element</p>,
	background: '#f0f2f5',
};

Preview.propTypes = {
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	background: PropTypes.string,
};

export default Preview;
