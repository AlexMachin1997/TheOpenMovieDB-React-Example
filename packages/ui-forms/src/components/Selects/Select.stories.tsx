import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from '~/components/Selects/Select';
import type { SelectProps } from '~/components/Selects/Select.types';
import {
	SelectListItem,
	SelectListItemsVirtualized,
	SelectGroupedItemsVirtualized,
	SelectGroupedListItems
} from '~/components/Selects/components';
import { Label } from '@repo/ui-core';
import {
	frameworks,
	programmingLanguages,
	groupedTechOptions,
	getGroupNames,
	generateLargeOptionList
} from '~/components/Selects/__fixtures__/options';
import {
	openSelect,
	closeSelect,
	searchFor,
	selectOption,
	expectClosed,
	expectTriggerText,
	expectOptionVisible,
	expectNoOption,
	getDialog,
	getTrigger
} from '~/components/Selects/__fixtures__/interactions';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<SelectProps> = {
	title: 'UI Forms/Select',
	component: Select
};

export default meta;

// ---------------------------------------------------------------------------
// Single Select Stories
// ---------------------------------------------------------------------------

const SingleSelectTemplate = (args: SelectProps & { type: 'single' }) => {
	const [value, setValue] = React.useState<string>(args.value ?? '');

	return <Select {...args} type='single' value={value} onValueChange={setValue} />;
};

export const SingleDefault: StoryObj<SelectProps> = {
	name: 'Single / Default',
	render: () => (
		<SingleSelectTemplate
			type='single'
			value=''
			onValueChange={() => {}}
			options={frameworks}
			placeholder='Select a framework...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await expectClosed(canvasElement, 'Select a framework...');
		await openSelect(canvasElement);
		await expectOptionVisible('React');
		await selectOption('React');
		await expectTriggerText(canvasElement, 'React');
	}
};

export const SinglePreselected: StoryObj<SelectProps> = {
	name: 'Single / Preselected Value',
	render: () => (
		<SingleSelectTemplate
			type='single'
			value='react'
			onValueChange={() => {}}
			options={frameworks}
			placeholder='Select a framework...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		// Verify preselected value is displayed
		await expectTriggerText(canvasElement, 'React');
	}
};

export const SingleWithSearch: StoryObj<SelectProps> = {
	name: 'Single / Search Filtering',
	render: () => (
		<SingleSelectTemplate
			type='single'
			value=''
			onValueChange={() => {}}
			options={frameworks}
			placeholder='Select a framework...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);

		// Type a search term that matches only one option
		await searchFor('Svelte');
		await expectOptionVisible('SvelteKit');
		await expectNoOption('React');

		// Select the filtered result
		await selectOption('SvelteKit');
		await expectTriggerText(canvasElement, 'SvelteKit');
	}
};

export const SingleWithoutSearch: StoryObj<SelectProps> = {
	name: 'Single / Without Search',
	render: () => (
		<SingleSelectTemplate
			type='single'
			value=''
			onValueChange={() => {}}
			options={frameworks.slice(0, 5)}
			placeholder='Select a framework...'
			searchConfig={{ enabledSearch: false }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await expectClosed(canvasElement, 'Select a framework...');
		await openSelect(canvasElement);
		
		// Wait for dialog to open
		const dialog = getDialog();
		const searchInput = within(dialog).queryByRole('combobox');
		await expect(searchInput).not.toBeInTheDocument();
		
		await selectOption('Next.js');
		await expectTriggerText(canvasElement, 'Next.js');
	}
};

export const SingleWithoutClearButton: StoryObj<SelectProps> = {
	name: 'Single / Without Clear Button',
	render: () => (
		<SingleSelectTemplate
			type='single'
			value='vue'
			onValueChange={() => {}}
			options={frameworks}
			showClearButton={false}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await expectTriggerText(canvasElement, 'Vue.js');
		
		// Look for clear button and assert it's missing
		const trigger = getTrigger(canvasElement);
		const clearButton = within(trigger).queryByRole('button', { name: /clear/i });
		await expect(clearButton).not.toBeInTheDocument();
	}
};

const SingleWithGroupsTemplate = () => {
	const [value, setValue] = React.useState<string>('');
	const groups = getGroupNames(groupedTechOptions);

	return (
		<Select
			type='single'
			value={value}
			onValueChange={setValue}
			options={groupedTechOptions}
			placeholder='Select a technology...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search technologies...' }}
		>
			<SelectGroupedListItems groupOrder={groups} ungroupedPosition='bottom'>
				{({ item }) => <SelectListItem value={item.value} />}
			</SelectGroupedListItems>
		</Select>
	);
};

