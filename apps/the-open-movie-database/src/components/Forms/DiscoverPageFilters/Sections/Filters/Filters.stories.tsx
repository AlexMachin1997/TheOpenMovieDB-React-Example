import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Formik } from 'formik';

import Filters from '~/components/Forms/DiscoverPageFilters/Sections/Filters/Filters';
import DiscoverFiltersFormDataService from '~/services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';
import { MEDIA_TYPE, RESOURCE_TYPE } from '~/types/RoutingTypes';

const meta: Meta<typeof Filters> = {
	component: Filters,
	title: 'Forms/Discover Page Filters/Sections/Filters'
};

export default meta;

type Story = StoryObj<typeof Filters>;

const ControlledStoryTemplate = (args: Story['args']) => {
	const initialValues = React.useMemo(
		() =>
			new DiscoverFiltersFormDataService(
				args?.mediaType ?? MEDIA_TYPE.MOVIE,
				RESOURCE_TYPE.TOP_RATED,
				args?.isAuthenticated ?? false
			).getFormikFormData(),
		[args?.isAuthenticated, args?.mediaType]
	);

	return (
		<Formik
			initialValues={{ ...initialValues }}
			enableReinitialize
			onSubmit={(values) => console.log(values)}
		>
			<div style={{ maxWidth: '300px' }}>
				<Filters {...args} />
			</div>
		</Formik>
	);
};

export const Unauthenticated: Story = {
	render: ControlledStoryTemplate,
	args: {
		isAuthenticated: false
	}
};

export const Authenticated: Story = {
	render: ControlledStoryTemplate,

	args: {
		...Unauthenticated.args,
		isAuthenticated: true
	}
};

export const TVMediaType: Story = {
	args: {
		...Unauthenticated.args,
		mediaType: MEDIA_TYPE.TV
	}
};
