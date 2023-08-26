// React dependencies
import * as React from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';

// React application entry point
import { BrowserRouter } from 'react-router-dom';

// Get the app, the part where the routes for the app are created
import App from './src/App';

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
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}
