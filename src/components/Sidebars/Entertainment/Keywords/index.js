import React from 'react';
import PropTypes from 'prop-types';

import Keyword from '../Keyword';
import Row from '../../../Blocks/Flexbox/Row';

const Keywords = ({ keywords }) => (
	<div id='Keywords'>
		<Row>
			{keywords.map((keyword, index) => (
				<Keyword keyword={keyword} key={index} />
			))}
		</Row>
	</div>
);

Keywords.defaultProps = {
	keywords: ['Thriller']
};

Keywords.propTypes = {
	keywords: PropTypes.array
};

export default Keywords;
