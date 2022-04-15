import * as React from 'react';
import propTypes from 'prop-types';

import { Tooltip, Icon } from '../../Core';

const SocialLinks = ({ facebook, twitter, instagram, homepage }) => (
	<ul className='flex list-none flex-row flex-wrap'>
		{(facebook?.length ?? 0) > 0 && (
			<li className='mr-2'>
				<a href={facebook} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Facebook' title='Visit Facebook' placement='top'>
						<Icon className='fa-brands fa-facebook fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(twitter?.length ?? 0) > 0 && (
			<li className='mr-2'>
				<a href={twitter} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Twitter' title='Visit Twitter' placement='top'>
						<Icon className='fa-brands fa-twitter fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(instagram?.length ?? 0) > 0 && (
			<li className='mr-2 border-l-2 border-gray-200 '>
				<a href={instagram} target='_blank' rel='noreferrer' className='ml-2'>
					<Tooltip tooltip='Visit Instagram' title='Visit Instagram' placement='top'>
						<Icon className='fa-brands fa-instagram fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(homepage?.length ?? 0) > 0 && (
			<li className='border-l-2 border-gray-200'>
				<a href={homepage} target='_blank' rel='noreferrer' className='ml-2'>
					<Tooltip tooltip='Visit Homepage' title='Visit Homepage' placement='top'>
						<Icon className='fa-solid fa-link fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}
	</ul>
);

SocialLinks.defaultProps = {
	facebook: '',
	twitter: '',
	instagram: '',
	homepage: ''
};

SocialLinks.propTypes = {
	facebook: propTypes.string,
	twitter: propTypes.string,
	instagram: propTypes.string,
	homepage: propTypes.string
};

export default SocialLinks;
