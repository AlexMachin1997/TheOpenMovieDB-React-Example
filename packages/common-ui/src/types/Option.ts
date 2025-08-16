/**
 * @description A type for an option in a select, checkbox, or radio group
 * @example
 * const options: Option[] = [
 *   { label: 'Option 1', id: '1', value: 'option1' },
 *   { label: 'Option 2', id: '2', value: 'option2' },
 *   { label: 'Option 3', id: '3', value: 'option3' },
 * ];
 */
type Option = {
	label: string;
	id: string;
	value: string;
	order?: number;
	disabled?: boolean;
};

export type { Option };
