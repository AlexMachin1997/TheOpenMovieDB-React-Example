/**
 * @description A type for an option in a select, checkbox, or radio group
 * @example
 * const options: Option[] = [
 *   { label: 'Option 1', id: '1', value: 'option1' },
 *   { label: 'Option 2', id: '2', value: 'option2' },
 *   { label: 'Option 3', id: '3', value: 'option3' },
 * ];
 *
 * // With groups:
 * const groupedOptions: Option[] = [
 *   { label: 'React', id: 'react', value: 'react', group: 'Frontend' },
 *   { label: 'Vue', id: 'vue', value: 'vue', group: 'Frontend' },
 *   { label: 'Express', id: 'express', value: 'express', group: 'Backend' },
 * ];
 */
type Option = {
	label: string;
	id: string;
	value: string;
	order?: number;
	disabled?: boolean;
	group?: string;
};

export type { Option };
