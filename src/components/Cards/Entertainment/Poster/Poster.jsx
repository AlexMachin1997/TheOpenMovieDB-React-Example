import * as React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { Image, PercentageRating } from '../../../Core';

import generateComponentId from '../../../../utils/generateComponentId';

const Poster = ({
	title,
	releaseDate,
	rating,
	image,
	linkElement: LinkElement,
	linkElementClassName,
	...props
}) => (
	<LinkElement
		className={classNames(
			'cursor-pointer rounded-2xl bg-white shadow-xl shadow-gray-200',
			linkElementClassName
		)}
		id={generateComponentId(title, 'poster-card-container')}
		{...props}
	>
		<Image
			width='100%'
			height='265px'
			alt={title}
			src={image}
			className='aspect-square rounded-t-2xl'
		/>

		<div
			className='relative flex flex-col p-4'
			id={generateComponentId(title, 'poster-card-content')}
		>
			<div
				className='absolute top-[-29px] left-[8px]'
				id={generateComponentId(title, 'poster-card-rating')}
			>
				<PercentageRating percentage={rating} size={40} strokeWidth={2.5} textSize='0.7rem' />
			</div>
			<div id={generateComponentId(title, 'poster-card-meta')}>
				<h3 className='text-base font-bold text-black'>{title}</h3>
				<p className='text-base font-light text-slate-400'>{releaseDate}</p>
			</div>
		</div>
	</LinkElement>
);

Poster.defaultProps = {
	title: 'Dark',
	releaseDate: 'Dec 01, 2017',
	rating: 50,
	image: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	linkElement: 'a',
	linkElementClassName: ''
};

Poster.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	rating: PropTypes.number,
	image: PropTypes.string,
	linkElement: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]),
	linkElementClassName: PropTypes.string
};

export default Poster;
