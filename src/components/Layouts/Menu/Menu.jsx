/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { PersonCircle } from '@styled-icons/bootstrap';

import Icon from '../../Core/Icon';
import Image from '../../Core/Image';
import Dropdown from '../../Core/Dropdown/Dropdown';

import SearchBar from './SearchBar/SearchBar';
import MobileMenuDropdown from './MobileMenuDropdown/MobileMenuDropdown';
import Links from './Links/Links';

import useClientSideRoutes from '../../../hooks/useClientSideRoutes';

const DropdownProps = {
	buttonClass: 'text-white rounded-md font-bold',
	dropdownClass: 'bg-white border-slate-300 border-[1px] rounded-2xl p-2',
	alignment: 'left'
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

			<div className='flex md:hidden justify-between items-center bg-primary p-4 fixed top-0 right-0 left-0'>
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
				<div className='md:flex hidden max-w-[1400px] mx-auto	justify-between p-4'>
					<div className='flex items-center p-0 m-0' id='desktop-navigation-menu-left-hand-side'>
						<Image
							src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
							alt='TMBDb Logo'
							width='190px'
							height='20px'
							className='cursor-pointer'
						/>

						<div className='pr-4'>
							<Dropdown title='Movies' {...DropdownProps}>
								<Links links={movieLinks} {...LinksProps} />
							</Dropdown>
						</div>

						<div className='pr-4'>
							<Dropdown title='TV Shows' {...DropdownProps}>
								<Links links={showLinks} {...LinksProps} />
							</Dropdown>
						</div>

						<div className='pr-4'>
							<Dropdown title='People' {...DropdownProps}>
								<Links links={personLinks} {...LinksProps} />
							</Dropdown>
						</div>

						<div className='pr-4'>
							<Dropdown title='More' {...DropdownProps}>
								<Links links={externalLinks} {...LinksProps} />
							</Dropdown>
						</div>
					</div>

					{isAuthenticated === false ? (
						<ul className='flex items-center p-0 m-0' id='desktop-navigation-menu-right-hand-side'>
							<li className='text-base text-white pr-3 font-bold'>Login</li>

							<li className='text-base text-white pr-3 font-bold'>Register</li>

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
					) : (
						<Dropdown
							title={
								<>
									<PersonCircle size={30} /> <span className='sr-only'>Search toggle</span>
								</>
							}
							alignment='right'
							dropdownClass='bg-slate-50 rounded w-[200px] border border-solid border-gray-300 drop-shadow-xl'
							buttonClass='text-white'
							id='desktop-navigation-menu-right-hand-side'
						>
							<ul className='p-2'>
								<li className='text-base text-black font-semibold'>Alex Machin</li>
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
