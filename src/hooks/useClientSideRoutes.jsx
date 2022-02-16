import * as React from 'react';

const Homepage = React.lazy(() => import('../pages/homepage'));

const SingleMovie = React.lazy(() => import('../pages/movies/movie'));
const NowPlayingMovies = React.lazy(() => import('../pages/movies/now-playing'));
const PopularMovies = React.lazy(() => import('../pages/movies/popular'));
const TopRatedMovies = React.lazy(() => import('../pages/movies/top-rated'));
const UpcomingMovies = React.lazy(() => import('../pages/movies/upcoming'));

const SingleShow = React.lazy(() => import('../pages/shows/show'));
const AiringToday = React.lazy(() => import('../pages/shows/airing-today'));
const OnTV = React.lazy(() => import('../pages/shows/on-tv'));
const PopularShows = React.lazy(() => import('../pages/shows/popular'));
const TopRatedShows = React.lazy(() => import('../pages/shows/top-rated'));

const PopularPeople = React.lazy(() => import('../pages/people'));
const SinglePerson = React.lazy(() => import('../pages/people/person'));

const Account = React.lazy(() => import('../pages/account'));
const ForgotPassword = React.lazy(() => import('../pages/account/forgot'));
const Login = React.lazy(() => import('../pages/account/login'));
const Register = React.lazy(() => import('../pages/account/register'));
const ResetPassword = React.lazy(() => import('../pages/account/reset-password'));

const Search = React.lazy(() => import('../pages/search'));

const useClientSideRoutes = (config) => {
	const { includesElements = true } = config;

	const routes = React.useMemo(
		() => [
			{
				url: '/',
				element: includesElements === true ? <Homepage /> : null
			},
			{
				url: '/movies',
				children: [
					{
						url: '/:id',
						element: includesElements === true ? <SingleMovie /> : null,
						menuTitle: ''
					},
					{
						url: '/popular',
						element: includesElements === true ? <PopularMovies /> : null,
						menuTitle: 'Popular'
					},
					{
						url: '/now-playing',
						element: includesElements === true ? <NowPlayingMovies /> : null,
						menuTitle: 'Now Playing'
					},
					{
						url: '/upcoming',
						element: includesElements === true ? <UpcomingMovies /> : null,
						menuTitle: 'Upcoming'
					},
					{
						url: '/top-rated',
						element: includesElements === true ? <TopRatedMovies /> : null,
						menuTitle: 'Top Rated'
					}
				]
			},
			{
				url: '/shows',
				children: [
					{
						url: '/:id',
						element: includesElements === true ? <SingleShow /> : null,
						menuTitle: ''
					},
					{
						url: '/popular',
						element: includesElements === true ? <PopularShows /> : null,
						menuTitle: 'Popular'
					},
					{
						url: '/airing-today',
						element: includesElements === true ? <AiringToday /> : null,
						menuTitle: 'Airing Today'
					},
					{
						url: '/on-tv',
						element: includesElements === true ? <OnTV /> : null,
						menuTitle: 'On TV'
					},
					{
						url: '/top-rated',
						element: includesElements === true ? <TopRatedShows /> : null,
						menuTitle: 'Top Rated'
					}
				]
			},
			{
				url: '/people',
				children: [
					{
						url: '/:id',
						element: includesElements === true ? <SinglePerson /> : null,
						menuTitle: ''
					},
					{
						url: '/popular',
						element: includesElements === true ? <PopularPeople /> : null,
						menuTitle: 'Popular People'
					}
				]
			},
			{
				url: '/login',
				element: includesElements === true ? <Login /> : null,
				menuTitle: 'Login'
			},
			{
				url: '/register',
				element: includesElements === true ? <Register /> : null,
				menuTitle: 'Register'
			},
			{
				url: '/forgot',
				element: includesElements === true ? <ForgotPassword /> : null,
				menuTitle: 'Forgot'
			},
			{
				url: '/reset-password',
				element: includesElements === true ? <ResetPassword /> : null,
				menuTitle: 'Reset Password'
			},
			{
				url: '/account',
				element: includesElements === true ? <Account /> : null,
				menuTitle: 'Account'
			},
			{
				url: '/search',
				element: includesElements === true ? <Search /> : null,
				menuTitle: 'Search'
			}
		],
		[includesElements]
	);

	return routes;
};

export default useClientSideRoutes;
