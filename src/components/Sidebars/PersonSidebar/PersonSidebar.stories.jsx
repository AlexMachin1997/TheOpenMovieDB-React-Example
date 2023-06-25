import * as React from 'react';

import PersonSidebar from './PersonSidebar';

export const FullExample = () => (
	<PersonSidebar
		actorName='Dwayne Johnson'
		actorImage='https://image.tmdb.org/t/p/original/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg'
		knownFor='Acting'
		knownCredits={256}
		gender='Male'
		birthday='1972-05-02 (48 years old)'
		placeOfBirth='Hayward, California, USA'
		knownAs={[
			'The Rock',
			'Rock Maivia',
			'The Rock 1',
			'Dwayne ‘The Rock’ Johnson',
			'The Corporate Champion',
			'The Rock',
			'Rock Maivia',
			'The Rock 1',
			'Dwayne ‘The Rock’ Johnson',
			'The Corporate Champion',
			'The Rock',
			'Rock Maivia',
			'The Rock 1',
			'Dwayne ‘The Rock’ Johnson',
			'The Corporate Champion'
		]}
		facebookLink='https://www.facebook.com/DwayneJohnson'
		twitterLink='https://twitter.com/therock'
		instagramLink='https://instagram.com/therock/'
		homepageLink='https://www.wwe.com/superstars/the-rock'
	/>
);

export default {
	component: PersonSidebar,
	title: ' Design System/Sidebars/Person Sidebar'
};
