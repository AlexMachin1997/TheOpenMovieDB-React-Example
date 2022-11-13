import * as React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { SortBySection, FiltersSection, WhereToWatchSection } from './Sections';
import FormData from '../../../utils/FormData';

const DiscoverFilterSidebar = ({ isAuthenticated, resourceType, mediaType }) => {
	const initialValues = React.useMemo(
		() => new FormData(mediaType, resourceType, isAuthenticated, {}).getFormikFormData(),
		[isAuthenticated, mediaType, resourceType]
	);

	return (
		<Formik initialValues={{ ...initialValues }} enableReinitialize>
			<div className='max-w-xs space-y-2'>
				<SortBySection />
				<FiltersSection isAuthenticated={isAuthenticated} />
				<WhereToWatchSection isAuthenticated={isAuthenticated} />
			</div>
		</Formik>
	);
};

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
