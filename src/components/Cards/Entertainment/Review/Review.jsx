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
}) => {
	const AvatarContent = (
		<div className='mx-1'>
			{/* When the avatarPath is empty the image should be replaced with the first letter of the users "name" otherwise use the avatar */}
			{avatarPath === null || avatarPath === '' ? (
				<h3 className='mr-2 rounded-full bg-gray-400 p-1 px-2 text-center text-2xl uppercase text-black'>
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
		</div>
	);

	return (
		<div className='rounded-lg border border-solid border-gray-300 p-4 shadow-2xl shadow-gray-200'>
			<div className='items-center md:flex'>
				<div className='w-16'>
					{typeof renderLink === 'function'
						? React.cloneElement(renderLink({ content: AvatarContent }))
						: AvatarContent}
				</div>

				<div className='space-y-2'>
					{isFeatured === true && <h4 className='text-base'>Featured Review</h4>}

					<span className='block text-base font-bold sm:flex sm:flex-wrap sm:items-center'>
						{typeof renderLink === 'function'
							? React.cloneElement(
									renderLink({
										content: `A review by ${username}`
									})
							  )
							: `A review by ${username}`}

						{rating !== null ? (
							<span className='ml-1 inline-flex items-center bg-black px-2 text-white md:ml-4'>
								<Icon className='fa-xs fa-solid fa-star mr-1' />
								<p>{rating}</p>
							</span>
						) : (
							<span className='ml-1 inline-flex items-center bg-black px-2 md:ml-4'>Not rated</span>
						)}
					</span>

					<span className='inline-flex flex-wrap items-center text-sm font-light'>
						<span className='mr-1'>Written by</span>
						{typeof renderLink === 'function' ? (
							React.cloneElement(renderLink({ content: username }), {
								className: 'font-bold mr-1'
							})
						) : (
							<p className='mr-1 font-bold'>{username}</p>
						)}
						{createdOn !== null && <span className='mr-1'>on {createdOn}</span>}
					</span>
				</div>
			</div>

			<div className='mt-5 md:pl-16'>
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
};

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
