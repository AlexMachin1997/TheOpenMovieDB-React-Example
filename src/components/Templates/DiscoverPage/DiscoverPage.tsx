import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';

import DiscoverPageFilters from '../../Forms/DiscoverPageFilters/DiscoverPageFilters';
import { EntertainmentPosterCard } from '../../Cards/Entertainment';
import DiscoverFiltersFormDataService, {
	DefaultValues
} from '../../../services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';
import { Button, Icon, Tooltip } from '../../Core';
import { MEDIA_TYPE, RESOURCE_TYPE } from '../../../types/RoutingTypes';
import FormSettings from './FormSettings';
import settings from '../../../settings';

type DiscoverPageTemplateProps = {
	mediaType?: MEDIA_TYPE;
	resourceType?: RESOURCE_TYPE;
	isAuthenticated?: boolean;
	defaultValues?: DefaultValues;
	resources?: { title: string; subtitle: string; rating: number; image: string }[];
};

const DiscoverPageTemplate = ({
	mediaType = MEDIA_TYPE.MOVIE,
	resourceType = RESOURCE_TYPE.POPULAR,
	isAuthenticated = false,
	defaultValues = {},
	resources = []
}: DiscoverPageTemplateProps) => {
	const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = React.useState(false);

	// Generate the Discover Filters Sidebar formData
	const formData = React.useMemo(
		() =>
			new DiscoverFiltersFormDataService(mediaType, resourceType, isAuthenticated, {
				...defaultValues
			}).getFormikFormData(),
		[mediaType, resourceType, isAuthenticated, defaultValues]
	);

	// Generate the page title
	// When moving to Remix move this to the Loader, this wil be used here and in the <title></title>
	const title = React.useMemo(() => {
		if (resourceType === RESOURCE_TYPE.POPULAR) {
			if (mediaType === MEDIA_TYPE.TV) {
				return 'Popular TV Shows';
			}

			return 'Popular Movies';
		}

		if (resourceType === RESOURCE_TYPE.NOW_PLAYING) {
			return 'Now Playing Movies';
		}

		if (resourceType === RESOURCE_TYPE.AIRING_TODAY) {
			return 'TV Shows Airing Today';
		}

		if (resourceType === RESOURCE_TYPE.ON_THE_AIR) {
			return 'Currently Airing TV Shows';
		}

		if (resourceType === RESOURCE_TYPE.UPCOMING) {
			return 'Upcoming movies';
		}

		if (resourceType === RESOURCE_TYPE.TOP_RATED) {
			if (mediaType === MEDIA_TYPE.TV) {
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
			<Form className='' style={{}} id='filters-form'>
				<main className='lg:m-auto lg:max-w-[90rem]'>
					{/* Mobile filters sidebar, toggled via the Mobile Title action */}
					<Transition.Root show={isFiltersSidebarOpen} as={React.Fragment}>
						<Dialog
							as='div'
							className='relative z-40 lg:hidden'
							onClose={() => setIsFiltersSidebarOpen((prevState) => !prevState)}
						>
							<Transition.Child
								as={React.Fragment}
								enter='ease-in-out duration-500'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='ease-in-out duration-500'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
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
									<Dialog.Panel className='relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-xl'>
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
										<div className='h-full overflow-y-auto px-2 py-4'>
											<DiscoverPageFilters
												isAuthenticated={isAuthenticated}
												ottProviders={settings.OTT_PROVIDER_OPTIONS}
											/>
										</div>

										<div className='flex content-center items-center border border-solid border-t-gray-300'>
											<Button
												type='submit'
												className='m-4 w-full rounded-2xl bg-secondary px-4  py-2 text-center text-white hover:bg-secondary/75'
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
					<aside className='fixed bottom-2 top-5 hidden w-80 lg:block'>
						<div className='relative ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-xl'>
							<div className='flex items-center justify-between rounded-t-lg border border-solid border-b-gray-300 p-4'>
								<h1 className='text-lg font-bold text-gray-900'>{title}</h1>
								<div>
									<FormSettings
										resourceType={resourceType}
										mediaType={mediaType}
										isAuthenticated={isAuthenticated}
									/>
								</div>
							</div>

							{/* Filters */}
							<div className='h-full overflow-y-auto px-3 py-3'>
								<DiscoverPageFilters
									isAuthenticated={isAuthenticated}
									ottProviders={settings.OTT_PROVIDER_OPTIONS}
								/>
							</div>

							<div className='flex content-center items-center rounded-b-lg border border-solid border-t-gray-300'>
								<Button
									type='submit'
									className='m-4 w-full rounded-2xl bg-secondary px-4  py-2 text-center text-white hover:bg-secondary/75'
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
							<h1 className='text-3xl font-bold'>{title}</h1>
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
							id={`${mediaType}-results`}
							className='grid grid-cols-1 space-x-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
						>
							{resources.map((resource) => (
								<EntertainmentPosterCard
									title={resource.title}
									subtitle={resource.subtitle}
									rating={resource.rating}
									image={resource.image}
									key={resource.title}
								/>
							))}
						</div>
					</section>
				</main>
			</Form>
		</Formik>
	);
};

export default DiscoverPageTemplate;
