import { render } from '@testing-library/react';

const createDOMElement = (component, query) => {
	render(component);
	return document.body.querySelector(query);
};

export default createDOMElement;
