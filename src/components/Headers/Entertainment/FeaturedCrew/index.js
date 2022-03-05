import * as React from 'react';
import PropTypes from 'prop-types';

// TODO: Remove once this has been renamed with a native heading tag
import Typography from '../../../Core/Typography';

import { FeaturedCrew, FeaturedCrewMember } from './FeaturedCrew';

const FeaturedCrewComponent = ({ featuredCrew }) => (
	<FeaturedCrew>
		{featuredCrew.map((data, index) => (
			<FeaturedCrewMember key={index}>
				<div>
					<Typography type='h2' text={data.name} colour='white' size='1rem' weight='bolder' />
				</div>
				<div>
					<Typography type='h2' text={data.roles} colour='white' size='0.9rem' weight='lighter' />
				</div>
			</FeaturedCrewMember>
		))}
	</FeaturedCrew>
);

FeaturedCrewComponent.defaultProps = {
	featuredCrew: []
};

FeaturedCrewComponent.propTypes = {
	featuredCrew: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			roles: PropTypes.string
		})
	)
};

export default FeaturedCrewComponent;
