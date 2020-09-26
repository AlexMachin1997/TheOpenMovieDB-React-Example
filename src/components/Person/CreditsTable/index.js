import React from 'react';
import PropTypes from 'prop-types';

import { Table, TableBody } from './CreditsTable';
import TableRow from './TableRow';

const CreditsTable = ({ group }) => {
	if (group.credits.length === 0) return null;

	return (
		<Table>
			<TableBody>
				{group.credits.map((data, index) => (
					<TableRow
						key={index}
						year={group.year}
						mediaType={data.mediaType}
						title={data.title}
						episodeCount={data.episodeCount}
						character={data.role}
					/>
				))}
			</TableBody>
		</Table>
	);
};
CreditsTable.defaultProps = {
	group: {
		year: '-',
		credits: []
	}
};

CreditsTable.propTypes = {
	group: PropTypes.shape({
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
	})
};

export default CreditsTable;
