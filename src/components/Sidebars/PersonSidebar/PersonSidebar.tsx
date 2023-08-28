/* eslint-disable react/no-array-index-key */
import { SocialLink } from '../../../types/Social';
import { Image } from '../../Core';

import SocialLinks from '../SocialLinks';

export type PersonSidebarProps = {
	name?: string;
	headshotUrl?: string;
	knownForDepartment?: string | null;
	numberOfCredits?: number | null;
	gender?: string | null;
	birthday?: string | null;
	placeOfBirth?: string | null;
	knownAs?: string[];
	socials?: SocialLink[];
};

const PersonSidebar = ({
	name,
	headshotUrl,
	knownForDepartment = null,
	numberOfCredits = null,
	gender = null,
	birthday = null,
	placeOfBirth = null,
	knownAs = [],
	socials = []
}: PersonSidebarProps) => (
	<div>
		<div className='flex flex-col justify-center pb-4 md:justify-start'>
			{/* TODO: Replace with a picture element to support multiple image sizes and less hacks to get it working as intended.... No more unset this unset that... */}
			<Image
				src={headshotUrl}
				alt={`${name} profile`}
				className='m-auto !h-[450px] !w-[300px] rounded-xl md:m-0 md:!h-[450px] md:!w-[300px]'
				title={name}
				width='unset'
				height='unset'
				label={`A profile photo of ${name}`}
			/>

			<h3 className='my-4 block text-center text-4xl font-bold text-black md:hidden md:text-left'>
				{name}
			</h3>

			<div className='mt-4 flex justify-center md:justify-start'>
				<SocialLinks socials={socials} />
			</div>
		</div>

		<div className='m-auto max-w-[900px] md:max-w-none'>
			<h4 className='pb-4 text-xl text-black'>Personal info</h4>

			<ul className='grid grid-cols-2 justify-center gap-6 md:grid-cols-1'>
				<li className=''>
					<h5 className='text-lg font-bold'>Known For</h5>
					<p className='font-light'>
						{(knownForDepartment?.length ?? 0) > 0 ? knownForDepartment : 'N/A'}
					</p>
				</li>

				<li className=''>
					<h5 className='text-lg font-bold'>Gender</h5>
					<p className='font-light'>{(gender?.length ?? 0) > 0 ? gender : 'N/A'}</p>
				</li>

				<li className=''>
					<h5 className='text-lg font-bold'>Birthday</h5>
					<p className='font-light'>{(birthday?.length ?? 0) > 0 ? birthday : 'N/A'}</p>
				</li>

				<li className=''>
					<h5 className='text-lg font-bold'>Total Known Credits</h5>
					<p className='font-light'>{(numberOfCredits ?? 0) > 0 ? numberOfCredits : 'N/A'}</p>
				</li>

				<li className=''>
					<h5 className='text-lg font-bold'>Place of Birth</h5>
					<p className='font-light'>{(placeOfBirth?.length ?? 0) > 0 ? placeOfBirth : 'N/A'}</p>
				</li>

				<li className='hidden md:block'>
					<h5 className='text-lg font-bold'>Known As</h5>

					{knownAs.length > 0
						? knownAs?.map((word, index) => (
								<p className='font-light' key={`${word}-${index}`}>
									{word}
								</p>
						  ))
						: 'N/A'}
				</li>
			</ul>
		</div>
	</div>
);

export default PersonSidebar;
