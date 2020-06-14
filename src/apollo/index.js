import { ApolloClient } from 'apollo-client';

import createCache from './cache';
import createLink from './links';

const createApolloClient = new ApolloClient({
	cache: createCache(),
	link: createLink(),
	connectToDevTools: process.env.NODE_ENV !== 'production'
});

export default createApolloClient;
