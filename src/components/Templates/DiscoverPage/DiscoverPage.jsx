import * as React from 'react';
import PropTypes from 'prop-types';

import { Dialog, Transition } from '@headlessui/react';
import { Formik } from 'formik';

import DiscoverFilterSidebar from '../../Forms/DiscoverFilterSidebar/DiscoverFilterSidebar';
import { EntertainmentPosterCard } from '../../Cards/Entertainment';

import FormData from '../../../utils/FormData';
import { Button, Icon, Tooltip } from '../../Core';

const DiscoverPageTemplate = ({ mediaType, resourceType, isAuthenticated, defaultValues }) => {
	const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = React.useState(false);

	// Generate the Discover Filters Sidebar formData
	const formData = React.useMemo(
		() =>
			new FormData(mediaType, resourceType, isAuthenticated, {
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

	// Store a reference to the form, provides a bag of properties which are used by Formik internally e.g. values, setFieldValue etc
	const formikRef = React.useRef(null);

	return (
		<Formik enableReinitialize initialValues={{ ...formData }} innerRef={formikRef}>
			<>
				{/* When the filter modal is open just add a backdrop, it's placed here so we can prevent the Transition.Root from re-mounting everytime which causes the sidebar accordions to reset */}
				{isFiltersSidebarOpen === true && <div className='fixed inset-0 bg-black/25' />}

				{/* Mobile filter dialog */}
				<Transition.Root show={isFiltersSidebarOpen} as={React.Fragment} unmount={false}>
					<Dialog
						as='div'
						className='relative z-40 lg:hidden'
						onClose={() => setIsFiltersSidebarOpen((prevState) => !prevState)}
						unmount={false}
					>
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
									<div className='flex items-center justify-between p-4'>
										<h2 className='text-lg font-medium text-gray-900'>Filters</h2>
										<Button
											className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-400'
											onClick={() => setIsFiltersSidebarOpen(false)}
											onKeyDown={() => setIsFiltersSidebarOpen(false)}
										>
											<span className='sr-only'>Close menu</span>
											<Icon className='fa-solid fa-xmark' aria-hidden='true' />
										</Button>
									</div>

									{/* Filters */}
									<div className='overflow-y-auto p-4'>
										<DiscoverFilterSidebar isAuthenticated={isAuthenticated} />
									</div>

									{/* TODO: Add submit button here, this is so users can apply filters at anytime without scrolling more than needed */}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<main className='lg:m-auto lg:max-w-[90rem]'>
					{/* Desktop filters sidebar */}
					<aside className='fixed top-5 bottom-0 hidden w-80 overflow-auto pl-4 pr-6 lg:block'>
						<h1 className='pb-4 text-2xl'>{title}</h1>
						<DiscoverFilterSidebar isAuthenticated={isAuthenticated} />
					</aside>

					{/* Displays the page results */}
					<section className='px-4 pb-4 lg:ml-80 lg:pr-8'>
						<div className='flex items-center justify-between py-4 lg:hidden'>
							<h1 className='text-2xl'>{title}</h1>
							<div>
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
							</div>
						</div>

						<div
							id={`${mediaType} results`}
							className='grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
						>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
							<EntertainmentPosterCard
								title='Black Adam'
								releaseDate='21 Oct 2022'
								rating={69}
								image='https://image.tmdb.org/t/p/w220_and_h330_face/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'
							/>
						</div>
					</section>
				</main>
			</>
		</Formik>
	);
};

DiscoverPageTemplate.propTypes = {
	mediaType: PropTypes.string.isRequired,
	resourceType: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	defaultValues: PropTypes.object
};

DiscoverPageTemplate.defaultProps = {
	defaultValues: {}
};

export default DiscoverPageTemplate;
