import { ApolloClient, InMemoryCache } from '@apollo/client';

import settings from '../settings.json';

const newApolloInMemoryCache = new InMemoryCache();

const createApolloClient = new ApolloClient({
	cache: newApolloInMemoryCache,
	connectToDevTools: process.env.NODE_ENV !== 'production',
	uri: settings.REACT_APP_APOLLO_CLIENT_URI
});

export default createApolloClient;
