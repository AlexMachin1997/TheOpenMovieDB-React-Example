import * as React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { Image } from '../Core';

import generateComponentId from '../../utils/generateComponentId';
import { BaseCardProps } from './types';

const Card = ({
	title,
	image,
	renderLink,
	children,
	imageHeight = '265px',
	imageClassName = 'rounded-t-2xl',
	contentClassName = 'p-4',
	containerClassName = 'rounded-2xl border border-solid border-gray-200'
}: BaseCardProps) => {
	const PosterImage = (
		<Image
			width='100%'
			height={imageHeight}
			alt={title}
			src={image}
			className={classNames('aspect-square', imageClassName)}
			label={title}
		/>
	);

	return (
		<div
			className={classNames('flex flex-col bg-white', containerClassName)}
			id={generateComponentId(title, 'poster-card-container')}
		>
			{/* Image for the Poster component */}
			{typeof renderLink === 'function'
				? React.cloneElement(renderLink({ content: PosterImage }))
				: PosterImage}

			{/* Main content for the Poster component, can be pretty much anything */}
			<div
				className={classNames('relative flex flex-col', contentClassName)}
				id={generateComponentId(title, 'poster-card-content')}
			>
				{children}
			</div>
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string,
	image: PropTypes.string,
	renderLink: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
	imageHeight: PropTypes.string,
	imageClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	containerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

Card.defaultProps = {
	title: 'Dark',
	image: 'https://image.tmdb.org/t/p/original/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
	renderLink: null,
	imageHeight: '265px',
	imageClassName: 'rounded-t-2xl',
	contentClassName: 'p-4',
	containerClassName: 'rounded-2xl border border-solid border-gray-200'
};

export default Card;
