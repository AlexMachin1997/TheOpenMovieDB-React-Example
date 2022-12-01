import * as React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ className }) => <i className={className} />;

Icon.propTypes = {
	className: PropTypes.string
};

Icon.defaultProps = {
	className: ''
};

export default Icon;
