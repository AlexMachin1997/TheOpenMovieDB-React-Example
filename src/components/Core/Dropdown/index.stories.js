import React from 'react';

import Dropdown from './index';
import Image from '../Image';

const DropdownWithItems = (props) => (
	<Dropdown title='Movies' {...props}>
		<>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</>
	</Dropdown>
);

export const Default = () => <Dropdown />;

export const Title = () => <Dropdown title='Movies' />;

export const TitleType = () => (
	<Dropdown
		title={
			<Image
				src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
				alt='TMBDb Logo'
				width='190px'
				height='50px'
			/>
		}
		titleType='image'
	/>
);

export const DropdownBackground = () => <DropdownWithItems dropdownBackground='red' />;

export const DropdownBorderColour = () => <DropdownWithItems dropdownBorderColour='red' />;

export const ItemHoverBackground = () => <DropdownWithItems itemHoverBackground='red' />;

export const Background = () => <DropdownWithItems background='red' />;

export const Colour = () => <DropdownWithItems colour='red' />;

export const DropdownItemColour = () => <DropdownWithItems dropdownItemColour='red' />;

export default {
	component: Dropdown,
	title: 'Core -> Dropdown'
};
