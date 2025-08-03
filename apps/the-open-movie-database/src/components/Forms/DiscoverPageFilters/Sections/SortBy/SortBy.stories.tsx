import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Formik } from 'formik';

import SortBy from '~/components/Forms/DiscoverPageFilters/Sections/SortBy/SortBy';
import { MEDIA_TYPE, RESOURCE_TYPE } from '~/types/RoutingTypes';
import DiscoverFiltersFormDataService, {
	DefaultValues
} from '~/services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';
import settings from '~/settings';

const meta: Meta<typeof SortBy> = {
	component: SortBy,
	title: 'Forms/Discover Page Filters/Sections/Sort By'
};

export default meta;

type Story = StoryObj<typeof SortBy>;

const ControlledStoryTemplate = ({
	mediaType,
	isAuthenticated,
	defaultValues
}: {
	mediaType: MEDIA_TYPE;
	isAuthenticated?: boolean;
	defaultValues: DefaultValues;
}) => {
	const initialValues = React.useMemo(
		() =>
			new DiscoverFiltersFormDataService(
				mediaType ?? MEDIA_TYPE.MOVIE,
				RESOURCE_TYPE.TOP_RATED,
				isAuthenticated ?? false,
				defaultValues
			).getFormikFormData(),
		[defaultValues, isAuthenticated, mediaType]
	);

	return (
		<Formik
			initialValues={{ ...initialValues }}
			enableReinitialize
			onSubmit={(values) => console.log(values)}
		>
			<div style={{ maxWidth: '300px' }}>
				<SortBy />
			</div>
		</Formik>
	);
};

export const PreDefinedValue = {
	render: () => (
		<ControlledStoryTemplate
			mediaType={MEDIA_TYPE.MOVIE}
			isAuthenticated
			defaultValues={{
				sort_by: settings.SORT_BY_OPTIONS[7]?.value
			}}
		/>
	)
};

export const DefaultValue: Story = {
	render: () => (
		<ControlledStoryTemplate
			mediaType={MEDIA_TYPE.MOVIE}
			isAuthenticated
			defaultValues={{
				sort_by: undefined
			}}
		/>
	)
};
export const TopRatedSortBy: Story = {
	render: () => (
		<ControlledStoryTemplate
			mediaType={MEDIA_TYPE.MOVIE}
			isAuthenticated
			defaultValues={{
				sort_by: undefined
			}}
		/>
	)
};
