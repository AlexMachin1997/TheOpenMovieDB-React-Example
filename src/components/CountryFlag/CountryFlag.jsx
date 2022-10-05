import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Core';

const CountryFlag = ({ countryCode, className }) => (
	<Icon className={classNames(`fi fi-${countryCode.toLowerCase()}`, className)} />
);

CountryFlag.defaultProps = {
	countryCode: 'en',
	className: ''
};

CountryFlag.propTypes = {
	countryCode: PropTypes.string,
	className: PropTypes.string
};

export default CountryFlag;
