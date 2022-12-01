import * as React from 'react';
import PropTypes from 'prop-types';

import { Image } from '../../../Core';

import generateComponentId from '../../../../utils/generateComponentId';

const KnownFor = ({ actorName, actorImage }) => (
	<div
		className='m-4 flex h-full max-w-[150px] cursor-pointer flex-col content-center items-center rounded-xl bg-white text-center shadow-gray-200 line-clamp-2'
		id={generateComponentId(actorName, 'known-for-card')}
	>
		<Image width='100%' height='195px' alt={actorName} src={actorImage} className='rounded-xl' />
		<h2 className='text-sm font-light'>{actorName}</h2>
	</div>
);

KnownFor.defaultProps = {
	actorName: 'Timeless',
	actorImage: 'https://image.tmdb.org/t/p/w150_and_h225_bestv2/wFaS9kROwztTWNxIKBbOLwIgApV.jpg'
};

KnownFor.propTypes = {
	actorName: PropTypes.string,
	actorImage: PropTypes.string
};

export default KnownFor;
