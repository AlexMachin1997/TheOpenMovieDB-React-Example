import * as React from 'react';

import { Button, Icon, Image } from '../../../Core';

import generateComponentId from '../../../../utils/generateComponentId';
import { VideoCardProps } from '../../types';

const Video = ({
	title = '',
	subtitle = '',
	image = '',
	thumbnailAction = null,
	renderLink = null
}: VideoCardProps) => (
	<div
		id={generateComponentId(title, 'video-card-container')}
		className='relative min-w-[300px] max-w-[300px] p-4'
	>
		<Button
			id={generateComponentId(title, 'video-card-container-icon-container')}
			className='group relative w-full max-w-[300px]'
			onClick={(event) => {
				if (thumbnailAction) {
					thumbnailAction(event);
				}
			}}
			onKeyDown={(event) => {
				if (thumbnailAction) {
					if (event.key === 'Enter') {
						thumbnailAction(event);
					}
				}
			}}
		>
			<Image
				width='300px'
				height='169px'
				alt={title}
				src={image}
				className='aspect-video rounded-xl delay-150  group-hover:scale-105'
				label={`A thumbnail poster for ${title}`}
			/>
			<div className='absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center text-white'>
				<Icon className='fa-solid fa-play text-5xl delay-150 group-hover:text-6xl' />
			</div>
		</Button>
		<div className='py-1 text-center' id={generateComponentId(title, 'video-card-content')}>
			{typeof renderLink === 'function' ? (
				React.cloneElement(renderLink({ content: title }), {
					className: 'text-xl font-bold text-black hover:text-secondary'
				})
			) : (
				<h3 className='text-xl font-bold text-black'>{title}</h3>
			)}

			<h4 className='text-lg font-light text-black'>{subtitle}</h4>
		</div>
	</div>
);

export default Video;
