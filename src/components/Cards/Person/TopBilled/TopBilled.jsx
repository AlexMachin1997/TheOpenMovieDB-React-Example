import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../Core/Image';

import replacesSpacesWith from '../../../../utils/formatters/replaceSpacesWith';
import generateComponentId from '../../../../utils/formatters/generateComponentId';

const TopBilled = ({
	actorName,
	characterName,
	img,
	onClick,
	entertainmentType,
	episodeCount,
	onKeyDown
}) => (
	<div
		onClick={(event) => {
			if (onClick) {
				onClick(event);
			}
		}}
		id={generateComponentId(actorName, 'top-billed-card-container')}
		className='rounded-2xl bg-white border border-solid border-gray-300 cursor-pointer min-w-[200px] max-w-[200px]'
		type='button'
		role='button'
		tabIndex={0}
		onKeyDown={(event) => {
			if (onKeyDown) {
				onKeyDown(event);
			}
		}}
	>
		<Image
			width='100%'
			height='250px'
			alt={replacesSpacesWith(actorName, '-')}
			src={img}
			className='rounded-t-2xl'
		/>

		<div
			className='flex flex-col p-4'
			id={generateComponentId(actorName, 'top-billed-card-content-container')}
		>
			<h3 className='text-base font-bold text-black mb-[0.3rem] hover:text-gray-300'>
				{actorName}
			</h3>
			<p className='text-sm text-black font-light'>{characterName}</p>

			{entertainmentType === 'tv' && (
				<p className='text-sm font-light text-black italic'>{`${episodeCount} ${
					episodeCount === 1 ? 'episode' : 'episodes'
				}`}</p>
			)}
		</div>
	</div>
);

TopBilled.defaultProps = {
	actorName: 'Elizabeth Henstridge',
	characterName: 'Jemma Simmons',
	img: 'https://image.tmdb.org/t/p/original/ohoSW1kYL3GMlFgGWuLEC1IzjmE.jpg',
	onClick: null,
	entertainmentType: 'tv',
	episodeCount: 136
};

TopBilled.propTypes = {
	actorName: PropTypes.string,
	characterName: PropTypes.string,
	img: PropTypes.string,
	onClick: PropTypes.func,
	entertainmentType: PropTypes.string,
	episodeCount: PropTypes.number
};

export default TopBilled;
