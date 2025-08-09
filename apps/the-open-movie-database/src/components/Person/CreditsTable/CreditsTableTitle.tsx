/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import { Icon } from '~/components/Core';
import { SelectOption } from '~/types/DropdownElementTypes';

type CreditsTableTitleProps = {
	onChange?: null | ((data: { type: 'CLEAR_ALL' | 'CHANGE_DEPARTMENT' | 'CHANGE_ALL' }) => void);
	showClearAll?: boolean;
	allDropdownOptions?: SelectOption[];
	departmentDropdownOptions?: SelectOption[];
};

type DropdownProps = {
	title: 'All' | 'Department';
	onClick: null | ((data: { type: 'CLEAR_ALL' | 'CHANGE_DEPARTMENT' | 'CHANGE_ALL' }) => void);
	options: SelectOption[];
};

const Dropdown = ({ title, onClick = null, options = [] }: DropdownProps) => {
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
					fallbackPlacements: ['bottom-end', 'top']
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

	return (
		<Menu className='relative mr-4 inline-flex items-center text-left' as='ul'>
			<>
				<Menu.Button
					// @ts-ignore
					ref={setReferenceElement}
					className='inline-flex w-full items-center justify-center rounded-md text-base font-medium text-white'
					as='li'
				>
					{({ open }) => (
						<>
							<Icon
								className={classNames('fa-solid mr-1 text-black', {
									'fa-arrow-down': open === false,
									'fa-arrow-up': open === true
								})}
							/>
							<span className='text-sm text-black'>{title}</span>
						</>
					)}
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
						{options?.map((option) => (
							<Menu.Item className='flex rounded-lg p-2' key={option.label} as='li'>
								{({ close, active }) => (
									<button
										type='button'
										onClick={() => {
											// Programmatically close the menu
											close();

											if (typeof onClick === 'function') {
												onClick({ type: title === 'All' ? 'CHANGE_ALL' : 'CHANGE_DEPARTMENT' });
											}
										}}
										className={classNames('flex w-full rounded-lg p-2 pr-2 text-sm', {
											'bg-secondary text-white': active === true,
											'text-gray-400': active === false
										})}
									>
										{option.label}
									</button>
								)}
							</Menu.Item>
						))}
					</Menu.Items>
				</Transition>
			</>
		</Menu>
	);
};

const CreditsTableTitle = ({
	onChange = null,
	showClearAll = false,
	allDropdownOptions = [],
	departmentDropdownOptions = []
}: CreditsTableTitleProps) => (
	<div className='flex flex-wrap items-center justify-between py-4'>
		<h3 className='text-2xl font-bold text-black'>Acting</h3>

		<div className='flex flex-wrap items-center justify-center space-x-8 md:justify-end'>
			{showClearAll === true && (
				<button
					type='button'
					onClick={() => {
						if (typeof onChange === 'function') {
							onChange({ type: 'CLEAR_ALL' });
						}
					}}
					className='text-sm text-blue-950 hover:text-green-700'
				>
					Clear All
				</button>
			)}

			<Dropdown title='All' options={allDropdownOptions} onClick={onChange} />
			<Dropdown title='Department' options={departmentDropdownOptions} onClick={onChange} />
		</div>
	</div>
);

export default CreditsTableTitle;
