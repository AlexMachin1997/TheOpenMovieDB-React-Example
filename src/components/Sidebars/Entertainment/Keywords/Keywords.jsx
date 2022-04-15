import * as React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const generateResourceUrl = (title = '', id = '', mediaType = '') => {
	// Split the title at each capital letter
	const splitTitle = title.split(/(?=[A-Z])/);

	// For each element remove the whitespace (If any exist)
	const lowercaseTitle = splitTitle
		.map((el) => el.replace(/\s+/g, ''))
		.join('-')
		.toLowerCase()
		.replace('(', '-')
		.replace(')', '');

	// Remove the new url e.g. /keyword/5-marvel-cinematic-universe-mcu/movie
	return `/keyword/${id}-${lowercaseTitle}/${mediaType}`;
};

const Keywords = ({ keywords, mediaType, ...props }) => (
	<ul className='flex h-full w-full flex-row flex-wrap p-0' {...props}>
		{keywords?.map((keyword) => (
			<Link
				to={generateResourceUrl(keyword?.name ?? null, keyword?.id ?? null, mediaType)}
				key={keyword.id}
				className='mr-2 mt-2 rounded-2xl bg-slate-200 p-2 lowercase text-black'
			>
				{keyword.name}
			</Link>
		)) ?? null}
	</ul>
);

Keywords.propTypes = {
	keywords: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired,
	mediaType: PropTypes.string
};

Keywords.defaultProps = {
	mediaType: 'movie'
};

export default Keywords;
