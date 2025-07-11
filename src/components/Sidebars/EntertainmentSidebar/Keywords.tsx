import { Link } from 'react-router-dom';

import { MEDIA_TYPE } from '../../../types/RoutingTypes';

const generateResourceUrl = (title: string, id: string, mediaType: MEDIA_TYPE) => {
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

interface KeywordsProps extends React.ComponentPropsWithoutRef<'ul'> {
	keywords?: { name: string; id: string }[];
	mediaType: MEDIA_TYPE;
}

const Keywords = ({ keywords = [], mediaType, ...props }: KeywordsProps) => (
	<ul className='flex h-full w-full flex-row flex-wrap p-0 lg:max-w-[350px]' {...props}>
		{keywords.map((keyword) => (
			<li className='mr-2 mt-2' key={keyword.id}>
				<Link
					to={generateResourceUrl(keyword.name, keyword.id, mediaType)}
					key={keyword.id}
					className='rounded-lg border border-solid border-gray-400 bg-slate-200 px-3 py-1 lowercase text-black'
				>
					{keyword.name}
				</Link>
			</li>
		))}
	</ul>
);

export default Keywords;
