import * as React from 'react';

import Sort from './Sort';

const ControlledStoryTemplate = () => <Sort />;

export const Example = ControlledStoryTemplate.bind({});
Example.args = {};

export default {
	component: Sort,
	title: 'Design System/Forms/Filtering/SortBy'
};
