import * as React from 'react';
import PropTypes from 'prop-types';

import { PersonContainer, ContentContainer } from './Person';
import Image from '../../Core/Image';
import Typography from '../../Core/Typography';

import replacesSpacesWith from '../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../utils/formatters/generateComponentId';

const Person = ({ actorName, actorImage, knownFor }) => (
	<PersonContainer id={generateComponentId(actorName, 'person-card-container')}>
		<Image
			width='235px'
			height='235px'
			alt={replacesSpacesWith(actorName, '-')}
			src={actorImage}
			borderRadius='0'
		/>
		<ContentContainer id={generateComponentId(actorName, 'person-card-content-container')}>
			<Typography type='h2' text={actorName} size='1.1rem' weight={600} height={1} />
			{knownFor.length !== 0 && (
				<Typography
					type='h3'
					text={`${knownFor.map((item) => item.original_title).join(', ')}`}
					size='0.9rem'
					weight={400}
					height={2}
					colour='#C0C0C0'
				/>
			)}
		</ContentContainer>
	</PersonContainer>
);

Person.propTypes = {
	actorName: PropTypes.string,
	actorImage: PropTypes.string,
	knownFor: PropTypes.arrayOf(PropTypes.string)
};

Person.defaultProps = {
	actorName: 'Bryan Cranston',
	actorImage: 'https://image.tmdb.org/t/p/w235_and_h235_face/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg',
	knownFor: [
		{ original_title: 'Saving Private Ryan' },
		{ original_title: 'Drive' },
		{ original_title: 'Godzilla' },
		{ original_title: 'Breaking bad' }
	]
};

export default Person;
