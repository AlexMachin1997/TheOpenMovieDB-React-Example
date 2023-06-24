import Accordion from './Accordion';

const DefaultStoryArgs = {
	children: 'Will only show when the Accordion is open',
	title: 'What is refund your refund policy'
};

export const DefaultIsOpen = {
	args: {
		...DefaultStoryArgs,
		defaultIsOpen: true
	}
};

export const IsDisabled = {
	args: {
		...DefaultStoryArgs,
		isDisabled: true
	}
};

export const FullExample = {
	args: {
		...DefaultStoryArgs
	}
};

export default {
	component: Accordion,
	title: 'Design System/Core/Accordion'
};
