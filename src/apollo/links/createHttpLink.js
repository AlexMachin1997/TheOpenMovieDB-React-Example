import { HttpLink } from 'apollo-link-http';
import settings from '../../settings.json';

const createHttpLink = () => {
	const httpLink = new HttpLink({
		uri: settings.REACT_APP_APOLLO_CLIENT_URI,
	});

	return httpLink;
};

export default createHttpLink;
