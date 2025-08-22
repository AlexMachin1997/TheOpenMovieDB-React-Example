import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
	SelectProvider,
	SelectTrigger,
	SelectList,
	SelectListItems,
	SelectGroupedListItems,
	SelectVirtualizedList,
	SelectListItem
} from '~/components/selects/core/components';
import {
	SingleSelectValue,
	SingleSelectListItem
} from '~/components/selects/single-select/single-select';
import { MultiSelectValue } from '~/components/selects/multi-select/multi-select';
import { Label } from '~/components/label/label';
import { Option } from '~/types/Option';

type SingleSelectStorybookTypes = {
	value?: string;
	options?: Option[];
	onValueChange?: (value: string) => void;
	children?: React.ReactNode;
	placeholder?: string;
	canSearch?: boolean;
	showClearButton?: boolean;
};

const meta: Meta<typeof SelectProvider> = {
	title: 'Components/Selects/SingleSelect',
	component: SelectProvider,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks: Option[] = [
	{ id: 'next.js', value: 'next.js', label: 'Next.js' },
	{ id: 'sveltekit', value: 'sveltekit', label: 'SvelteKit' },
	{ id: 'nuxt.js', value: 'nuxt.js', label: 'Nuxt.js' },
	{ id: 'remix', value: 'remix', label: 'Remix' },
	{ id: 'astro', value: 'astro', label: 'Astro' },
	{ id: 'vue', value: 'vue', label: 'Vue.js' },
	{ id: 'react', value: 'react', label: 'React' },
	{ id: 'angular', value: 'angular', label: 'Angular' },
	{ id: 'ember', value: 'ember', label: 'Ember' },
	{ id: 'backbone', value: 'backbone', label: 'Backbone.js' }
];

const programmingLanguages: Option[] = [
	{ id: 'javascript', value: 'javascript', label: 'JavaScript' },
	{ id: 'typescript', value: 'typescript', label: 'TypeScript' },
	{ id: 'python', value: 'python', label: 'Python' },
	{ id: 'java', value: 'java', label: 'Java' },
	{ id: 'csharp', value: 'csharp', label: 'C#' },
	{ id: 'go', value: 'go', label: 'Go' },
	{ id: 'rust', value: 'rust', label: 'Rust' },
	{ id: 'swift', value: 'swift', label: 'Swift' },
	{ id: 'kotlin', value: 'kotlin', label: 'Kotlin' },
	{ id: 'php', value: 'php', label: 'PHP' }
];

const BasicSingleSelectTemplate = (args: SingleSelectStorybookTypes) => {
	const [selectedValue, setSelectedValue] = React.useState<string>(args?.value || '');

	const handleValueChange = (values: string[]) => {
		console.log('values', values);
		const newValue = values[0] || '';
		setSelectedValue(newValue);
		args?.onValueChange?.(newValue);
	};

	return (
		<SelectProvider
			{...args}
			values={selectedValue ? [selectedValue] : []}
			onValuesChange={handleValueChange}
			mode='single'
		>
			<SelectTrigger className='w-full max-w-[400px]'>
				<SingleSelectValue
					placeholder={args?.placeholder || 'Select an option...'}
					showClearButton={args?.showClearButton}
				/>
			</SelectTrigger>
			<SelectList
				search={
					args?.canSearch
						? { placeholder: 'Search items...', emptyMessage: 'No items found' }
						: undefined
				}
			>
				<SelectListItems>
					{({ item }) => <SingleSelectListItem value={item.value} />}
				</SelectListItems>
			</SelectList>
		</SelectProvider>
	);
};

export const Default: StoryObj<SingleSelectStorybookTypes> = {
	render: (args) => <BasicSingleSelectTemplate {...args} />,
	args: {
		value: '',
		options: frameworks
	}
};

export const WithPreselectedValue: StoryObj<SingleSelectStorybookTypes> = {
	render: (args) => <BasicSingleSelectTemplate {...args} />,
	args: {
		value: 'react',
		options: frameworks
	}
};

export const WithSearch: StoryObj<SingleSelectStorybookTypes> = {
	args: {
		value: '',
		options: [
			{ id: 'us', value: 'us', label: 'United States' },
			{ id: 'ca', value: 'ca', label: 'Canada' },
			{ id: 'uk', value: 'uk', label: 'United Kingdom' },
			{ id: 'de', value: 'de', label: 'Germany' },
			{ id: 'fr', value: 'fr', label: 'France' },
			{ id: 'jp', value: 'jp', label: 'Japan' },
			{ id: 'au', value: 'au', label: 'Australia' },
			{ id: 'br', value: 'br', label: 'Brazil' },
			{ id: 'in', value: 'in', label: 'India' },
			{ id: 'cn', value: 'cn', label: 'China' }
		],
		canSearch: true
	},
	render: (args) => <BasicSingleSelectTemplate {...args} />
};

export const WithoutSearch: StoryObj<SingleSelectStorybookTypes> = {
	args: {
		value: '',
		options: frameworks.slice(0, 5),
		canSearch: false
	},
	render: (args) => <BasicSingleSelectTemplate {...args} />
};

const WithGroupsTemplate = () => {
	const [selectedValue, setSelectedValue] = React.useState<string>('');

	const handleValueChange = (values: string[]) => {
		setSelectedValue(values[0] || '');
	};

	// Grouped options for single select
	const groupOptions: Option[] = React.useMemo(
		() => [
			// Frontend Frameworks
			{ id: 'react', value: 'react', label: 'React', group: 'Frontend Frameworks' },
			{ id: 'vue', value: 'vue', label: 'Vue.js', group: 'Frontend Frameworks' },
			{ id: 'angular', value: 'angular', label: 'Angular', group: 'Frontend Frameworks' },
			{ id: 'svelte', value: 'svelte', label: 'Svelte', group: 'Frontend Frameworks' },

			// Backend Frameworks
			{ id: 'express', value: 'express', label: 'Express.js', group: 'Backend Frameworks' },
			{ id: 'fastify', value: 'fastify', label: 'Fastify', group: 'Backend Frameworks' },
			{ id: 'nestjs', value: 'nestjs', label: 'NestJS', group: 'Backend Frameworks' },
			{ id: 'django', value: 'django', label: 'Django', group: 'Backend Frameworks' },

			// Databases
			{ id: 'postgresql', value: 'postgresql', label: 'PostgreSQL', group: 'Databases' },
			{ id: 'mysql', value: 'mysql', label: 'MySQL', group: 'Databases' },
			{ id: 'mongodb', value: 'mongodb', label: 'MongoDB', group: 'Databases' },
			{ id: 'redis', value: 'redis', label: 'Redis', group: 'Databases' },

			// Cloud Platforms
			{ id: 'aws', value: 'aws', label: 'Amazon Web Services', group: 'Cloud Platforms' },
			{ id: 'azure', value: 'azure', label: 'Microsoft Azure', group: 'Cloud Platforms' },
			{ id: 'gcp', value: 'gcp', label: 'Google Cloud Platform', group: 'Cloud Platforms' },

			// Ungrouped
			{ id: 'vscode', value: 'vscode', label: 'VS Code' },
			{ id: 'figma', value: 'figma', label: 'Figma' }
		],
		[]
	);

	const groups = React.useMemo(() => {
		return [...new Set(groupOptions.map((opt) => opt.group).filter(Boolean))];
	}, [groupOptions]);

	return (
		<SelectProvider
			values={selectedValue ? [selectedValue] : []}
			onValuesChange={handleValueChange}
			options={groupOptions}
			mode='single'
		>
			<SelectTrigger className='w-full max-w-[400px]'>
				<SingleSelectValue placeholder='Select a technology...' />
			</SelectTrigger>
			<SelectList search={{ placeholder: 'Search items...', emptyMessage: 'No items found' }}>
				<SelectGroupedListItems groupOrder={groups} ungroupedPosition='bottom'>
					{({ item }) => <SingleSelectListItem value={item.value} />}
				</SelectGroupedListItems>
			</SelectList>
		</SelectProvider>
	);
};

export const WithGroups: Story = {
	render: () => <WithGroupsTemplate />
};

const LargeListVirtualizedTemplate = () => {
	const [selectedValue, setSelectedValue] = React.useState<string>('');

	const handleValueChange = (values: string[]) => {
		setSelectedValue(values[0] || '');
	};

	const options: Option[] = React.useMemo(() => {
		return Array.from({ length: 5000 }, (_, i) => ({
			id: `item-${i}`,
			value: `item-${i}`,
			label: `Item ${i + 1}`
		}));
	}, []);

	return (
		<SelectProvider
			values={selectedValue ? [selectedValue] : []}
			options={options}
			onValuesChange={handleValueChange}
			mode='single'
		>
			<SelectTrigger className='w-full max-w-[400px]'>
				<SingleSelectValue placeholder={`Select from ${options.length} items (virtualized)`} />
			</SelectTrigger>
			<SelectList search={{ placeholder: 'Search items...', emptyMessage: 'No items found' }}>
				<SelectVirtualizedList>
					{({ item }) => <SingleSelectListItem value={item.value} />}
				</SelectVirtualizedList>
			</SelectList>
		</SelectProvider>
	);
};

export const LargeListVirtualized: StoryObj<SingleSelectStorybookTypes> = {
	render: () => <LargeListVirtualizedTemplate />
};

const WithFormTemplate = () => {
	const [selectedFramework, setSelectedFramework] = React.useState<string>('');
	const [selectedLanguage, setSelectedLanguage] = React.useState<string>('');

	const handleFrameworkChange = (values: string[]) => {
		setSelectedFramework(values[0] || '');
	};

	const handleLanguageChange = (values: string[]) => {
		setSelectedLanguage(values[0] || '');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', {
			framework: selectedFramework,
			language: selectedLanguage
		});
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6 w-full max-w-md'>
			<div className='space-y-2'>
				<Label htmlFor='framework'>Select Framework:</Label>
				<SelectProvider
					values={selectedFramework ? [selectedFramework] : []}
					onValuesChange={handleFrameworkChange}
					options={frameworks}
					mode='single'
				>
					<SelectTrigger className='w-full'>
						<SingleSelectValue placeholder='Choose a framework...' />
					</SelectTrigger>
					<SelectList
						search={{ placeholder: 'Search frameworks...', emptyMessage: 'No frameworks found' }}
					>
						<SelectListItems>
							{({ item }) => <SingleSelectListItem value={item.value} />}
						</SelectListItems>
					</SelectList>
				</SelectProvider>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='language'>Select Language:</Label>
				<SelectProvider
					values={selectedLanguage ? [selectedLanguage] : []}
					onValuesChange={handleLanguageChange}
					options={programmingLanguages}
					mode='single'
				>
					<SelectTrigger className='w-full'>
						<SingleSelectValue placeholder='Choose a language...' />
					</SelectTrigger>
					<SelectList>
						<SelectListItems>
							{({ item }) => <SingleSelectListItem value={item.value} />}
						</SelectListItems>
					</SelectList>
				</SelectProvider>
			</div>

			<div className='pt-4'>
				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
				>
					Submit Form
				</button>
			</div>

			{selectedFramework || selectedLanguage ? (
				<div className='p-4 bg-gray-50 rounded-md'>
					<h4 className='text-sm font-medium mb-2'>Selected Values:</h4>
					{selectedFramework && (
						<div className='mb-2'>
							<strong>Framework:</strong> {selectedFramework}
						</div>
					)}
					{selectedLanguage && (
						<div>
							<strong>Language:</strong> {selectedLanguage}
						</div>
					)}
				</div>
			) : null}
		</form>
	);
};

