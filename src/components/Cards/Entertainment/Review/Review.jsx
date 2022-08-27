import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../../../Core/Icon/Icon';
import Image from '../../../Core/Image/Image';

const Review = ({
	author: { name = '', username = '', avatarPath = '', rating = null },
	content,
	createdOn,
	isFeatured
}) => (
	<div className='block rounded-lg border border-solid border-gray-300 p-4 shadow-2xl shadow-gray-200 sm:flex'>
		<div className='pr-2'>
			{avatarPath === null || avatarPath === '' ? (
				<p className='inline-flex rounded-full bg-gray-400 p-1 pl-2 pr-2 text-2xl uppercase text-black'>
					{name[0] ?? 'N/A'}
				</p>
			) : (
				<Image
					src={avatarPath}
					className='h-16 w-16 max-w-none rounded-full'
					width='4rem'
					height='4rem'
					alt={`A photo of ${name}`}
				/>
			)}
		</div>

		<div>
			{isFeatured === true && <h4>Featured Review</h4>}
			<div className='flex flex-wrap items-center pb-2'>
				<span className='text-sm font-light'>
					Written by
					<Link to={`/${username}`} className='mr-1 ml-1 font-bold'>
						{username}
					</Link>
					{createdOn !== null && <span className='mr-1'>on {createdOn}</span>}
				</span>

				{rating !== null ? (
					<span className='bg-black p-1 text-white'>
						<Icon className='fa-2xs fa-solid fa-star mr-1 text-white' />
						{rating}
					</span>
				) : (
					<p className='bg-black p-1 text-sm text-white'>Not rated</p>
				)}
			</div>

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
	isFeatured: PropTypes.bool
};

Review.defaultProps = {
	author: {},
	content: null,
	createdOn: null,
	isFeatured: false
};

export default Review;
