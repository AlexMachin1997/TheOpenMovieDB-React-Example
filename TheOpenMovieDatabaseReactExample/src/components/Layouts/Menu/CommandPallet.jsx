import * as React from 'react';
import PropTypes from 'prop-types';

import { Dialog, Transition } from '@headlessui/react';

import { Combobox } from '../../Core';

const CommandPallet = ({ isOpen, setIsOpen }) => (
	<Transition.Root show={isOpen} as={React.Fragment} appear>
		<Dialog as='div' className='relative z-10' onClose={setIsOpen}>
			<Transition.Child
				as={React.Fragment}
				enter='ease-out duration-300'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='ease-in duration-200'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
			>
				<div className='fixed inset-0 bg-gray-500/25 transition-opacity' />
			</Transition.Child>

			<div className='fixed inset-0 top-[30%] z-10 overflow-y-auto p-4 sm:p-6 md:top-0 md:p-20'>
				<Transition.Child
					as={React.Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'
				>
					<Dialog.Panel className='mx-auto max-w-xl rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black/5 transition-all'>
						<Combobox
							options={[
								{ id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds' },
								{ id: 2, name: 'Kenton Towne', value: 'Kenton Towne' },
								{ id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch' },
								{ id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler' },
								{ id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan' }
							]}
							value=''
							onChange={null}
							isMulti={false}
							defaultQuery=''
							displayName='name'
							canAddCustomItems={false}
							name='search'
							defaultValue=''
							disabled={false}
							noOptionsForSearchTermMessage='No autocomplete options available for the current search term'
							noOptionsAvailableMessage='No autocomplete options available'
							flipIconPosition
						/>
					</Dialog.Panel>
				</Transition.Child>
			</div>
		</Dialog>
	</Transition.Root>
);

CommandPallet.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired
};

export default CommandPallet;
