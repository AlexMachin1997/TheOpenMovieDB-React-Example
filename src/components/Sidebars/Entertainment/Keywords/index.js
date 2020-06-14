import React from 'react';
import PropTypes from 'prop-types';

import Keyword from './Keyword';
import Row from '../../../Layouts/Row';
import replaceSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const Keywords = ({ keywords, onClick }) => (
	<div id="Keywords">
		<Row>
			{keywords.map((keyword, index) => (
				<Keyword key={index} onClick={onClick} id={replaceSpacesWith(keyword, '-')}>
					{keyword}
				</Keyword>
			))}
		</Row>
	</div>
);

Keywords.defaultProps = {
	onClick: () => console.log('Keyword action'),
	keywords: ['Thriller']
};

Keywords.propTypes = {
	keywords: PropTypes.array,
	onClick: PropTypes.func
};

export default Keywords;
