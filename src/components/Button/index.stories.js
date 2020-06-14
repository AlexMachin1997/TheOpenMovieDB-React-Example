import React from 'react';

import Button from './index';
import Paragraph from '../Paragraph';

import { Facebook } from 'styled-icons/entypo-social';

export const Default = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button />
	</div>
);

export const CustomTextTransform = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button textTransform="lowercase" />
	</div>
);

export const CustomBackground = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button backgroundColour="secondary" />
	</div>
);

export const CustomBorder = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button border="1px solid red" />
	</div>
);

export const CustomTextColour = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button textColour="secondary" content="Join Our Community" />
	</div>
);

export const CustomContentText = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button content="Join The Community" />
	</div>
);

export const CustomContentJSX = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button
			content={
				<>
					<div style={{ margin: '0.5rem' }}>
						<Paragraph text="Social Link" size="1.2rem" weight="bold" height={1.5} />
					</div>
					<Facebook size={25} />
				</>
			}
		/>
	</div>
);

export const CustomIsDisabled = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button isDisabled={true} />
	</div>
);

export const CustomHoverBackgroundColour = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button hoverBackgroundColour="secondary" />
	</div>
);

export const CustomBorderRadius = () => (
	<div style={{ background: '#f0f2f5', padding: '1rem', width: '300px' }}>
		<Button borderRadius="0.5rem" backgroundColour="white" />
	</div>
);

export default {
	component: Button,
	title: 'Buttons'
};
