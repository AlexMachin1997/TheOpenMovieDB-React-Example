import * as React from 'react';

import '../src/index.scss';

export const decorators = [
	(Story) => (
		<div className='light'>
			<Story />
		</div>
	)
];

export const parameters = {
	a11y: {
		element: '#root',
		config: {},
		options: {},
		manual: true
	}
};