export const SingleWithGroups: StoryObj<SelectProps> = {
	name: 'Single / With Groups',
	render: () => <SingleWithGroupsTemplate />,
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await expectClosed(canvasElement, 'Select a technology...');
		await openSelect(canvasElement);
		
		// Assert groups exist by checking for option elements
		// (We know 'React' and 'Express.js' should be in their respective groups)
		await expectOptionVisible('React');
		await expectOptionVisible('Express.js');
		
		await selectOption('Express.js');
		await expectTriggerText(canvasElement, 'Express.js');
	}
};

const SingleVirtualizedTemplate = () => {
	const [value, setValue] = React.useState<string>('');
	const options = React.useMemo(() => generateLargeOptionList(5000), []);

	return (
		<Select
			type='single'
			value={value}
			onValueChange={setValue}
			options={options}
			placeholder={`Select from ${options.length} items (virtualized)`}
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search items...' }}
		>
			<SelectListItemsVirtualized>
				{({ item }) => <SelectListItem value={item.value} />}
			</SelectListItemsVirtualized>
		</Select>
	);
};

export const SingleVirtualized: StoryObj<SelectProps> = {
	name: 'Single / Virtualized (5 000 items)',
	render: () => <SingleVirtualizedTemplate />,
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);
		
		// Search for an item deep in the list to prove it handles large datasets
		await searchFor('Item 5000');
		
		const dialog = getDialog();
		const option = within(dialog).getByRole('option', { name: 'Item 5000' });
		await expect(option).toBeInTheDocument();
		
		await userEvent.click(option);
		await expectTriggerText(canvasElement, 'Item 5000');
	}
};

// ---------------------------------------------------------------------------
// Multi Select Stories
// ---------------------------------------------------------------------------

const MultiSelectTemplate = (args: SelectProps & { type: 'multiple' }) => {
	const [values, setValues] = React.useState<string[]>(args.value ?? []);

	return <Select {...args} type='multiple' value={values} onValueChange={setValues} />;
};

export const MultiDefault: StoryObj<SelectProps> = {
	name: 'Multi / Default',
	render: () => (
		<MultiSelectTemplate
			type='multiple'
			value={[]}
			onValueChange={() => {}}
			options={frameworks}
			placeholder='Select frameworks...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await expectClosed(canvasElement, 'Select frameworks...');
		await openSelect(canvasElement);

		// Select two options
		await selectOption('React');
		await selectOption('Vue.js');

		// Multi-select stays open
		await expectTriggerText(canvasElement, 'React');
		await expectTriggerText(canvasElement, 'Vue.js');

		// Close and verify it's closed
		await closeSelect(canvasElement);
	}
};

export const MultiPreselected: StoryObj<SelectProps> = {
	name: 'Multi / Preselected Values',
	render: () => (
		<MultiSelectTemplate
			type='multiple'
			value={['next.js', 'react']}
			onValueChange={() => {}}
			options={frameworks}
			placeholder='Select frameworks...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		// Verify preselected badges are visible
		await expectTriggerText(canvasElement, 'Next.js');
		await expectTriggerText(canvasElement, 'React');
	}
};

export const MultiWithSearch: StoryObj<SelectProps> = {
	name: 'Multi / Search Filtering',
	render: () => (
		<MultiSelectTemplate
			type='multiple'
			value={[]}
			onValueChange={() => {}}
			options={frameworks}
			placeholder='Select frameworks...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);

		// Search narrows list
		await searchFor('React');
		await expectOptionVisible('React');
		await expectNoOption('Vue.js');

		// Select the matching option
		await selectOption('React');
		await expectTriggerText(canvasElement, 'React');
	}
};

export const MultiWrapWhenOpen: StoryObj<SelectProps> = {
	name: 'Multi / Wrap When Open',
	render: () => (
		<MultiSelectTemplate
			type='multiple'
			value={[]}
			onValueChange={() => {}}
			options={frameworks}
			overflowBehavior='wrap-when-open'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);
		await selectOption('SvelteKit');
		await selectOption('Next.js');
		await selectOption('Angular');
		await selectOption('Vue.js');
		// Should have multiple badges now
		await expectTriggerText(canvasElement, 'SvelteKit');
		await expectTriggerText(canvasElement, 'Next.js');
	}
};

