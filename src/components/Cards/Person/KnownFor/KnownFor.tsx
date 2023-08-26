import * as React from 'react';

import Card from '../../Card';
import { KnownForCardProps } from '../../types';

const KnownFor = ({ title = '', image = '', renderLink = null }: KnownForCardProps) => (
	<Card
		image={image}
		title={title}
		containerClassName='m-4 flex h-full max-w-[135px] min-w-[135px] cursor-pointer flex-col content-center items-center rounded-xl bg-white text-center shadow-gray-200 line-clamp-2'
		imageHeight='195px'
		contentClassName='p-1'
		imageClassName='rounded-2xl'
		renderLink={renderLink}
	>
		{/* Title for the Known For Card */}
		{typeof renderLink === 'function' ? (
			React.cloneElement(renderLink({ content: title }), {
				className: 'text-sm font-light hover:text-secondary'
			})
		) : (
			<h2 className='text-sm font-light hover:text-secondary'>{title}</h2>
		)}
	</Card>
);

export default KnownFor;
