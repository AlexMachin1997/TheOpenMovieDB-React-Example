import classNames from 'classnames';
import { SOCIAL, SocialLink } from '../../types/Social';
import { Icon, Tooltip } from '../Core';

const SocialIcon = ({ type }: { type: SOCIAL }) => {
	switch (type) {
		case SOCIAL.FACEBOOK: {
			return <Icon className='fa-brands fa-facebook fa-xl leading-[1]' />;
		}

		case SOCIAL.TWITTER: {
			return <Icon className='fa-brands fa-twitter fa-xl leading-[1]' />;
		}

		case SOCIAL.INSTAGRAM: {
			return <Icon className='fa-brands fa-instagram fa-xl leading-[1]' />;
		}

		case SOCIAL.TIKTOK: {
			return <Icon className='fa-brands fa-tiktok' />;
		}

		case SOCIAL.YOUTUBE: {
			return <Icon className='fa-brands fa-youtube' />;
		}

		case SOCIAL.HOMEPAGE: {
			return <Icon className='fa-solid fa-link fa-xl leading-[1]' />;
		}

		case SOCIAL.JUST_WATCH: {
			return <Icon className='fa-regular fa-circle-play fa-xl leading-[1]' />;
		}

		default: {
			return null;
		}
	}
};

const SocialLinks = ({ socials }: { socials: SocialLink[] }) => {
	// Get all the social links with a link assigned.
	const socialsWithLinks = socials.filter((el) => el.link !== '');

	// When there are no links don't render the list
	if (socialsWithLinks.length === 0) return null;

	return (
		<ul className='flex list-none flex-row flex-wrap space-x-4' id='social-links'>
			{socialsWithLinks.map((socialLink) => (
				<li
					key={socialLink.type}
					id={`${socialLink.type}-link`}
					className={classNames({
						'border-l border-solid border-l-gray-300':
							(socialLink.type === SOCIAL.HOMEPAGE || socialLink.type === SOCIAL.JUST_WATCH) &&
							socialsWithLinks.length > 1
					})}
				>
					<a
						href={socialLink.link}
						target='_blank'
						rel='noreferrer'
						className={classNames({
							'ml-3': socialLink.type === SOCIAL.HOMEPAGE || socialLink.type === SOCIAL.JUST_WATCH
						})}
					>
						<Tooltip tooltip={`Visit ${socialLink.type}`} placement='top'>
							<SocialIcon type={socialLink.type} />
						</Tooltip>
					</a>
				</li>
			))}
		</ul>
	);
};

export default SocialLinks;
