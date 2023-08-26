import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useFormikContext } from 'formik';

import classNames from 'classnames';
import { Tooltip, Button, Icon } from '../../Core';
import { MEDIA_TYPE, RESOURCE_TYPE } from '../../../types/RoutingTypes';
import DiscoverFiltersFormDataService from '../../../services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';

type FormSettingsProps = {
	mediaType: MEDIA_TYPE;
	resourceType: RESOURCE_TYPE;
	isAuthenticated?: boolean;
};

const FormSettings = ({ mediaType, resourceType, isAuthenticated = false }: FormSettingsProps) => {
	// Access the templates current from values, the return type is inferred from the return of getFormikFormData
	const { values, setValues } =
		useFormikContext<ReturnType<DiscoverFiltersFormDataService['getFormikFormData']>>();

	return (
		<Menu className='relative inline-block text-left' as='div'>
			<div className='pl-4'>
				<Menu.Button>
					<Tooltip tooltip='Click to perform page actions e.g. resetting sort by, filters etc'>
						<Icon className='fa-solid fa-gear' aria-hidden='true' />
					</Tooltip>
				</Menu.Button>
			</div>

			<Transition
				as={React.Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
					<div className='p-1'>
						<Menu.Item>
							{({ active }) => (
								<Button
									className={classNames('group flex w-full items-center rounded-md p-2 text-sm', {
										'bg-secondary text-white': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormDataService class to get the original "Sort By" formData
										const NewSortByFormData = new DiscoverFiltersFormDataService(
											mediaType,
											resourceType,
											isAuthenticated
										).getSortByFormData();

										// Merge the current formData with the new "Sort By" formData
										setValues({ ...values, ...NewSortByFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormDataService class to get the original "Sort By" formData
											const NewSortByFormData = new DiscoverFiltersFormDataService(
												mediaType,
												resourceType,
												isAuthenticated
											).getSortByFormData();

											// Merge the current formData with the new "Sort By" formData
											setValues({ ...values, ...NewSortByFormData });
										}
									}}
								>
									Reset Sort
								</Button>
							)}
						</Menu.Item>

						<Menu.Item>
							{({ active }) => (
								<Button
									className={classNames('group flex w-full items-center rounded-md p-2 text-sm', {
										'bg-secondary text-white': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormDataService class to get the original "Filters" formData
										const NewFiltersFormData = new DiscoverFiltersFormDataService(
											mediaType,
											resourceType,
											isAuthenticated
										).getFiltersFormData();

										// Merge the current formData with the new "Filters" formData
										setValues({ ...values, ...NewFiltersFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormDataService class to get the original "Filters" formData
											const NewFiltersFormData = new DiscoverFiltersFormDataService(
												mediaType,
												resourceType,
												isAuthenticated
											).getFiltersFormData();

											// Merge the current formData with the new "Filters" formData
											setValues({ ...values, ...NewFiltersFormData });
										}
									}}
								>
									Reset filters
								</Button>
							)}
						</Menu.Item>

						<Menu.Item>
							{({ active }) => (
								<Button
									className={classNames('group flex w-full items-center rounded-md p-2 text-sm', {
										'bg-secondary text-white': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormDataService class to get the original "Where To Watch" formData
										const NewWhereToWatchFormData = new DiscoverFiltersFormDataService(
											mediaType,
											resourceType,
											isAuthenticated
										).getWhereToWatchFormData();

										// Merge the current formData with the new "Sort By" formData
										setValues({ ...values, ...NewWhereToWatchFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormDataService class to get the original "Where To Watch" formData
											const NewWhereToWatchFormData = new DiscoverFiltersFormDataService(
												mediaType,
												resourceType,
												isAuthenticated
											).getWhereToWatchFormData();

											// Merge the current formData with the new "Sort By" formData
											setValues({ ...values, ...NewWhereToWatchFormData });
										}
									}}
								>
									Reset Where To Watch
								</Button>
							)}
						</Menu.Item>
					</div>

					<div className='p-1'>
						<Menu.Item>
							{({ active }) => (
								<Button
									className={classNames('group flex w-full items-center rounded-md p-2 text-sm', {
										'bg-secondary text-white': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormDataService class to get the original formData
										const NewFormData = new DiscoverFiltersFormDataService(
											mediaType,
											resourceType,
											isAuthenticated
										).getFormikFormData();

										// Override any existing values with the new values as were now resetting all available filters
										setValues({ ...NewFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormDataService class to get the original formData
											const NewFormData = new DiscoverFiltersFormDataService(
												mediaType,
												resourceType,
												isAuthenticated
											).getFormikFormData();

											// Override any existing values with the new values as were now resetting all available filters
											setValues({ ...NewFormData });
										}
									}}
								>
									Reset all
								</Button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default FormSettings;
