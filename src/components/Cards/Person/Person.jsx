import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

const Person = ({ name, image, knownFor, renderLink }) => (
	<Card
		image={image}
		title={name}
		containerClassName='h-full max-h-[235px] w-full max-w-[235px] bg-white shadow-xl shadow-gray-200'
		imageHeight='235px'
		contentClassName='py-2 px-3 border border-solid border-gray-200'
		renderLink={renderLink}
		imageClassName=''
	>
		{/* Title for the Person card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(renderLink({ content: name }), {
				className: 'text-base font-bold text-left'
			})
		) : (
			<h3 className='text-base font-bold'>{name}</h3>
		)}

		{/* A list of roles for person is known for, only shows x amount the rest is truncated with ellipse */}
		{knownFor.length !== 0 && (
			<h4 className='truncate text-sm font-light text-slate-500'>{`${knownFor
				.map((item) => item.original_title)
				.join(', ')}`}</h4>
		)}
	</Card>
);

Person.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	knownFor: PropTypes.arrayOf(PropTypes.shape({ original_title: PropTypes.string })),
	renderLink: PropTypes.func
};

Person.defaultProps = {
	name: 'Bryan Cranston',
	image: 'https://image.tmdb.org/t/p/w235_and_h235_face/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg',
	knownFor: [
		{ original_title: 'Saving Private Ryan' },
		{ original_title: 'Drive' },
		{ original_title: 'Godzilla' },
		{ original_title: 'Breaking bad' }
	],
	renderLink: null
};

export default Person;
