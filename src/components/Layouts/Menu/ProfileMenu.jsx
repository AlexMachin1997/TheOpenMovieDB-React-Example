import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Menu, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { Link } from 'react-router-dom';

import RoutingService from '../../../services/RoutingService/RoutingService';
import { Button, Icon } from '../../Core';

const UnauthenticatedUserProfile = ({ onChange, isOpen }) => (
	<ul className='m-0 flex items-center p-0' id='desktop-navigation-menu-right'>
		<li className='pr-3 text-base font-bold text-white'>Login</li>

		<li className='pr-3 text-base font-bold text-white'>Join TMDB</li>

		<li>
			<Button
				onClick={onChange}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						onChange();
					}
				}}
			>
				<Icon
					className={classNames('text-base text-white', {
						'fa-solid fa-xmark': isOpen === true,
						'fa-solid fa-magnifying-glass': isOpen === false
					})}
				/>
				<span className='sr-only'>Search toggle</span>
			</Button>
		</li>
	</ul>
);

UnauthenticatedUserProfile.propTypes = {
	onChange: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired
};

const UserProfile = ({ name }) => {
	// Store the reference element reference (The popup trigger e.g. button), it's state so usePopper know the element has changed
	const [referenceElement, setReferenceElement] = React.useState(null);

	// Store the popper element reference (The actual popup content), it's state so usePopper know the element has changed
	const [popperElement, setPopperElement] = React.useState(null);

	// Used to place the menu either on the top or bottom of the Listbox button
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: 'bottom-start',
		modifiers: [
			{
				name: 'flip',
				options: {
					// Switch between top and bottom for the position of the element
					fallbackPlacements: ['bottom-end']
				}
			},
			{
				name: 'offset',
				options: {
					offset: [0, 5]
				}
			},
			{
				name: 'computeStyles',
				options: {
					adaptive: false
				}
			}
		]
	});

	const MenuLinks = React.useMemo(() => RoutingService.generateUserProfileLinks(), []);

	return (
		<Menu className='relative mr-4 inline-flex items-center text-left' as='ul'>
			<>
				<Menu.Button
					ref={setReferenceElement}
					className='inline-flex w-full justify-center rounded-md text-base font-medium text-white'
				>
					<Icon className='fa-solid fa-user text-white' />
					<span className='sr-only'>User profile</span>
				</Menu.Button>

				<Transition
					as={React.Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items
						className='w-52 divide-y-2 divide-gray-100 rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none'
						ref={setPopperElement}
						style={styles.popper}
						as='ul'
						{...attributes.popper}
					>
						{/* Render the Profile menu items */}
						{MenuLinks?.map((group) => (
							<div className='p-1' key={`profile-menu-${group.menuGroup}`}>
								{group.children.map((child) => {
									// Special output for the View Profile button
									if (child.label === 'View Profile') {
										return (
											<div className='border-b-2 border-solid border-gray-200'>
												{/* Show the users profile name */}
												<li>
													<p className='p-1 text-base font-semibold text-black'>{name}</p>
												</li>

												{/* A quick access link to the users profile */}
												<Menu.Item as='li'>
													{({ active }) => (
														<Link
															to='/'
															className={classNames(
																'block p-1 text-xs text-gray-400 hover:text-white',
																{
																	'bg-secondary': active === true
																}
															)}
														>
															View Profile
														</Link>
													)}
												</Menu.Item>
											</div>
										);
									}

									return (
										<Menu.Item as='li' key={`Profile-Menu-${child.label}`}>
											{({ active }) => (
												<Link
													to={child.url}
													className={classNames(
														'block p-1 text-sm text-gray-400 hover:text-white',
														{
															'bg-secondary': active === true
														}
													)}
												>
													{child.label}
												</Link>
											)}
										</Menu.Item>
									);
								})}
							</div>
						))}
					</Menu.Items>
				</Transition>
			</>
		</Menu>
	);
};

UserProfile.propTypes = {
	name: PropTypes.string
};

UserProfile.defaultProps = {
	name: 'N/A'
};

const ProfileMenu = ({ isAuthenticated, isSearchBarVisible, onChange }) => {
	if (isAuthenticated === false) {
		return <UnauthenticatedUserProfile onChange={onChange} isOpen={isSearchBarVisible} />;
	}

	return <UserProfile name='Alex Machin' />;
};

ProfileMenu.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	isSearchBarVisible: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
};

export default ProfileMenu;
