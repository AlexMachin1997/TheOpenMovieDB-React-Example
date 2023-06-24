import { Formik } from 'formik';
import * as React from 'react';

import WhereToWatch from './WhereToWatch';

const ControlledStoryTemplate = (args) => (
	<Formik
		initialValues={{
			restrict_services: false,
			ott_region: 'US',
			with_ott_providers: []
		}}
		enableReinitialize
	>
		<div style={{ maxWidth: '300px' }}>
			<WhereToWatch {...args} />
		</div>
	</Formik>
);

export const DefaultWhereToWatch = {
	render: ControlledStoryTemplate,
	args: {}
};

export const AuthenticatedWhereToWatch = {
	render: ControlledStoryTemplate,

	args: {
		isAuthenticated: true
	}
};

export const NoOttProviders = {
	render: ControlledStoryTemplate,

	args: {
		ottProviders: []
	}
};

export default {
	component: WhereToWatch,
	title: 'Design System/Forms/Filtering/Sections/Where to watch'
};
