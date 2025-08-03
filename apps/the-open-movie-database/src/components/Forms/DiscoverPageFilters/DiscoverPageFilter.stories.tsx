import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Formik } from 'formik';

import DiscoverFilterSidebar from './DiscoverPageFilters';
import DiscoverFiltersFormData from '~/services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';
import { MEDIA_TYPE, RESOURCE_TYPE } from '~/types/RoutingTypes';
import settings from '~/settings';

type Story = StoryObj<typeof DiscoverFilterSidebar>;

const meta: Meta<typeof DiscoverFilterSidebar> = {
	component: DiscoverFilterSidebar,
	title: 'Forms/Discover Page Filters'
};

export default meta;

const Template = ({
	mediaType = MEDIA_TYPE.MOVIE,
	resourceType = RESOURCE_TYPE.POPULAR,
	isAuthenticated = false
}: {
	mediaType: MEDIA_TYPE;
	resourceType: RESOURCE_TYPE;
	isAuthenticated?: boolean;
}) => {
	const formData = React.useMemo(
		() =>
			new DiscoverFiltersFormData(mediaType, resourceType, isAuthenticated, {}).getFormikFormData(),
		[mediaType, resourceType, isAuthenticated]
	);

	return (
		<Formik
			initialValues={{ ...formData }}
			enableReinitialize
			onSubmit={(values) => console.log(values)}
		>
			<DiscoverFilterSidebar
				isAuthenticated={isAuthenticated}
				ottProviders={settings.OTT_PROVIDER_OPTIONS}
				mediaType={mediaType}
			/>
		</Formik>
	);
};

export const MoviesPopular: Story = {
	render: () => (
		<Template mediaType={MEDIA_TYPE.MOVIE} resourceType={RESOURCE_TYPE.POPULAR} isAuthenticated />
	)
};

export const MoviesNowPlaying: Story = {
	render: () => (
		<Template
			mediaType={MEDIA_TYPE.MOVIE}
			resourceType={RESOURCE_TYPE.NOW_PLAYING}
			isAuthenticated
		/>
	)
};

export const MoviesUpcoming = {
	render: () => (
		<Template mediaType={MEDIA_TYPE.MOVIE} resourceType={RESOURCE_TYPE.UPCOMING} isAuthenticated />
	)
};

export const MoviesTopRated = {
	render: () => (
		<Template mediaType={MEDIA_TYPE.MOVIE} resourceType={RESOURCE_TYPE.TOP_RATED} isAuthenticated />
	)
};

export const ShowsPopular = {
	render: () => (
		<Template mediaType={MEDIA_TYPE.TV} resourceType={RESOURCE_TYPE.POPULAR} isAuthenticated />
	)
};

export const ShowsAiringToday = {
	render: () => (
		<Template mediaType={MEDIA_TYPE.TV} resourceType={RESOURCE_TYPE.AIRING_TODAY} isAuthenticated />
	)
};

export const ShowsOnTheAir = {
	render: () => (
		<Template mediaType={MEDIA_TYPE.TV} resourceType={RESOURCE_TYPE.ON_THE_AIR} isAuthenticated />
	)
};

export const ShowsTopRated = {
	render: () => (
		<Template mediaType={MEDIA_TYPE.TV} resourceType={RESOURCE_TYPE.TOP_RATED} isAuthenticated />
	)
};
