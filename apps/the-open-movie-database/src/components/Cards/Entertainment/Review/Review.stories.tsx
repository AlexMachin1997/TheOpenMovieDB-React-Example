import { Meta, StoryObj } from '@storybook/react-vite';

import { Link, MemoryRouter } from 'react-router-dom';

import ReviewCard from './Review';

const meta: Meta<typeof ReviewCard> = {
	title: 'Cards/Entertainment/Review',
	component: ReviewCard
};

export default meta;

type Story = StoryObj<typeof ReviewCard>;

export const Simple: Story = {
	args: {
		author: {
			name: 'Cat Ellington',
			username: 'CatEllington',
			avatarUrl: 'https://www.themoviedb.org/t/p/w64_and_h64_face/yHGV91jVzmqpFOtRSHF0avBZmPm.jpg',
			rating: 5
		},
		isFeatured: false,
		content:
			'Star Wars (1977) is a true masterpiece of cinema, and is \r\n  definitely one of the best films ever made.\r\n\r\nFor me Star Wars (1977) is the best movie of all time,tied with The Lord of the Rings trilogy. Star Wars (1977) it is for sure the most iconic film of all time everything in it is iconic. The direction, the script, the performances in this film are brilliant, all the characters are captivating and well developed. \r\n\r\nAnyway, this is a totally perfect film, I only have praise for it, it is certainly a masterpiece of cinema, and my grade for it is 10\\10.',
		createdOn: 'November 1, 2017'
	}
};

export const FeaturedReviewExample: Story = {
	args: {
		...Simple.args,
		isFeatured: true
	}
};

export const NoAvatarPathExample: Story = {
	args: {
		...Simple.args,
		author: {
			...(Simple?.args?.author ?? {}),
			avatarUrl: null
		}
	}
};

export const RenderLink: Story = {
	args: {
		...Simple.args,
		renderLink: ({ content }) => <Link to='/'>{content}</Link>
	},
	decorators: [
		(StoryComponent) => (
			<MemoryRouter>
				<StoryComponent />
			</MemoryRouter>
		)
	]
};
