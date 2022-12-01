import * as React from 'react';
import PropTypes from 'prop-types';

import { Image } from '../../Core';

import generateComponentId from '../../../utils/generateComponentId';

const Person = ({ name, image, knownFor, onKeyDown, onClick }) => (
	<div
		className='h-full max-h-[235px] w-full max-w-[235px] cursor-pointer bg-white shadow-xl shadow-gray-200'
		id={generateComponentId(name, 'person-card-container')}
		type='button'
		role='button'
		tabIndex={0}
		onClick={(event) => {
			if (onClick) {
				onClick(event);
			}
		}}
		onKeyDown={(event) => {
			if (onKeyDown) {
				if (event.key === 'Enter') {
					onKeyDown(event);
				}
			}
		}}
	>
		<Image width='100%' height='100%' alt={name} src={image} className='aspect-square' />
		<div
			className='p-1 shadow-xl shadow-gray-200'
			id={generateComponentId(name, 'person-card-content-container')}
		>
			<h3 className='text-base font-bold'>{name}</h3>
			{knownFor.length !== 0 && (
				<h4 className='truncate text-sm font-light text-slate-500'>{`${knownFor
					.map((item) => item.original_title)
					.join(', ')}`}</h4>
			)}
		</div>
	</div>
);

Person.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	knownFor: PropTypes.arrayOf(PropTypes.shape({ original_title: PropTypes.string })),
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func
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
	onClick: null,
	onKeyDown: null
};

export default Person;
