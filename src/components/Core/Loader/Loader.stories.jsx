import * as React from 'react';
import Loader from './Loader';

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});

export const IsFixed = Template.bind({});
IsFixed.args = {
	isFixed: false
};

export default {
	component: Loader,
	title: 'Design System/Core/Loader'
};
