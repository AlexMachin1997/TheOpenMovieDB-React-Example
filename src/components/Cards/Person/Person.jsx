import * as React from 'react';
import PropTypes from 'prop-types';

import Image from '../../Core/Image';

import generateComponentId from '../../../utils/formatters/generateComponentId';

const Person = ({ name, image, knownFor }) => (
	<div
		className='bg-white h-100 w-100 cursor-pointer max-w-[235px] max-h-[235px] shadow-xl shadow-gray-200'
		id={generateComponentId(name, 'person-card-container')}
	>
		<Image width='100%' height='100%' alt={name} src={image} />
		<div
			className='p-1 shadow-xl shadow-gray-200'
			id={generateComponentId(name, 'person-card-content-container')}
		>
			<h3 className='text-base font-bold'>{name}</h3>
			{knownFor.length !== 0 && (
				<h4 className='text-sm font-light text-slate-500 truncate'>{`${knownFor
					.map((item) => item.original_title)
					.join(', ')}`}</h4>
			)}
		</div>
	</div>
);

Person.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	knownFor: PropTypes.arrayOf(PropTypes.shape({ original_title: PropTypes.string }))
};

Person.defaultProps = {
	name: 'Bryan Cranston',
	image: 'https://image.tmdb.org/t/p/w235_and_h235_face/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg',
	knownFor: [
		{ original_title: 'Saving Private Ryan' },
		{ original_title: 'Drive' },
		{ original_title: 'Godzilla' },
		{ original_title: 'Breaking bad' }
	]
};

export default Person;
