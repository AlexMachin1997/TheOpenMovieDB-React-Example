import * as React from 'react';
import PropTypes from 'prop-types';

import { Image } from '../../Core';

import SocialLinks from '../SocialLinks/SocialLinks';

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
}) => (
	<>
		<div className='flex flex-col justify-center pb-4 md:justify-start'>
			<Image
				src={actorImage}
				alt={`${actorImage} profile`}
				className='m-auto !h-[250px] !w-[200px] rounded-xl md:m-0 md:!h-[450px] md:!w-[300px]'
				title={actorName}
				width='unset'
				height='unset'
			/>
			<h3 className='mb-4 mt-4 text-center text-4xl font-bold text-black md:text-left'>
				{actorName}
			</h3>
			<div className='flex justify-center md:justify-start'>
				<SocialLinks
					facebook={facebookLink}
					twitter={twitterLink}
					instagram={instagramLink}
					homepage={homepageLink}
					addBorderToHomepage={false}
				/>
			</div>
		</div>

		<div className='m-auto max-w-[900px] md:max-w-none'>
			<h4 className='pb-4 text-xl text-black'>Personal info</h4>

			<ul className='grid grid-cols-2 justify-center gap-y-6 gap-x-6 md:grid-cols-1'>
				<li className=''>
					<h5 className='text-lg'>Known For</h5>
					<p className='font-light'>{knownFor}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Gender</h5>
					<p className='font-light'>{gender}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Birthday</h5>
					<p className='font-light'>{birthday}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Know Credits</h5>
					<p className='font-light'>{knownCredits}</p>
				</li>

				<li className=''>
					<h5 className='text-lg'>Place of Birth</h5>
					<p className='font-light'>{placeOfBirth}</p>
				</li>

				<li className='hidden md:block'>
					<h5 className='text-lg'>Known As</h5>

					{knownAs?.map((word) => (
						<p className='font-light' key={word}>
							{word}
						</p>
					))}
				</li>
			</ul>
		</div>
	</>
);

PersonSidebar.defaultProps = {
	actorName: '',
	actorImage: '',
	knownFor: '',
	knownCredits: 0,
	gender: '',
	birthday: '',
	placeOfBirth: '',
	knownAs: '',
	facebookLink: '',
	twitterLink: '',
	instagramLink: '',
	homepageLink: ''
};

PersonSidebar.propTypes = {
	actorName: PropTypes.string,
	actorImage: PropTypes.string,
	knownFor: PropTypes.string,
	knownCredits: PropTypes.number,
	gender: PropTypes.string,
	birthday: PropTypes.string,
	placeOfBirth: PropTypes.string,
	knownAs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	facebookLink: PropTypes.string,
	twitterLink: PropTypes.string,
	instagramLink: PropTypes.string,
	homepageLink: PropTypes.string
};

export default PersonSidebar;
