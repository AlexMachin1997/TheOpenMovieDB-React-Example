import * as React from 'react';
import PropTypes from 'prop-types';

const Collection = ({ title, subtitle, image, renderLink }) => (
	<div className='relative flex h-[240px] flex-col items-start justify-center bg-gradient-to-r from-primary/100 to-primary/60 p-4'>
		{/* Tailwind doesn't have built in support for images for gradients, so use the image tag with absolute with z-index set to -1 to put it behind the gradient */}
		<img
			src={image}
			alt={title}
			className='absolute bottom-0 left-0 z-[-1] h-full w-full bg-cover bg-center object-cover'
			loading='lazy'
			height='240px'
			width='100%'
		/>

		{/* Main title for the Collection Card */}
		<h2 className='text-xl font-bold text-white'>Part of the {title} Collection</h2>

		{/* Subtitle for the Collection Card */}
		<h3 className='text-base font-normal text-white'>{subtitle}</h3>

		{/* Clickable action for the Collection Card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(
				renderLink({
					content: 'View Collection'
				}),
				{
					className:
						'mt-4 cursor-pointer rounded-2xl bg-tertiary p-2 text-xs font-bold uppercase text-white'
				}
			)
		) : (
			<div
				className='mt-4 rounded-2xl bg-tertiary p-2 text-xs font-bold uppercase text-white'
				aria-label={`View collection button for ${title}`}
				id={`View collection button for ${title}`}
				type='button'
			>
				View Collection
			</div>
		)}
	</div>
);
Collection.defaultProps = {
	title: '',
	subtitle: '',
	image: '',
	renderLink: null
};

Collection.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	renderLink: PropTypes.func
};

export default Collection;
