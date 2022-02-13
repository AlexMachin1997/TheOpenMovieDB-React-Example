import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const KnownFor = ({ actorName, actorImage }) => (
	<div
		className='rounded-xl bg-white m-4 h-full cursor-pointer flex flex-col items-center content-center text-center'
		id={generateComponentId(actorName, 'known-for-card')}
	>
		<Image
			width='100%'
			height='195px'
			alt={replacesSpacesWith(actorName, '-')}
			src={actorImage}
			className='rounded-xl'
		/>
		<h2 className='text-sm font-bold'>{actorName}</h2>
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
