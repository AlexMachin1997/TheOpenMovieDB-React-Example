import React, { Suspense, lazy } from 'react';

import { BrowserRouter as Route, Switch } from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from './apollo';

import Loader from './components/loader';

import usePageView from './hooks/react-router/pageView';

const Homepage = lazy(() => import('./pages/homepage'));

const SingleMovie = lazy(() => import('./pages/movies/movie'));
const NowPlayingMovies = lazy(() => import('./pages/movies/now-playing'));
const PopularMovies = lazy(() => import('./pages/movies/popular'));
const TopRatedMovies = lazy(() => import('./pages/movies/top-rated'));
const UpcomingMovies = lazy(() => import('./pages/movies/upcoming'));

const SingleShow = lazy(() => import('./pages/shows/show'));
const AiringToday = lazy(() => import('./pages/shows/airing-today'));
const OnTV = lazy(() => import('./pages/shows/on-tv'));
const PopularShows = lazy(() => import('./pages/shows/popular'));
const TopRatedShows = lazy(() => import('./pages/shows/top-rated'));

const PopularPeople = lazy(() => import('./pages/people'));
const SinglePerson = lazy(() => import('./pages/people/person'));

const Account = lazy(() => import('./pages/account'));
const ForgotPassword = lazy(() => import('./pages/account/forgot'));
const Login = lazy(() => import('./pages/account/login'));
const Register = lazy(() => import('./pages/account/register'));
const ResetPassword = lazy(() => import('./pages/account/reset-password'));

const Search = lazy(() => import('./pages/search'));

const NoMatch = lazy(() => import('./pages/errors'));

const App = () => {
	usePageView();

	return (
		<ApolloProvider client={ApolloClient}>
			<Suspense fallback={<Loader />}>
				<Switch>
					<Route path='/' exact>
						<Homepage />
					</Route>

					<Route path='/movies/:id' exact>
						<SingleMovie />
					</Route>

					<Route path='/movies/popular' exact>
						<PopularMovies />
					</Route>

					<Route path='/movies/now-playing' exact>
						<NowPlayingMovies />
					</Route>

					<Route path='/movies/upcoming' exact>
						<UpcomingMovies />
					</Route>

					<Route path='/movies/top-rated' exact>
						<TopRatedMovies />
					</Route>

					<Route path='/show/:id' exact>
						<SingleShow />
					</Route>

					<Route path='/shows/popular' exact>
						<PopularShows />
					</Route>

					<Route path='/shows/airing-today' exact>
						<AiringToday />
					</Route>

					<Route path='/shows/on-tv' exact>
						<OnTV />
					</Route>

					<Route path='/shows/top-rated' exact>
						<TopRatedShows />
					</Route>

					<Route path='/people/popular' exact>
						<PopularPeople />
					</Route>

					<Route path='/people/:id' exact>
						<SinglePerson />
					</Route>

					<Route path='/login' exact>
						<Login />
					</Route>

					<Route path='/register' exact>
						<Register />
					</Route>

					<Route path='/forgot' exact>
						<ForgotPassword />
					</Route>

					<Route path='/reset-password' exact>
						<ResetPassword />
					</Route>

					<Route path='/account' exact>
						<Account />
					</Route>

					<Route path='/search' exact>
						<Search />
					</Route>

					<Route>
						<NoMatch />
					</Route>
				</Switch>
			</Suspense>
		</ApolloProvider>
	);
};

export default App;
