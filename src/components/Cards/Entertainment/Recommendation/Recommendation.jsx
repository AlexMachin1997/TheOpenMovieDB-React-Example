import * as React from 'react';
import PropTypes from 'prop-types';

import { Calendar } from 'styled-icons/boxicons-regular';

import Image from '../../../Core/Image';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Recommendation = ({ title, releaseDate, image, rating }) => (
	<div className='cursor-pointer max-w-[300px] min-w-[300px] p-4'>
		<div className='relative group'>
			<Image
				width='100%'
				height='100%'
				alt={replacesSpacesWith(title, '-')}
				src={image}
				className='rounded-2xl'
			/>
			<div className='group-hover:visible invisible absolute bottom-0 left-0 w-full flex align-center bg-white p-2 opacity-90'>
				<div className='mr-2'>
					<Calendar size='20' />
				</div>
				<p className='text-sm text-black font-bold'>{releaseDate}</p>
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
	rating: PropTypes.number
};

Recommendation.defaultProps = {
	title: 'Ant Man and The Wasp',
	releaseDate: '07/04/2020',
	image: 'https://image.tmdb.org/t/p/original/6P3c80EOm7BodndGBUAJHHsHKrp.jpg',
	rating: 70
};

export default Recommendation;
