import * as React from 'react';

import ReleaseRegionPopup from './ReleaseRegionPopup';

const ControlledStoryTemplate = () => <ReleaseRegionPopup />;

export const Example = ControlledStoryTemplate.bind({});
Example.args = {};

export default {
	component: ReleaseRegionPopup,
	title: 'Design System/Forms/Filtering/Filters/Release Region Popup'
};
