import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../../Heading';
import Paragraph from '../../../Paragraph';
import Image from '../../../Image';

import { TopBilledContainer, ContentContainer } from './TopBilled';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const TopBilled = ({ actorName, characterName, img, onClick, entertainmentType, episodeCount }) => (
	<TopBilledContainer
		onClick={onClick}
		id={generateComponentId(actorName, 'topbilled-card-container')}
	>
		<Image
			width='100%'
			height='200px'
			alt={replacesSpacesWith(actorName, '-')}
			src={img}
			borderRadius='0.5rem 0.5rem 0 0'
		/>

		<ContentContainer id={generateComponentId(actorName, 'topbilled-card-content-container')}>
			<Heading entertainmentType='h1' text={actorName} size='1rem' weight='bold' />
			<Paragraph size='0.8rem' text={characterName} weight='lighter' colour='black' />
			{entertainmentType === 'tv' && (
				<Paragraph
					size='0.8rem'
					text={`${episodeCount} episodes`}
					weight='lighter'
					colour='#C0C0C0'
				/>
			)}
		</ContentContainer>
	</TopBilledContainer>
);

TopBilled.defaultProps = {
	actorName: 'Elizabeth Henstridge',
	characterName: 'Jemma Simmons',
	img: 'https://image.tmdb.org/t/p/original/ohoSW1kYL3GMlFgGWuLEC1IzjmE.jpg',
	onClick: () => false,
	entertainmentType: 'tv',
	episodeCount: 136,
};

TopBilled.propTypes = {
	actorName: PropTypes.string,
	characterName: PropTypes.string,
	img: PropTypes.string,
	onClick: PropTypes.func,
	entertainmentType: PropTypes.string,
	episodeCount: PropTypes.number,
};

export default TopBilled;
