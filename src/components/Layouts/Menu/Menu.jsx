import * as React from 'react';
import className from 'classnames';
import { Link } from 'react-router-dom';

import Icon from '../../Core/Icon';
import Image from '../../Core/Image';
import Typography from '../../Core/Typography';
import Dropdown from '../../Core/Dropdown';

import SearchBar from './SearchBar/SearchBar';
import MobileMenuDropdown from './MobileMenuDropdown/MobileMenuDropdown';

import useClientSideRoutes from '../../../hooks/useClientSideRoutes';

const DropdownProps = {
	titleType: 'text',
	dropdownBackground: 'white',
	dropdownBorderColour: 'lightgrey',
	itemHoverBackground: 'lightgrey',
	background: 'inherit',
	colour: 'white'
};

const NavigationMenu = () => {
	// MobileSidebar state
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

	// Search bar
	const [isSearchBarVisible, setIsSearchBarVisible] = React.useState(false);

	const routes = useClientSideRoutes({
		includesElements: false
	});

	React.useEffect(() => {
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

	const Movies = React.useMemo(
		() =>
			routes
				.find((el) => el.url.includes('/movies'))
				.children.filter((el) => el.menuTitle !== '')
				.map((el) => ({ ...el, type: 'internal' })),
		[routes]
	);

	const Shows = React.useMemo(
		() =>
			routes
				.find((el) => el.url.includes('/shows'))
				.children.filter((el) => el.menuTitle !== '')
				.map((el) => ({ ...el, type: 'internal' })),
		[routes]
	);

	const People = React.useMemo(
		() =>
			routes
				.find((el) => el.url.includes('/people'))
				.children.filter((el) => el.menuTitle !== '')
				.map((el) => ({ ...el, type: 'internal' })),
		[routes]
	);

	const SidebarExternalLinks = [
		{
			menuTitle: 'Contribution Bible',
			url: ''
		},
		{
			menuTitle: "App's",
			url: ''
		},
		{
			menuTitle: 'Discussions',
			url: ''
		},
		{
			menuTitle: 'Leaderboard',
			url: ''
		},
		{
			menuTitle: 'Contribute',
			url: ''
		},
		{
			menuTitle: 'API',
			url: ''
		},
		{
			menuTitle: 'Support',
			url: ''
		},
		{
			menuTitle: 'About',
			url: ''
		}
	];

	const DesktopExternalLinks = [
		{
			menuTitle: 'Discussions',
			url: ''
		},
		{
			menuTitle: 'Leaderboard',
			url: ''
		},
		{
			menuTitle: 'Support',
			url: ''
		},
		{
			menuTitle: 'API',
			url: ''
		}
	];

	return (
		<div>
			<SearchBar display={isSearchBarVisible} />

			<aside
				className={className(
					'fixed top-[75px] bg-primary opacity-90 p-4 bottom-0 overflow-y-scroll backdrop-blur-[20px] ease-in duration-500',
					{
						// When the menu item is active
						'left-0': isSidebarOpen === true,

						// When the sidebar is not open hide it, put the menu offscreen
						'left-[-90%]': isSidebarOpen === false,

						// When the sidebar is open make it full width
						'w-full': isSidebarOpen === true,

						// When the sidebar is not open make the height 0
						'w-0': isSidebarOpen === false
					}
				)}
			>
				<MobileMenuDropdown title='Movies' items={Movies} />

				<MobileMenuDropdown title='TV Shows' items={Shows} />

				<MobileMenuDropdown title='People' items={People} />

				<MobileMenuDropdown title='External' items={SidebarExternalLinks} />
			</aside>

			<div className='flex lg:hidden justify-between items-center bg-primary p-4 fixed top-0 right-0 left-0'>
				<div
					onClick={() => {
						setIsSidebarOpen(!isSidebarOpen);
						setIsSearchBarVisible(false);
					}}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							setIsSidebarOpen(!isSidebarOpen);
							setIsSearchBarVisible(false);
						}
					}}
					className='flex items-center p-0 m-0 cursor-pointer'
					type='button'
					role='button'
					tabIndex={0}
					aria-hidden={isSidebarOpen.toString()}
					aria-label={isSidebarOpen === true ? 'Open sidebar' : 'Close sidebar'}
				>
					<Icon icon='Menu' size={30} colour='white' />
				</div>

				<Image
					src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
					alt='TMBDb Logo'
					width='75px'
					height='40px'
					className='cursor-pointer'
				/>

				<div
					onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
					className='flex items-center p-0 m-0 cursor-pointer'
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							setIsSearchBarVisible(!isSearchBarVisible);
						}
					}}
					type='button'
					role='button'
					tabIndex={0}
					aria-hidden={isSearchBarVisible.toString()}
					aria-label={isSearchBarVisible === true ? 'Open search bar' : 'Close search bar'}
				>
					<Icon
						icon={isSearchBarVisible === true ? 'Close' : 'SearchCircle'}
						size={30}
						colour='secondary'
					/>
				</div>
			</div>

			<nav className='bg-primary fixed top-0 right-0 left-0'>
				<div className='lg:flex hidden max-w-[1400px] justify-between p-4'>
					<div className='flex items-center p-0 m-0' id='desktop-navigation-menu-left-hand-side'>
						<Image
							src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
							alt='TMBDb Logo'
							width='190px'
							height='20px'
						/>

						<div className='pr-4'>
							<Dropdown {...DropdownProps} title='Movies'>
								<ul>
									{Movies.map((data, index) => (
										<li key={index} className='py-2'>
											<Link to={data.url} className='text-black text-base p-0 m-0'>
												{data.menuTitle}
											</Link>
										</li>
									))}
								</ul>
							</Dropdown>
						</div>

						<div className='pr-4'>
							<Dropdown {...DropdownProps} title='TV Shows'>
								<ul>
									{Shows.map((data, index) => (
										<li key={index} className='py-2'>
											<Link to={data.url} className='text-black text-base p-0 m-0'>
												{data.menuTitle}
											</Link>
										</li>
									))}
								</ul>
							</Dropdown>
						</div>

						<div className='pr-4'>
							<Dropdown {...DropdownProps} title='People'>
								<ul>
									{People.map((data, index) => (
										<li key={index} className='py-2'>
											<Link to={data.url} className='text-black text-base p-0 m-0'>
												{data.menuTitle}
											</Link>
										</li>
									))}
								</ul>
							</Dropdown>
						</div>

						<div className='pr-4'>
							<Dropdown {...DropdownProps} title='More'>
								<ul>
									{DesktopExternalLinks.map((data, index) => (
										<li key={index} className='py-2'>
											<a className='text-black text-base p-0 m-0' href={data.url}>
												{data.menuTitle}
											</a>
										</li>
									))}
								</ul>
							</Dropdown>
						</div>
					</div>

					<ul className='flex items-center p-0 m-0' id='desktop-navigation-menu-right-hand-side'>
						<li>
							<Typography
								text='Login'
								weight='bolder'
								colour='white'
								size='1rem'
								height='2.3rem'
								type='p'
							/>
						</li>

						<li>
							<Typography
								text='Register'
								weight='bolder'
								colour='white'
								size='1rem'
								height='2.3rem'
								type='p'
							/>
						</li>

						<li>
							<button
								onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
								tabIndex='0'
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										setIsSearchBarVisible(!isSearchBarVisible);
									}
								}}
								type='button'
							>
								<Icon
									icon={isSearchBarVisible === true ? 'Close' : 'SearchCircle'}
									size={30}
									colour='secondary'
								/>
								<span className='sr-only'>Search toggle</span>
							</button>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default NavigationMenu;
