import * as React from 'react';

import { Formik } from 'formik';

import Filters from './Filters';

const ControlledStoryTemplate = (args) => (
	<Formik
		initialValues={{
			show_me: '0',
			with_ott_monetization_types: ['all'],
			with_genres: ['28'],
			certification: ['NR'],
			with_release_type: ['all'],
			'release_date.lte': '',
			'release_date.gte': '',
			'air_date.lte': '',
			'air_date.gte': '',
			with_original_language: 'none',
			region: 'US',
			'vote_average.gte': 0,
			'vote_average.lte': 10,
			'vote_count.gte': 500,
			'with_runtime.gte': 0,
			'with_runtime.lte': 400,
			// eslint-disable-next-line react/destructuring-assignment
			search_first_air_date: args.movieType === 'tv'
		}}
		enableReinitialize
	>
		<div style={{ maxWidth: '300px' }}>
			<Filters {...args} />
		</div>
	</Formik>
);

export const DefaultFiltersSidebar = ControlledStoryTemplate.bind({});
DefaultFiltersSidebar.args = {
	mediaType: 'movie'
};

export const TVFiltersSidebar = ControlledStoryTemplate.bind({});
TVFiltersSidebar.args = {
	mediaType: 'tv'
};

export const AuthenticatedFiltersSidebar = ControlledStoryTemplate.bind({});
AuthenticatedFiltersSidebar.args = {
	isAuthenticated: true,
	mediaType: 'movie'
};

export default {
	component: Filters,
	title: 'Design System/Forms/Filtering/Filters'
};
