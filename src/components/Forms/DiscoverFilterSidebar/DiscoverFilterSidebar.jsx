import * as React from 'react';
import PropTypes from 'prop-types';

import { SortBySection, FiltersSection, WhereToWatchSection } from './Sections';

const DiscoverFilterSidebar = ({ isAuthenticated, tag: Tag, ...props }) => (
	<Tag className='max-w-sm space-y-2' {...props}>
		<SortBySection />
		<FiltersSection isAuthenticated={isAuthenticated} />
		<WhereToWatchSection isAuthenticated={isAuthenticated} />
	</Tag>
);

DiscoverFilterSidebar.propTypes = {
	isAuthenticated: PropTypes.bool,
	tag: PropTypes.string
};

DiscoverFilterSidebar.defaultProps = {
	isAuthenticated: false,
	tag: 'aside'
};

export default DiscoverFilterSidebar;
