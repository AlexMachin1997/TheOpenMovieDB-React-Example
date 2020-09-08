import React, { useState, useEffect } from 'react';

import Icon from '../../Core/Icon';
import Image from '../../Core/Image';
import Typography from '../../Core/Typography';
import SidebarMenuItem from './SidebarMenuItem';
import Dropdown from '../../Dropdown';
import { MobileHeader, Sidebar, DesktopHeaderContent, DesktopHeader, HeaderSection } from './Menu';

const NavigationMenu = () => {
	// Sidebar state
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Sidebar sections state
	const [isMovieSectionActive, setIsMovieSectionActive] = useState(false);
	const [isShowSectionActive, setIsShowSectionActive] = useState(false);
	const [isPeopleSectionActive, setIsPeopleSectionActive] = useState(false);

	useEffect(() => {
		// Create the sidebar resize event
		const sidebarResizeEvent = () => {
			if (isSidebarOpen === true && window.innerWidth > 900) {
				setIsSidebarOpen(false);
			}
		};

		// Adds a resize event, when the browser resizes and the sidebar is open trigger the callback
		window.addEventListener('resize', sidebarResizeEvent);

		// Removes the resize event (Requires the event and previous function to be passed in)
		return () => window.removeEventListener('resize', sidebarResizeEvent);
	}, [isSidebarOpen]);

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
					display={isMovieSectionActive}
					onItemClick={() => setIsMovieSectionActive(!isMovieSectionActive)}
				/>

				<SidebarMenuItem
					title='TV Shows'
					items={Shows}
					display={isShowSectionActive}
					onItemClick={() => setIsShowSectionActive(!isShowSectionActive)}
				/>

				<SidebarMenuItem
					title='People'
					items={People}
					display={isPeopleSectionActive}
					onItemClick={() => setIsPeopleSectionActive(!isPeopleSectionActive)}
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
						<li>
							<Image
								src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
								alt='TMBDb Logo'
								width='190px'
								height='20px'
							/>
						</li>

						<Dropdown
							content='Movies'
							contentType='text'
							items={Movies}
							linkType='internal'
							dropdownBackground='white'
							dropdownBorderColour='lightgrey'
							itemHoverBackground='lightgrey'
							background='inherit'
							colour='white'
						/>

						<Dropdown
							content='TV Shows'
							contentType='text'
							items={Shows}
							linkType='internal'
							dropdownBackground='white'
							dropdownBorderColour='lightgrey'
							itemHoverBackground='lightgrey'
							background='inherit'
							colour='white'
						/>

						<Dropdown
							content='People'
							contentType='text'
							items={People}
							linkType='internal'
							dropdownBackground='white'
							dropdownBorderColour='lightgrey'
							itemHoverBackground='lightgrey'
							background='inherit'
							colour='white'
						/>

						<Dropdown
							content='More'
							contentType='text'
							items={DesktopExternalLinks}
							linkType='external'
							dropdownBackground='white'
							dropdownBorderColour='lightgrey'
							itemHoverBackground='lightgrey'
							background='inherit'
							colour='white'
						/>
					</HeaderSection>

					<HeaderSection>
						<Typography
							text='Login'
							weight='bolder'
							colour='white'
							size='1rem'
							height='2.3rem'
							type='li'
						/>

						<Typography
							text='Register'
							weight='bolder'
							colour='white'
							size='1rem'
							height='2.3rem'
							type='li'
						/>

						<Icon icon='SearchCircle' size={40} colour='secondary' />
					</HeaderSection>
				</DesktopHeaderContent>
			</DesktopHeader>
		</div>
	);
};

export default NavigationMenu;
