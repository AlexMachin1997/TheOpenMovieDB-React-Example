import React from 'react';
import PropTypes from 'prop-types';

import { Facts, Certification, Genres, Runtime, ReleaseDate } from './MetaData';
import Icon from '../../../Core/Icon';

const MetaData = ({ ageRating, releaseDate, genres, runtime }) => (
	<Facts>
		<Certification>{ageRating}</Certification>
		<ReleaseDate>{releaseDate}</ReleaseDate>
		<Genres>{genres}</Genres>
		<Runtime>
			<Icon icon='Time' size={20} colour='white' />
			{runtime}
		</Runtime>
	</Facts>
);

MetaData.defaultProps = {
	ageRating: 'R',
	releaseDate: '29/09/2020',
	genres: '',
	runtime: '1hr 0min'
};

MetaData.propTypes = {
	ageRating: PropTypes.string,
	releaseDate: PropTypes.string,
	genres: PropTypes.string,
	runtime: PropTypes.string
};

export default MetaData;
