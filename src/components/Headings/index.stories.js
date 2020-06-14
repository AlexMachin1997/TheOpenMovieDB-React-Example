import React from 'react';

import Heading from './index';

export const Default = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem' }}>
		<Heading />
	</div>
);

export const CustomType = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem' }}>
		<Heading type="h4" />
	</div>
);

export const CustomHeight = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem' }}>
		<Heading height={2} />
	</div>
);

export const CustomFontSize = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem' }}>
		<Heading size="4rem" />
	</div>
);

export const CustomText = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem' }}>
		<Heading text="Popular Movies" />
	</div>
);

export default {
	component: Heading,
	title: 'Headings'
};
