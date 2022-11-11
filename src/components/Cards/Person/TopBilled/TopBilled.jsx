import * as React from 'react';
import PropTypes from 'prop-types';

import { Image } from '../../../Core';

import generateComponentId from '../../../../utils/generateComponentId';

const TopBilled = ({
	actorName,
	characterName,
	actorImage,
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
		className='min-w-[200px] max-w-[200px] cursor-pointer rounded-2xl border border-solid border-gray-300 bg-white shadow-xl shadow-gray-200'
		type='button'
		role='button'
		tabIndex={0}
		onKeyDown={(event) => {
			if (onKeyDown) {
				if (event.key === 'Enter') {
					onKeyDown(event);
				}
			}
		}}
	>
		<Image width='100%' height='250px' alt={actorName} src={actorImage} className='rounded-t-2xl' />

		<div
			className='flex flex-col p-4'
			id={generateComponentId(actorName, 'top-billed-card-content-container')}
		>
			<h3 className='mb-[0.3rem] text-base font-bold text-black hover:text-gray-300'>
				{actorName}
			</h3>
			<p className='text-sm font-light text-black'>{characterName}</p>

			{entertainmentType === 'tv' && (
				<p className='text-sm font-light italic text-black'>{`${episodeCount} ${
					episodeCount === 1 ? 'episode' : 'episodes'
				}`}</p>
			)}
		</div>
	</div>
);

TopBilled.defaultProps = {
	actorName: 'Elizabeth Henstridge',
	characterName: 'Jemma Simmons',
	actorImage: 'https://image.tmdb.org/t/p/original/ohoSW1kYL3GMlFgGWuLEC1IzjmE.jpg',
	onClick: null,
	onKeyDown: null,
	entertainmentType: 'tv',
	episodeCount: 136
};

TopBilled.propTypes = {
	actorName: PropTypes.string,
	characterName: PropTypes.string,
	actorImage: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
	entertainmentType: PropTypes.string,
	episodeCount: PropTypes.number
};

export default TopBilled;
