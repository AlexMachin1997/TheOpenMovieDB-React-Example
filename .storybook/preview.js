import * as React from 'react';

import '../src/index.scss';

document.body.classList.add('light');

document.body.classList.add('scrollbar');

export const decorators = [
	(Story) => {
		return (
			<div className='light'>
				<Story />
			</div>
		);
	}
];

export const parameters = {
	a11y: {
		element: '#root',
		config: {},
		options: {},
		manual: true
	}
};
