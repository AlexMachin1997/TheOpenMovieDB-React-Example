import * as React from 'react';

import PersonSidebar from './index';

export const Default = () => <PersonSidebar />;

export const CustomActorName = () => <PersonSidebar actorName='Scarlett Johansson' />;

export const CustomActorImage = () => (
	<PersonSidebar actorImage='https://image.tmdb.org/t/p/original/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg' />
);

export const CustomKnownFor = () => <PersonSidebar knownFor='Acting' />;

export const CustomKnownCredits = () => <PersonSidebar knownCredits={136} />;

export const CustomGender = () => <PersonSidebar gender='Female' />;

export const CustomBirthday = () => <PersonSidebar birthday='1984-11-22 (35 year old)' />;

export const CustomPlaceBirth = () => <PersonSidebar placeOfBirth='New York City, New Yokr, USA' />;

export const CustomKnownAs = () => (
	<PersonSidebar
		knownAs={[
			'Scarlett Johanssen',
			'Скарлетт Йоганссон',
			'Скарлетт Йоханссон',
			'Scarlett Ingrid Johansson',
			'스칼릿 조핸슨',
			'سكارليت جوهانسون',
			'史嘉蕾·喬韓森',
			'สการ์เลตต์ โจแฮนส์สัน',
			'スカーレット・ヨハンソン',
			'斯嘉丽·约翰逊',
			'스칼렛 요한슨',
			'Σκάρλετ Τζοχάνσον',
			'اسکارلت جوهانسون'
		]}
	/>
);

export const CustomSocialLink = () => <PersonSidebar facebookLink='https://www.facebook.com' />;

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
			'The Corporate Champion'
		]}
		facebookLink='https://www.facebook.com/DwayneJohnson'
		twitterLink='https://twitter.com/therock'
		instagramLink='https://instagram.com/therock/'
		homepageLink=''
	/>
);

export default {
	component: PersonSidebar,
	title: 'Sidebars -> PersonSidebar'
};
