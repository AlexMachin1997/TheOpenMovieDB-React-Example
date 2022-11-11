import * as React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { SortBySection, FiltersSection, WhereToWatchSection } from './Sections';

// eslint-disable-next-line no-unused-vars
const DiscoverFilterSidebar = ({ isAuthenticated, resourceType, mediaType }) => (
	<Formik
		initialValues={{
			// "Filters" section formData
			show_me: '0',
			with_ott_monetization_types: ['all'],
			with_genres: ['28'],
			certification: ['NR'],
			with_release_type: ['all'],
			'release_date.lte': '',
			'release_date.gte': '',
			'air_date.lte': '',
			'air_date.gte': '',
			with_original_language: 'none',
			region: 'US',
			'vote_average.gte': 0,
			'vote_average.lte': 10,
			'vote_count.gte': 500,
			'with_runtime.gte': 0,
			'with_runtime.lte': 400,
			search_first_air_date: mediaType === 'tv',

			// "Sort By" section formData
			sort_by: 'original_title.desc',

			// "Where to Watch" section formDataa
			restrict_services: false,
			ott_region: 'US',
			with_ott_providers: []
		}}
		enableReinitialize
	>
		<div className='max-w-xs space-y-2'>
			<SortBySection />
			<FiltersSection isAuthenticated={isAuthenticated} />
			<WhereToWatchSection isAuthenticated={isAuthenticated} />
		</div>
	</Formik>
);

DiscoverFilterSidebar.propTypes = {
	isAuthenticated: PropTypes.bool,
	mediaType: PropTypes.string,
	resourceType: PropTypes.string
};

DiscoverFilterSidebar.defaultProps = {
	isAuthenticated: false,
	mediaType: 'movie',
	resourceType: 'popular'
};

export default DiscoverFilterSidebar;
