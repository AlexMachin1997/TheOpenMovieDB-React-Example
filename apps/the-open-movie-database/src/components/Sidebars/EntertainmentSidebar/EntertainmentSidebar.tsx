import { Image } from '~/components/Core';
import Keywords from '~/components/Sidebars/EntertainmentSidebar/Keywords';
import SocialLinks from '~/components/Sidebars/SocialLinks';
import { MEDIA_TYPE } from '~/types/RoutingTypes';
import { SocialLink } from '~/types/Social';

type SharedSidebarProps = {
	originalLanguage: string;
	keywords: { name: string; id: string }[];
	status: string;
	socials: SocialLink[];
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

const EntertainmentSidebar = ({
	status,
	keywords = [],
	originalLanguage = '',
	socials = [],
	...props
}: EntertainmentSideProps) => {
	// Explicity check the entertainment type is is 'tv' (Typescript can correctly narrow the types down then to include props relevant for this mode)
	if (props.mediaType === MEDIA_TYPE.TV) {
		const { entertainmentName, networkImageUrl, type } = props;

		return (
			<aside className='md:pl-4'>
				<div className='my-4'>
					<SocialLinks socials={socials} />
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
						<h3 className='mb-2 text-base font-bold leading-[1]'>Network</h3>
						<Image
							src={networkImageUrl}
							width='80px'
							height='40px'
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
		const { budget, revenue } = props;

		return (
			<aside className='md:pl-4'>
				<div className='my-4'>
					<SocialLinks socials={socials} />
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
