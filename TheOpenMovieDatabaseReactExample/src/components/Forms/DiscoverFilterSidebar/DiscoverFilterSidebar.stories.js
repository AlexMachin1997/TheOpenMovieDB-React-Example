import * as React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import DiscoverFilterSidebar from './DiscoverFilterSidebar';
import DiscoverFiltersFormData from '../../../services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';

const Template = ({ mediaType, resourceType, isAuthenticated }) => {
	const formData = React.useMemo(
		() =>
			new DiscoverFiltersFormData(mediaType, resourceType, isAuthenticated, {}).getFormikFormData(),
		[mediaType, resourceType, isAuthenticated]
	);

	return (
		<Formik initialValues={{ ...formData }} enableReinitialize>
			<DiscoverFilterSidebar initialValues={{ ...formData }} isAuthenticated={isAuthenticated} />
		</Formik>
	);
};

Template.propTypes = {
	mediaType: PropTypes.string.isRequired,
	resourceType: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.isRequired
};

const DefaultStoryArgs = {
	resourceType: 'popular',
	mediaType: 'movie',
	isAuthenticated: false
};

export const MoviesPopular = Template.bind({});
MoviesPopular.args = {
	...DefaultStoryArgs,
	resourceType: 'popular'
};

export const MoviesNowPlaying = Template.bind({});
MoviesNowPlaying.args = {
	DefaultStoryArgs,
	resourceType: 'now-playing'
};

export const MoviesUpcoming = Template.bind({});
MoviesUpcoming.args = {
	...DefaultStoryArgs,
	resourceType: 'upcoming'
};

export const MoviesTopRated = Template.bind({});
MoviesTopRated.args = {
	...DefaultStoryArgs,
	resourceType: 'top-rated'
};

export const ShowsPopular = Template.bind({});
ShowsPopular.args = {
	...DefaultStoryArgs,
	resourceType: 'popular',
	mediaType: 'tv'
};

export const ShowsAiringToday = Template.bind({});
ShowsAiringToday.args = {
	...DefaultStoryArgs,
	resourceType: 'airing-today',
	mediaType: 'tv'
};

export const ShowsOnTv = Template.bind({});
ShowsOnTv.args = {
	...DefaultStoryArgs,
	resourceType: 'on-the-air',
	mediaType: 'tv'
};

export const ShowsTopRated = Template.bind({});
ShowsTopRated.args = {
	...DefaultStoryArgs,
	resourceType: 'top-rated',
	mediaType: 'tv'
};

export default {
	component: DiscoverFilterSidebar,
	title: 'Design System/Forms/Filtering/Discover Filters Sidebar'
};
