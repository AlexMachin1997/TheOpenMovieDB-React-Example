import * as React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, Icon } from '../../../Core';

const FilterTitle = ({ title, tooltip }) => (
	<div className='mb-2 flex justify-between'>
		<span className='font-light'>{title}</span>

		<Tooltip tooltip={tooltip} placement='top' title={title}>
			<Icon className='fa-solid fa-circle-question' />
		</Tooltip>
	</div>
);

FilterTitle.propTypes = {
	title: PropTypes.string.isRequired,
	tooltip: PropTypes.string.isRequired
};

export default FilterTitle;
