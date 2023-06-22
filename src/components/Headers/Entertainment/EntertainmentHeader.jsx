/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Image, PercentageRating, Icon, Tooltip } from '../../Core';

const EntertainmentHeader = ({
	posterImage,
	backgroundImage,
	title,
	releaseDate,
	releaseYear,
	genres,
	runtime,
	rating,
	// trailerLink,
	tagline,
	overview,
	featuredCrew,
	ageRating,
	isAuthenticated
}) => {
	// Stores the overlay property, this is used by the inner container to apply a linear-gradient
	const [overlay, setOverlay] = React.useState('');

	/*

	Background image setting notes:

	- When using bg-[] image utility from Tailwind we need to use a css variable and dynamically update as tailwind doesn't have support for arbitrary image urls.

	- To ensure we can still use the tailwind css classes --entertainmentBackgroundImage (CSS variable) needs to be set to the backgroundImage property
	*/
	React.useEffect(() => {
		document.documentElement.style.setProperty(
			'--entertainmentBackgroundImage',
			`url(${backgroundImage})`
		);

		// When the EntertainmentHeader unmounts ie navigating away from the current screen then reset the css variable back to it's original value ie an empty string
		return () => {
			document.documentElement.style.setProperty('--entertainmentBackgroundImage', ``);
		};
	}, [backgroundImage]);

	// Handles the overlay functionality, listens for a screen size and checks the resolution (Check's if the screen size is greater than 768px aka desktop and not mobile)
	React.useEffect(() => {
		// Check to see if the screen size is above
		const result = window.matchMedia('(min-width: 768px)');

		// Handles the checking of the screen size, separate function so it can be called initially set and attached to the "change" event listener
		const mediaQueryFunction = () => {
			// If the screen size is above 768px ie desktop use the first overlay otherwise use the mobile overlay
			if (result.matches) {
				setOverlay(
					`linear-gradient(to right, rgba(11.76%, 15.29%, 17.25%, 1) 150px, rgba(19.61%, 21.96%, 23.53%, 0.84) 100%)`
				);
			} else {
				setOverlay(
					`linear-gradient(to right, rgba(11.76%, 15.29%, 17.25%, 1) 100%, rgba(19.61%, 21.96%, 23.53%, 0.84) 100%)`
				);
			}
		};

		// Call the function to set the initial overlay
		mediaQueryFunction();

		// When the screen resizes check the screen size for the defined query
		result.addEventListener('change', mediaQueryFunction);
	}, []);

	return (
		<div className='md:bg-[url:var(--entertainmentBackgroundImage)] md:bg-cover md:bg-no-repeat'>
			<div
				style={{
					backgroundImage: overlay
				}}
				className='flex items-center'
			>
				<div className='relative left-0 top-0 block p-5 pt-4 md:flex md:max-w-[1100px] md:px-10'>
					<Image
						src={posterImage}
						width='300px'
						height='450px'
						alt={`${title} Poster Image`}
						className='m-auto rounded-lg md:m-0'
						loading='eager'
					/>

					<div className='flex flex-col justify-center md:flex-wrap md:pl-5'>
						<div>
							<div className='flex flex-wrap items-center justify-center p-4 md:mb-2 md:flex-nowrap md:items-center md:justify-start md:p-0'>
								<h1 className='mr-2 text-2xl font-bold leading-none text-white'>{title}</h1>
								<p className='text-2xl font-light text-white opacity-80'>{`(${releaseYear})`}</p>
							</div>

							<ol
								className='flex flex-wrap items-center justify-center border-y border-t-[1px] border-solid border-slate-800 border-y-black bg-slate-800 p-3 md:justify-start md:border-0	md:bg-transparent md:p-1'
								id={`${title} facts`}
							>
								<li className='mr-2 rounded-sm border border-solid border-gray-300/60 bg-black p-1 leading-[1] text-white opacity-60'>
									{ageRating}
								</li>
								<li className='pr-2 text-white '>{releaseDate}</li>
								<li className='flex items-center pr-2 text-white '>
									<Icon className='fa-solid fa-circle text-[0.4rem] leading-[0]' />
								</li>
								<li className='pr-2 text-white '>
									{genres?.map((genre, genreIndex) => {
										// Is the current item the last item ? This is used to decide if a comma needs to be added to the Link element
										const isLastItem = genreIndex === genres.length - 1;

										return (
											<React.Fragment key={genre.id}>
												<Link
													to='/'
													className='inline text-sm font-bold text-white hover:text-gray-400'
												>
													{genre.name}
												</Link>
												{isLastItem === false ? ', ' : ''}
											</React.Fragment>
										);
									}) ?? null}
								</li>
								<li className='flex items-center pr-2 text-white '>
									<Icon className='fa-solid fa-circle text-[0.4rem] leading-[0]' />
								</li>
								<li className='inline-flex items-center text-white '>{runtime}</li>
							</ol>
						</div>

						<ol
							className='m-0 flex list-none flex-wrap items-center justify-around py-3 md:justify-start'
							id={`${title} meta`}
						>
							<li className='mr-3 flex items-center'>
								<span onMouseEnter={() => {}} onMouseLeave={() => {}}>
									<PercentageRating
										size={50}
										textSize='0.9rem'
										percentage={rating}
										strokeWidth={5}
									/>
								</span>
								<div className='ml-1'>
									<p className='text-sm font-bold text-white'>User</p>
									<p className='text-sm font-bold text-white'>Score</p>
								</div>
							</li>

							<li className='mr-4 hidden md:flex'>
								<Tooltip
									tooltip={
										isAuthenticated === false
											? 'Login to create and edit custom lists'
											: 'Add to list'
									}
									placement='bottom'
									title={
										isAuthenticated === false
											? 'Login to create and edit custom lists'
											: 'Add to list'
									}
								>
									<Icon className='fa-solid fa-list-ol cursor-pointer rounded-full bg-primary p-3 text-white	' />
								</Tooltip>
							</li>

							<li className='mr-4 hidden md:flex'>
								<Tooltip
									tooltip={
										isAuthenticated === false
											? 'Login to create and add it to your favorites list'
											: 'Mark as favorite'
									}
									placement='bottom'
									title={
										isAuthenticated === false
											? 'Login to create and add it to your favorites list'
											: 'Mark as favorite'
									}
								>
									<Icon className='fa-solid fa-heart cursor-pointer rounded-full bg-primary p-3 text-white	' />
								</Tooltip>
							</li>

							<li className='mr-4 hidden md:flex'>
								<Tooltip
									tooltip={
										isAuthenticated === false
											? 'Login to create and add it to your watch list'
											: 'Add to your watchlist'
									}
									placement='bottom'
									title={
										isAuthenticated === false
											? 'Login to create and add it to your watch list'
											: 'Add to your watchlist'
									}
								>
									<Icon className='fa-solid fa-bookmark cursor-pointer rounded-full bg-primary p-3 text-white' />
								</Tooltip>
							</li>

							<li className='mr-4 hidden md:flex'>
								<Tooltip
									tooltip={isAuthenticated === false ? 'Login to rate this title' : 'Rate it'}
									placement='bottom'
									title={isAuthenticated === false ? 'Login to rate this title' : 'Rate it'}
								>
									<Icon className='fa-solid fa-star cursor-pointer rounded-full bg-primary p-3 text-white' />
								</Tooltip>
							</li>

							<li className='group flex cursor-pointer items-center'>
								<Icon className='fa-solid fa-play mr-3 text-white group-hover:text-gray-400 ' />
								<p className='text-base text-white group-hover:text-gray-400'>Play Trailer</p>
							</li>
						</ol>

						<div className='p-4 md:p-0'>
							<div className='mb-3'>
								<p className='text-base font-bold italic text-white opacity-70'>{tagline}</p>
								<div style={{ margin: '0.7rem 0' }}>
									<h2 className='text-lg font-bold text-white'>Overview</h2>
								</div>
								<p className='text-base font-bold text-white'>{overview}</p>
							</div>

							<ol className='grid list-none grid-cols-2 p-0 md:grid-cols-3'>
								{featuredCrew?.map((crewMember) => (
									<li key={crewMember.name}>
										<Link to='/' className='text-base font-bold text-white hover:text-gray-400'>
											{crewMember.name}
										</Link>
										<p className='text-base text-white'>{crewMember.roles}</p>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

EntertainmentHeader.propTypes = {
	posterImage: PropTypes.string.isRequired,
	backgroundImage: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	releaseDate: PropTypes.string.isRequired,
	releaseYear: PropTypes.number.isRequired,
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			name: PropTypes.string
		}).isRequired
	).isRequired,
	runtime: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	// trailerLink: PropTypes.string.isRequired,
	tagline: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired,
	featuredCrew: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			roles: PropTypes.string
		}).isRequired
	).isRequired,
	ageRating: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool
};

EntertainmentHeader.defaultProps = {
	isAuthenticated: false
};

export default EntertainmentHeader;
