import React, { useState } from 'react';

import { Menu } from 'styled-icons/boxicons-regular';
import { SearchCircle } from 'styled-icons/heroicons-outline';

import Image from '../../Core/Image';
import Typography from '../../Core/Typography';
import SidebarDropdown from './SidebarDropdown';

import { Container, Sidebar } from './Menu';

const NavigationMenu = () => {
	// Menu Toggled State
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const Movies = [
		{
			text: 'Popular',
			link: ''
		},
		{
			text: 'Top Rated',
			link: ''
		},
		{
			text: 'Upcoming',
			link: ''
		},
		{
			text: 'Now Playing',
			link: ''
		}
	];

	const Shows = [
		{
			text: 'Popular',
			link: ''
		},
		{
			text: 'Top Rated',
			link: ''
		},
		{
			text: 'On TV',
			link: ''
		},
		{
			text: 'Airing Today',
			link: ''
		}
	];

	const ExternalLinks = [
		{
			text: 'Contribution Bible',
			link: ''
		},
		{
			text: "App's",
			link: ''
		},
		{
			text: 'Discussions',
			link: ''
		},
		{
			text: 'Leaderboard',
			link: ''
		},
		{
			text: 'Contribute',
			link: ''
		},
		{
			text: 'API',
			link: ''
		},
		{
			text: 'Support',
			link: ''
		},
		{
			text: 'About',
			link: ''
		}
	];

	return (
		<div>
			<Sidebar isSideBarOpen={isSidebarOpen}>
				<SidebarDropdown title='Movies'>
					{Movies.map((data, index) => (
						<Typography
							key={index}
							text={data.text}
							weight='lighter'
							colour='white'
							size='1rem'
							height='2.3rem'
						/>
					))}
				</SidebarDropdown>

				<SidebarDropdown title='TV Shows'>
					{Shows.map((data, index) => (
						<Typography
							key={index}
							text={data.text}
							weight='lighter'
							colour='white'
							size='1rem'
							height='2.3rem'
						/>
					))}
				</SidebarDropdown>

				<SidebarDropdown title='People'>
					<Typography
						text='Popular People'
						weight='lighter'
						colour='white'
						size='1rem'
						height='2.3rem'
					/>
				</SidebarDropdown>

				<div>
					{ExternalLinks.map((data, index) => (
						<Typography
							key={index}
							text={data.text}
							weight='lighter'
							colour='#ffffff'
							size='1rem'
							height='2.3rem'
						/>
					))}
				</div>
			</Sidebar>
			<Container>
				<div onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
					<Menu size={40} />
				</div>

				<div>
					<Image
						src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
						alt='TMBDb Logo'
						width='75px'
						height='40px'
					/>
				</div>

				<div>
					<SearchCircle size={40} />
				</div>
			</Container>
		</div>
	);
};

export default NavigationMenu;
