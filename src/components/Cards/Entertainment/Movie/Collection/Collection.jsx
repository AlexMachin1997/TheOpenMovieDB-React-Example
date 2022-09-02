import * as React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../../Core';

const Collection = ({ title, subtitle, image, onClick, onKeyDown }) => (
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

		{/* Main heading e.g. Avengers */}
		<h2 className='text-xl font-bold text-white'>Part of the {title} Collection</h2>

		{/* Sub heading eg. Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War */}
		<h3 className='text-base font-normal text-white'>{subtitle}</h3>

		{/* TODO: Replace this with a link prop and link properties so you can add any link components from your framework */}
		{/* The action the Card can perform e.g. navigating to another page like viewing the movie/tv shows collection */}
		<Button
			className='mt-4 cursor-pointer rounded-2xl bg-tertiary p-2 text-xs font-bold uppercase text-white'
			aria-label={`View collection button for ${title}`}
			id={`View collection button for ${title}`}
			onClick={(event) => {
				if (onClick) {
					onClick(event);
				}
			}}
			onKeyDown={onKeyDown}
		>
			View the Collection
		</Button>
	</div>
);
Collection.defaultProps = {
	title: 'The Avengers',
	subtitle: 'Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War',
	image: 'https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg',
	onClick: null,
	onKeyDown: null
};

Collection.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
};

export default Collection;