export const MultiWrap: StoryObj<SelectProps> = {
	name: 'Multi / Always Wrap',
	render: () => (
		<MultiSelectTemplate
			type='multiple'
			value={[]}
			onValueChange={() => {}}
			options={frameworks}
			overflowBehavior='wrap'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);
		await selectOption('React');
		await selectOption('Remix');
		await expectTriggerText(canvasElement, 'React');
		await expectTriggerText(canvasElement, 'Remix');
	}
};

export const MultiCutoff: StoryObj<SelectProps> = {
	name: 'Multi / Cutoff Overflow',
	render: () => (
		<MultiSelectTemplate
			type='multiple'
			value={[]}
			onValueChange={() => {}}
			options={frameworks}
			overflowBehavior='cutoff'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);
		await selectOption('Next.js');
		await selectOption('Nuxt.js');
		await selectOption('Remix');
		await selectOption('Astro');
		// The cutoff behavior renders a "+X" badge when overflowing. We just verify the trigger has content.
		await expectTriggerText(canvasElement, 'Next.js');
	}
};

export const MultiWithoutClearButton: StoryObj<SelectProps> = {
	name: 'Multi / Without Clear Button',
	render: () => (
		<MultiSelectTemplate
			type='multiple'
			value={['react', 'vue']}
			onValueChange={() => {}}
			options={frameworks}
			showClearButton={false}
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	),
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await expectTriggerText(canvasElement, 'React');
		await expectTriggerText(canvasElement, 'Vue.js');
		// Check that clear button inside trigger is not present
		const trigger = getTrigger(canvasElement);
		const clearButton = within(trigger).queryByRole('button', { name: /remove/i });
		await expect(clearButton).not.toBeInTheDocument();
	}
};

const MultiWithGroupsTemplate = () => {
	const [values, setValues] = React.useState<string[]>([]);
	const groups = getGroupNames(groupedTechOptions);

	return (
		<Select
			type='multiple'
			value={values}
			onValueChange={setValues}
			options={groupedTechOptions}
			placeholder='Select from 100+ technologies...'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search technologies...' }}
		>
			<SelectGroupedItemsVirtualized groupOrder={groups} ungroupedPosition='bottom'>
				{({ item }) => <SelectListItem value={item.value} />}
			</SelectGroupedItemsVirtualized>
		</Select>
	);
};

export const MultiWithGroups: StoryObj<SelectProps> = {
	name: 'Multi / With Groups (Virtualized)',
	render: () => <MultiWithGroupsTemplate />,
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);
		await selectOption('React');
		await selectOption('Express.js');
		await expectTriggerText(canvasElement, 'React');
		await expectTriggerText(canvasElement, 'Express.js');
	}
};

const MultiVirtualizedTemplate = () => {
	const [values, setValues] = React.useState<string[]>([]);
	const options = React.useMemo(() => generateLargeOptionList(5000), []);

	return (
		<Select
			type='multiple'
			value={values}
			onValueChange={setValues}
			options={options}
			placeholder={`Select from ${options.length} items (virtualized)`}
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search items...' }}
		>
			<SelectListItemsVirtualized>
				{({ item }) => <SelectListItem value={item.value} />}
			</SelectListItemsVirtualized>
		</Select>
	);
};

export const MultiVirtualized: StoryObj<SelectProps> = {
	name: 'Multi / Virtualized (5 000 items)',
	render: () => <MultiVirtualizedTemplate />,
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await openSelect(canvasElement);
		
		// Search and select items deep in the list to prove virtualization handles filtering
		await searchFor('Item 2500');
		await selectOption('Item 2500');
		
		await searchFor('Item 5000');
		await selectOption('Item 5000');
		
		await expectTriggerText(canvasElement, 'Item 2500');
		await expectTriggerText(canvasElement, 'Item 5000');
	}
};

// ---------------------------------------------------------------------------
// Form Integration
// ---------------------------------------------------------------------------

