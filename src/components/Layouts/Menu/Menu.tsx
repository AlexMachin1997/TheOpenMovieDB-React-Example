import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Button, Icon, Image } from '../../Core';
import MenuItem from './MenuItem';
import ProfileMenu from './ProfileMenu';
import RoutingService from '../../../services/RoutingService/RoutingService';

const NavigationMenu = ({ isAuthenticated = false }: { isAuthenticated?: boolean }) => {
	// MobileSidebar state
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

	// Handles the closing of the mobile navigation bar when the screen resizes
	React.useEffect(() => {
		// Create the MobileSidebar resize event
		const sidebarResizeEvent = () => {
			// When the sidebar is open and the outerWidth (get width + padding + border and optionally the margin) is more than or equal to 788px
			if (isSidebarOpen === true && window.outerWidth >= 788) {
				setIsSidebarOpen(false);
			}
		};

		const handleEscClick = (event: KeyboardEvent) => {
			// When the sidebar is open and the user clicks "Esc" key close the menu down
			if (isSidebarOpen === true && event.key === 'Escape') {
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

	const ApplicationLinks = React.useMemo(
		() =>
			RoutingService.getMultipleUrlGroups({
				groups: ['Movies', 'Shows', 'People', 'More']
			}),
		[]
	);

	return (
		<div>
			<aside
				id='mobile-navigation-sidebar'
				aria-label='mobile navigation menu sidebar'
				className={classNames(
					'fixed bottom-0 top-[75px] space-y-3 overflow-y-auto bg-primary/90 p-4 backdrop-blur-[20px] duration-500 ease-in',
					{
						// When the menu item is active
						'left-0': isSidebarOpen === true,

						// When the sidebar is not open hide it, put the menu offscreen
						'left-[-90%]': isSidebarOpen === false,

						// When the sidebar is open make it 90% width (This is so we can show content behind the sidebar)
						'w-full': isSidebarOpen === true,

						// When the sidebar is not open make the height 0
						'w-0': isSidebarOpen === false
					}
				)}
			>
				{ApplicationLinks.map((route) => (
					<MenuItem
						key={route.menuGroup}
						links={route.children}
						title={route.menuGroup}
						isSidebarItem
					/>
				))}

				<ul>
					<li className='mt-3'>
						{isAuthenticated === false ? (
							<Link
								to='/'
								className={classNames('m-0 w-full p-2 pr-4 text-base text-gray-400', {})}
							>
								Login
							</Link>
						) : (
							<Link
								to='/'
								className={classNames('m-0 w-full p-2 pr-4 text-base text-gray-400', {})}
							>
								Logout
							</Link>
						)}
					</li>
				</ul>
			</aside>

			<nav
				id='mobile-navigation-menu'
				className='fixed inset-x-0 top-0 bg-primary p-4'
				aria-label='mobile navigation menu'
				role='navigation'
			>
				<ul className='flex items-center justify-between md:hidden'>
					{/* The sidebar toggler */}
					<li>
						<Button
							onClick={() => {
								setIsSidebarOpen(!isSidebarOpen);
							}}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									setIsSidebarOpen(!isSidebarOpen);
								}
							}}
							className='m-0 flex cursor-pointer items-center p-0'
							aria-hidden={isSidebarOpen}
							aria-label={isSidebarOpen === true ? 'Open sidebar' : 'Close sidebar'}
						>
							<Icon className='fa-solid fa-bars text-white' />
						</Button>
					</li>

					{/* Sidebar brand logo */}
					<li>
						<Link to='/'>
							<Image
								src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
								alt='TMBDb Logo'
								width='75px'
								height='40px'
								className='cursor-pointer'
								label='The Open Movie Database Logo'
							/>
						</Link>
					</li>

					{/* Search bar toggler and user information/actions (Only available when the sidebar isn't open) */}
					<li>
						{isSidebarOpen === false && (
							<Button className='m-0 flex cursor-pointer items-center p-0'>
								<Icon className={classNames('fa-solid fa-magnifying-glass text-white')} />
							</Button>
						)}
					</li>
				</ul>
			</nav>

			<nav
				id='desktop-navigation-menu'
				className='fixed inset-x-0 top-0 bg-primary'
				aria-label='desktop navigation menu'
				role='navigation'
			>
				<div className='mx-auto hidden max-w-[1400px] justify-between	p-4 md:flex'>
					<div className='m-0 flex items-center p-0' id='desktop-navigation-menu-left'>
						{/* Sidebar brand logo */}
						<ul>
							<li>
								<Link to='/'>
									<Image
										src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
										alt='TMBDb Logo'
										width='190px'
										height='20px'
										className='cursor-pointer'
										label='The Open Movie Database Logo'
									/>
								</Link>
							</li>
						</ul>

						{ApplicationLinks.map((route) => (
							<MenuItem key={route.menuGroup} links={route.children} title={route.menuGroup} />
						))}
					</div>

					<ProfileMenu isAuthenticated={isAuthenticated} isSearchBarVisible={false} />
				</div>
			</nav>
		</div>
	);
};

export default NavigationMenu;
