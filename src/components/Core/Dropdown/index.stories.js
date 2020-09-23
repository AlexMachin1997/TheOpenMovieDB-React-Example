import React from 'react';

import Dropdown from './index';
import Image from '../Image';

const DropdownWithItems = (props) => (
	<Dropdown
		content='Movies'
		items={[
			{
				text: 'Popular',
				link: ''
			},
			{
				text: 'Top Rated',
				link: ''
			},
			{
				text: 'Upcoming',
				link: ''
			},
			{
				text: 'Now Playing',
				link: ''
			}
		]}
		{...props}
	/>
);

export const Default = () => <Dropdown />;

export const Content = () => <Dropdown content='Movies' />;

export const ContentType = () => (
	<Dropdown
		content={
			<Image
				src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
				alt='TMBDb Logo'
				width='190px'
				height='50px'
			/>
		}
		contentType='image'
	/>
);

export const Items = () => <DropdownWithItems />;

export const LinkType = () => <DropdownWithItems linkType='external' />;

export const DropdownBackground = () => <DropdownWithItems dropdownBackground='red' />;

export const DropdownBorderColour = () => <DropdownWithItems dropdownBorderColour='red' />;

export const ItemHoverBackground = () => <DropdownWithItems itemHoverBackground='red' />;

export const Background = () => <DropdownWithItems background='red' />;

export const Colour = () => <DropdownWithItems colour='red' />;

export const DropdownItemColour = () => <DropdownWithItems dropdownItemColour='red' />;

export default {
	component: Dropdown,
	title: 'Dropdown'
};
