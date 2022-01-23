import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from './apollo';

import Loader from './components/Core/Loader';

import usePageView from './hooks/react-router/pageView';

const Homepage = React.lazy(() => import('./pages/homepage'));

const SingleMovie = React.lazy(() => import('./pages/movies/movie'));
const NowPlayingMovies = React.lazy(() => import('./pages/movies/now-playing'));
const PopularMovies = React.lazy(() => import('./pages/movies/popular'));
const TopRatedMovies = React.lazy(() => import('./pages/movies/top-rated'));
const UpcomingMovies = React.lazy(() => import('./pages/movies/upcoming'));

const SingleShow = React.lazy(() => import('./pages/shows/show'));
const AiringToday = React.lazy(() => import('./pages/shows/airing-today'));
const OnTV = React.lazy(() => import('./pages/shows/on-tv'));
const PopularShows = React.lazy(() => import('./pages/shows/popular'));
const TopRatedShows = React.lazy(() => import('./pages/shows/top-rated'));

const PopularPeople = React.lazy(() => import('./pages/people'));
const SinglePerson = React.lazy(() => import('./pages/people/person'));

const Account = React.lazy(() => import('./pages/account'));
const ForgotPassword = React.lazy(() => import('./pages/account/forgot'));
const Login = React.lazy(() => import('./pages/account/login'));
const Register = React.lazy(() => import('./pages/account/register'));
const ResetPassword = React.lazy(() => import('./pages/account/reset-password'));

const Search = React.lazy(() => import('./pages/search'));

const NoMatch = React.lazy(() => import('./pages/errors'));

const ROUTES = [
	{
		url: '/',
		element: <Homepage />
	},
	{
		url: '/movies',
		children: [
			{
				url: '/:id',
				element: <SingleMovie />
			},
			{
				url: '/popular',
				element: <PopularMovies />
			},
			{
				url: '/now-playing',
				element: <NowPlayingMovies />
			},
			{
				url: '/upcoming',
				element: <UpcomingMovies />
			},
			{
				url: '/top-rated',
				element: <TopRatedMovies />
			}
		]
	},
	{
		url: '/shows',
		children: [
			{
				url: '/:id',
				element: <SingleShow />
			},
			{
				url: '/popular',
				element: <PopularShows />
			},
			{
				url: '/airing-today',
				element: <AiringToday />
			},
			{
				url: '/on-tv',
				element: <OnTV />
			},
			{
				url: '/top-rated',
				element: <TopRatedShows />
			}
		]
	},
	{
		url: '/people',
		children: [
			{
				url: '/:id',
				element: <SinglePerson />
			},
			{
				url: '/popular',
				element: <PopularPeople />
			}
		]
	},
	{
		url: '/login',
		element: <Login />
	},
	{
		url: '/register',
		element: <Register />
	},
	{
		url: '/forgot',
		element: <ForgotPassword />
	},
	{
		url: '/reset-password',
		element: <ResetPassword />
	},
	{
		url: '/account',
		element: <Account />
	},
	{
		url: '/search',
		element: <Search />
	}
];

const App = () => {
	usePageView();

	return (
		<ApolloProvider client={ApolloClient}>
			<Routes>
				{ROUTES.map((route) => {
					// When there are children elements available render a Route for each element
					if ((route?.children?.length ?? 0) > 1) {
						return route.children.map((childElement) => (
							<Route
								key={`${route.url}/${childElement.url}`} // /movies/:id
								path={`${route.url}/${childElement.url}`} // movies/:id
								element={
									<React.Suspense fallback={<Loader />}>{childElement.element}</React.Suspense>
								}
							/>
						));
					}

					// If the children aren't available then just render the single element provided
					return (
						<Route
							key={route.url} // /account
							path={route.url} // /account
							element={<React.Suspense fallback={<Loader />}>{route.element}</React.Suspense>}
						/>
					);
				})}
				<Route
					path='*' // If none of the routes have matched by this point then just return a 404 page
					element={
						<React.Suspense fallback={<Loader />}>
							<NoMatch />
						</React.Suspense>
					}
				/>
			</Routes>
		</ApolloProvider>
	);
};

export default App;
