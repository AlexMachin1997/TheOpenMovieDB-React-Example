import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from './apollo';

import { Loader } from './components';

import usePageView from './hooks/react-router/pageView';
import useClientSideRoutes from './hooks/useClientSideRoutes';

const NoMatch = React.lazy(() => import('./pages/errors'));

const App = () => {
	// Used to track which page the user is on
	usePageView();

	// Used to get all the routes in the application
	const { allApplicationClientSideRoutes } = useClientSideRoutes({ includesElements: true });

	return (
		<ApolloProvider client={ApolloClient}>
			<Routes>
				{allApplicationClientSideRoutes.map((route) => {
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

				{/* The 404 page must be last */}
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
