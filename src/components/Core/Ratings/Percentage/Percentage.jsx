import * as React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Rating = ({ size, strokeWidth, percentage, textClass }) => {
	const radius = (size - strokeWidth) / 2;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - (dashArray * percentage) / 100;

	const generateRatingStrokeColour = () => {
		// Red (Less than 40)
		if (percentage <= 40) {
			return 'stroke-red-500';
		}

		// Yellow (Less than or equal to 50)
		if (percentage <= 50 || percentage < 70) {
			return 'stroke-yellow-300';
		}

		// Green (Greater than or equal to 70)
		if (percentage >= 70) {
			return 'stroke-green-500';
		}
	};

	return (
		<svg
			className='rounded-full bg-[#3d3d3d] p-1 text-white'
			width={size} // Defines the horizontal length of the SVG
			height={size} // Defines the vertical lenght of thr SVG
			viewBox={`${`0 0 ${size} ${size}`}`} // Defines the position and dimension, in user space, of an SVG viewport (min-x, min-y, width and height)
		>
			<circle
				className='fill-[none] stroke-[#767656]'
				cx={size / 2} // Defines the x coordinates of the circle
				cy={size / 2} // Defines the y coordinates of the circle
				r={radius} // Defines the radius of the circle
				strokeWidth={`${strokeWidth}px`} // Defines the width of the storke of the circle (Defined in px's)
			/>
			<circle
				className={classNames(`fill-[none]`, generateRatingStrokeColour())}
				style={{
					strokeLinecap: 'round',
					strokeLinejoin: 'round'
				}}
				cx={size / 2} // Defines the x coordinates of the circle
				cy={size / 2} // Defines the y coordinates of the circle
				r={radius} // Defines the radius of the circle
				strokeWidth={`${strokeWidth}px`} // Defines the width of the storke of the circle (Defined in px's)
				transform={`rotate(-90 ${size / 2} ${size / 2})`} // Enables the circle to start at 12'0 clock
				strokeDasharray={dashArray} // Defines the pattern of dashes and gaps used to paint the outline of the shape
				strokeDashoffset={dashOffset} // Defines the location along an SVG path where the dash of a stroke will begin.
				rating={percentage}
			/>
			<text
				x='50%' // Defines the x coordinate of the starting point of the text baseline.
				y='50%' // Defines the y coordinate of the starting point of the text baseline.
				dy='.3em' // Shifts the text position vertically from a previous text element.
				textAnchor='middle' // Aligns the text
				textClass={textClass}
				className={classNames(textClass, 'font-bold, fill-white')}
			>
				{`${percentage}%`}
			</text>
		</svg>
	);
};

Rating.defaultProps = {
	size: 75,
	strokeWidth: 7,
	percentage: 0,
	textClass: 'text-base'
};

Rating.propTypes = {
	size: PropTypes.number,
	strokeWidth: PropTypes.number,
	percentage: PropTypes.number,
	textClass: PropTypes.string
};

export default Rating;
