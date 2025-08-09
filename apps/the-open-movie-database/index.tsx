import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './src/App';

const element = document.getElementById('root');

if (element !== null) {
	const root = createRoot(element, {
		onRecoverableError: (error) => {
			console.error('React has automatically recovered from an Error', error);
		},
		identifierPrefix: 'The-Open-Movie-Database'
	});

	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}
