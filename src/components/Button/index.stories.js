import React from 'react';
import { action } from '@storybook/addon-actions';

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
export const Customtransform = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button transform="lowercase" />
			</div>
		}
	/>
);

export const CustomBackground = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button background="secondary" />
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

export const CustomColour = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button colour="red" content="Join Our Community" />
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

export const CustomHoverbackground = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button hoverbackground="secondary" />
			</div>
		}
	/>
);

export const CustomBorderRadius = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button borderRadius="0.5rem" background="secondary" />
			</div>
		}
	/>
);

export const CustomAriaLabel = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button ariaLabel="Submit" />
			</div>
		}
	/>
);

export const CustomId = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button id="Custom ID" />
			</div>
		}
	/>
);

export const CustomOnClick = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button onClick={action('Button clicked')} />
			</div>
		}
	/>
);

export const CustomType = () => (
	<Preview
		content={
			<div style={{ width: '300px', border: '1px solid black' }}>
				<Button type="submit" />
			</div>
		}
	/>
);

export default {
	component: Button,
	title: 'Buttons'
};
