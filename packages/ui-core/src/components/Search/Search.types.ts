import type { IDebouncableInput } from '~/components/DebouncableInput';

export interface ISearch extends IDebouncableInput {
	/**
	 * Renders a clear button (X icon) that allows users to reset the input value to an empty string.
	 * The button will only be visible when there is an active text value.
	 *
	 * @default false
	 */
	showClearButton?: boolean;
}
