import * as React from 'react';
import PropTypes from 'prop-types';

import { KnownForContainer, ContentContainer } from './KnownFor';
import Typography from '../../../Core/Typography';
import Image from '../../../Core/Image';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const KnownFor = ({ actorName, actorImage }) => (
	<KnownForContainer id={generateComponentId(actorName, 'knownfor-card-container')}>
		<Image
			width='100%'
			height='195px'
			alt={replacesSpacesWith(actorName, '-')}
			src={actorImage}
			borderRadius='1rem'
		/>
		<ContentContainer id={generateComponentId(actorName, 'knownfor-card-content')}>
			<Typography type='h2' text={actorName} size='0.8rem' weight='bolder' />
		</ContentContainer>
	</KnownForContainer>
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
