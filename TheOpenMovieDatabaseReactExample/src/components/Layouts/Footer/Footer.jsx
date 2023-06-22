import * as React from 'react';

import { Image } from '../../Core';

const FooterComponent = () => {
	const TheBasics = [
		{ text: 'About TMDb', link: 'https://www.themoviedb.org/about' },
		{ text: 'Contact Us', link: 'https://www.themoviedb.org/about/staying-in-touch' },
		{ text: 'Support Forums', link: 'https://www.themoviedb.org/talk' },
		{ text: 'API', link: 'https://www.themoviedb.org/documentation/api' },
		{ text: 'System Status', link: 'https://status.themoviedb.org/' }
	];

	const GetInvolved = [{ text: 'Contribution Bible', link: 'https://status.themoviedb.org/' }];

	const Community = [
		{ text: 'Guidelines', link: 'https://www.themoviedb.org/documentation/community/guidelines' },
		{ text: 'Discussion', link: 'https://www.themoviedb.org/discuss' },
		{ text: 'Leaderboard', link: 'https://www.themoviedb.org/leaderboard' },
		{ text: 'Twitter', link: 'https://twitter.com/themoviedb' }
	];

	const Legal = [
		{ text: 'Terms of use', link: 'https://www.themoviedb.org/terms-of-use' },
		{ text: 'API Terms of Use', link: 'https://www.themoviedb.org/documentation/api/terms-of-use' },
		{ text: 'Privacy Policy', link: 'https://www.themoviedb.org/privacy-policy' }
	];

	return (
		<footer className='grid bg-primary xl:place-content-center'>
			<div className='grid max-w-[1300px] grid-cols-1 gap-x-3 bg-primary p-8 xl:grid-cols-5'>
				<div className='mb-4 flex-col items-start xl:flex xl:items-end'>
					<div>
						<Image
							src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
							alt='TMBDb Logo'
							width='140px'
							height='140px'
						/>
					</div>

					<div className='mb-3'>
						<a
							className='rounded-lg bg-white p-3 font-bold uppercase text-[#235ea7]'
							href='https://www.themoviedb.org/signup?language=en-GB'
						>
							Join the Community
						</a>
					</div>
				</div>

				<div>
					<h3 className='mb-3 text-base font-bold uppercase text-white underline	underline-offset-1'>
						The Basics
					</h3>

					{TheBasics.map((section, index) => (
						<a className='mb-3 block font-light text-white' key={index} href={section.link}>
							{section.text}
						</a>
					))}
				</div>

				<div>
					<h3 className='mb-3 text-base font-bold uppercase text-white underline	underline-offset-1'>
						Get Involved
					</h3>

					{GetInvolved.map((section, index) => (
						<a className='mb-3 block font-light text-white' key={index} href={section.link}>
							{section.text}
						</a>
					))}
				</div>

				<div>
					<h3 className='mb-3 text-base font-bold uppercase text-white underline	underline-offset-1'>
						Community
					</h3>

					{Community.map((section, index) => (
						<a className='mb-3 block font-light text-white' key={index} href={section.link}>
							{section.text}
						</a>
					))}
				</div>

				<div>
					<h3 className='mb-3 text-base font-bold uppercase text-white underline	underline-offset-1'>
						Legal
					</h3>

					{Legal.map((section, index) => (
						<a className='mb-3 block font-light text-white' key={index} href={section.link}>
							{section.text}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;
