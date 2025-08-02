import { Link } from 'react-router-dom';

import { MEDIA_TYPE } from '../../../types/RoutingTypes';
import { Credit } from './types';

const generateResourceUrl = (title: string, id: string, mediaType: MEDIA_TYPE) => {
	// Split the title at each capital letter
	const splitTitle = title.split(/(?=[A-Z])/);

	// For each element remove the whitespace (If any exist)
	const lowercaseTitle = splitTitle.map((el) => el.replace(/\s+/g, ''));

	// Remove the new url e.g. 476669-the-king-s-man (Use the id to lookup the item you want)
	return `/${mediaType}/${id}-${lowercaseTitle.join('-').toLowerCase()}`;
};

const TableRow = ({ year, title, character, ...props }: Credit) => (
	<tr className='flex items-start px-4'>
		<td className='mr-2 py-2 text-left align-top font-light'>{year}</td>

		<td className='inline-flex flex-col flex-wrap py-2'>
			<Link
				className='mr-2 text-base font-semibold text-black hover:text-secondary'
				to={generateResourceUrl(title, `${title}-${year}`, props.mediaType)}
			>
				{title}
			</Link>

			{character.length > 0 && (
				<div className='inline-flex flex-wrap pl-4'>
					{props.mediaType === 'tv' && (
						<p className='mr-2 font-light text-gray-400'>
							{`(${props.episodeCount} ${props.episodeCount > 1 ? 'episodes' : 'episode'}) `}
						</p>
					)}
					<span className='mr-2 text-base font-light text-gray-400'>as</span>
					<span className='text-base font-light text-black'>{character}</span>
				</div>
			)}
		</td>
	</tr>
);

const CreditsTable = ({ credits, year }: { credits: Credit[]; year: number }) => (
	<table className='m-0 w-full border-collapse border border-solid border-gray-300 p-2'>
		<tbody className='bg-white'>
			{credits?.map((credit) => {
				if (credit.mediaType === 'tv') {
					return (
						<TableRow
							key={`${credit.title}-${credit.year}-${credit.character}`}
							year={year}
							mediaType={MEDIA_TYPE.TV}
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
						mediaType={MEDIA_TYPE.MOVIE}
						title={credit.title}
						character={credit.character}
					/>
				);
			})}
		</tbody>
	</table>
);

export default CreditsTable;
