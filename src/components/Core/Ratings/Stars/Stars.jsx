import * as React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import Icon from '../../Icon/Icon';

const StarRating = ({ rating }) => (
	<div className='flex'>
		<Icon
			className={className('fa-solid fa-star text-gray-200', { 'text-yellow-200': rating >= 20 })}
		/>
		<Icon
			className={className('fa-solid fa-star text-gray-200', { 'text-yellow-200': rating >= 40 })}
		/>
		<Icon
			className={className('fa-solid fa-star text-gray-200', { 'text-yellow-200': rating >= 60 })}
		/>
		<Icon
			className={className('fa-solid fa-star text-gray-200', { 'text-yellow-200': rating >= 80 })}
		/>
		<Icon
			className={className('fa-solid fa-star text-gray-200', { 'text-yellow-200': rating >= 100 })}
		/>
	</div>
);

StarRating.defaultProps = {
	rating: 0
};

StarRating.propTypes = {
	rating: PropTypes.number
};

export default StarRating;
