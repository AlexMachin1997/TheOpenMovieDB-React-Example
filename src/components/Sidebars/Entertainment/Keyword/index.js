import React from 'react';
import PropTypes from 'prop-types';

import Keyword from './Keyword';

import replaceSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const KeywordComponent = ({ keyword, onClick }) => (
	<Keyword onClick={onClick} id={replaceSpacesWith(keyword, '-')}>
		{keyword}
	</Keyword>
);

KeywordComponent.defaultProps = {
	keyword: 'Horror',
	onClick: () => false
};

KeywordComponent.propTypes = {
	keyword: PropTypes.string,
	onClick: PropTypes.func
};

export default KeywordComponent;
