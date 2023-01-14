import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';

const TopBilledCastMember = ({
	name,
	character,
	image,
	entertainmentType,
	episodeCount,
	renderLink
}) => (
	<Card
		image={image}
		title={name}
		renderLink={renderLink}
		imageHeight='175px'
		containerClassName='pb-2 min-w-[138px] max-w-[138px] mt-[0.625rem] mb-[0.625rem] ml-[0.625rem] mr-[0.25rem] pb-[0.625rem]'
		contentClassName='p-0 border border-solid border-gray-200 rounded-b-2xl pb-2 flex flex-1'
		imageClassName='rounded-t-lg'
	>
		{/* Title for the Top Billed Card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(renderLink({ content: name }), {
				className:
					'px-[0.625rem] pt-[0.625rem] text-base font-bold text-black hover:text-gray-500 text-left'
			})
		) : (
			<h3 className='px-[0.625rem] pt-[0.625rem] text-base font-bold text-black hover:text-gray-500'>
				{name}
			</h3>
		)}

		{/* Character Information for the Top Billed Card */}
		<p className='px-[0.625rem] text-[0.9rem] font-light text-black'>{character}</p>

		{/* When viewing a tv series show the episode count for the top billed cast member */}
		{entertainmentType === 'tv' && (
			<p className='px-[0.625rem] pb-[0.625rem] text-sm font-light italic text-black'>{`${episodeCount} ${
				episodeCount === 1 ? 'episode' : 'episodes'
			}`}</p>
		)}
	</Card>
);

TopBilledCastMember.defaultProps = {
	name: '',
	character: '',
	image: '',
	entertainmentType: 'movie',
	episodeCount: 0,
	renderLink: null
};

TopBilledCastMember.propTypes = {
	name: PropTypes.string,
	character: PropTypes.string,
	image: PropTypes.string,
	entertainmentType: PropTypes.string,
	episodeCount: PropTypes.number,
	renderLink: PropTypes.func
};

export default TopBilledCastMember;