export const WithForm: Story = {
	render: () => <WithFormTemplate />
};

const CustomStylingTemplate = (args: SingleSelectStorybookTypes) => {
	const [selectedValue, setSelectedValue] = React.useState<string>('');

	const handleValueChange = (values: string[]) => {
		setSelectedValue(values[0] || '');
	};

	return (
		<SelectProvider
			{...args}
			values={selectedValue ? [selectedValue] : []}
			onValuesChange={handleValueChange}
			mode='single'
		>
			<SelectTrigger className='w-full max-w-[400px] bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100'>
				<SingleSelectValue placeholder='Custom styled single-select...' />
			</SelectTrigger>
			<SelectList>
				<SelectListItems>
					{({ item }) => <SingleSelectListItem value={item.value} />}
				</SelectListItems>
			</SelectList>
		</SelectProvider>
	);
};

export const CustomStyling: Story = {
	render: (args) => <CustomStylingTemplate {...args} />,
	args: {
		options: frameworks
	}
};

export const WithClearButton: StoryObj<SingleSelectStorybookTypes> = {
	render: (args) => <BasicSingleSelectTemplate {...args} />,
	args: {
		value: 'react',
		options: frameworks,
		showClearButton: true
	}
};

export const WithoutClearButton: StoryObj<SingleSelectStorybookTypes> = {
	render: (args) => <BasicSingleSelectTemplate {...args} />,
	args: {
		value: 'vue',
		options: frameworks,
		showClearButton: false
	}
};

