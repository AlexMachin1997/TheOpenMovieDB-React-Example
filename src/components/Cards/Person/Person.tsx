import * as React from 'react';

import Card from '../Card';
import { PersonCardProps } from '../types';

const Person = ({ name = '', image = '', knownFor = [], renderLink = null }: PersonCardProps) => (
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
				className: 'text-base font-bold hover:text-gray-500 text-left'
			})
		) : (
			<h3 className='text-left text-base font-bold hover:text-gray-500'>{name}</h3>
		)}

		{/* A list of roles for person is known for, only shows x amount the rest is truncated with ellipse */}
		{knownFor.length !== 0 ? (
			<h4 className='truncate text-sm font-light text-slate-500'>{`${knownFor
				.map((item) => item.original_title)
				.join(', ')}`}</h4>
		) : (
			<h4 className='truncate text-sm font-light text-slate-500'>No roles available</h4>
		)}
	</Card>
);

export default Person;
