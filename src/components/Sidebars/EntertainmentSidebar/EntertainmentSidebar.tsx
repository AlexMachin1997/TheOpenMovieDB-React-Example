/* eslint-disable react/destructuring-assignment */
import { Image } from '../../Core';

import Keywords from './Keywords';
import SocialLinks from '../SocialLinks';
import { MEDIA_TYPE } from '../../../types/RoutingTypes';

type SharedSidebarProps = {
	facebookLink: string;
	twitterLink: string;
	instagramLink: string;
	homePageLink: string;
	originalLanguage: string;
	keywords: { name: string; id: string }[];
	status: string;
};

export interface TVSidebarProps extends SharedSidebarProps {
	mediaType: MEDIA_TYPE.TV;
	networkImageUrl: string;
	type: string;
	entertainmentName: string;
}

export interface MovieSidebarProps extends SharedSidebarProps {
	mediaType: MEDIA_TYPE.MOVIE;
	budget: string;
	revenue: string;
}

export type EntertainmentSideProps = MovieSidebarProps | TVSidebarProps;

const EntertainmentSidebar = (props: EntertainmentSideProps) => {
	// Explicity check the entertainment type is is 'tv' (Typescript can correctly narrow the types down then to include props relevant for this mode)
	if (props.mediaType === MEDIA_TYPE.TV) {
		const {
			facebookLink,
			twitterLink,
			homePageLink,
			instagramLink,
			status,
			entertainmentName,
			keywords,
			originalLanguage,
			networkImageUrl,
			type
		} = props;

		return (
			<aside className='md:pl-4'>
				<div className='my-4'>
					<SocialLinks
						facebook={facebookLink}
						twitter={twitterLink}
						instagram={instagramLink}
						homepage={homePageLink}
					/>
				</div>

				<h3 className='mb-4 text-2xl font-bold leading-[1]'>Facts</h3>

				{status.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Status</h3>
						<p className='text-base font-light'>{status}</p>
					</div>
				)}

				{entertainmentName.length > 0 && networkImageUrl.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Network</h3>
						<Image
							src={networkImageUrl}
							width='50px'
							height='30px'
							alt='Network logo'
							label={`The network logo for ${entertainmentName}`}
						/>
					</div>
				)}

				{type.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Type</h3>
						<p className='text-base font-light'>{type}</p>
					</div>
				)}

				{originalLanguage.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Original Language</h3>
						<p className='text-base font-light'>{originalLanguage}</p>
					</div>
				)}

				{keywords.length > 0 && (
					<div className='border-b border-solid border-gray-400 pb-4'>
						<h3 className='text-base font-bold leading-[1]'>Keywords</h3>
						<Keywords keywords={keywords} mediaType={MEDIA_TYPE.TV} />
					</div>
				)}
			</aside>
		);
	}

	if (props.mediaType === MEDIA_TYPE.MOVIE) {
		const {
			facebookLink,
			twitterLink,
			homePageLink,
			instagramLink,
			status,
			keywords,
			budget,
			originalLanguage,
			revenue
		} = props;

		return (
			<aside className='md:pl-4'>
				<div className='my-4'>
					<SocialLinks
						facebook={facebookLink}
						twitter={twitterLink}
						instagram={instagramLink}
						homepage={homePageLink}
					/>
				</div>

				{status.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Status</h3>
						<p className='text-base font-light'>{status}</p>
					</div>
				)}

				{originalLanguage.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Original Language</h3>
						<p className='text-base font-light'>{originalLanguage}</p>
					</div>
				)}

				{budget.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Budget</h3>
						<p className='text-base font-light'>{budget}</p>
					</div>
				)}

				{revenue?.length > 0 && (
					<div className='mb-4'>
						<h3 className='text-base font-bold leading-[1]'>Revenue</h3>
						<p className='text-base font-light'>{revenue}</p>
					</div>
				)}

				{keywords.length > 0 && (
					<div className='border-b border-solid border-gray-400 pb-4'>
						<h3 className='text-base font-bold leading-[1]'>Keywords</h3>
						<Keywords keywords={keywords} mediaType={MEDIA_TYPE.MOVIE} />
					</div>
				)}
			</aside>
		);
	}

	return null;
};

export default EntertainmentSidebar;
