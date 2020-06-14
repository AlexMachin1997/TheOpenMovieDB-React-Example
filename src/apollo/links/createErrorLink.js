import { onError } from 'apollo-link-error';

const createErrorLink = () => {
	const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
		if (graphQLErrors === true) {
			graphQLErrors.forEach(({ message, path }) => {
				console.log(`[Graphql Error] Message: ${message}, Path: ${path}`);
			});
		}

		if (networkError === true) {
			console.log(`[Network Error] ${networkError.message}, Operation: ${operation.operationName}`);
		}
	});

	return errorLink;
};

export default createErrorLink;
