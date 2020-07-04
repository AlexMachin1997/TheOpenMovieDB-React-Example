import React from 'react';
import PropTypes from 'prop-types';

// import './index.css';

import { CircleBackground, CircleProgress, CircleText } from './Rating';

const Rating = ({ sqSize, strokeWidth, percentage }) => {
	const radius = (sqSize - strokeWidth) / 2;

	const viewBox = `0 0 ${sqSize} ${sqSize}`;

	const dashArray = radius * Math.PI * 2;

	const dashOffset = dashArray - (dashArray * percentage) / 100;

	return (
		<svg width={sqSize} height={sqSize} viewBox={viewBox}>
			<CircleBackground
				className="circle-background"
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
			/>
			<CircleProgress
				className="circle-progress"
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
				// Start progress marker at 12 O'Clock
				transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
				style={{
					strokeDasharray: dashArray,
					strokeDashoffset: dashOffset
				}}
			/>
			<CircleText className="circle-text" x="50%" y="50%" dy=".3em" textAnchor="middle">
				{`${percentage}%`}
			</CircleText>
		</svg>
	);
};

Rating.defaultProps = {
	sqSize: 75,
	strokeWidth: 7,
	percentage: 75
};

Rating.propTypes = {
	sqSize: PropTypes.number,
	strokeWidth: PropTypes.number,
	percentage: PropTypes.number
};

export default Rating;
