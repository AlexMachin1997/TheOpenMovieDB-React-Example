import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { Facebook } from 'styled-icons/entypo-social';
import Button from './index';
import Typography from '../Typography';

export const Default = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button id='example-button' />
	</div>
);
export const CustomTransform = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button transform='lowercase' id='example-button' />
	</div>
);

export const CustomBackground = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button background='secondary' id='example-button' />
	</div>
);

export const CustomBorder = () => (
	<div style={{ width: '300px' }}>
		<Button border='1px solid red' id='example-button' />
	</div>
);

export const CustomColour = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button colour='red' content='Join Our Community' id='example-button' />
	</div>
);

export const CustomContentText = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button content='Join The Community' id='example-button' />
	</div>
);

export const CustomContentJSX = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button
			content={
				<>
					<div style={{ margin: '0.5rem' }}>
						<Typography type='p' text='Social Link' size='1.2rem' weight='bold' height={1.5} />
					</div>
					<Facebook size={25} />
				</>
			}
			id='example-button'
		/>
	</div>
);

export const CustomIsDisabled = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button isDisabled id='example-button' />
	</div>
);

export const CustomHoverbackground = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button hoverbackground='secondary' id='example-button' />
	</div>
);

export const CustomBorderRadius = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button borderRadius='0.5rem' background='secondary' id='example-button' />
	</div>
);

export const CustomAriaLabel = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button ariaLabel='Submit' id='example-button' />
	</div>
);

export const CustomId = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button id='Custom ID' />
	</div>
);

export const CustomOnClick = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button onClick={action('Button clicked')} id='Custom ID' />
	</div>
);

export const CustomType = () => (
	<div style={{ width: '300px', border: '1px solid black' }}>
		<Button type='submit' id='Custom ID' />
	</div>
);

export default {
	component: Button,
	title: 'Core -> Button'
};
