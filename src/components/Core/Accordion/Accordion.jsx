import * as React from 'react';
import PropTypes from 'prop-types';

import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

const Accordion = ({ children, title, defaultIsOpen, isDisabled }) => (
	<Disclosure defaultOpen={defaultIsOpen}>
		{({ open }) => (
			<>
				<Disclosure.Button
					className={classNames(
						'flex w-full items-center justify-between rounded-tl-lg rounded-tr-lg border border-solid border-gray-300 p-4',
						{
							'rounded-bl-lg': open === false,
							'rounded-br-lg': open === false,
							'bg-slate-300': isDisabled === true,
							'disabled:cursor-not-allowed': isDisabled === true
						}
					)}
					disabled={isDisabled}
				>
					<>
						{title}

						<Icon
							className={classNames('fa-solid', {
								'fa-arrow-right': open === false,
								'fa-arrow-down': open === true
							})}
						/>
					</>
				</Disclosure.Button>

				<Transition
					enter='transition duration-100 ease-out'
					enterFrom='transform scale-95 opacity-0'
					enterTo='transform scale-100 opacity-100'
					leave='transition duration-75 ease-out'
					leaveFrom='transform scale-100 opacity-100'
					leaveTo='transform scale-95 opacity-0'
				>
					<Disclosure.Panel className='rounded-br-lg rounded-bl-lg border-b-[1px] border-l-[1px] border-r-[1px] border-solid border-gray-300 p-4'>
						{children}
					</Disclosure.Panel>
				</Transition>
			</>
		)}
	</Disclosure>
);

Accordion.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	defaultIsOpen: PropTypes.bool,
	isDisabled: PropTypes.bool
};

Accordion.defaultProps = {
	children: null,
	title: null,
	defaultIsOpen: false,
	isDisabled: false
};

export default Accordion;
