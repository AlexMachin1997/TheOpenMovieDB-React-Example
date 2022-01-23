import { ApolloClient } from '@apollo/client';
import createCache from './cache';
import createLink from './links';

import settings from '../settings.json';

const createApolloClient = new ApolloClient({
	cache: createCache(),
	link: createLink(),
	connectToDevTools: process.env.NODE_ENV !== 'production',
	uri: settings.REACT_APP_APOLLO_CLIENT_URI
});

export default createApolloClient;
