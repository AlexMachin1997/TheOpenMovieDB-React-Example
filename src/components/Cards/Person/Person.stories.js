import * as React from 'react';

import Person from './Person';

export const Default = () => (
	<div className='flex'>
		<Person />
	</div>
);

export const ActorName = () => (
	<div className='flex'>
		<Person name='Tom Hanks' />
	</div>
);

export const ActorImage = () => (
	<div className='flex'>
		<Person image='https://image.tmdb.org/t/p/w235_and_h235_face/sQRntmQpeXiNEyrW323RANWwDeS.jpg' />
	</div>
);

export const KnownFor = () => (
	<div className='flex'>
		<Person knownFor={[{ original_title: 'Forrest Gump' }, { original_title: 'Toy Story' }]} />
	</div>
);

export default {
	component: Person,
	title: 'Design System/Cards/Person/Person'
};
