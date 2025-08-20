import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
	MultiSelect,
	MultiSelectTrigger,
	MultiSelectValue,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectSeparator
} from '~/components/select/select';

const meta: Meta<typeof MultiSelect> = {
	title: 'Components/Select',
	component: MultiSelect,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		values: {
			control: 'object',
			description: 'Controlled selected values'
		},
		defaultValues: {
			control: 'object',
			description: 'Default selected values'
		},
		onValuesChange: {
			action: 'onValuesChange',
			description: 'Called when selected values change'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
	{ value: 'next.js', label: 'Next.js' },
	{ value: 'sveltekit', label: 'SvelteKit' },
	{ value: 'nuxt.js', label: 'Nuxt.js' },
	{ value: 'remix', label: 'Remix' },
	{ value: 'astro', label: 'Astro' },
	{ value: 'vue', label: 'Vue.js' },
	{ value: 'react', label: 'React' },
	{ value: 'angular', label: 'Angular' },
	{ value: 'ember', label: 'Ember' },
	{ value: 'backbone', label: 'Backbone.js' }
];

const programmingLanguages = [
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'typescript', label: 'TypeScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'java', label: 'Java' },
	{ value: 'csharp', label: 'C#' },
	{ value: 'go', label: 'Go' },
	{ value: 'rust', label: 'Rust' },
	{ value: 'swift', label: 'Swift' },
	{ value: 'kotlin', label: 'Kotlin' },
	{ value: 'php', label: 'PHP' }
];

const countries = [
	{ value: 'us', label: 'United States' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'de', label: 'Germany' },
	{ value: 'fr', label: 'France' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'au', label: 'Australia' },
	{ value: 'br', label: 'Brazil' },
	{ value: 'in', label: 'India' },
	{ value: 'cn', label: 'China' }
];

export const Default: Story = {
	render: () => (
		<MultiSelect>
			<MultiSelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Select frameworks...' />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectGroup>
					{frameworks.map((framework) => (
						<MultiSelectItem key={framework.value} value={framework.value}>
							{framework.label}
						</MultiSelectItem>
					))}
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const WithPreselectedValues: Story = {
	render: () => (
		<MultiSelect defaultValues={['next.js', 'react']}>
			<MultiSelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Select frameworks...' />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectGroup>
					{frameworks.map((framework) => (
						<MultiSelectItem key={framework.value} value={framework.value}>
							{framework.label}
						</MultiSelectItem>
					))}
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const Controlled: Story = {
	render: () => {
		const [selectedValues, setSelectedValues] = React.useState<string[]>([
			'typescript',
			'javascript'
		]);

		return (
			<MultiSelect values={selectedValues} onValuesChange={setSelectedValues}>
				<MultiSelectTrigger className='w-full max-w-[400px]'>
					<MultiSelectValue placeholder='Select programming languages...' />
				</MultiSelectTrigger>
				<MultiSelectContent>
					<MultiSelectGroup>
						{programmingLanguages.map((language) => (
							<MultiSelectItem key={language.value} value={language.value}>
								{language.label}
							</MultiSelectItem>
						))}
					</MultiSelectGroup>
				</MultiSelectContent>
			</MultiSelect>
		);
	}
};

export const WithSearch: Story = {
	render: () => (
		<MultiSelect>
			<MultiSelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Search and select countries...' />
			</MultiSelectTrigger>
			<MultiSelectContent
				search={{ placeholder: 'Search countries...', emptyMessage: 'No countries found.' }}
			>
				<MultiSelectGroup>
					{countries.map((country) => (
						<MultiSelectItem key={country.value} value={country.value}>
							{country.label}
						</MultiSelectItem>
					))}
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const WithoutSearch: Story = {
	render: () => (
		<MultiSelect>
			<MultiSelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Select frameworks (no search)...' />
			</MultiSelectTrigger>
			<MultiSelectContent search={false}>
				<MultiSelectGroup>
					{frameworks.slice(0, 5).map((framework) => (
						<MultiSelectItem key={framework.value} value={framework.value}>
							{framework.label}
						</MultiSelectItem>
					))}
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const WithGroups: Story = {
	render: () => (
		<MultiSelect>
			<MultiSelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Select technologies...' />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectGroup heading='Frontend Frameworks'>
					<MultiSelectItem value='react'>React</MultiSelectItem>
					<MultiSelectItem value='vue'>Vue.js</MultiSelectItem>
					<MultiSelectItem value='angular'>Angular</MultiSelectItem>
					<MultiSelectItem value='svelte'>Svelte</MultiSelectItem>
				</MultiSelectGroup>
				<MultiSelectSeparator />
				<MultiSelectGroup heading='Backend Frameworks'>
					<MultiSelectItem value='express'>Express.js</MultiSelectItem>
					<MultiSelectItem value='fastify'>Fastify</MultiSelectItem>
					<MultiSelectItem value='koa'>Koa</MultiSelectItem>
					<MultiSelectItem value='hapi'>Hapi</MultiSelectItem>
				</MultiSelectGroup>
				<MultiSelectSeparator />
				<MultiSelectGroup heading='Databases'>
					<MultiSelectItem value='postgresql'>PostgreSQL</MultiSelectItem>
					<MultiSelectItem value='mongodb'>MongoDB</MultiSelectItem>
					<MultiSelectItem value='mysql'>MySQL</MultiSelectItem>
					<MultiSelectItem value='redis'>Redis</MultiSelectItem>
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const CustomBadgeLabels: Story = {
	render: () => (
		<MultiSelect>
			<MultiSelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Select with custom badges...' />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectGroup>
					<MultiSelectItem value='react' badgeLabel='⚛️ React'>
						React - A JavaScript library for building user interfaces
					</MultiSelectItem>
					<MultiSelectItem value='vue' badgeLabel='�� Vue'>
						Vue.js - The Progressive JavaScript Framework
					</MultiSelectItem>
					<MultiSelectItem value='angular' badgeLabel='🅰️ Angular'>
						Angular - Platform for building mobile and desktop web applications
					</MultiSelectItem>
					<MultiSelectItem value='svelte' badgeLabel='⚡ Svelte'>
						Svelte - Cybernetically enhanced web apps
					</MultiSelectItem>
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const OverflowBehavior: Story = {
	render: () => (
		<div className='space-y-4'>
			<div>
				<h3 className='text-sm font-medium mb-2'>Wrap when open:</h3>
				<MultiSelect>
					<MultiSelectTrigger className='w-full max-w-[300px]'>
						<MultiSelectValue
							placeholder='Select frameworks...'
							overflowBehavior='wrap-when-open'
						/>
					</MultiSelectTrigger>
					<MultiSelectContent>
						<MultiSelectGroup>
							{frameworks.map((framework) => (
								<MultiSelectItem key={framework.value} value={framework.value}>
									{framework.label}
								</MultiSelectItem>
							))}
						</MultiSelectGroup>
					</MultiSelectContent>
				</MultiSelect>
			</div>

			<div>
				<h3 className='text-sm font-medium mb-2'>Always wrap:</h3>
				<MultiSelect>
					<MultiSelectTrigger className='w-full max-w-[300px]'>
						<MultiSelectValue placeholder='Select frameworks...' overflowBehavior='wrap' />
					</MultiSelectTrigger>
					<MultiSelectContent>
						<MultiSelectGroup>
							{frameworks.map((framework) => (
								<MultiSelectItem key={framework.value} value={framework.value}>
									{framework.label}
								</MultiSelectItem>
							))}
						</MultiSelectGroup>
					</MultiSelectContent>
				</MultiSelect>
			</div>

			<div>
				<h3 className='text-sm font-medium mb-2'>Cutoff (default):</h3>
				<MultiSelect>
					<MultiSelectTrigger className='w-full max-w-[300px]'>
						<MultiSelectValue placeholder='Select frameworks...' overflowBehavior='cutoff' />
					</MultiSelectTrigger>
					<MultiSelectContent>
						<MultiSelectGroup>
							{frameworks.map((framework) => (
								<MultiSelectItem key={framework.value} value={framework.value}>
									{framework.label}
								</MultiSelectItem>
							))}
						</MultiSelectGroup>
					</MultiSelectContent>
				</MultiSelect>
			</div>
		</div>
	)
};

export const DisabledClickToRemove: Story = {
	render: () => (
		<MultiSelect>
			<MultiSelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Select frameworks...' clickToRemove={false} />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectGroup>
					{frameworks.map((framework) => (
						<MultiSelectItem key={framework.value} value={framework.value}>
							{framework.label}
						</MultiSelectItem>
					))}
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const CustomStyling: Story = {
	render: () => (
		<MultiSelect>
			<MultiSelectTrigger className='w-full max-w-[400px] bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100'>
				<MultiSelectValue placeholder='Custom styled multi-select...' />
			</MultiSelectTrigger>
			<MultiSelectContent>
				<MultiSelectGroup>
					{frameworks.map((framework) => (
						<MultiSelectItem key={framework.value} value={framework.value}>
							{framework.label}
						</MultiSelectItem>
					))}
				</MultiSelectGroup>
			</MultiSelectContent>
		</MultiSelect>
	)
};

export const LargeList: Story = {
	render: () => {
		const largeList = Array.from({ length: 50 }, (_, i) => ({
			value: `item-${i}`,
			label: `Item ${i + 1}`
		}));

		return (
			<MultiSelect>
				<MultiSelectTrigger className='w-full max-w-[400px]'>
					<MultiSelectValue placeholder='Select from large list...' />
				</MultiSelectTrigger>
				<MultiSelectContent>
					<MultiSelectGroup>
						{largeList.map((item) => (
							<MultiSelectItem key={item.value} value={item.value}>
								{item.label}
							</MultiSelectItem>
						))}
					</MultiSelectGroup>
				</MultiSelectContent>
			</MultiSelect>
		);
	}
};

export const WithForm: Story = {
	render: () => {
		const [selectedFrameworks, setSelectedFrameworks] = React.useState<string[]>([]);
		const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([]);

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			console.log('Form submitted:', {
				frameworks: selectedFrameworks,
				languages: selectedLanguages
			});
		};

		return (
			<form onSubmit={handleSubmit} className='space-y-6 w-full max-w-md'>
				<div className='space-y-2'>
					<label className='text-sm font-medium'>Select Frameworks:</label>
					<MultiSelect values={selectedFrameworks} onValuesChange={setSelectedFrameworks}>
						<MultiSelectTrigger className='w-full'>
							<MultiSelectValue placeholder='Choose frameworks...' />
						</MultiSelectTrigger>
						<MultiSelectContent>
							<MultiSelectGroup>
								{frameworks.map((framework) => (
									<MultiSelectItem key={framework.value} value={framework.value}>
										{framework.label}
									</MultiSelectItem>
								))}
							</MultiSelectGroup>
						</MultiSelectContent>
					</MultiSelect>
				</div>

				<div className='space-y-2'>
					<label className='text-sm font-medium' htmlFor='languages'>
						Select Languages:
					</label>
					<MultiSelect values={selectedLanguages} onValuesChange={setSelectedLanguages}>
						<MultiSelectTrigger className='w-full'>
							<MultiSelectValue placeholder='Choose languages...' />
						</MultiSelectTrigger>
						<MultiSelectContent>
							<MultiSelectGroup>
								{programmingLanguages.map((language) => (
									<MultiSelectItem key={language.value} value={language.value}>
										{language.label}
									</MultiSelectItem>
								))}
							</MultiSelectGroup>
						</MultiSelectContent>
					</MultiSelect>
				</div>

				<div className='pt-4'>
					<button
						type='submit'
						className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
					>
						Submit Form
					</button>
				</div>

				{selectedFrameworks.length > 0 || selectedLanguages.length > 0 ? (
					<div className='p-4 bg-gray-50 rounded-md'>
						<h4 className='text-sm font-medium mb-2'>Selected Values:</h4>
						{selectedFrameworks.length > 0 && (
							<div className='mb-2'>
								<strong>Frameworks:</strong> {selectedFrameworks.join(', ')}
							</div>
						)}
						{selectedLanguages.length > 0 && (
							<div>
								<strong>Languages:</strong> {selectedLanguages.join(', ')}
							</div>
						)}
					</div>
				) : null}
			</form>
		);
	}
};

export const AllVariants: Story = {
	render: () => (
		<div className='space-y-6 w-full max-w-2xl'>
			<div>
				<h3 className='text-lg font-semibold mb-4'>MultiSelect Component Variants</h3>

				<div className='space-y-4'>
					<div>
						<h4 className='text-sm font-medium mb-2'>Default MultiSelect</h4>
						<MultiSelect>
							<MultiSelectTrigger className='w-full max-w-[300px]'>
								<MultiSelectValue placeholder='Select frameworks...' />
							</MultiSelectTrigger>
							<MultiSelectContent>
								<MultiSelectGroup>
									{frameworks.slice(0, 5).map((framework) => (
										<MultiSelectItem key={framework.value} value={framework.value}>
											{framework.label}
										</MultiSelectItem>
									))}
								</MultiSelectGroup>
							</MultiSelectContent>
						</MultiSelect>
					</div>

					<div>
						<h4 className='text-sm font-medium mb-2'>With Search</h4>
						<MultiSelect>
							<MultiSelectTrigger className='w-full max-w-[300px]'>
								<MultiSelectValue placeholder='Search countries...' />
							</MultiSelectTrigger>
							<MultiSelectContent
								search={{ placeholder: 'Search countries...', emptyMessage: 'No countries found.' }}
							>
								<MultiSelectGroup>
									{countries.map((country) => (
										<MultiSelectItem key={country.value} value={country.value}>
											{country.label}
										</MultiSelectItem>
									))}
								</MultiSelectGroup>
							</MultiSelectContent>
						</MultiSelect>
					</div>

					<div>
						<h4 className='text-sm font-medium mb-2'>With Groups and Separators</h4>
						<MultiSelect>
							<MultiSelectTrigger className='w-full max-w-[300px]'>
								<MultiSelectValue placeholder='Select technologies...' />
							</MultiSelectTrigger>
							<MultiSelectContent>
								<MultiSelectGroup heading='Frontend'>
									<MultiSelectItem value='react'>React</MultiSelectItem>
									<MultiSelectItem value='vue'>Vue.js</MultiSelectItem>
								</MultiSelectGroup>
								<MultiSelectSeparator />
								<MultiSelectGroup heading='Backend'>
									<MultiSelectItem value='express'>Express.js</MultiSelectItem>
									<MultiSelectItem value='fastify'>Fastify</MultiSelectItem>
								</MultiSelectGroup>
							</MultiSelectContent>
						</MultiSelect>
					</div>

					<div>
						<h4 className='text-sm font-medium mb-2'>Custom Badge Labels</h4>
						<MultiSelect>
							<MultiSelectTrigger className='w-full max-w-[300px]'>
								<MultiSelectValue placeholder='Select with badges...' />
							</MultiSelectTrigger>
							<MultiSelectContent>
								<MultiSelectGroup>
									<MultiSelectItem value='react' badgeLabel='⚛️ React'>
										React - JavaScript library
									</MultiSelectItem>
									<MultiSelectItem value='vue' badgeLabel='💚 Vue'>
										Vue.js - Progressive framework
									</MultiSelectItem>
								</MultiSelectGroup>
							</MultiSelectContent>
						</MultiSelect>
					</div>
				</div>
			</div>
		</div>
	)
};
