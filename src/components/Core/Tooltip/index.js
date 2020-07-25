import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, TooltipText } from './Tooltip';
import replaceSpacesWith from '../../../utils/formatters/replaceSpacesWith';

const TooltipComponent = ({ content, tooltipText }) => (
	<Tooltip id={replaceSpacesWith(tooltipText, '-').toLowerCase()}>
		<div>{content}</div>
		<TooltipText>{tooltipText}</TooltipText>
	</Tooltip>
);

TooltipComponent.defaultProps = {
	content: 'Tooltip title',
	tooltipText: 'Tooltip content'
};

TooltipComponent.propTypes = {
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	tooltipText: PropTypes.string
};

export default TooltipComponent;
