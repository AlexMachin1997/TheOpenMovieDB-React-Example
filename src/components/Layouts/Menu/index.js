import React, { useState, useEffect } from 'react';

import Icon from '../../Core/Icon';
import Image from '../../Core/Image';
import SidebarMenuItem from './SidebarMenuItem';
import DesktopMenuItem from './DesktopMenuItem';
import { MobileHeader, Sidebar, DesktopHeaderContent, DesktopHeader, HeaderSection } from './Menu';

const NavigationMenu = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [sidebarSectionIndex, setSidebarSectionIndex] = useState(0);

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (isSidebarOpen && window.innerWidth > 900) {
				setIsSidebarOpen(false);
			}
		});
	});

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

	const People = [
		{
			text: 'Popular People',
			link: ''
		}
	];

	const SidebarExternalLinks = [
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

	const DesktopExternalLinks = [
		{
			text: 'Discussions',
			link: ''
		},
		{
			text: 'Leaderboard',
			link: ''
		},
		{
			text: 'Support',
			link: ''
		},
		{
			text: 'API',
			link: ''
		}
	];

	return (
		<div>
			<Sidebar isSideBarOpen={isSidebarOpen}>
				<SidebarMenuItem
					title='Movies'
					items={Movies}
					display={sidebarSectionIndex === 1}
					onItemClick={() =>
						sidebarSectionIndex !== 1 ? setSidebarSectionIndex(1) : setSidebarSectionIndex(0)
					}
				/>

				<SidebarMenuItem
					title='TV Shows'
					items={Shows}
					display={sidebarSectionIndex === 2}
					onItemClick={() =>
						sidebarSectionIndex !== 2 ? setSidebarSectionIndex(2) : setSidebarSectionIndex(0)
					}
				/>

				<SidebarMenuItem
					title='People'
					items={People}
					display={sidebarSectionIndex === 3}
					onItemClick={() =>
						sidebarSectionIndex !== 3 ? setSidebarSectionIndex(3) : setSidebarSectionIndex(0)
					}
				/>

				<SidebarMenuItem items={SidebarExternalLinks} textColour='#ffffff' contentType='external' />
			</Sidebar>

			<MobileHeader aria-labelledby='Mobile Navigation'>
				<HeaderSection onClick={() => setIsSidebarOpen(!isSidebarOpen)} tabIndex='0' role='button'>
					<li>
						<Icon icon='Menu' size={40} colour='white' />
					</li>
				</HeaderSection>

				<HeaderSection>
					<li>
						<Image
							src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
							alt='TMBDb Logo'
							width='75px'
							height='40px'
						/>
					</li>
				</HeaderSection>

				<HeaderSection>
					<li>
						<Icon icon='SearchCircle' size={40} colour='secondary' />
					</li>
				</HeaderSection>
			</MobileHeader>

			<DesktopHeader aria-labelledby='Desktop Navigation'>
				<DesktopHeaderContent>
					<HeaderSection>
						<DesktopMenuItem
							headingType='image'
							content={
								<Image
									src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
									alt='TMBDb Logo'
									width='190px'
									height='20px'
								/>
							}
						/>

						<DesktopMenuItem content='Movies' items={Movies} />

						<DesktopMenuItem content='TV Shows' items={Shows} />

						<DesktopMenuItem content='People' items={People} />

						<DesktopMenuItem content='More' items={DesktopExternalLinks} />
					</HeaderSection>

					<HeaderSection>
						<DesktopMenuItem content='Login' />

						<DesktopMenuItem content='Register' />

						<DesktopMenuItem
							content={<Icon icon='SearchCircle' size={40} colour='secondary' />}
							headingType='image'
						/>
					</HeaderSection>
				</DesktopHeaderContent>
			</DesktopHeader>
		</div>
	);
};

export default NavigationMenu;
