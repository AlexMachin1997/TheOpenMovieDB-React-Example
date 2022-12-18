import * as React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../Core/Icon/Icon';
import Image from '../../../Core/Image/Image';

const Review = ({
	author: { name = '', username = '', avatarPath = '', rating = null },
	content,
	createdOn,
	isFeatured,
	renderLink
}) => (
	<div className='block rounded-lg border border-solid border-gray-300 p-4 shadow-2xl shadow-gray-200 sm:flex'>
		{/* When the avatarPath is empty the image should be replaced with the first letter of the users "name" otherwise use the avatar */}
		{avatarPath === null || avatarPath === '' ? (
			<h3 className='inline-flex rounded-full bg-gray-400 p-1 px-2 text-2xl uppercase text-black'>
				{name[0] ?? 'N/A'}
			</h3>
		) : (
			<Image
				src={avatarPath}
				className='h-16 w-16 max-w-none rounded-full pr-2'
				width='4rem'
				height='4rem'
				alt={`A photo of ${name}`}
			/>
		)}

		<div>
			{/* If the review is a featured review render the heading */}
			{isFeatured === true && <h4>Featured Review</h4>}

			<div className='flex flex-wrap items-center pb-2'>
				<p className='text-sm font-light'>
					Written by
					{/* Either render a custom link component or fallback to a span */}
					{typeof renderLink === 'function' ? (
						React.cloneElement(renderLink({ content: username }), {
							className: 'mx-1 font-bold'
						})
					) : (
						<span className='mx-1 font-bold'>{username}</span>
					)}
					{createdOn !== null && <span className='mr-1'>on {createdOn}</span>}
				</p>

				{/* When available render the rating or fallback to the empty rating message */}
				{rating !== null ? (
					<span className='flex items-center bg-black px-[0.2rem]'>
						<Icon className='fa-2xs fa-solid fa-star mr-1 text-white' />
						<p className='text-white'>{rating}</p>
					</span>
				) : (
					<span className='bg-black p-1 text-sm text-white'>Not rated</span>
				)}
			</div>

			{/* When available render the content of the review */}
			{content !== null ? (
				<p
					className='whitespace-pre-line text-black'
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: content
					}}
				/>
			) : (
				<p>No review available</p>
			)}
		</div>
	</div>
);
Review.propTypes = {
	author: PropTypes.shape({
		name: PropTypes.string,
		username: PropTypes.string,
		avatarPath: PropTypes.string,
		rating: PropTypes.number
	}),
	content: PropTypes.string,
	createdOn: PropTypes.string,
	isFeatured: PropTypes.bool,
	renderLink: PropTypes.func
};

Review.defaultProps = {
	author: {},
	content: null,
	createdOn: null,
	isFeatured: false,
	renderLink: null
};

export default Review;
