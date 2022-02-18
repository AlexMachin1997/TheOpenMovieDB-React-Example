import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';
import Icon from '../../../Core/Icon/Icon';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Recommendation = ({ title, releaseDate, image, rating, onClick, onKeyDown }) => (
	<div className='cursor-pointer max-w-[300px] min-w-[300px]' title={title}>
		<div
			className='relative group'
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
				className='rounded-2xl'
			/>
			<div className='group-hover:visible invisible absolute bottom-0 left-0 w-full flex align-center bg-white p-2 opacity-90'>
				<Icon className='fa-solid fa-calendar-days text-base mr-2' />
				<p className='text-base text-black font-light'>{releaseDate}</p>
			</div>
		</div>
		<div className='flex items-center justify-between'>
			<p className='text-base text-black'>{title}</p>
			<p className='text-base text-black'>{rating}%</p>
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
