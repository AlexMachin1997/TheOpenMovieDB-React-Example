import Loader from './index';
import React from 'react';

export const Default = () => <Loader />;

export const Type = () => <Loader type='fixed' />;

export default {
	component: Loader,
	title: 'Core -> Loader'
};
