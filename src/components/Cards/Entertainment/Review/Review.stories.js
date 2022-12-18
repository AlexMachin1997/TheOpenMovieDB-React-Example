import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import ReviewCard from './Review';

const Template = (args) => <ReviewCard {...args} />;

export const CreatedOn = Template.bind({});

CreatedOn.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: 5
	},
	createdOn: 'June 20, 2022'
};

export const Author = Template.bind({});

Author.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: 5
	}
};

export const AuthorWithNoRating = Template.bind({});

AuthorWithNoRating.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: null
	}
};

export const AuthorWithNoAvatarPath = Template.bind({});

AuthorWithNoAvatarPath.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: '',
		rating: 5
	}
};

export const Content = Template.bind({});

Content.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: 5
	},
	content:
		'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.'
};

export const IsFeatured = Template.bind({});

IsFeatured.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: 5
	},
	isFeatured: true
};

export const FullExampleWithAvatarPath = Template.bind({});

FullExampleWithAvatarPath.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: 5
	},
	isFeatured: true,
	content:
		'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
	createdOn: 'November 1, 2017'
};

export const FullExampleWithoutAvatarPath = Template.bind({});

FullExampleWithoutAvatarPath.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: null,
		rating: 5
	},
	isFeatured: true,
	content:
		'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
	createdOn: 'November 1, 2017'
};

export const ReviewCardWithButtonAsAuthorLink = Template.bind({});

ReviewCardWithButtonAsAuthorLink.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: null,
		rating: 5
	},
	isFeatured: true,
	content:
		'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
	createdOn: 'November 1, 2017',
	renderLink: ({ content }) => (
		<button onClick={() => console.log('clicked')} type='button'>
			{content}
		</button>
	)
};

export const ReviewCardAuthorLinkWithReactRouterLink = Template.bind({});

ReviewCardAuthorLinkWithReactRouterLink.decorators = [
	(Story) => (
		<MemoryRouter>
			<Story />
		</MemoryRouter>
	)
];

ReviewCardAuthorLinkWithReactRouterLink.args = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: null,
		rating: 5
	},
	isFeatured: true,
	content:
		'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
	createdOn: 'November 1, 2017',
	renderLink: ({ content }) => <Link to='/'>{content}</Link>
};

export default {
	title: ' Design System/Cards/Entertainment/Review',
	component: ReviewCard
};
