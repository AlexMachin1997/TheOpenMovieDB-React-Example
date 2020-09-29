import React from 'react';
import PropTypes from 'prop-types';

import { Overview, Tagline, OverviewInformation } from './Overview';
import Typography from '../../../../Core/Typography';

const OverviewSection = ({ tagline, overview }) => (
	<Overview>
		<Tagline>
			<Typography
				type='p'
				text={tagline}
				colour='white'
				size='1rem'
				weight='bolder'
				style='italic'
			/>
		</Tagline>
		<OverviewInformation>
			<div style={{ margin: '0.7rem 0' }}>
				<Typography type='h2' text='Overview' colour='white' size='1.2rem' weight='bolder' />
			</div>
			<Typography type='p' text={overview} colour='white' size='1rem' weight='lighter' />
		</OverviewInformation>
	</Overview>
);

OverviewSection.propTypes = {
	tagline: PropTypes.string,
	overview: PropTypes.string
};

OverviewSection.defaultProps = {
	tagline: 'Example tagline',
	overview: 'Example overview'
};

export default OverviewSection;
