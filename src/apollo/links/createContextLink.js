import { setContext } from 'apollo-link-context';

const createContextLink = () => {
	const contextLink = setContext((_, { headers, ...rest }) => {
		const context = {
			...rest,
			headers: {
				...headers,
				Authorization: `bearer ${localStorage.getItem('token')}`
			}
		};
		return context;
	});

	return contextLink;
};

export default createContextLink;
