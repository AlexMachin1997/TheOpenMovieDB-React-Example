import React, { useState, useEffect } from 'react';

import Icon from '../../Core/Icon';
import Image from '../../Core/Image';
import Typography from '../../Core/Typography';
import SidebarMenuItem from './SidebarMenuItem';
import Dropdown from '../../Core/Dropdown';
import {
	MenuItem,
	MobileMenu,
	MenuSection,
	MobileSidebar,
	DesktopContainer,
	DesktopMenu
} from './Menu';
import SearchBar from './SearchBar';

const NavigationMenu = () => {
	// MobileSidebar state
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Search bar
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

	// MobileSidebar sections state
	const [isMovieSectionActive, setIsMovieSectionActive] = useState(false);
	const [isShowSectionActive, setIsShowSectionActive] = useState(false);
	const [isPeopleSectionActive, setIsPeopleSectionActive] = useState(false);

	useEffect(() => {
		// Create the MobileSidebar resize event
		const sidebarResizeEvent = () => {
			if (isSidebarOpen === true && window.innerWidth > 900) {
				setIsSidebarOpen(false);
			}
		};

		// Adds a resize event, when the browser resizes and the MobileSidebar is open trigger the callback
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
			<SearchBar display={isSearchBarVisible} />

			<MobileSidebar isSideBarOpen={isSidebarOpen}>
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

				<SidebarMenuItem items={SidebarExternalLinks} textColour='#ffffff' titleType='external' />
			</MobileSidebar>

			<MobileMenu aria-labelledby='Mobile Navigation'>
				<MenuSection
					onClick={() => {
						setIsSidebarOpen(!isSidebarOpen);
						setIsSearchBarVisible(false);
					}}
					tabIndex='0'
					role='button'
				>
					<MenuItem tabIndex='0'>
						<Icon icon='Menu' size={30} colour='white' />
					</MenuItem>
				</MenuSection>

				<MenuSection>
					<MenuItem tabIndex='0'>
						<Image
							src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
							alt='TMBDb Logo'
							width='75px'
							height='40px'
						/>
					</MenuItem>
				</MenuSection>

				<MenuSection onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}>
					<MenuItem tabIndex='0'>
						<Icon
							icon={isSearchBarVisible === true ? 'Close' : 'SearchCircle'}
							size={30}
							colour='secondary'
						/>
					</MenuItem>
				</MenuSection>
			</MobileMenu>

			<DesktopMenu aria-labelledby='Desktop Navigation'>
				<DesktopContainer>
					<MenuSection>
						<MenuItem tabIndex='0'>
							<Image
								src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
								alt='TMBDb Logo'
								width='190px'
								height='20px'
							/>
						</MenuItem>

						<MenuItem>
							<Dropdown
								title='Movies'
								titleType='text'
								dropdownBackground='white'
								dropdownBorderColour='lightgrey'
								itemHoverBackground='lightgrey'
								background='inherit'
								colour='white'
							>
								{Movies.map((data, index) => (
									<Typography
										key={index}
										text={data.text}
										weight='lighter'
										colour='black'
										size='1rem'
										height='2.3rem'
										type='li'
									/>
								))}
							</Dropdown>
						</MenuItem>

						<MenuItem>
							<Dropdown
								title='TV Shows'
								titleType='text'
								dropdownBackground='white'
								dropdownBorderColour='lightgrey'
								itemHoverBackground='lightgrey'
								background='inherit'
								colour='white'
							>
								{Shows.map((data, index) => (
									<Typography
										key={index}
										text={data.text}
										weight='lighter'
										colour='black'
										size='1rem'
										height='2.3rem'
										type='li'
									/>
								))}
							</Dropdown>
						</MenuItem>

						<MenuItem>
							<Dropdown
								title='People'
								titleType='text'
								dropdownBackground='white'
								dropdownBorderColour='lightgrey'
								itemHoverBackground='lightgrey'
								background='inherit'
								colour='white'
							>
								{People.map((data, index) => (
									<Typography
										key={index}
										text={data.text}
										weight='lighter'
										colour='black'
										size='1rem'
										height='2.3rem'
										type='li'
									/>
								))}
							</Dropdown>
						</MenuItem>

						<MenuItem>
							<Dropdown
								title='More'
								titleType='text'
								dropdownBackground='white'
								dropdownBorderColour='lightgrey'
								itemHoverBackground='lightgrey'
								background='inherit'
								colour='white'
							>
								{DesktopExternalLinks.map((data, index) => (
									<Typography
										key={index}
										text={data.text}
										href={data.link}
										weight='lighter'
										colour='black'
										size='1rem'
										height='2.3rem'
										type='a'
									/>
								))}
							</Dropdown>
						</MenuItem>
					</MenuSection>

					<MenuSection>
						<MenuItem tabIndex='0'>
							<Typography
								text='Login'
								weight='bolder'
								colour='white'
								size='1rem'
								height='2.3rem'
								type='p'
							/>
						</MenuItem>

						<MenuItem tabIndex='0'>
							<Typography
								text='Register'
								weight='bolder'
								colour='white'
								size='1rem'
								height='2.3rem'
								type='p'
							/>
						</MenuItem>

						<span
							role='button'
							tabIndex='0'
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setIsSearchBarVisible(!isSearchBarVisible);
								}
							}}
						>
							<Icon
								icon={isSearchBarVisible === true ? 'Close' : 'SearchCircle'}
								size={30}
								colour='secondary'
								onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
							/>
						</span>
					</MenuSection>
				</DesktopContainer>
			</DesktopMenu>
		</div>
	);
};

export default NavigationMenu;
