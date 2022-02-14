import * as React from 'react';
import Loader from './index';

export const Default = () => <Loader />;

export const Type = () => <Loader type='fixed' />;

export default {
	component: Loader,
	title: 'Core -> Loader'
};
