import React from 'react';
import PropTypes from 'prop-types';

import { Circle, CircleBackground, CircleProgress, CircleText } from './Rating';

const Rating = ({ size, strokeWidth, percentage }) => {
	const radius = (size - strokeWidth) / 2;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - (dashArray * percentage) / 100;

	return (
		<Circle
			width={size} // Defines the horizontal length of the SVG
			height={size} // Defines the vertical lenght of thr SVG
			viewBox={`${`0 0 ${size} ${size}`}`} // Defines the position and dimension, in user space, of an SVG viewport (min-x, min-y, width and height)
		>
			<CircleBackground
				cx={size / 2} // Defines the x coordinates of the circle
				cy={size / 2} // Defines the y coordinates of the circle
				r={radius} // Defines the radius of the circle
				strokeWidth={`${strokeWidth}px`} // Defines the width of the storke of the circle (Defined in px's)
			/>
			<CircleProgress
				cx={size / 2} // Defines the x coordinates of the circle
				cy={size / 2} // Defines the y coordinates of the circle
				r={radius} // Defines the radius of the circle
				strokeWidth={`${strokeWidth}px`} // Defines the width of the storke of the circle (Defined in px's)
				transform={`rotate(-90 ${size / 2} ${size / 2})`} // Enables the circle to start at 12'0 clock
				strokeDasharray={dashArray} // Defines the pattern of dashes and gaps used to paint the outline of the shape
				strokeDashoffset={dashOffset} // Defines the location along an SVG path where the dash of a stroke will begin.
				rating={percentage}
			/>
			<CircleText
				x="50%" // Defines the x coordinate of the starting point of the text baseline.
				y="50%" // Defines the y coordinate of the starting point of the text baseline.
				dy=".3em" // Shifts the text position vertically from a previous text element.
				textAnchor="middle" // Aligns the text
			>
				{`${percentage}%`}
			</CircleText>
		</Circle>
	);
};

Rating.defaultProps = {
	size: 75,
	strokeWidth: 7,
	percentage: 75
};

Rating.propTypes = {
	size: PropTypes.number,
	strokeWidth: PropTypes.number,
	percentage: PropTypes.number
};

export default Rating;
