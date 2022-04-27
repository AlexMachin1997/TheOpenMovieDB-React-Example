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
				element: includesElements === true ? <Homepage /> : null,
				isMenuLink: false
			},
			{
				url: '/movies',
				children: [
					{
						url: '/:id',
						element: includesElements === true ? <SingleMovie /> : null,
						menuTitle: '',
						isMenuLink: false
					},
					{
						url: '/popular',
						element: includesElements === true ? <PopularMovies /> : null,
						menuTitle: 'Popular',
						isMenuLink: true
					},
					{
						url: '/now-playing',
						element: includesElements === true ? <NowPlayingMovies /> : null,
						menuTitle: 'Now Playing',
						isMenuLink: true
					},
					{
						url: '/upcoming',
						element: includesElements === true ? <UpcomingMovies /> : null,
						menuTitle: 'Upcoming',
						isMenuLink: true
					},
					{
						url: '/top-rated',
						element: includesElements === true ? <TopRatedMovies /> : null,
						menuTitle: 'Top Rated',
						isMenuLink: true
					}
				]
			},
			{
				url: '/shows',
				children: [
					{
						url: '/:id',
						element: includesElements === true ? <SingleShow /> : null,
						menuTitle: '',
						isMenuLink: false
					},
					{
						url: '/popular',
						element: includesElements === true ? <PopularShows /> : null,
						menuTitle: 'Popular',
						isMenuLink: true
					},
					{
						url: '/airing-today',
						element: includesElements === true ? <AiringToday /> : null,
						menuTitle: 'Airing Today',
						isMenuLink: true
					},
					{
						url: '/on-tv',
						element: includesElements === true ? <OnTV /> : null,
						menuTitle: 'On TV',
						isMenuLink: true
					},
					{
						url: '/top-rated',
						element: includesElements === true ? <TopRatedShows /> : null,
						menuTitle: 'Top Rated',
						isMenuLink: true
					}
				]
			},
			{
				url: '/people',
				children: [
					{
						url: '/:id',
						element: includesElements === true ? <SinglePerson /> : null,
						menuTitle: '',
						isMenuLink: false
					},
					{
						url: '/popular',
						element: includesElements === true ? <PopularPeople /> : null,
						menuTitle: 'Popular People',
						isMenuLink: true
					}
				]
			},
			{
				url: '/login',
				element: includesElements === true ? <Login /> : null,
				menuTitle: 'Login',
				isMenuLink: true
			},
			{
				url: '/register',
				element: includesElements === true ? <Register /> : null,
				menuTitle: 'Register',
				isMenuLink: true
			},
			{
				url: '/forgot',
				element: includesElements === true ? <ForgotPassword /> : null,
				menuTitle: 'Forgot',
				isMenuLink: false
			},
			{
				url: '/reset-password',
				element: includesElements === true ? <ResetPassword /> : null,
				menuTitle: 'Reset Password',
				isMenuLink: false
			},
			{
				url: '/account',
				element: includesElements === true ? <Account /> : null,
				menuTitle: 'Account',
				isMenuLink: false
			},
			{
				url: '/search',
				element: includesElements === true ? <Search /> : null,
				menuTitle: 'Search',
				isMenuLink: false
			}
		],
		[includesElements]
	);

	return {
		allApplicationClientSideRoutes: routes,
		menuLinks: {
			movieLinks: routes
				.find((el) => el.url.includes('/movies'))
				.children.filter((el) => el.isMenuLink === true),
			showLinks: routes
				.find((el) => el.url.includes('/shows'))
				.children.filter((el) => el.isMenuLink === true),
			personLinks: routes
				.find((el) => el.url.includes('/people'))
				.children.filter((el) => el.isMenuLink === true)
		}
	};
};

export default useClientSideRoutes;
