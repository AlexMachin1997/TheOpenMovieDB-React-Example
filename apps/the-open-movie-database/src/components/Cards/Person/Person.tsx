import * as React from 'react';

import { PersonCard, type PersonCardProps } from '~/components/Cards';

const Person = ({ title = '', image = '', subtitle = '', renderLink = null }: PersonCardProps) => (
	<Card
		image={image}
		title={title}
		containerClassName='h-full max-h-[235px] w-full max-w-[235px] bg-white shadow-xl shadow-gray-200'
		imageHeight='235px'
		contentClassName='py-2 px-3 border border-solid border-gray-200'
		renderLink={renderLink}
		imageClassName=''
	>
		{/* Title for the Person card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(renderLink({ content: title }), {
				className: 'text-base font-bold hover:text-gray-500 text-left'
			})
		) : (
			<h3 className='text-left text-base font-bold hover:text-gray-500'>{title}</h3>
		)}

		{/* A list of roles for person is known for, only shows x amount the rest is truncated with ellipse */}
		{subtitle.length !== 0 ? (
			<h4 className='truncate text-sm font-light text-slate-500'>{subtitle}</h4>
		) : (
			<h4 className='truncate text-sm font-light text-slate-500'>No roles available</h4>
		)}
	</Card>
);

export default Person;
