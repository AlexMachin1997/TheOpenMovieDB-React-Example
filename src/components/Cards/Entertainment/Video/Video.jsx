import * as React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { Image, Icon } from '../../../Core';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const Video = ({ title, overview, thumbnail, thumbnailAction }) => (
	<div
		id={generateComponentId(title, 'video-card-container')}
		className='relative min-w-[300px] max-w-[300px] p-4'
		onClick={(event) => {
			if (thumbnailAction) {
				thumbnailAction(event);
			}
		}}
		onKeyDown={(event) => {
			if (thumbnailAction) {
				if (event.key === 'Enter') {
					thumbnailAction(event);
				}
			}
		}}
		tabIndex={0}
		role='button'
	>
		<div
			id={generateComponentId(title, 'video-card-container-icon-container')}
			className='w-100 group relative max-w-[300px]'
		>
			<Image
				width='100%'
				height='100%'
				alt={replacesSpacesWith(title, '-')}
				src={thumbnail}
				className='aspect-video group-hover:scale-105'
			/>
			<div className='absolute top-0 left-0 flex h-[100%] w-[100%] items-center justify-center text-white'>
				<Icon className={className('fa-solid fa-play text-3xl group-hover:text-5xl')} />
			</div>
		</div>
		<div className='text-center' id={generateComponentId(title, 'video-card-content')}>
			<h3 className='text-sm font-bold text-black'>{title}</h3>
			<h4 className='text-sm font-light text-black'>{overview}</h4>
		</div>
	</div>
);

Video.defaultProps = {
	title: 'The Umbrella Academy',
	overview: 'The Umbrella Academy Season 2 | Official Trailer | Netflix',
	thumbnail: 'https://image.tmdb.org/t/p/original/mE3zzMkpP8yqlkzdjPsQmJHceoe.jpg',
	thumbnailAction: null
};

Video.propTypes = {
	title: PropTypes.string,
	overview: PropTypes.string,
	thumbnail: PropTypes.string,
	thumbnailAction: PropTypes.func
};

export default Video;
