import * as React from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { MediaType } from '../../../types/RoutingTypes';
import { Icon } from '../../Core';
import { Credit } from './types';

const generateResourceUrl = (title: string, id: string, mediaType: MediaType) => {
	// Split the title at each capital letter
	const splitTitle = title.split(/(?=[A-Z])/);

	// For each element remove the whitespace (If any exist)
	const lowercaseTitle = splitTitle.map((el) => el.replace(/\s+/g, ''));

	// Remove the new url e.g. 476669-the-king-s-man (Use the id to lookup the item you want)
	return `/${mediaType}/${id}-${lowercaseTitle.join('-').toLowerCase()}`;
};

const TableRow = ({ year, title, character, ...props }: Credit) => {
	const [isCircleIconFocussed, setIsCircleIconFocussed] = React.useState(false);

	return (
		<tr className='flex items-center pl-2' tabIndex={0}>
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
					className={classNames('fa-regular', {
						'fa-circle': isCircleIconFocussed === false,
						'fa-circle-dot': isCircleIconFocussed === true
					})}
				/>
			</td>
			<td className='inline-flex flex-wrap py-2'>
				<Link
					className='mr-2 text-base font-semibold text-black'
					to={generateResourceUrl(title, `${title}-${year}`, props.mediaType)}
				>
					{title}
				</Link>

				{props.mediaType === 'tv' && (
					<p className='mr-2 font-light text-gray-400'>
						{`(${props.episodeCount} ${props.episodeCount > 1 ? 'episodes' : 'episode'}) `}
					</p>
				)}
				<span className='mr-2 text-base font-light text-gray-400'>as</span>
				<span className='text-base font-light text-black'>{character}</span>
			</td>
		</tr>
	);
};

const CreditsTable = ({ credits, year }: { credits: Credit[]; year: number }) => (
	<table className='m-0 w-full border-collapse border border-solid border-gray-300 p-2'>
		<tbody className='bg-white'>
			{credits?.map((credit) => {
				if (credit.mediaType === 'tv') {
					return (
						<TableRow
							key={credit.title}
							year={year}
							mediaType='tv'
							title={credit.title}
							episodeCount={credit.episodeCount}
							character={credit.character}
						/>
					);
				}

				return (
					<TableRow
						key={credit.title}
						year={year}
						mediaType='movie'
						title={credit.title}
						character={credit.character}
					/>
				);
			})}
		</tbody>
	</table>
);

export default CreditsTable;
