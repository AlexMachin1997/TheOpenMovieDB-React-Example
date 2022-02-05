import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';
import Typography from '../../../Core/Typography';
import Rating from '../../../Ratings/Percentage';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Backdrop = ({ title, releaseDate, rating, image, onClick, onKeyDown }) => (
	<div
		id={generateComponentId(title, 'backdrop-card-container')}
		onClick={(event) => {
			if (onClick) {
				onClick(event);
			}
		}}
		role='button'
		tabIndex={0}
		onKeyDown={(event) => {
			if (onKeyDown) {
				onKeyDown(event);
			}
		}}
		className='cursor-pointer m-4 bg-white rounded-lg '
	>
		<Image
			width='100%'
			height='250px'
			alt={replacesSpacesWith(title, '-')}
			src={image}
			borderRadius='0px'
		/>
		<div id={generateComponentId(title, 'backdrop-card-content')} className='flex items-center'>
			<div id={generateComponentId(title, 'backdrop-card-rating')} className='m-2	'>
				<Rating percentage={rating} size={50} strokeWidth={5} textSize='0.9rem' />
			</div>
			<div
				id={generateComponentId(title, 'backdrop-card-information')}
				className='flex items-center'
			>
				<div>
					<Typography type='h1' text={title} size='1.2rem' weight='bolder' />
				</div>
				<div className='m-2'>
					<Typography type='p' size='1rem' text={releaseDate} weight='lighter' colour='#A9A9A9' />
				</div>
			</div>
		</div>
	</div>
);

Backdrop.defaultProps = {
	title: 'Dark',
	releaseDate: 'September 17th, 2020',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg',
	onClick: null,
	onKeyDown: null
};

Backdrop.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	image: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
};

export default Backdrop;
