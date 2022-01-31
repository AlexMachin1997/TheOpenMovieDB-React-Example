import * as React from 'react';
import PropTypes from 'prop-types';

import { StyledStar } from './Star';

const selectRatingColour = (isActive) => {
	if (isActive === true) {
		return '#FFD700';
	}

	return '#ededed';
};

const StarComponent = ({ rating, size }) => (
	<div style={{ display: 'flex' }}>
		<StyledStar size={size} colour={selectRatingColour(rating >= 20)} />
		<StyledStar size={size} colour={selectRatingColour(rating >= 40)} />
		<StyledStar size={size} colour={selectRatingColour(rating >= 60)} />
		<StyledStar size={size} colour={selectRatingColour(rating >= 80)} />
		<StyledStar size={size} colour={selectRatingColour(rating >= 100)} />
	</div>
);

StarComponent.defaultProps = {
	rating: 0,
	size: 20
};

StarComponent.propTypes = {
	rating: PropTypes.number,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default StarComponent;
