/* eslint-disable camelcase */
import * as React from 'react';
import PropTypes from 'prop-types';

import { Dialog, Menu, Transition } from '@headlessui/react';
import { Formik, useFormikContext, Form as FormikForm } from 'formik';

import classNames from 'classnames';
import DiscoverFilterSidebar from '../../Forms/DiscoverFilterSidebar/DiscoverFilterSidebar';
import { EntertainmentPosterCard } from '../../Cards/Entertainment';

import DiscoverFiltersFormData from '../../../utils/DiscoverFiltersFormData';
import { Button, Icon, Tooltip } from '../../Core';

const FormSettings = ({ mediaType, resourceType, isAuthenticated }) => {
	const { values, setValues } = useFormikContext();

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
										'bg-secondary': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormData class to get the original "Sort By" formData
										const NewSortByFormData = new DiscoverFiltersFormData(
											mediaType,
											resourceType,
											isAuthenticated
										).getSortByFormData();

										// Merge the current formData with the new "Sort By" formData
										setValues({ ...values, ...NewSortByFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormData class to get the original "Sort By" formData
											const NewSortByFormData = new DiscoverFiltersFormData(
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
										'bg-secondary': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormData class to get the original "Filters" formData
										const NewFiltersFormData = new DiscoverFiltersFormData(
											mediaType,
											resourceType,
											isAuthenticated
										).getFiltersFormData();

										// Merge the current formData with the new "Filters" formData
										setValues({ ...values, ...NewFiltersFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormData class to get the original "Filters" formData
											const NewFiltersFormData = new DiscoverFiltersFormData(
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
										'bg-secondary': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormData class to get the original "Where To Watch" formData
										const NewWhereToWatchFormData = new DiscoverFiltersFormData(
											mediaType,
											resourceType,
											isAuthenticated
										).getWhereToWatchFormData();

										// Merge the current formData with the new "Sort By" formData
										setValues({ ...values, ...NewWhereToWatchFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormData class to get the original "Where To Watch" formData
											const NewWhereToWatchFormData = new DiscoverFiltersFormData(
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
										'bg-secondary': active === true,
										'text-gray-500': active === false
									})}
									onClick={() => {
										// Re-setup the DiscoverFiltersFormData class to get the original formData
										const NewFormData = new DiscoverFiltersFormData(
											mediaType,
											resourceType,
											isAuthenticated
										).getFormikFormData();

										// Override any existing values with the new values as were now resetting all available filters
										setValues({ ...NewFormData });
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											// Re-setup the DiscoverFiltersFormData class to get the original formData
											const NewFormData = new DiscoverFiltersFormData(
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

FormSettings.propTypes = {
	mediaType: PropTypes.string.isRequired,
	resourceType: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

const DiscoverPageTemplate = ({
	mediaType,
	resourceType,
	isAuthenticated,
	defaultValues,
	resources
}) => {
	const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = React.useState(false);

	// Generate the Discover Filters Sidebar formData
	const formData = React.useMemo(
		() =>
			new DiscoverFiltersFormData(mediaType, resourceType, isAuthenticated, {
				...defaultValues
			}).getFormikFormData(),
		[mediaType, resourceType, isAuthenticated, defaultValues]
	);

	// Generate the page title
	// When moving to Remix move this to the Loader, this wil be used here and in the <title></title>
	const title = React.useMemo(() => {
		if (resourceType === 'popular') {
			if (mediaType === 'tv') {
				return 'Popular TV Shows';
			}
			return 'Popular Movies';
		}

		if (resourceType === 'now-playing') {
			return 'Now Playing Movies';
		}

		if (resourceType === 'airing-today') {
			return 'TV Shows Airing Today';
		}

		if (resourceType === 'on-the-air') {
			return 'Currently Airing TV Shows';
		}

		if (resourceType === 'upcoming') {
			return 'Upcoming movies';
		}

		if (resourceType === 'top-rated') {
			if (mediaType === 'tv') {
				return 'Top Rated TV Shows';
			}

			return 'Top Rated Movies';
		}

		return '';
	}, [mediaType, resourceType]);

	return (
		<Formik
			enableReinitialize
			initialValues={{ ...formData }}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{/* noValidate prevents the form from */}
			<FormikForm className='' style={{}} id='filters-form'>
				<main className='lg:m-auto lg:max-w-[90rem]'>
					{/* Mobile filters sidebar, toggled via the Mobile Title action */}
					<Transition.Root show={isFiltersSidebarOpen} as={React.Fragment} unmount={false}>
						<Dialog
							as='div'
							className='relative z-40 lg:hidden'
							onClose={() => setIsFiltersSidebarOpen((prevState) => !prevState)}
							unmount={false}
						>
							<Transition.Child
								as={React.Fragment}
								enter='transition-opacity ease-linear duration-300'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='transition-opacity ease-linear duration-300'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<div className='fixed inset-0 bg-black/25' />
							</Transition.Child>

							<div className='fixed inset-0 z-40 flex'>
								<Transition.Child
									as={React.Fragment}
									enter='transition ease-in-out duration-300 transform'
									enterFrom='translate-x-full'
									enterTo='translate-x-0'
									leave='transition ease-in-out duration-300 transform'
									leaveFrom='translate-x-0'
									leaveTo='translate-x-full'
									unmount={false}
								>
									<Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-xl'>
										<div className='flex items-center justify-between border border-solid border-b-gray-300 px-4 py-2'>
											<h2 className='text-lg font-medium text-gray-900'>Filters</h2>
											<div>
												<Button
													className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-400'
													onClick={() => setIsFiltersSidebarOpen(false)}
													onKeyDown={() => setIsFiltersSidebarOpen(false)}
												>
													<span className='sr-only'>Close menu</span>
													<Icon className='fa-solid fa-xmark' aria-hidden='true' />
												</Button>
											</div>
										</div>

										{/* Filters */}
										<div className='h-full overflow-y-auto p-4'>
											<DiscoverFilterSidebar isAuthenticated={isAuthenticated} />
										</div>

										<div className='flex content-center items-center border border-solid border-t-gray-300'>
											<Button
												type='submit'
												className='m-4 my-4 w-full rounded-2xl bg-secondary  px-4 py-2 text-center text-white hover:bg-secondary/75'
												form='filters-form'
											>
												Apply Filters
											</Button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</Dialog>
					</Transition.Root>

					{/* Desktop filters sidebar */}
					<aside className='fixed top-5 bottom-2 hidden w-80 lg:block'>
						<div className='relative ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-xl'>
							<div className='flex items-center justify-between border border-solid border-b-gray-300 px-4 py-2'>
								<h2 className='text-lg font-medium text-gray-900'>{title}</h2>
								<div>
									<FormSettings
										resourceType={resourceType}
										mediaType={mediaType}
										isAuthenticated={isAuthenticated}
									/>
								</div>
							</div>

							{/* Filters */}
							<div className='h-full overflow-y-auto p-4'>
								<DiscoverFilterSidebar isAuthenticated={isAuthenticated} />
							</div>

							<div className='flex content-center items-center border border-solid border-t-gray-300'>
								<Button
									type='submit'
									className='m-4 my-4 w-full rounded-2xl bg-secondary  px-4 py-2 text-center text-white hover:bg-secondary/75'
									form='filters-form'
								>
									Apply Filters
								</Button>
							</div>
						</div>
					</aside>
					<section className='px-4 pb-4 lg:ml-80 lg:pr-8'>
						{/* Mobile title and actions header */}
						<div className='flex items-center justify-between py-4 lg:hidden'>
							<h1 className='text-2xl'>{title}</h1>
							<div className='flex items-center'>
								<Button
									onClick={() => {
										setIsFiltersSidebarOpen(true);
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											setIsFiltersSidebarOpen(true);
										}
									}}
								>
									<Tooltip tooltip='Click to show the advanced filter controls'>
										<Icon className='fa-solid fa-filter' aria-hidden='true' />
									</Tooltip>
								</Button>

								<div>
									<FormSettings
										resourceType={resourceType}
										mediaType={mediaType}
										isAuthenticated={isAuthenticated}
									/>
								</div>
							</div>
						</div>

						{/* Displays the page results */}
						<div
							id={`${mediaType} results`}
							className='grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
						>
							{resources.map((resource, resourceIndex) => (
								<EntertainmentPosterCard
									title={resource.title}
									releaseDate={resource.releaseDate}
									rating={resource.rating}
									image={resource.image}
									key={`${resource.title} ${resourceIndex}`}
								/>
							))}
						</div>
					</section>
				</main>
			</FormikForm>
		</Formik>
	);
};

DiscoverPageTemplate.propTypes = {
	mediaType: PropTypes.string.isRequired,
	resourceType: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	defaultValues: PropTypes.object,
	resources: PropTypes.array
};

DiscoverPageTemplate.defaultProps = {
	defaultValues: {},
	resources: []
};

export default DiscoverPageTemplate;
