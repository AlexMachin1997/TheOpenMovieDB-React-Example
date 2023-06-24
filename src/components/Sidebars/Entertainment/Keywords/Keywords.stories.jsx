import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Keywords from './Keywords';

export const Default = {
	args: {
		keywords: [
			{ name: 'Egypt', id: 1 },
			{ name: 'Comic', id: 2 },
			{ name: 'Based On Comic', id: 3 },
			{
				name: 'Gods',
				id: 4
			},
			{
				name: 'Marvel Cinematic Universe (mcu)',
				id: 5
			},
			{
				name: 'Dissociative Identity Disorder',
				id: 6
			}
		]
	}
};

export const MediaType = {
	args: {
		keywords: [
			{ name: 'New York City', id: 1 },
			{ name: 'Corruption', id: 2 },
			{ name: 'Secret Identity', id: 3 },
			{
				name: 'Superhero',
				id: 4
			},
			{
				name: 'Basic On Comic',
				id: 5
			},
			{ name: 'Vigilante', id: 6 },
			{
				name: 'Lawyer',
				id: 7
			},
			{
				name: 'Blind',
				id: 8
			},
			{
				name: 'Marvel Cinematic Universe (mcu)',
				id: 9
			}
		],
		mediaType: 'tv'
	}
};

export default {
	component: Keywords,
	title: 'Design System/Sidebars/Entertainment/Keywords',
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};