const ClearButtonDemoTemplate = () => {
	const [withClearValue, setWithClearValue] = React.useState<string>('react');
	const [withoutClearValue, setWithoutClearValue] = React.useState<string>('vue');

	const handleWithClearChange = (values: string[]) => {
		setWithClearValue(values[0] || '');
	};

	const handleWithoutClearChange = (values: string[]) => {
		setWithoutClearValue(values[0] || '');
	};

	return (
		<div className='space-y-8'>
			<div className='space-y-2'>
				<Label>With Clear Button (default):</Label>
				<SelectProvider
					values={withClearValue ? [withClearValue] : []}
					onValuesChange={handleWithClearChange}
					options={frameworks.slice(0, 6)}
				>
					<SelectTrigger className='w-full max-w-[400px]'>
						<SingleSelectValue placeholder='Select a framework...' showClearButton={true} />
					</SelectTrigger>
					<SelectList>
						<SelectListItems>
							{({ item }) => <SingleSelectListItem value={item.value} />}
						</SelectListItems>
					</SelectList>
				</SelectProvider>
				<div className='text-sm text-muted-foreground'>
					Selected: {withClearValue || 'None'} • Click the X button to clear
				</div>
			</div>

			<div className='space-y-2'>
				<Label>Without Clear Button:</Label>
				<SelectProvider
					values={withoutClearValue ? [withoutClearValue] : []}
					onValuesChange={handleWithoutClearChange}
					options={frameworks.slice(0, 6)}
					mode='single'
				>
					<SelectTrigger className='w-full max-w-[400px]'>
						<SingleSelectValue placeholder='Select a framework...' showClearButton={false} />
					</SelectTrigger>
					<SelectList>
						<SelectListItems>
							{({ item }) => <SingleSelectListItem value={item.value} />}
						</SelectListItems>
					</SelectList>
				</SelectProvider>
				<div className='text-sm text-muted-foreground'>
					Selected: {withoutClearValue || 'None'} • No clear button available
				</div>
			</div>
		</div>
	);
};

export const ClearButtonDemo: Story = {
	render: () => <ClearButtonDemoTemplate />
};
