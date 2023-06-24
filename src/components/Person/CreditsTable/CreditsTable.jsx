import * as React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow/TableRow';

const CreditsTable = ({ credits, year }) => (
	<table className='m-0 w-full border-collapse border border-solid border-gray-300 p-2'>
		<tbody className='bg-white'>
			{credits.map((data) => (
				<TableRow
					key={data.title}
					year={year}
					mediaType={data.mediaType}
					title={data.title}
					episodeCount={data.episodeCount}
					character={data.role}
				/>
			))}
		</tbody>
	</table>
);

CreditsTable.defaultProps = {
	year: '-',
	credits: []
};

CreditsTable.propTypes = {
	year: PropTypes.string,
	credits: PropTypes.arrayOf(
		PropTypes.shape({
			year: PropTypes.string,
			mediaType: PropTypes.string,
			title: PropTypes.string,
			episodeCount: PropTypes.string,
			character: PropTypes.string
		})
	)
};

export default CreditsTable;
