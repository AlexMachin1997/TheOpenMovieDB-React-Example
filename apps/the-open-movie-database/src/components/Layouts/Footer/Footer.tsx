import { Image } from '~/components/Core';

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

const FooterComponent = () => (
	<footer className='bg-primary p-4 xl:place-content-center'>
		<div className='flex flex-col gap-4 lg:ml-auto lg:mr-auto lg:max-w-[900px] lg:flex-row lg:justify-between'>
			<div className='mb-4 flex-col items-start gap-4 xl:flex xl:items-end'>
				<Image
					src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
					alt='TMBDb Logo'
					width={140}
					height={140}
					label='The Open Movie Database Logo'
				/>

				<a
					className='mb-3 rounded-lg bg-white p-3 font-bold uppercase text-[#235ea7]'
					href='https://www.themoviedb.org/signup?language=en-GB'
				>
					Join the Community
				</a>
			</div>

			<div>
				<h3 className='mb-3 text-base font-bold uppercase text-white underline underline-offset-[10px]'>
					The Basics
				</h3>

				<ul>
					{TheBasics.map((section) => (
						<li key={section.text}>
							<a className='mb-3 block font-light text-white' href={section.link}>
								{section.text}
							</a>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className='mb-3 text-base font-bold uppercase text-white underline	underline-offset-[10px]'>
					Get Involved
				</h3>

				<ul>
					{GetInvolved.map((section) => (
						<li key={section.text}>
							<a className='mb-3 block font-light text-white' href={section.link}>
								{section.text}
							</a>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className='mb-3 text-base font-bold uppercase text-white underline	underline-offset-[10px]'>
					Community
				</h3>

				<ul>
					{Community.map((section) => (
						<li key={section.text}>
							<a className='mb-3 inline-flex font-light text-white' href={section.link}>
								{section.text}
							</a>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className='mb-3 text-base font-bold uppercase text-white underline	underline-offset-[10px]'>
					Legal
				</h3>

				<ul>
					{Legal.map((section) => (
						<li key={section.text}>
							<a className='mb-3 block font-light text-white' href={section.link}>
								{section.text}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	</footer>
);

export default FooterComponent;
