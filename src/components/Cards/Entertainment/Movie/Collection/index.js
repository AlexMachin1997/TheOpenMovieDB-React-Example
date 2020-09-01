import React from 'react';
import PropTypes from 'prop-types';

import { CollectionContainer, CollectionContentContainer } from './Collection';
import Typography from '../../../../Core/Typography';
import Button from '../../../../Core/Button';

const Collection = ({ title, subtitle, image, onClick }) => (
	<CollectionContainer>
		<CollectionContentContainer image={image}>
			<div>
				<Typography
					type='h2'
					text={`Part of the ${title} Collection`}
					colour='white'
					weight='bolder'
					size='1.2rem'
				/>
			</div>

			<div>
				<Typography type='p' text={subtitle} colour='white' weight='light' size='1rem' />
			</div>

			<div>
				<Button
					transform='uppercase'
					content='View The Collection'
					background='tertiary'
					border='none'
					colour='white'
					isDisabled={false}
					borderRadius='1rem'
					ariaLabel={`View collection button for ${title}`}
					id={`Collection button for ${title}`}
					onClick={onClick}
					type='button'
				/>
			</div>
		</CollectionContentContainer>
	</CollectionContainer>
);

Collection.defaultProps = {
	title: 'The Avengers',
	subtitle: 'Includes The Avengers, Avengers: Age of Ultron, Avengers: Infinity War',
	image: 'https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg',
	onClick: () => false
};

// linear-gradient(to right, rgba(var(--tmdbDarkBlue),1) 0%, rgba(var(--tmdbDarkBlue),0.6) 100%), url('https://image.tmdb.org/t/p/original/zuW6fOiusv4X9nnW3paHGfXcSll.jpg')

Collection.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	onClick: PropTypes.func
};

export default Collection;
