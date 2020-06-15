import React from 'react';

import Button from './index';
import Paragraph from '../Paragraph';
import Preview from '../Blocks/Storybook/Preview';

import { Facebook } from 'styled-icons/entypo-social';

export const Default = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button />
			</div>
		}
	/>
);
export const CustomTextTransform = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button textTransform="lowercase" />
			</div>
		}
	/>
);

export const CustomBackground = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button backgroundColour="secondary" />
			</div>
		}
	/>
);

export const CustomBorder = () => (
	<Preview
		content={
			<div style={{ width: '300px' }}>
				<Button border="1px solid red" />
			</div>
		}
	/>
);

export const CustomTextColour = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button textColour="secondary" content="Join Our Community" />
			</div>
		}
	/>
);

export const CustomContentText = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button content="Join The Community" />
			</div>
		}
	/>
);

export const CustomContentJSX = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
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
		}
	/>
);

export const CustomIsDisabled = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button isDisabled={true} />
			</div>
		}
	/>
);

export const CustomHoverBackgroundColour = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button hoverBackgroundColour="secondary" />
			</div>
		}
	/>
);

export const CustomBorderRadius = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button borderRadius="0.5rem" backgroundColour="secondary" />
			</div>
		}
	/>
);

export default {
	component: Button,
	title: 'Buttons'
};
