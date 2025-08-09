import * as React from 'react';

import { Image } from '~/components/Core';
import { ReviewCardProps } from '~/components/Cards/types';
import RatingBlock from '~/components/Cards/Entertainment/shared/RatingBlock';

const Review = ({
	author: { name = '', username = '', avatarUrl = null, rating = null } = {},
	content = null,
	createdOn = '',
	isFeatured = false,
	renderLink = null
}: ReviewCardProps) => {
	const AvatarContent = (
		<div>
			{/* When the avatarPathUrl is empty the image should be replaced with the first letter of the users "name" otherwise use the avatar */}
			{avatarUrl === null || avatarUrl === '' ? (
				<span className='flex h-16 w-16 max-w-none items-center justify-center rounded-full bg-gray-400'>
					<h3 className='text-2xl font-bold'>{name[0] ?? 'N/A'}</h3>
				</span>
			) : (
				<Image
					src={avatarUrl}
					className='h-16 w-16 max-w-none rounded-full'
					width='4rem'
					height='4rem'
					alt={`A photo of ${name}`}
					label={`A photo of ${name}`}
				/>
			)}
		</div>
	);

	return (
		<div className='rounded-lg border border-solid border-gray-300 p-4 shadow-2xl shadow-gray-200'>
			<div className='items-center md:flex'>
				{typeof renderLink === 'function'
					? React.cloneElement(renderLink({ content: AvatarContent }))
					: AvatarContent}

				<div className='space-y-2'>
					{isFeatured === true && <h4 className='text-base'>Featured Review</h4>}

					<span className='block gap-4 text-base font-bold sm:flex sm:flex-wrap sm:items-center'>
						{typeof renderLink === 'function'
							? React.cloneElement(
									renderLink({
										content: `A review by ${username}`
									})
							  )
							: `A review by ${username}`}

						<div className='md:ml-1'>
							<RatingBlock rating={rating} />
						</div>
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

export default Review;
