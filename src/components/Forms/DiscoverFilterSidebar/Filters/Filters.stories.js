import * as React from 'react';

import { Formik } from 'formik';

import Filters from './Filters';

const ControlledStoryTemplate = () => (
	<Formik
		initialValues={{
			show_me: '1',
			with_ott_monetization_types: ['all'],
			with_genres: ['28'],
			certification: ['NR'],
			with_release_type: ['all'],
			'release_date.lte': '',
			'release_date.gte': '',
			with_original_language: 'GB'
		}}
		enableReinitialize
		style={{
			maxWidth: '300px'
		}}
	>
		<div style={{ maxWidth: '300px' }}>
			<Filters />
		</div>
	</Formik>
);

export const Example = ControlledStoryTemplate.bind({});
Example.args = {};

export default {
	component: Filters,
	title: 'Design System/Forms/Filtering/Filters'
};
