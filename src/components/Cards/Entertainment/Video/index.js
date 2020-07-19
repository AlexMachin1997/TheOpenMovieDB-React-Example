import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Image';
import Heading from '../../../Heading';

import {
	ImageContainer,
	VideoContentContainer,
	PlayIcon,
	PlayIconContainer,
	VideoContainer,
} from './Video';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Video = ({
	entertainmentTitle,
	entertainmentOverview,
	entertainmentImage,
	entertainmentBackdropAction,
	entertainmentVideoAction,
}) => {
	const [hovered, setHovered] = useState(false);

	return (
		<VideoContainer onFocus={entertainmentBackdropAction} onMouseOver={entertainmentBackdropAction}>
			<ImageContainer
				onMouseOver={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onFocus={() => setHovered(true)}
				onClick={entertainmentVideoAction}
			>
				<Image
					width='100%'
					height='100%'
					alt={replacesSpacesWith(entertainmentTitle, '-')}
					src={entertainmentImage}
					borderRadius='1rem'
				/>
				<PlayIconContainer>
					<PlayIcon size={hovered === true ? 50 : 40} />
				</PlayIconContainer>
			</ImageContainer>
			<VideoContentContainer>
				<Heading text={entertainmentTitle} size='1rem' weight='bolder' colour='white' />
				<Heading text={entertainmentOverview} size='1rem' weight='lighter' colour='white' />
			</VideoContentContainer>
		</VideoContainer>
	);
};
Video.defaultProps = {
	entertainmentTitle: 'The Umbrella Academy',
	entertainmentOverview: 'The Umbrella Academy Season 2 | Official Trailer | Netflix',
	entertainmentImage: 'https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg',
	entertainmentBackdropAction: () => false,
	entertainmentVideoAction: () => false,
};

Video.propTypes = {
	entertainmentTitle: PropTypes.string,
	entertainmentOverview: PropTypes.string,
	entertainmentImage: PropTypes.string,
	entertainmentBackdropAction: PropTypes.func,
	entertainmentVideoAction: PropTypes.func,
};

export default Video;
