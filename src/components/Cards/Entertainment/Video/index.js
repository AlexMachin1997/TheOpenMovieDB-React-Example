import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';
import Typography from '../../../Core/Typography';

import {
	ImageContainer,
	VideoContentContainer,
	PlayIcon,
	PlayIconContainer,
	VideoContainer
} from './Video';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Video = ({ title, overview, thumbnail, thumbnailContainerAction, thumbnailAction }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<VideoContainer
			id={generateComponentId(title, 'video-card-container')}
			onFocus={thumbnailContainerAction}
			onMouseOver={thumbnailContainerAction}
		>
			<ImageContainer
				id={generateComponentId(title, 'video-card-container-icon-container')}
				onMouseOver={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onFocus={() => setHovered(true)}
				onClick={thumbnailAction}
			>
				<Image
					width='100%'
					height='100%'
					alt={replacesSpacesWith(title, '-')}
					src={thumbnail}
					borderRadius='1rem'
				/>
				<PlayIconContainer>
					<PlayIcon size={hovered === true ? 50 : 40} />
				</PlayIconContainer>
			</ImageContainer>
			<VideoContentContainer id={generateComponentId(title, 'video-card-content')}>
				<Typography type='h2' text={title} size='1rem' weight='bolder' colour='white' />
				<Typography type='h3' text={overview} size='1rem' weight='lighter' colour='white' />
			</VideoContentContainer>
		</VideoContainer>
	);
};
Video.defaultProps = {
	title: 'The Umbrella Academy',
	overview: 'The Umbrella Academy Season 2 | Official Trailer | Netflix',
	thumbnail: 'https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg',
	thumbnailContainerAction: () => false,
	thumbnailAction: () => false
};

Video.propTypes = {
	title: PropTypes.string,
	overview: PropTypes.string,
	thumbnail: PropTypes.string,
	thumbnailContainerAction: PropTypes.func,
	thumbnailAction: PropTypes.func
};

export default Video;
