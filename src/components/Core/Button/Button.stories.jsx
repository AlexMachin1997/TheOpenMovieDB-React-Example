import Button from './Button';

export const Default = {
	args: {
		children: 'Login'
	}
};

export const OnClick = {
	args: {
		onClick: () => 'Click',
		children: 'Login'
	}
};

export const OnKeyDown = {
	args: {
		onKeyDown: () => 'Keydown',
		children: 'Login'
	}
};

export const AdditionalProperties = {
	args: {
		className: 'text-orange-400 p-2',
		children: 'Login'
	}
};

export default {
	component: Button,
	title: 'Design System/Core/Button'
};
