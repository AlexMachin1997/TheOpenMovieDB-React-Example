// React dependencies
import * as React from 'react';
import { render } from 'react-dom';

import './index.scss';

// React application entry point
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Add the ServiceWorker file
import * as serviceWorker from './serviceWorker/index';

// Render the React Application (Router is used to allow a custom useLocation hook)
render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

// Register the WorkBox ServiceWorker
serviceWorker.registerServiceWorker();
