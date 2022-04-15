import * as React from 'react';
import PropTypes from 'prop-types';

import { Image } from '../../Core';

import Keywords from './Keywords/Keywords';
import SocialLinks from '../SocialLinks/SocialLinks';

const EntertainmentSidebar = ({
	facebookLink,
	twitterLink,
	instagramLink,
	homePageLink,
	status,
	type,
	keywords,
	originalLanguage,
	budget,
	revenue,
	networkImage,
	entertainmentType,
	entertainmentName
}) => (
	<>
		<div className='mb-4'>
			<SocialLinks
				facebook={facebookLink}
				twitter={twitterLink}
				instagram={instagramLink}
				homepage={homePageLink}
			/>
		</div>

		{entertainmentType === 'tv' && <h3 className='mb-4 text-2xl font-bold leading-[1]'>Facts</h3>}

		{(status?.length ?? 0) > 0 && (
			<div className='mb-4'>
				<h3 className='text-base font-bold leading-[1]'>Status</h3>
				<p className='font-base font-light'>{status}</p>
			</div>
		)}

		{entertainmentType === 'movie' && (originalLanguage?.length ?? 0) > 0 && (
			<div className='mb-4'>
				<h3 className='text-base font-bold leading-[1]'>Original Language</h3>
				<p className='font-base font-light'>{originalLanguage}</p>
			</div>
		)}

		{entertainmentType === 'tv' &&
			(entertainmentName?.length ?? 0) > 0 &&
			(networkImage?.length ?? 0) > 0 && (
				<div className='mb-4'>
					<h3 className='text-base font-bold leading-[1]'>Network</h3>
					<Image
						src={networkImage}
						width='50px'
						height='30px'
						alt='Network logo'
						label={`The network logo for ${entertainmentName}`}
					/>
				</div>
			)}

		{entertainmentType === 'movie' && (budget?.length ?? 0) > 0 && (
			<div className='mb-4'>
				<h3 className='text-base font-bold leading-[1]'>Budget</h3>
				<p className='font-base font-light'>{budget}</p>
			</div>
		)}

		{entertainmentType === 'tv' && (type?.length ?? 0) > 0 && (
			<div className='mb-4'>
				<h3 className='text-base font-bold leading-[1]'>Type</h3>
				<p className='font-base font-light'>{type}</p>
			</div>
		)}

		{entertainmentType === 'movie' && (revenue?.length ?? 0) > 0 && (
			<div className='mb-4'>
				<h3 className='text-base font-bold leading-[1]'>Revenue</h3>
				<p className='font-base font-light'>{revenue}</p>
			</div>
		)}

		{entertainmentType === 'tv' && (originalLanguage?.length ?? 0) > 0 && (
			<div className='mb-4'>
				<h3 className='text-base font-bold leading-[1]'>Original Language</h3>
				<p className='font-base font-light'>{originalLanguage}</p>
			</div>
		)}

		{(keywords?.length ?? 0) > 0 && (
			<div>
				<h3 className='text-base font-bold leading-[1]'>Keywords</h3>
				<Keywords keywords={keywords} />
			</div>
		)}
	</>
);

EntertainmentSidebar.propTypes = {
	facebookLink: PropTypes.string,
	twitterLink: PropTypes.string,
	instagramLink: PropTypes.string,
	homePageLink: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string,
	keywords: PropTypes.arrayOf(PropTypes.string),
	originalLanguage: PropTypes.string,
	budget: PropTypes.string,
	revenue: PropTypes.string,
	networkImage: PropTypes.string,
	entertainmentType: PropTypes.string,
	entertainmentName: PropTypes.string
};

EntertainmentSidebar.defaultProps = {
	facebookLink: '',
	twitterLink: '',
	instagramLink: '',
	homePageLink: '',
	status: '-',
	type: '-',
	keywords: [],
	originalLanguage: '-',
	budget: '-',
	revenue: '-',
	entertainmentType: 'tv',
	networkImage: '',
	entertainmentName: '-'
};

export default EntertainmentSidebar;
