import { Formik } from 'formik';
import * as React from 'react';

import Sort from './SortBy';

const ControlledStoryTemplate = () => (
	<Formik
		initialValues={{
			sort_by: 'original_title.desc'
		}}
		enableReinitialize
	>
		<div style={{ maxWidth: '300px' }}>
			<Sort />
		</div>
	</Formik>
);

export const Example = {
	render: ControlledStoryTemplate,
	args: {}
};

export default {
	component: Sort,
	title: 'Design System/Forms/Filtering/Section/Sort By'
};
