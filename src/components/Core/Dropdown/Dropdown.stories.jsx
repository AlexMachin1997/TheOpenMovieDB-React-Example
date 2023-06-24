import * as React from 'react';

import Dropdown from './Dropdown';

const DefaultStoryArgs = {
	title: 'Default title',
	buttonClass: '',
	dropdownClass: '',
	containerClass: '',
	onClick: null,
	alignment: 'left',
	children: <p>Children are required for this component</p>
};

export const Default = {
	args: {
		...DefaultStoryArgs,
		children: <p>Children are required for this component</p>
	}
};

export const Title = {
	args: {
		...DefaultStoryArgs,
		title: 'My custom title'
	}
};

export const ButtonClass = {
	args: {
		...DefaultStoryArgs,
		buttonClass: 'text-indigo-500'
	}
};

export const DropdownClass = {
	args: {
		...DefaultStoryArgs,
		dropdownClass: 'bg-white border-slate-300 border-[1px]'
	}
};

export const OnClick = {
	args: {
		...DefaultStoryArgs,
		onClick: () => 'Hello'
	}
};

export default {
	component: Dropdown,
	title: 'Design System/Core/Dropdown'
};
