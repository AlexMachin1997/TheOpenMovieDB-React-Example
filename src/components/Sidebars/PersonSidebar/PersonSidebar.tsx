import { Image } from '../../Core';

import SocialLinks from '../SocialLinks';

type Props = {
	actorName: string;
	actorImage: string;
	knownFor: string;
	knownCredits: string;
	gender: string;
	birthday: string;
	placeOfBirth: string;
	knownAs: string[];
	facebookLink: string;
	twitterLink: string;
	instagramLink: string;
	homepageLink: string;
};

const PersonSidebar = ({
	actorName,
	actorImage,
	knownFor,
	knownCredits,
	gender,
	birthday,
	placeOfBirth,
	knownAs,
	facebookLink,
	twitterLink,
	instagramLink,
	homepageLink
}: Props) => (
	<>
		<div className='flex flex-col justify-center pb-4 md:justify-start'>
			{/* TODO: Replace with a picture element to support multiple image sizes and less hacks to get it working as intended.... No more unset this unset that... */}
			<Image
				src={actorImage}
				alt={`${actorImage} profile`}
				className='m-auto !h-[250px] !w-[200px] rounded-xl md:m-0 md:!h-[450px] md:!w-[300px]'
				title={actorName}
				width='unset'
				height='unset'
				label={`A profile photo of ${actorName}`}
			/>
			<h3 className='my-4 text-center text-4xl font-bold text-black md:text-left'>{actorName}</h3>
			<div className='flex justify-center md:justify-start'>
				<SocialLinks
					facebook={facebookLink}
					twitter={twitterLink}
					instagram={instagramLink}
					homepage={homepageLink}
				/>
			</div>
		</div>

		<div className='m-auto max-w-[900px] md:max-w-none'>
			<h4 className='pb-4 text-xl text-black'>Personal info</h4>

			<ul className='grid grid-cols-2 justify-center gap-6 md:grid-cols-1'>
				<li className=''>
					<h5 className='text-lg'>Known For</h5>
					<p className='font-light'>{knownFor.length > 0 ? knownFor : 'N/A'}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Gender</h5>
					<p className='font-light'>{gender.length > 0 ? gender : 'N/A'}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Birthday</h5>
					<p className='font-light'>{birthday.length > 0 ? birthday : 'N/A'}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Know Credits</h5>
					<p className='font-light'>{knownCredits.length > 0 ? knownFor : 'N/A'}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Place of Birth</h5>
					<p className='font-light'>{placeOfBirth.length > 0 ? placeOfBirth : 'N/A'}</p>
				</li>

				<li className='hidden md:block'>
					<h5 className='text-lg'>Known As</h5>

					{knownAs.length > 0
						? knownAs?.map((word) => (
								<p className='font-light' key={word}>
									{word}
								</p>
						  ))
						: 'N/A'}
				</li>
			</ul>
		</div>
	</>
);

export default PersonSidebar;
