import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';

const KnownFor = ({ name, image, renderLink }) => (
	<Card
		image={image}
		title={name}
		containerClassName='m-4 flex h-full max-w-[135px] min-w-[135px] cursor-pointer flex-col content-center items-center rounded-xl bg-white text-center shadow-gray-200 line-clamp-2'
		imageHeight='195px'
		contentClassName='p-1'
		imageClassName='rounded-2xl'
		renderLink={renderLink}
	>
		{/* Title for the Known For Card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(renderLink({ content: name }), {
				className: 'text-sm font-light hover:text-secondary'
			})
		) : (
			<h2 className='text-sm font-light hover:text-secondary'>{name}</h2>
		)}
	</Card>
);

KnownFor.defaultProps = {
	name: '',
	image: '',
	renderLink: null
};

KnownFor.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	renderLink: PropTypes.func
};

export default KnownFor;
