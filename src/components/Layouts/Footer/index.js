import React from 'react';

import { Container, Footer, FooterContent, JoinNowColumn } from './Footer';
import Image from '../../Core/Image';
import Typography from '../../Core/Typography';
import Button from '../../Core/Button';

const FooterComponent = () => {
	const TheBasics = [
		{ text: 'About TMDb' },
		{ text: 'Contact Us' },
		{ text: 'Support Forums' },
		{ text: 'API' },
		{ text: 'System Status' }
	];

	const GetInvolved = [
		{ text: 'Contribution Bible' },
		{ text: '3rd Party Applications' },
		{ text: 'Add New Movie' },
		{ text: 'Add New TV Show' }
	];

	const Community = [
		{ text: 'Guidelines' },
		{ text: 'Discussion' },
		{ text: 'Leaderboard' },
		{ text: 'Twitter' }
	];

	const Legal = [
		{ text: 'Terms of use' },
		{ text: 'API Terms of Use' },
		{ text: 'Privacy Policy' }
	];

	return (
		<Container>
			<Footer>
				<FooterContent>
					<JoinNowColumn>
						<Image
							src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
							alt='TMBDb Logo'
							width='140px'
							height='140px'
						/>
						<div>
							<Button
								content={
									<Typography
										type='h1'
										text='Join The Community'
										colour='secondary'
										size='0.8rem'
										weight='bolder'
										transform='uppercase'
									/>
								}
								background='white'
								borderRadius='0.5rem'
							/>
						</div>
					</JoinNowColumn>
				</FooterContent>

				<FooterContent>
					<div>
						<Typography
							type='h1'
							text='The Basics'
							colour='white'
							size='1.3rem'
							weight='bolder'
							transform='uppercase'
							height='2.3rem'
						/>
					</div>

					{TheBasics.map((data, index) => (
						<Typography
							key={index}
							type='p'
							text={data.text}
							colour='white'
							size='1.2rem'
							weight='lighter'
							height='2.3rem'
						/>
					))}
				</FooterContent>

				<FooterContent>
					<div>
						<Typography
							type='h1'
							text='Get Involved'
							colour='white'
							size='1.3rem'
							weight='bolder'
							height='2.3rem'
						/>
					</div>

					{GetInvolved.map((data, index) => (
						<Typography
							key={index}
							type='p'
							text={data.text}
							colour='white'
							size='1.2rem'
							weight='lighter'
							height='2.3rem'
						/>
					))}
				</FooterContent>

				<FooterContent>
					<div>
						<Typography
							type='h1'
							text='Community'
							colour='white'
							size='1.3rem'
							weight='bolder'
							transform='uppercase'
							height='2.3rem'
						/>
					</div>

					{Community.map((data, index) => (
						<Typography
							key={index}
							type='p'
							text={data.text}
							colour='white'
							size='1.2rem'
							weight='lighter'
							height='2.3rem'
						/>
					))}
				</FooterContent>

				<FooterContent>
					<div>
						<Typography
							type='h1'
							text='Legal'
							colour='white'
							size='1.3rem'
							weight='bolder'
							transform='uppercase'
							height='2.3rem'
						/>
					</div>

					{Legal.map((data, index) => (
						<Typography
							key={index}
							type='p'
							text={data.text}
							colour='white'
							size='1.2rem'
							weight='lighter'
							height='2.3rem'
						/>
					))}
				</FooterContent>
			</Footer>
		</Container>
	);
};

export default FooterComponent;
