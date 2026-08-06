import type { Option } from '@repo/core';

/** Shared by the `SelectField` and `RadioGroupField` stories so each page shows the same data. */
export const countries: Option[] = [
	{ id: 'gb', value: 'gb', label: 'United Kingdom' },
	{ id: 'ie', value: 'ie', label: 'Ireland' },
	{ id: 'fr', value: 'fr', label: 'France' }
];

export const plans: Option[] = [
	{ id: 'monthly', value: 'monthly', label: 'Monthly' },
	{ id: 'yearly', value: 'yearly', label: 'Yearly' }
];
