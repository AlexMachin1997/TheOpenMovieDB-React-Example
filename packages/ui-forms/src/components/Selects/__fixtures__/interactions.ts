import { within, userEvent, expect } from '@storybook/test';

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/**
 * Returns the combobox trigger button from the story canvas.
 */
export const getTrigger = (canvasElement: HTMLElement) => {
	return within(canvasElement).getByRole('combobox');
};

/**
 * Returns the popover dialog element (rendered in a portal on `document.body`).
 */
export const getDialog = () => {
	return within(document.body).getByRole('dialog');
};

/**
 * Returns a specific option inside the open dialog by its accessible name.
 * Auto-retries — the option may not exist yet if the search debounce (or, for large
 * virtualized lists, the subsequent re-render) hasn't settled.
 */
export const getOption = (name: string) => {
	return within(getDialog()).findByRole('option', { name });
};

/**
 * Returns the search input inside the open dialog.
 */
export const getSearchInput = () => {
	return within(getDialog()).getByRole('textbox');
};

// ---------------------------------------------------------------------------
// Action helpers
// ---------------------------------------------------------------------------

/**
 * Opens the select dropdown by clicking the trigger.
 * Asserts the trigger transitions to `aria-expanded="true"`.
 */
export const openSelect = async (canvasElement: HTMLElement) => {
	const trigger = getTrigger(canvasElement);
	await userEvent.click(trigger);
	await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	return trigger;
};

/**
 * Closes the select dropdown by pressing Escape.
 * Asserts the trigger transitions to `aria-expanded="false"`.
 */
export const closeSelect = async (canvasElement: HTMLElement) => {
	const trigger = getTrigger(canvasElement);
	await userEvent.keyboard('{Escape}');
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
};

/**
 * Types a search term into the search input inside the open dialog.
 */
export const searchFor = async (term: string) => {
	const input = getSearchInput();
	await userEvent.clear(input);
	await userEvent.type(input, term);
	// Wait for the debounce to trigger the search (Command uses a debounce scale)
	await new Promise((resolve) => setTimeout(resolve, 350));
};

/**
 * Selects an option by its accessible name inside the open dialog.
 */
export const selectOption = async (name: string) => {
	const option = await getOption(name);
	await userEvent.click(option);
};

// ---------------------------------------------------------------------------
// Assertion helpers
// ---------------------------------------------------------------------------

/**
 * Asserts the trigger is in its closed state and shows the expected placeholder.
 */
export const expectClosed = async (canvasElement: HTMLElement, placeholder: string) => {
	const trigger = getTrigger(canvasElement);
	await expect(trigger).toBeInTheDocument();
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await expect(trigger).toHaveTextContent(placeholder);
};

/**
 * Asserts the trigger shows a specific selected value text.
 */
export const expectTriggerText = async (canvasElement: HTMLElement, text: string) => {
	const trigger = getTrigger(canvasElement);
	await expect(trigger).toHaveTextContent(text);
};

/**
 * Asserts a given option is visible inside the open dialog.
 */
export const expectOptionVisible = async (name: string) => {
	const option = await getOption(name);
	await expect(option).toBeInTheDocument();
};

/**
 * Asserts that no option with the given name exists inside the open dialog.
 */
export const expectNoOption = async (name: string) => {
	const dialog = getDialog();
	const option = within(dialog).queryByRole('option', { name });
	await expect(option).not.toBeInTheDocument();
};
