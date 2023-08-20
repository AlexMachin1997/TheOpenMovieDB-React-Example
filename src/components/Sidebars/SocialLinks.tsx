import { Icon, Tooltip } from '../Core';

type SocialLinks = {
	facebook: string;
	twitter: string;
	instagram: string;
	homepage: string;
};

const SocialLinks = ({ facebook, twitter, instagram, homepage }: SocialLinks) => (
	<ul className='flex list-none flex-row flex-wrap space-x-4'>
		{(facebook?.length ?? 0) > 0 && (
			<li>
				<a href={facebook} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Facebook' placement='top'>
						<Icon className='fa-brands fa-facebook fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(twitter?.length ?? 0) > 0 && (
			<li>
				<a href={twitter} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Twitter' placement='top'>
						<Icon className='fa-brands fa-twitter fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(instagram?.length ?? 0) > 0 && (
			<li>
				<a href={instagram} target='_blank' rel='noreferrer'>
					<Tooltip tooltip='Visit Instagram' placement='top'>
						<Icon className='fa-brands fa-instagram fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}

		{(homepage?.length ?? 0) > 0 && (
			<li>
				<a href={homepage} target='_blank' rel='noreferrer' className='ml-2'>
					<Tooltip tooltip='Visit Homepage' placement='top'>
						<Icon className='fa-solid fa-link fa-xl leading-[1]' />
					</Tooltip>
				</a>
			</li>
		)}
	</ul>
);

export default SocialLinks;
