/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import classNames from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { Link } from 'react-router-dom';
import { Button, Icon } from '~/components/Core';
import RoutingService from '~/services/RoutingService/RoutingService';

type UnauthenticatedUserProfileProps = {
	onChange: null | (() => void);
	isOpen: boolean;
};

const UnauthenticatedUserProfile = ({ onChange, isOpen }: UnauthenticatedUserProfileProps) => (
	<ul className='m-0 flex items-center p-0' id='desktop-navigation-menu-right'>
		<li className='pr-3 text-base font-bold text-white'>Login</li>

		<li className='pr-3 text-base font-bold text-white'>Join TMDB</li>

		<li>
			<Button
				onClick={() => {
					if (typeof onChange === 'function') {
						onChange();
					}
				}}
				onKeyDown={(event) => {
					if (event.key === 'Enter' && typeof onChange === 'function') {
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

type UserProfileProps = {
	name: string;
};

const UserProfile = ({ name }: UserProfileProps) => {
	// Store the reference element reference (The popup trigger e.g. button), it's state so usePopper know the element has changed
	const [referenceElement, setReferenceElement] = React.useState<HTMLElement>();

	// Store the popper element reference (The actual popup content), it's state so usePopper know the element has changed
	const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();

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
		<Menu className='relative mr-4 inline-flex items-center text-left' as='div'>
			<>
				<Menu.Button
					// @ts-ignore
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
						style={styles.popper}
						as='ul'
						// @ts-ignore
						ref={setPopperElement}
						{...attributes.popper}
					>
						{/* Render the Profile menu items */}
						{MenuLinks?.map((group) => (
							<div className='p-1' key={`profile-menu-${group.menuGroup}`}>
								{group.children.map((child) => {
									// Special output for the View Profile button
									if (child.label === 'View Profile') {
										return (
											<div
												className='rounded-lg border-b-2 border-solid border-gray-200 py-1'
												key={child.label}
											>
												{/* Show the users profile name */}
												<li>
													<p className='p-1 text-base font-semibold text-black'>{name}</p>
												</li>

												{/* A quick access link to the users profile */}
												<Menu.Item as='li'>
													{({ active }) => (
														<Link
															to='/'
															className={classNames('block rounded-lg p-1 text-xs', {
																'bg-secondary text-white': active === true,
																'text-gray-400': active === false
															})}
														>
															View Profile
														</Link>
													)}
												</Menu.Item>
											</div>
										);
									}

									return (
										<Menu.Item as='li' key={`Profile-Menu-${child.label}`} className='py-1'>
											{({ active }) => (
												<Link
													to={child.url}
													className={classNames('block p-1 text-sm', {
														'bg-secondary text-white': active === true,
														'text-gray-400': active === false
													})}
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

type ProfileMenuProps = {
	isAuthenticated?: boolean;
	isSearchBarVisible?: boolean;
	onChange?: null | (() => void);
};

const ProfileMenu = ({
	isAuthenticated = false,
	isSearchBarVisible = false,
	onChange = null
}: ProfileMenuProps) => {
	if (isAuthenticated === false) {
		return <UnauthenticatedUserProfile onChange={onChange} isOpen={isSearchBarVisible} />;
	}

	return <UserProfile name='Alex Machin' />;
};

export default ProfileMenu;
