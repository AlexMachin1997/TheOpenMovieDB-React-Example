import * as React from 'react';
import PropTypes from 'prop-types';

import { usePopper } from 'react-popper';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import Accordion from '../../../Core/Accordion/Accordion';

const MenuItem = ({ links, title, isSidebarItem }) => {
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
						<li className='flex' key={link.url}>
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
		<Menu className='relative mr-4 inline-block text-left'>
			<div>
				<Menu.Button
					ref={setReferenceElement}
					className='inline-flex w-full justify-center rounded-md py-2 text-base font-medium text-white'
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
						ref={setPopperElement}
						style={styles.popper}
						as='ul'
						{...attributes.popper}
					>
						{links.map((link) => (
							<Menu.Item className='flex p-2 pr-4' key={link.url} as='li'>
								{({ active }) => (
									<Link
										to={link.url}
										className={classNames('m-0 w-full p-2 pr-4 text-base text-black', {
											'bg-secondary': active === true
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

MenuItem.propTypes = {
	links: PropTypes.array,
	title: PropTypes.string,
	isSidebarItem: PropTypes.bool
};

MenuItem.defaultProps = {
	links: [],
	title: 'Movies',
	isSidebarItem: false
};

export default MenuItem;
