import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageView = () => {
	// Everytime the url changes it reruns the useLocation hooks, this returns an object with the current paths state and props
	const location = useLocation();

	// When the location variable changes rerun the effect (Could be used to track google location)
	useEffect(() => {
		console.log(`Current page: ${location.pathname}`);
	}, [location]);
};

export default usePageView;
