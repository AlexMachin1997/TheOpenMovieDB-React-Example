import * as React from 'react';

import classNames from 'classnames';
import { Image } from '~/components/Core';

import generateComponentId from '~/utils/generateComponentId';
import { CardComponentProps } from '~/components/Cards/types';

const Card = ({
	title = '',
	image = '',
	renderLink = null,
	children,
	imageHeight = '265px',
	imageClassName = 'rounded-t-2xl',
	contentClassName = 'p-4',
	containerClassName = 'rounded-2xl border border-solid border-gray-200'
}: CardComponentProps) => {
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

export default Card;