const FormTemplate = () => {
	const [framework, setFramework] = React.useState<string>('');
	const [languages, setLanguages] = React.useState<string[]>([]);

	const handleSubmit = () => {
		console.log('Form submitted:', { framework, languages });
	};

	return (
		<form action={handleSubmit} className='space-y-6 w-full max-w-md'>
			<div className='space-y-2'>
				<Label htmlFor='framework'>Favourite Framework:</Label>
				<Select
					type='single'
					value={framework}
					onValueChange={setFramework}
					options={frameworks}
					placeholder='Choose a framework...'
					searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='languages'>Languages you know:</Label>
				<Select
					type='multiple'
					value={languages}
					onValueChange={setLanguages}
					options={programmingLanguages}
					placeholder='Choose languages...'
					searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search languages...' }}
				/>
			</div>

			<div className='pt-4'>
				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
				>
					Submit Form
				</button>
			</div>

			{(framework || languages.length > 0) && (
				<div className='p-4 bg-gray-50 rounded-md'>
					<h4 className='text-sm font-medium mb-2'>Selected Values:</h4>
					{framework && (
						<div className='mb-2'>
							<strong>Framework:</strong> {framework}
						</div>
					)}
					{languages.length > 0 && (
						<div>
							<strong>Languages:</strong> {languages.join(', ')}
						</div>
					)}
				</div>
			)}
		</form>
	);
};

export const FormIntegration: StoryObj<SelectProps> = {
	name: 'Form Integration',
	render: () => <FormTemplate />
};

// ---------------------------------------------------------------------------
// Custom Styling
// ---------------------------------------------------------------------------

const CustomStylingTemplate = () => {
	const [value, setValue] = React.useState<string>('');

	return (
		<Select
			type='single'
			value={value}
			onValueChange={setValue}
			options={frameworks}
			placeholder='Custom styled select...'
			triggerClassName='w-full max-w-[400px] bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100'
			searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search frameworks...' }}
		/>
	);
};

export const CustomStyling: StoryObj<SelectProps> = {
	name: 'Custom Styling',
	render: () => <CustomStylingTemplate />,
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const trigger = getTrigger(canvasElement);
		// Verify custom class is applied
		await expect(trigger.className).toContain('bg-gradient-to-r');
		await openSelect(canvasElement);
		await selectOption('React');
	}
};

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

const EmptyStateTemplate = () => {
	const [value, setValue] = React.useState<string>('');

	return (
		<div className='space-y-8'>
			<div className='space-y-2'>
				<Label>Default Empty State (No Options):</Label>
				<Select
					type='single'
					value={value}
					onValueChange={setValue}
					options={[]}
					placeholder='Select an option...'
					searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search items...' }}
				/>
			</div>

			<div className='space-y-2'>
				<Label>Custom Empty State Messages:</Label>
				<Select
					type='single'
					value={value}
					onValueChange={setValue}
					options={[]}
					placeholder='Select an option...'
					emptyState={{
						noOptionsMessage: 'No items available at the moment',
						noSearchResultsMessage: 'No items found matching {searchTerm}',
						formatSearchTerm: (term) => `"${term}"`
					}}
					searchConfig={{ enabledSearch: true, searchPlaceholder: 'Search items...' }}
				/>
			</div>
		</div>
	);
};

export const EmptyState: StoryObj<SelectProps> = {
	name: 'Empty State',
	render: () => <EmptyStateTemplate />,
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		// First select has default empty state
		const triggers = within(canvasElement).getAllByRole('combobox');
		const defaultSelect = triggers[0]!;
		
		await userEvent.click(defaultSelect);
		// Get all dialogs and find the visible one
		const dialogs = within(document.body).getAllByRole('dialog');
		const defaultDialog = dialogs.find(d => window.getComputedStyle(d).pointerEvents !== 'none') || dialogs[0]!;
		await expect(within(defaultDialog).getByText('No options currently available')).toBeInTheDocument();
		await userEvent.keyboard('{Escape}');
		
		// Wait for closing animation
		await new Promise(r => setTimeout(r, 200));
		
		// Second select has custom empty state
		const customSelect = triggers[1]!;
		await userEvent.click(customSelect);
		const currentDialogs = within(document.body).getAllByRole('dialog');
		const customDialog = currentDialogs.find(d => window.getComputedStyle(d).pointerEvents !== 'none') || currentDialogs[currentDialogs.length - 1]!;
		await expect(within(customDialog).getByText('No items available at the moment')).toBeInTheDocument();
		
		// Search triggers the other custom empty state
		const searchInput = within(customDialog).getByRole('combobox');
		await userEvent.type(searchInput, 'test');
		// Wait for debounce
		await new Promise((resolve) => setTimeout(resolve, 350));
		await expect(within(customDialog).getByText('No items found matching "test"')).toBeInTheDocument();
	}
};
