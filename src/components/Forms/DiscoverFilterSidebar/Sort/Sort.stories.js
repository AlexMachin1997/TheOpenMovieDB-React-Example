import { Formik } from 'formik';
import * as React from 'react';

import Sort from './Sort';

const ControlledStoryTemplate = () => (
	<Formik
		initialValues={{
			sort_by: ''
		}}
		enableReinitialize
	>
		<div style={{ maxWidth: '300px' }}>
			<Sort />
		</div>
	</Formik>
);

export const Example = ControlledStoryTemplate.bind({});
Example.args = {};

export default {
	component: Sort,
	title: 'Design System/Forms/Filtering/SortBy'
};
