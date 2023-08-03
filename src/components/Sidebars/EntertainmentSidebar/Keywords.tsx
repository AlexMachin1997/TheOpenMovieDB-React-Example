import { Link } from 'react-router-dom';
import { MediaType } from '../../../types/RoutingTypes';

const generateResourceUrl = (title: string, id: string, mediaType: MediaType) => {
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

interface Props extends React.ComponentPropsWithoutRef<'ul'> {
	keywords?: { name: string; id: string }[];
	mediaType: MediaType;
}

const Keywords = ({ keywords = [], mediaType, ...props }: Props) => (
	<ul className='flex h-full w-full flex-row flex-wrap p-0' {...props}>
		{keywords.map((keyword) => (
			<Link
				to={generateResourceUrl(keyword.name, keyword.id, mediaType)}
				key={keyword.id}
				className='mr-2 mt-2 rounded-lg border border-solid border-gray-400 bg-slate-200 px-3 py-1 lowercase text-black'
			>
				{keyword.name}
			</Link>
		))}
	</ul>
);

export default Keywords;
