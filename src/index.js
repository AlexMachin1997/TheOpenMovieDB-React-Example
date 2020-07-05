// React dependencies
import React from 'react';
import { render } from 'react-dom';

// React application entry point
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Add the ServiceWorker file
import * as serviceWorker from './serviceWorker/index';

// Render the React Application (Router is used to allow a custom useLocation hook)
render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root'),
);

// Register the WorkBox ServiceWorker
serviceWorker.registerServiceWorker();
