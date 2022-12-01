import { ApolloClient, InMemoryCache } from '@apollo/client';

import settings from '../settings';

const newApolloInMemoryCache = new InMemoryCache();

const createApolloClient = new ApolloClient({
	cache: newApolloInMemoryCache,
	connectToDevTools: process.env.NODE_ENV !== 'production',
	uri: settings.GRAPHQL_ENDPOINT_URI
});

export default createApolloClient;
