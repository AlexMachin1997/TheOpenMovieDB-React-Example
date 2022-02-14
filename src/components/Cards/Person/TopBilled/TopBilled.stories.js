import * as React from 'react';
import { action } from '@storybook/addon-actions';

import TopBilled from './TopBilled';
import Preview from '../../../Blocks/Storybook/Preview';

import { CardGroup } from '../../Shared';

export const Default = () => (
	<div className='flex'>
		<TopBilled />
	</div>
);

export const ActorName = () => (
	<div className='flex'>
		<TopBilled actorName='Gregg Clark' />
	</div>
);

export const CharacterName = () => (
	<div className='flex'>
		<TopBilled characterName='Phil Coulson / Sarge' />
	</div>
);

export const Image = () => (
	<div className='flex'>
		<TopBilled img='https://image.tmdb.org/t/p/w138_and_h175_face/mq686D91XoZpqkzELn0888NOiZW.jpg' />
	</div>
);

export const OnClick = () => (
	<div className='flex'>
		<TopBilled onClick={action('TopBilledCastMember click event')} />
	</div>
);

export const OnKeyDown = () => (
	<div className='flex'>
		<TopBilled onKeyDown={action('TopBilledCastMember keydown event')} />
	</div>
);

export const EntertainmentType = () => (
	<div className='flex'>
		<TopBilled entertainmentType='movie' />
	</div>
);

export const EpisodeCount = () => (
	<div className='flex'>
		<TopBilled episodeCount={100} />
	</div>
);

export const TvExample = () => (
	<div className='flex'>
		<TopBilled
			actorName='Evan Rachel Wood'
			characterName='Dolores Abernathy'
			img='https://image.tmdb.org/t/p/w138_and_h175_face/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
			onClick={action('Tv Example card clicked')}
			entertainmentType='tv'
			episodeCount={28}
		/>
	</div>
);

export const MovieExample = () => (
	<div className='flex'>
		<TopBilled
			actorName='Willem Dafoe'
			characterName='Norman Osborn / Green Goblin'
			img='https://www.themoviedb.org/t/p/w276_and_h350_face/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg'
			onClick={action('Movie Example card clicked')}
			entertainmentType='movie'
		/>
	</div>
);

export const MultipleCardsExampleTVExample = () => (
	<Preview
		content={
			<CardGroup>
				<TopBilled
					actorName='Evan Rachel Wood'
					characterName='Delores Abernathy'
					img='https://image.tmdb.org/t/p/original/g6XBBmsEd9fqP0gc4RuHsX0MXNl.jpg'
					onClick={action('Movie Example card clicked')}
					entertainmentType='tv'
					episodeCount={28}
				/>

				<TopBilled
					actorName='Thandie Newton'
					characterName='Maeve Millay'
					img='https://image.tmdb.org/t/p/original/hZQLvxj7nV7pBrRyWTvWVz1CDi8.jpg'
					onClick={action('Movie Example card clicked')}
					entertainmentType='tv'
					episodeCount={28}
				/>

				<TopBilled
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
				<div className='mr-2'>
					<TopBilled
						actorName='Charlize Theron'
						characterName='Andromache of Scythia / Andy'
						img='https://image.tmdb.org/t/p/original/1HloWLLhL3iTrmDtMigiitLB9Qx.jpg'
						onClick={action('Movie Example card clicked')}
						entertainmentType='movie'
					/>
				</div>

				<TopBilled
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
	component: TopBilled,
	title: 'Design System/Cards/Person/Top Billed Cast Member'
};
