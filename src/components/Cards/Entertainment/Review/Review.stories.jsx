import * as React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';

import ReviewCard from './Review';

const StoryArgs = {
	author: {
		name: 'Cat Ellington',
		username: 'CatEllington',
		avatarPath: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
		rating: 5
	},
	isFeatured: false,
	content:
		'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
	createdOn: 'November 1, 2017',
	renderLink: null
};

export const FeaturedReviewExample = {
	args: {
		...StoryArgs,
		isFeatured: true
	}
};

export const NoAvatarPathExample = {
	args: {
		...StoryArgs,
		author: {
			...StoryArgs.author,
			avatarPath: null
		}
	}
};

export const ReactRouterLinkExample = {
	args: {
		...StoryArgs,
		renderLink: ({ content }) => <Link to='/'>{content}</Link>
	},

	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	]
};

export default {
	title: ' Design System/Cards/Entertainment/Review',
	component: ReviewCard
};
