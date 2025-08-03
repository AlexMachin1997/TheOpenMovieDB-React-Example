import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Formik } from 'formik';

import WhereToWatch from '~/components/Forms/DiscoverPageFilters/Sections/WhereToWatch/WhereToWatch';
import { MEDIA_TYPE, RESOURCE_TYPE } from '~/types/RoutingTypes';
import DiscoverFiltersFormDataService, {
	DefaultValues as IDefaultValues
} from '~/services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';
import { SelectOption } from '~/types/DropdownElementTypes';
import settings from '~/settings';

type Story = StoryObj<typeof WhereToWatch>;

const meta: Meta<typeof WhereToWatch> = {
	component: WhereToWatch,
	title: 'Forms/Discover Page Filters/Sections/Where To Watch'
};

export default meta;

const ControlledStoryTemplate = ({
	isAuthenticated = false,
	ottProviders = [],
	defaultValues
}: {
	isAuthenticated?: boolean;
	ottProviders?: SelectOption[];
	defaultValues?: IDefaultValues;
}) => {
	const initialValues = React.useMemo(
		() =>
			new DiscoverFiltersFormDataService(
				MEDIA_TYPE.MOVIE,
				RESOURCE_TYPE.TOP_RATED,
				isAuthenticated ?? false,
				defaultValues
			).getFormikFormData(),
		[defaultValues, isAuthenticated]
	);

	return (
		<Formik
			initialValues={{ ...initialValues }}
			enableReinitialize
			onSubmit={(values) => console.log(values)}
		>
			<div style={{ maxWidth: '300px' }}>
				<WhereToWatch isAuthenticated={isAuthenticated} ottProviders={ottProviders} />
			</div>
		</Formik>
	);
};

export const PreDefinedValues: Story = {
	render: () => (
		<ControlledStoryTemplate
			isAuthenticated
			ottProviders={settings.OTT_PROVIDER_OPTIONS}
			defaultValues={{
				restrict_services: true,
				with_ott_providers: [
					settings.OTT_PROVIDER_OPTIONS[5].value,
					settings.OTT_PROVIDER_OPTIONS[3].value
				],
				ott_region: settings.COUNTRY_OPTIONS[5].value
			}}
		/>
	),
	args: {}
};

export const DefaultValues: Story = {
	render: () => (
		<ControlledStoryTemplate isAuthenticated ottProviders={settings.OTT_PROVIDER_OPTIONS} />
	),
	args: {}
};

export const NoOttProviders: Story = {
	render: () => <ControlledStoryTemplate isAuthenticated ottProviders={[]} />,
	args: {}
};
