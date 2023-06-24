import * as React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { Icon, Tooltip } from '../../Core';

const SocialLinks = ({ facebook, twitter, instagram, homepage, addBorderToHomepage }) => (
	<ul className='flex list-none flex-row flex-wrap space-x-4'>
		{(facebook?.length ?? 0) > 0 && (
			<li>
				<a href={facebook} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Facebook' title='Visit Facebook' placement='top'>
						<Icon className='fa-brands fa-facebook fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(twitter?.length ?? 0) > 0 && (
			<li>
				<a href={twitter} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Twitter' title='Visit Twitter' placement='top'>
						<Icon className='fa-brands fa-twitter fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(instagram?.length ?? 0) > 0 && (
			<li>
				<a href={instagram} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Instagram' title='Visit Instagram' placement='top'>
						<Icon className='fa-brands fa-instagram fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(homepage?.length ?? 0) > 0 && (
			<li
				className={classNames({
					'border-l-2': addBorderToHomepage === true,
					'border-gray-200': addBorderToHomepage === true
				})}
			>
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
	homepage: '',
	addBorderToHomepage: true
};

SocialLinks.propTypes = {
	facebook: PropTypes.string,
	twitter: PropTypes.string,
	instagram: PropTypes.string,
	homepage: PropTypes.string,
	addBorderToHomepage: PropTypes.bool
};

export default SocialLinks;
