import { ApolloLink } from 'apollo-link';
// import createContextLink from "./createContextLink";
import createErrorLink from './createErrorLink';
import createHttpLink from './createHttpLink';

const errorLink = createErrorLink();
const httpLink = createHttpLink();
// const contextLink = createContextLink();

const createLinks = () => {
	const links = ApolloLink.from([errorLink, httpLink]);

	return links;
};

export default createLinks;
