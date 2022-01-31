import * as React from 'react';

import TableRow from './index';

export const Default = () => <TableRow />;

export const Year = () => <TableRow year='-' />;

export const MediaType = () => <TableRow mediaType='tv' />;

export const Title = () => <TableRow title='Tony Awards' />;

export const EpisodeCount = () => <TableRow mediaType='tv' episodeCount='20' />;

export const Character = () => <TableRow character='Floki' />;

export default {
	title: 'Person -> CreditTable - TableRow',
	component: TableRow
};
