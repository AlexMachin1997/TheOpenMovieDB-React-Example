import * as React from 'react';
import PropTypes from 'prop-types';

import { Container } from './Action';

import Tooltip from '../../../Core/Tooltip';
import Icon from '../../../Core/Icon';

const Action = ({ tooltip, icon, colour }) => (
	<Tooltip
		content={
			<Container>
				<Icon size={20} icon={icon} colour={colour} />
			</Container>
		}
		tooltipText={tooltip}
	/>
);

Action.defaultProps = {
	tooltip: 'Default tooltip',
	icon: 'HeartFill',
	colour: 'white'
};

Action.propTypes = {
	tooltip: PropTypes.string,
	icon: PropTypes.string,
	colour: PropTypes.string
};

export default Action;
