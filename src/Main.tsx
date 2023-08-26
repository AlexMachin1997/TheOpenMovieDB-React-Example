import * as React from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const element = document.getElementById('root');

if (element !== null) {
	// Create the root using the #root mount point
	const root = createRoot(element, {
		onRecoverableError: (error) => {
			console.error('React has automatically recovered from an Error', error);
		},
		identifierPrefix: 'The-Open-Movie-Database' // Prefixes ids when using the useId hook
	});

	// Render the React Application (Router is used to allow a custom useLocation hook)
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	);
}
