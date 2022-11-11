import * as React from 'react';
import DiscoverFilterSidebar from './DiscoverFilterSidebar';

const Template = (args) => <DiscoverFilterSidebar {...args} />;

export const DefaultDiscoverFiltersSidebar = Template.bind({});
DefaultDiscoverFiltersSidebar.args = {};

export default {
	component: DiscoverFilterSidebar,
	title: 'Design System/Forms/Filtering/Discover Filters Sidebar'
};
