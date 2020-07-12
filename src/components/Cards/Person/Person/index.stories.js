import React from 'react';

import Person from './index';
import Preview from '../../../Blocks/Storybook/Preview';
import Column from '../../../Layouts/Column';
import Row from '../../../Layouts/Row';

export const Default = () => <Preview content={<Person />} />;

export const ActorName = () => <Preview content={<Person actorName='Tom Hanks' />} />;

export const ActorImage = () => (
	<Preview
		content={
			<Person actorImage='https://image.tmdb.org/t/p/w235_and_h235_face/sQRntmQpeXiNEyrW323RANWwDeS.jpg' />
		}
	/>
);

export const KnownFor = () => (
	<Preview
		content={
			<Person knownFor={[{ original_title: 'Forrest Gump' }, { original_title: 'Toy Story' }]} />
		}
	/>
);

export const MultipleCards = () => {
	return (
		<Preview
			content={
				<Row>
					<Column autoWidth>
						<Person
							actorName='Tom Hanks'
							actorImage='https://image.tmdb.org/t/p/w235_and_h235_face/sQRntmQpeXiNEyrW323RANWwDeS.jpg'
							knownFor={[
								{ original_title: 'Forrest Gumpy' },
								{ original_title: 'Toy Story' },
								{ original_title: 'The Green Mile' },
							]}
						/>
					</Column>
					<Column autoWidth>
						<Person
							actorName='Scarlett Johansson'
							actorImage='https://image.tmdb.org/t/p/w235_and_h235_face/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg'
							knownFor={[
								{ original_title: 'The Avengers' },
								{ original_title: 'Avengers Infinity War' },
								{ original_title: 'Iron man 2' },
							]}
						/>
					</Column>
				</Row>
			}
		/>
	);
};

export default {
	component: Person,
	title: 'Card - Person',
};
