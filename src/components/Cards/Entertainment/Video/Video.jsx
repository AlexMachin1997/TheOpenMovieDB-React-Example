import * as React from 'react';
import PropTypes from 'prop-types';

import { Play } from 'styled-icons/fa-solid';

import Image from '../../../Core/Image';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Video = ({ title, overview, thumbnail, thumbnailContainerAction, thumbnailAction }) => {
	const [hovered, setHovered] = React.useState(false);

	return (
		<div
			id={generateComponentId(title, 'video-card-container')}
			onFocus={thumbnailContainerAction}
			onMouseOver={thumbnailContainerAction}
			className='relative min-w-[300px] max-w-[300px] p-4'
		>
			<div
				id={generateComponentId(title, 'video-card-container-icon-container')}
				onMouseOver={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onFocus={() => setHovered(true)}
				onClick={thumbnailAction}
				className='w-100 max-w-[300px] relative group'
				onKeyDown={() => {}}
				tabIndex={0}
				role='button'
			>
				<Image
					width='100%'
					height='100%'
					alt={replacesSpacesWith(title, '-')}
					src={thumbnail}
					className='group-hover:scale-105'
				/>
				<div className='w-[100%] h-[100%] absolute top-0 left-0 flex justify-center items-center text-white'>
					<Play size={hovered === true ? 50 : 40} />
				</div>
			</div>
			<div className='text-center' id={generateComponentId(title, 'video-card-content')}>
				<h3 className='text-sm text-black font-bold'>{title}</h3>
				<h4 className='text-sm text-black font-light'>{overview}</h4>
			</div>
		</div>
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
