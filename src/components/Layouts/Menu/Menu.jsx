import * as React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Icon, Image, Dropdown, Button } from '../../Core';

import SearchBar from './SearchBar/SearchBar';
import MobileMenuDropdown from './MobileMenuDropdown/MobileMenuDropdown';
import Links from './Links/Links';

import useClientSideRoutes from '../../../hooks/useClientSideRoutes';

const DropdownProps = {
	buttonClass: 'text-white rounded-md font-bold',
	dropdownClass: 'bg-white border-slate-300 border-[1px] rounded-2xl p-2',
	alignment: 'left',
	containerClass: 'pr-4'
};

const LinksProps = {
	wrapperTag: 'div',
	listItemClassName: 'pr-4 hover:bg-zinc-50 cursor-pointer p-2',
	anchorClassName: 'text-black text-base p-0 m-0',
	className: 'p-2'
};

const NavigationMenu = ({ isAuthenticated }) => {
	// MobileSidebar state
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

	// Search bar
	const [isSearchBarVisible, setIsSearchBarVisible] = React.useState(false);

	// Get the client side routes without the page elements
	const {
		menuLinks: { movieLinks, showLinks, personLinks }
	} = useClientSideRoutes({
		includesElements: false
	});

	// Handles the closing of the mobile navigation bar when the screen resizes
	React.useEffect(() => {
		// Create the MobileSidebar resize event
		const sidebarResizeEvent = () => {
			if (isSidebarOpen === true && window.innerWidth > 900) {
				setIsSidebarOpen(false);
			}
		};

		const handleEscClick = (event) => {
			if (isSidebarOpen === true && event.key === 'Escape') {
				// When the user clicks the Escape (esc) key close the dropdown
				setIsSidebarOpen(false);
			}
		};

		// Adds a resize event, when the browser resizes and the MobileSidebar is open trigger the callback
		window.addEventListener('resize', sidebarResizeEvent);

		// When the user keys up use the handleEscClick
		window.addEventListener('keyup', handleEscClick, true);

		// Removes the resize event (Requires the event and previous function to be passed in)
		return () => {
			window.removeEventListener('resize', sidebarResizeEvent);

			// Remove the keyup event (Requires the same arguments as addEventListener)
			window.removeEventListener('keyup', handleEscClick, true);
		};
	}, [isSidebarOpen]);

	const externalLinks = [
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

	return (
		<div>
			<SearchBar display={isSearchBarVisible} />

			<aside
				id='mobile-navigation-sidebar'
				aria-label='mobile navigation menu sidebar'
				className={className(
					'fixed top-[75px] bottom-0 overflow-y-scroll bg-primary p-4 opacity-90 backdrop-blur-[20px] duration-500 ease-in',
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
				<MobileMenuDropdown title='Movies' links={movieLinks} />

				<MobileMenuDropdown title='TV Shows' links={showLinks} />

				<MobileMenuDropdown title='People' links={personLinks} />

				<Links links={externalLinks} />

				<Links
					links={
						isAuthenticated === true
							? [{ menuTitle: 'Logout', url: '/' }]
							: [{ menuTitle: 'Sign in', url: '/' }]
					}
				/>
			</aside>

			<nav
				id='mobile-navigation-menu'
				className='fixed top-0 right-0 left-0 bg-primary p-4'
				aria-label='mobile navigation menu'
				role='navigation'
			>
				<ul className='flex items-center justify-between md:hidden'>
					<li>
						<Button
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
							className='m-0 flex cursor-pointer items-center p-0'
							aria-hidden={isSidebarOpen.toString()}
							aria-label={isSidebarOpen === true ? 'Open sidebar' : 'Close sidebar'}
						>
							<Icon className='fa-solid fa-bars text-white' />
						</Button>
					</li>
					<li>
						<Link to='/'>
							<Image
								src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
								alt='TMBDb Logo'
								width='75px'
								height='40px'
								className='cursor-pointer'
							/>
						</Link>
					</li>
					<li>
						<Button
							onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
							className='m-0 flex cursor-pointer items-center p-0'
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									setIsSearchBarVisible(!isSearchBarVisible);
								}
							}}
							aria-hidden={isSearchBarVisible.toString()}
							aria-label={isSearchBarVisible === true ? 'Open search bar' : 'Close search bar'}
						>
							<Icon
								className={className('text-white', {
									'fa-solid fa-xmark': isSearchBarVisible === true,
									'fa-solid fa-magnifying-glass': isSearchBarVisible === false
								})}
							/>
						</Button>
					</li>
				</ul>
			</nav>

			<nav
				id='desktop-navigation-menu'
				className='fixed top-0 right-0 left-0 bg-primary'
				aria-label='desktop navigation menu'
				role='navigation'
			>
				<div className='mx-auto hidden max-w-[1400px] justify-between	p-4 md:flex'>
					<div className='m-0 flex items-center p-0' id='desktop-navigation-menu-left'>
						<ul>
							<li>
								<Link to='/'>
									<Image
										src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
										alt='TMBDb Logo'
										width='190px'
										height='20px'
										className='cursor-pointer'
									/>
								</Link>
							</li>
						</ul>

						<Dropdown title='Movies' {...DropdownProps}>
							<Links links={movieLinks} {...LinksProps} />
						</Dropdown>

						<Dropdown title='TV Shows' {...DropdownProps}>
							<Links links={showLinks} {...LinksProps} />
						</Dropdown>

						<Dropdown title='People' {...DropdownProps}>
							<Links links={personLinks} {...LinksProps} />
						</Dropdown>

						<Dropdown title='More' {...DropdownProps}>
							<Links links={externalLinks} {...LinksProps} />
						</Dropdown>
					</div>

					{isAuthenticated === false ? (
						<ul className='m-0 flex items-center p-0' id='desktop-navigation-menu-right'>
							<li className='pr-3 text-base font-bold text-white'>Login</li>

							<li className='pr-3 text-base font-bold text-white'>Register</li>

							<li>
								<Button
									onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											setIsSearchBarVisible(!isSearchBarVisible);
										}
									}}
								>
									<Icon
										className={className('text-base text-white', {
											'fa-solid fa-xmark': isSearchBarVisible === true,
											'fa-solid fa-magnifying-glass': isSearchBarVisible === false
										})}
									/>
									<span className='sr-only'>Search toggle</span>
								</Button>
							</li>
						</ul>
					) : (
						<Dropdown
							title={
								<>
									<Icon className='fa-solid fa-user text-white' />
									<span className='sr-only'>User profile</span>
								</>
							}
							alignment='right'
							dropdownClass='bg-slate-50 rounded w-[200px] border border-solid border-gray-300 drop-shadow-xl'
							id='desktop-navigation-menu-right'
						>
							<ul className='p-2'>
								<li className='text-base font-semibold text-black'>Alex Machin</li>
								<li className='text-xs text-gray-400'>
									<Link to='/'>View profile</Link>
								</li>
							</ul>

							<div style={{ 'border-top': '1px solid lightgrey' }} />

							<Links
								links={[
									{ menuTitle: 'Discussions', url: '' },
									{ menuTitle: 'Lists', url: '' },
									{ menuTitle: 'Ratings', url: '' },
									{ menuTitle: 'Watchlist', url: '' }
								]}
								className='bg-slate-50 p-2'
								anchorClassName='text-black text-sm'
							/>

							<div className='border-t border-solid border-slate-300' />

							<Links
								links={[
									{ menuTitle: 'Edit Profile', url: '' },
									{ menuTitle: 'Settings', url: '' }
								]}
								className='bg-slate-50 p-2'
								anchorClassName='text-black text-sm'
							/>

							<div className='border-t border-solid border-slate-300' />

							<Links
								links={[{ menuTitle: 'Logout', url: '' }]}
								className='bg-slate-50 p-2'
								anchorClassName='text-black text-sm'
							/>
						</Dropdown>
					)}
				</div>
			</nav>
		</div>
	);
};

NavigationMenu.propTypes = {
	isAuthenticated: PropTypes.bool
};

NavigationMenu.defaultProps = {
	isAuthenticated: false
};

export default NavigationMenu;
