import { Formik } from 'formik';
import * as React from 'react';

import WhereToWatch from './WhereToWatch';

const ControlledStoryTemplate = () => (
	<Formik
		initialValues={{
			restrict_services: false,
			ott_region: 'US',
			with_ott_providers: []
		}}
		enableReinitialize
	>
		<div style={{ maxWidth: '300px' }}>
			<WhereToWatch />
		</div>
	</Formik>
);

export const Example = ControlledStoryTemplate.bind({});
Example.args = {};

export default {
	component: WhereToWatch,
	title: 'Design System/Forms/Filtering/Where to watch'
};
