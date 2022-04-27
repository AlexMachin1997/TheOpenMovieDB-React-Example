import * as React from 'react';
import PropTypes from 'prop-types';
import classNameGenerator from 'classnames';

// Tippy dependencies.
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Tooltip = ({ children, tooltip, placement, className, title, ...props }) => (
	<Tippy
		content={tooltip}
		placement={placement}
		className={classNameGenerator('inline-block', className)}
		title={title}
		{...props}
	>
		<div className='inline-flex'>{children}</div>
	</Tippy>
);

Tooltip.defaultProps = {
	placement: 'auto',
	className: ''
};

Tooltip.propTypes = {
	tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number, PropTypes.bool])
		.isRequired,
	children: PropTypes.node.isRequired,
	placement: PropTypes.string,
	className: PropTypes.string,
	title: PropTypes.string.isRequired
};

export default Tooltip;
