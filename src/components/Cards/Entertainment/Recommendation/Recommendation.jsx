import * as React from 'react';
import PropTypes from 'prop-types';

import { Image, Icon } from '../../../Core';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Recommendation = ({ title, releaseDate, image, rating, onClick, onKeyDown }) => (
	<div
		className='min-w-[300px] max-w-[300px] cursor-pointer shadow-xl shadow-gray-200'
		title={title}
	>
		<div
			className='group relative'
			onClick={(event) => {
				if (onClick) {
					onClick(event);
				}
			}}
			type='button'
			tabIndex={0}
			onKeyDown={(event) => {
				if (onKeyDown) {
					onKeyDown(event);
				}
			}}
			role='button'
		>
			<Image
				width='100%'
				height='100%'
				alt={replacesSpacesWith(title, '-')}
				src={image}
				className='rounded-t-2xl'
			/>
			<div className='align-center invisible absolute bottom-0 left-0 flex w-full bg-white p-2 opacity-90 group-hover:visible'>
				<Icon className='fa-solid fa-calendar-days mr-2 text-base' />
				<p className='text-base font-bold text-black'>{releaseDate}</p>
			</div>
		</div>
		<div className='flex items-center justify-between p-2'>
			<p className='text-base text-black'>{title}</p>
			<p className='text-base font-bold text-black'>{rating}%</p>
		</div>
	</div>
);

Recommendation.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	image: PropTypes.string,
	rating: PropTypes.number,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
};

Recommendation.defaultProps = {
	title: 'Ant Man and The Wasp',
	releaseDate: '07/04/2020',
	image: 'https://image.tmdb.org/t/p/original/6P3c80EOm7BodndGBUAJHHsHKrp.jpg',
	rating: 70,
	onClick: null,
	onKeyDown: null
};

export default Recommendation;
