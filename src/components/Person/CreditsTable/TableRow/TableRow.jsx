import * as React from 'react';
import PropTypes from 'prop-types';

import className from 'classnames';

import { Link } from 'react-router-dom';
import { Icon } from '../../../Core';

const generateResourceUrl = (title = '', id = '', mediaType = '') => {
	// Split the title at each capital letter
	const splitTitle = title.split(/(?=[A-Z])/);

	// For each element remove the whitespace (If any exist)
	const lowercaseTitle = splitTitle.map((el) => el.replace(/\s+/g, ''));

	// Remove the new url e.g. 476669-the-king-s-man (Use the id to lookup the item you want)
	return `/${mediaType}/${id}-${lowercaseTitle.join('-').toLowerCase()}`;
};

const TableRow = ({ year, mediaType, title, episodeCount, character, id }) => {
	const [isCircleIconFocussed, setIsCircleIconFocussed] = React.useState(false);

	return (
		<tr className='flex items-center pl-2' tabIndex='0'>
			<td className='mr-2 text-left align-top font-light'>{year}</td>
			<td
				className='mr-2 hidden p-0 align-top text-black sm:block'
				onMouseEnter={() => {
					setIsCircleIconFocussed(true);
				}}
				onMouseLeave={() => {
					setIsCircleIconFocussed(false);
				}}
			>
				<Icon
					className={className('fa-regular', {
						'fa-circle': isCircleIconFocussed === false,
						'fa-circle-dot': isCircleIconFocussed === true
					})}
				/>
			</td>
			<td className='inline-flex flex-wrap py-2'>
				<Link
					className='mr-2 text-base font-semibold text-black'
					to={generateResourceUrl(title, id, mediaType)}
				>
					{title}
				</Link>
				{mediaType === 'tv' && (
					<p className='mr-2 font-light text-gray-400'>
						{`(${episodeCount} ${episodeCount > 1 ? 'episodes' : 'episode'}) `}
					</p>
				)}
				<span className='mr-2 text-base font-light text-gray-400'>as</span>
				<span className='text-base font-light text-black'>{character}</span>
			</td>
		</tr>
	);
};

TableRow.propTypes = {
	year: PropTypes.string,
	mediaType: PropTypes.string,
	title: PropTypes.string,
	episodeCount: PropTypes.string,
	character: PropTypes.string,
	id: PropTypes.string
};

TableRow.defaultProps = {
	year: '2020',
	mediaType: 'movie',
	title: 'Black Widow',
	episodeCount: '10',
	character: 'Natasha Romanoff / Black Widow',
	id: '0'
};

export default TableRow;
