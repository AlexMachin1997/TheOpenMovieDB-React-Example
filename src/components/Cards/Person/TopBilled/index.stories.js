import React from 'react';
import { action } from '@storybook/addon-actions';

import PosterCard from './index';
import Preview from '../../../Blocks/Storybook/Preview';

import { CardGroup } from '../../Shared';

export const Default = () => <Preview content={<PosterCard />} background='#F5F5F5' />;

export const ActorName = () => (
	<Preview content={<PosterCard actorName='Gregg Clark' />} background='#F5F5F5' />
);

export const CharacterName = () => (
	<Preview content={<PosterCard characterName='Phil Coulson / Sarge' />} background='#F5F5F5' />
);

export const Image = () => (
	<Preview
		content={
			<PosterCard img='https://image.tmdb.org/t/p/w138_and_h175_face/mq686D91XoZpqkzELn0888NOiZW.jpg' />
		}
		background='#F5F5F5'
	/>
);

export const OnClick = () => (
	<Preview
		content={<PosterCard onClick={action('TopBilledCastMember clicked')} />}
		background='#F5F5F5'
	/>
);

export const EntertainmentType = () => (
	<Preview content={<PosterCard entertainmentType='movie' />} background='#F5F5F5' />
);

export const EpisodeCount = () => (
	<Preview content={<PosterCard episodeCount={100} />} background='#F5F5F5' />
);

export const TvExample = () => (
	<Preview
		content={
			<PosterCard
				actorName='Evan Rachel Wood'
				characterName='Dolores Abernathy'
				img='https://image.tmdb.org/t/p/w138_and_h175_face/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
				onClick={action('Tv Example card clicked')}
				entertainmentType='tv'
				episodeCount={28}
			/>
		}
		background='#F5F5F5'
	/>
);

export const MultipleCardsExampleTVExample = () => (
	<Preview
		content={
			<CardGroup>
				<PosterCard
					actorName='Evan Rachel Wood'
					characterName='Delores Abernathy'
					img='https://image.tmdb.org/t/p/original/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
					onClick={action('Movie Example card clicked')}
					entertainmentType='tv'
					episodeCount={28}
				/>

				<PosterCard
					actorName='Thandie Newton'
					characterName='Maeve Millay'
					img='https://image.tmdb.org/t/p/original/hZQLvxj7nV7pBrRyWTvWVz1CDi8.jpg'
					onClick={action('Movie Example card clicked')}
					entertainmentType='tv'
					episodeCount={28}
				/>

				<PosterCard
					actorName='Jeffrey Wright'
					characterName='Bernard Lowe'
					img='https://image.tmdb.org/t/p/original/npJjOiFiAP4wiRDNjKsO8ho03Mg.jpg'
					onClick={action('Movie Example card clicked')}
					entertainmentType='tv'
					episodeCount={28}
				/>
			</CardGroup>
		}
		background='#F5F5F5'
	/>
);

export const MultipleCardsExampleMovieExample = () => (
	<Preview
		content={
			<CardGroup>
				<PosterCard
					actorName='Charlize Theron'
					characterName='Andromache of Scythia / Andy'
					img='https://image.tmdb.org/t/p/original/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
					onClick={action('Movie Example card clicked')}
					entertainmentType='movie'
				/>

				<PosterCard
					actorName='Kiki Layne'
					characterName='Nille Freeman'
					img='https://image.tmdb.org/t/p/original/aqQNDmRLlpJvbmbpqpU4bYRXEtb.jpg'
					onClick={action('Movie Example card clicked')}
					entertainmentType='movie'
				/>
			</CardGroup>
		}
	/>
);

export default {
<<<<<<< HEAD
	title: 'Card -> Person -> TopBilledCastMember',
=======
	title: 'Card - TopBilledCastMember',
>>>>>>> 69ca42d4ec3b98b139feebc68236943d1716d6a6
	component: PosterCard
};
