import * as React from 'react';
import classNames from 'classnames';

type Props = {
	size?: number;
	strokeWidth?: number;
	percentage?: number;
	textClass?: string;
};

const Rating = ({ size = 75, strokeWidth = 7, percentage = 0, textClass = 'text-lg' }: Props) => {
	const radius = (size - strokeWidth) / 2;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - (dashArray * percentage) / 100;

	const circleClassName = React.useMemo(() => {
		// No rating grey circle
		if (percentage === 0) return 'stroke-gray-500';

		// The rating is low red circle
		if (percentage <= 40) return 'stroke-red-500';

		// The rating is medium yellow circle
		if (percentage <= 50 || percentage < 70) return 'stroke-yellow-300';

		// None of the above are met then assume it's green
		return 'stroke-green-500';
	}, [percentage]);

	return (
		<svg
			className='rounded-full bg-[#3d3d3d] p-1 text-white'
			width={size} // Defines the horizontal length of the SVG
			height={size} // Defines the vertical length of thr SVG
			viewBox={`${`0 0 ${size} ${size}`}`} // Defines the position and dimension, in user space, of an SVG viewport (min-x, min-y, width and height)
		>
			<circle
				className='fill-none stroke-[#767656]'
				cx={size / 2} // Defines the x coordinates of the circle
				cy={size / 2} // Defines the y coordinates of the circle
				r={radius} // Defines the radius of the circle
				strokeWidth={`${strokeWidth}px`} // Defines the width of the storke of the circle (Defined in px's)
			/>
			<circle
				className={classNames(`fill-none`, circleClassName)}
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
			/>
			<text
				x='50%' // Defines the x coordinate of the starting point of the text baseline.
				y='50%' // Defines the y coordinate of the starting point of the text baseline.
				dy='.3em' // Shifts the text position vertically from a previous text element.
				textAnchor='middle' // Aligns the text
				className={classNames(textClass, 'fill-white font-bold')}
			>
				{percentage !== 0 ? `${percentage}%` : 'NR'}
			</text>
		</svg>
	);
};

export default Rating;
