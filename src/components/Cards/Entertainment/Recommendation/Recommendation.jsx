import * as React from 'react';
import PropTypes from 'prop-types';

import { Image, Icon } from '../../../Core';

const Recommendation = ({ title, releaseDate, image, rating, renderLink }) => {
	const linkContent = (
		<>
			<Image
				width='250px'
				height='141px'
				alt={title}
				src={image}
				className='aspect-square rounded-2xl'
			/>
			<div className='invisible absolute bottom-0 left-0 flex w-full items-center bg-white p-2 opacity-90 group-hover:visible'>
				<Icon className='fa-solid fa-calendar-days mr-2 text-base' />
				<p className='text-base font-bold text-black'>{releaseDate}</p>
			</div>
		</>
	);

	return (
		<div className='min-w-[250px] max-w-[250px] cursor-pointer' title={title}>
			{/* Either use the renderLink render prop or it defaults to just a span element */}
			{typeof renderLink === 'function' ? (
				React.cloneElement(renderLink({ content: linkContent }), { className: 'group relative' })
			) : (
				<span className='group relative'>{linkContent}</span>
			)}
			<div className='flex items-center justify-between px-2 pb-1'>
				<p className='text-base text-black line-clamp-1'>{title}</p>
				<p className='text-base text-black'>{rating}%</p>
			</div>
		</div>
	);
};

Recommendation.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	image: PropTypes.string,
	rating: PropTypes.number,
	renderLink: PropTypes.func
};

Recommendation.defaultProps = {
	title: '',
	releaseDate: '',
	image: '',
	rating: 0,
	renderLink: null
};

export default Recommendation;
