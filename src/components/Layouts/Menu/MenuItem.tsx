/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';

import { usePopper } from 'react-popper';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Accordion from '../../Core/Accordion/Accordion';
import { MenuItemRoute } from '../../../services/RoutingService/RoutingService';

type MenuItemProps = {
	links: MenuItemRoute[];
	title: string;
	isSidebarItem?: boolean;
};

const MenuItem = ({ links = [], title = '', isSidebarItem = false }: MenuItemProps) => {
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

	// When this component is used within a sidebar make sure to use the Accordion instead
	if (isSidebarItem === true) {
		return (
			<Accordion
				title={title}
				defaultIsOpen={false}
				isDisabled={false}
				className='border-2 p-2 text-white'
				contentClassName='border-x-2 border-b-2'
				unmount
			>
				<ul>
					{links.map((link) => (
						<li className='flex' key={`${title}-${link.label}`}>
							<Link
								to={link.url}
								className={classNames('m-0 w-full p-2 pr-4 text-base text-white', {})}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</Accordion>
		);
	}

	return (
		<Menu>
			<div className='relative mr-4 inline-block text-left'>
				<Menu.Button
					// @ts-ignore
					ref={setReferenceElement}
					className='inline-flex w-full justify-center rounded-md py-2 text-base font-bold text-white'
				>
					{title}
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
						className='w-40 divide-y-2 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'
						style={styles.popper}
						as='ul'
						// @ts-ignore
						ref={setPopperElement}
						{...attributes.popper}
					>
						{links.map((link) => (
							<Menu.Item className='flex rounded-lg p-2' key={`${title}-${link.label}`} as='li'>
								{({ active }) => (
									<Link
										to={link.url}
										className={classNames('flex w-full rounded-lg p-2 pr-2 text-sm', {
											'bg-secondary text-white': active === true,
											'text-gray-400': active === false
										})}
									>
										{link.label}
									</Link>
								)}
							</Menu.Item>
						))}
					</Menu.Items>
				</Transition>
			</div>
		</Menu>
	);
};

export default MenuItem;
