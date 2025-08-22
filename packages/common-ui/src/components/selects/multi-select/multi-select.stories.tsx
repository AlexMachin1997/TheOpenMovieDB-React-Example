import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
	SelectProvider,
	SelectTrigger,
	SelectList,
	SelectListItem,
	SelectListItems,
	SelectVirtualizedList,
	SelectVirtualizedGroupedList
} from '~/components/selects/core/components';
import { MultiSelectValue } from '~/components/selects/multi-select/multi-select';
import { Label } from '~/components/label/label';
import { Option } from '~/types/Option';

type MultiSelectStorybookTypes = {
	values?: string[];
	options?: Option[];
	onValuesChange?: (values: string[]) => void;
	children?: React.ReactNode;
	placeholder?: string;
	overflowBehavior?: 'wrap' | 'wrap-when-open' | 'cutoff';
	canSearch?: boolean;
	clickToRemove?: boolean;
};

const meta: Meta<typeof SelectProvider> = {
	title: 'Components/Selects/MultiSelect',
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

const BasicMultiSelectTemplate = (args: MultiSelectStorybookTypes) => {
	const [selectedValues, setSelectedValues] = React.useState<string[]>(args?.values || []);

	return (
		<SelectProvider
			{...args}
			mode='multiple'
			values={selectedValues}
			onValuesChange={setSelectedValues}
		>
			<SelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue
					placeholder='Select options...'
					overflowBehavior={args?.overflowBehavior}
					clickToRemove={args?.clickToRemove}
				/>
			</SelectTrigger>
			<SelectList
				search={
					args?.canSearch
						? { placeholder: 'Search items...', emptyMessage: 'No items found' }
						: undefined
				}
			>
				<SelectListItems>{({ item }) => <SelectListItem value={item.value} />}</SelectListItems>
			</SelectList>
		</SelectProvider>
	);
};

export const Default: StoryObj<MultiSelectStorybookTypes> = {
	render: (args) => <BasicMultiSelectTemplate {...args} />,
	args: {
		values: [],
		options: frameworks
	}
};

export const WithPreselectedValues: StoryObj<MultiSelectStorybookTypes> = {
	render: (args) => <BasicMultiSelectTemplate {...args} />,
	args: {
		values: ['next.js', 'react'],
		options: frameworks
	}
};

export const WithSearch: StoryObj<MultiSelectStorybookTypes> = {
	args: {
		values: [],
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
	render: (args) => <BasicMultiSelectTemplate {...args} />
};

export const WithoutSearch: StoryObj<MultiSelectStorybookTypes> = {
	args: {
		values: [],
		options: frameworks.slice(0, 5),
		canSearch: false
	},
	render: (args) => <BasicMultiSelectTemplate {...args} />
};

const WithGroupsTemplate = () => {
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	// Extensive grouped options - going crazy! 🚀
	const groupOptions: Option[] = React.useMemo(
		() => [
			// Frontend Frameworks
			{ id: 'react', value: 'react', label: 'React', group: 'Frontend Frameworks' },
			{ id: 'vue', value: 'vue', label: 'Vue.js', group: 'Frontend Frameworks' },
			{ id: 'angular', value: 'angular', label: 'Angular', group: 'Frontend Frameworks' },
			{ id: 'svelte', value: 'svelte', label: 'Svelte', group: 'Frontend Frameworks' },
			{ id: 'solid', value: 'solid', label: 'SolidJS', group: 'Frontend Frameworks' },
			{ id: 'preact', value: 'preact', label: 'Preact', group: 'Frontend Frameworks' },
			{ id: 'lit', value: 'lit', label: 'Lit', group: 'Frontend Frameworks' },
			{ id: 'stencil', value: 'stencil', label: 'Stencil', group: 'Frontend Frameworks' },

			// Backend Frameworks
			{ id: 'express', value: 'express', label: 'Express.js', group: 'Backend Frameworks' },
			{ id: 'fastify', value: 'fastify', label: 'Fastify', group: 'Backend Frameworks' },
			{ id: 'koa', value: 'koa', label: 'Koa', group: 'Backend Frameworks' },
			{ id: 'hapi', value: 'hapi', label: 'Hapi', group: 'Backend Frameworks' },
			{ id: 'nestjs', value: 'nestjs', label: 'NestJS', group: 'Backend Frameworks' },
			{ id: 'django', value: 'django', label: 'Django', group: 'Backend Frameworks' },
			{ id: 'flask', value: 'flask', label: 'Flask', group: 'Backend Frameworks' },
			{ id: 'rails', value: 'rails', label: 'Ruby on Rails', group: 'Backend Frameworks' },
			{ id: 'spring', value: 'spring', label: 'Spring Boot', group: 'Backend Frameworks' },
			{ id: 'laravel', value: 'laravel', label: 'Laravel', group: 'Backend Frameworks' },
			{ id: 'gin', value: 'gin', label: 'Gin (Go)', group: 'Backend Frameworks' },
			{ id: 'actix', value: 'actix', label: 'Actix Web (Rust)', group: 'Backend Frameworks' },

			// Databases - SQL
			{ id: 'postgresql', value: 'postgresql', label: 'PostgreSQL', group: 'SQL Databases' },
			{ id: 'mysql', value: 'mysql', label: 'MySQL', group: 'SQL Databases' },
			{ id: 'sqlite', value: 'sqlite', label: 'SQLite', group: 'SQL Databases' },
			{ id: 'mariadb', value: 'mariadb', label: 'MariaDB', group: 'SQL Databases' },
			{ id: 'oracle', value: 'oracle', label: 'Oracle Database', group: 'SQL Databases' },
			{ id: 'mssql', value: 'mssql', label: 'SQL Server', group: 'SQL Databases' },

			// Databases - NoSQL
			{ id: 'mongodb', value: 'mongodb', label: 'MongoDB', group: 'NoSQL Databases' },
			{ id: 'redis', value: 'redis', label: 'Redis', group: 'NoSQL Databases' },
			{ id: 'cassandra', value: 'cassandra', label: 'Cassandra', group: 'NoSQL Databases' },
			{ id: 'dynamodb', value: 'dynamodb', label: 'DynamoDB', group: 'NoSQL Databases' },
			{ id: 'couchdb', value: 'couchdb', label: 'CouchDB', group: 'NoSQL Databases' },
			{ id: 'neo4j', value: 'neo4j', label: 'Neo4j', group: 'NoSQL Databases' },
			{
				id: 'elasticsearch',
				value: 'elasticsearch',
				label: 'Elasticsearch',
				group: 'NoSQL Databases'
			},

			// Cloud Platforms
			{ id: 'aws', value: 'aws', label: 'Amazon Web Services', group: 'Cloud Platforms' },
			{ id: 'azure', value: 'azure', label: 'Microsoft Azure', group: 'Cloud Platforms' },
			{ id: 'gcp', value: 'gcp', label: 'Google Cloud Platform', group: 'Cloud Platforms' },
			{
				id: 'digitalocean',
				value: 'digitalocean',
				label: 'DigitalOcean',
				group: 'Cloud Platforms'
			},
			{ id: 'linode', value: 'linode', label: 'Linode', group: 'Cloud Platforms' },
			{ id: 'vultr', value: 'vultr', label: 'Vultr', group: 'Cloud Platforms' },
			{ id: 'heroku', value: 'heroku', label: 'Heroku', group: 'Cloud Platforms' },
			{ id: 'vercel', value: 'vercel', label: 'Vercel', group: 'Cloud Platforms' },
			{ id: 'netlify', value: 'netlify', label: 'Netlify', group: 'Cloud Platforms' },
			{ id: 'railway', value: 'railway', label: 'Railway', group: 'Cloud Platforms' },

			// DevOps & Containerization
			{ id: 'docker', value: 'docker', label: 'Docker', group: 'DevOps & Containerization' },
			{
				id: 'kubernetes',
				value: 'kubernetes',
				label: 'Kubernetes',
				group: 'DevOps & Containerization'
			},
			{ id: 'helm', value: 'helm', label: 'Helm', group: 'DevOps & Containerization' },
			{
				id: 'terraform',
				value: 'terraform',
				label: 'Terraform',
				group: 'DevOps & Containerization'
			},
			{ id: 'ansible', value: 'ansible', label: 'Ansible', group: 'DevOps & Containerization' },
			{ id: 'jenkins', value: 'jenkins', label: 'Jenkins', group: 'DevOps & Containerization' },
			{
				id: 'gitlab-ci',
				value: 'gitlab-ci',
				label: 'GitLab CI/CD',
				group: 'DevOps & Containerization'
			},
			{
				id: 'github-actions',
				value: 'github-actions',
				label: 'GitHub Actions',
				group: 'DevOps & Containerization'
			},
			{ id: 'circleci', value: 'circleci', label: 'CircleCI', group: 'DevOps & Containerization' },

			// Programming Languages
			{
				id: 'javascript',
				value: 'javascript',
				label: 'JavaScript',
				group: 'Programming Languages'
			},
			{
				id: 'typescript',
				value: 'typescript',
				label: 'TypeScript',
				group: 'Programming Languages'
			},
			{ id: 'python', value: 'python', label: 'Python', group: 'Programming Languages' },
			{ id: 'java', value: 'java', label: 'Java', group: 'Programming Languages' },
			{ id: 'csharp', value: 'csharp', label: 'C#', group: 'Programming Languages' },
			{ id: 'go', value: 'go', label: 'Go', group: 'Programming Languages' },
			{ id: 'rust', value: 'rust', label: 'Rust', group: 'Programming Languages' },
			{ id: 'swift', value: 'swift', label: 'Swift', group: 'Programming Languages' },
			{ id: 'kotlin', value: 'kotlin', label: 'Kotlin', group: 'Programming Languages' },
			{ id: 'php', value: 'php', label: 'PHP', group: 'Programming Languages' },
			{ id: 'ruby', value: 'ruby', label: 'Ruby', group: 'Programming Languages' },
			{ id: 'dart', value: 'dart', label: 'Dart', group: 'Programming Languages' },
			{ id: 'elixir', value: 'elixir', label: 'Elixir', group: 'Programming Languages' },
			{ id: 'scala', value: 'scala', label: 'Scala', group: 'Programming Languages' },
			{ id: 'clojure', value: 'clojure', label: 'Clojure', group: 'Programming Languages' },

			// Mobile Development
			{
				id: 'react-native',
				value: 'react-native',
				label: 'React Native',
				group: 'Mobile Development'
			},
			{ id: 'flutter', value: 'flutter', label: 'Flutter', group: 'Mobile Development' },
			{ id: 'xamarin', value: 'xamarin', label: 'Xamarin', group: 'Mobile Development' },
			{ id: 'ionic', value: 'ionic', label: 'Ionic', group: 'Mobile Development' },
			{ id: 'cordova', value: 'cordova', label: 'Apache Cordova', group: 'Mobile Development' },
			{
				id: 'nativescript',
				value: 'nativescript',
				label: 'NativeScript',
				group: 'Mobile Development'
			},
			{ id: 'expo', value: 'expo', label: 'Expo', group: 'Mobile Development' },

			// Testing Frameworks
			{ id: 'jest', value: 'jest', label: 'Jest', group: 'Testing Frameworks' },
			{ id: 'vitest', value: 'vitest', label: 'Vitest', group: 'Testing Frameworks' },
			{ id: 'cypress', value: 'cypress', label: 'Cypress', group: 'Testing Frameworks' },
			{ id: 'playwright', value: 'playwright', label: 'Playwright', group: 'Testing Frameworks' },
			{ id: 'selenium', value: 'selenium', label: 'Selenium', group: 'Testing Frameworks' },
			{ id: 'mocha', value: 'mocha', label: 'Mocha', group: 'Testing Frameworks' },
			{ id: 'jasmine', value: 'jasmine', label: 'Jasmine', group: 'Testing Frameworks' },
			{ id: 'puppeteer', value: 'puppeteer', label: 'Puppeteer', group: 'Testing Frameworks' },

			// CSS Frameworks & Preprocessors
			{ id: 'tailwind', value: 'tailwind', label: 'Tailwind CSS', group: 'CSS & Styling' },
			{ id: 'bootstrap', value: 'bootstrap', label: 'Bootstrap', group: 'CSS & Styling' },
			{ id: 'chakra-ui', value: 'chakra-ui', label: 'Chakra UI', group: 'CSS & Styling' },
			{ id: 'material-ui', value: 'material-ui', label: 'Material-UI', group: 'CSS & Styling' },
			{ id: 'ant-design', value: 'ant-design', label: 'Ant Design', group: 'CSS & Styling' },
			{ id: 'sass', value: 'sass', label: 'Sass/SCSS', group: 'CSS & Styling' },
			{ id: 'less', value: 'less', label: 'Less', group: 'CSS & Styling' },
			{
				id: 'styled-components',
				value: 'styled-components',
				label: 'Styled Components',
				group: 'CSS & Styling'
			},
			{ id: 'emotion', value: 'emotion', label: 'Emotion', group: 'CSS & Styling' },

			// Build Tools & Bundlers
			{ id: 'webpack', value: 'webpack', label: 'Webpack', group: 'Build Tools' },
			{ id: 'vite', value: 'vite', label: 'Vite', group: 'Build Tools' },
			{ id: 'rollup', value: 'rollup', label: 'Rollup', group: 'Build Tools' },
			{ id: 'parcel', value: 'parcel', label: 'Parcel', group: 'Build Tools' },
			{ id: 'esbuild', value: 'esbuild', label: 'esbuild', group: 'Build Tools' },
			{ id: 'turbo', value: 'turbo', label: 'Turbo', group: 'Build Tools' },
			{ id: 'swc', value: 'swc', label: 'SWC', group: 'Build Tools' },

			// Monitoring & Analytics
			{ id: 'datadog', value: 'datadog', label: 'Datadog', group: 'Monitoring & Analytics' },
			{ id: 'newrelic', value: 'newrelic', label: 'New Relic', group: 'Monitoring & Analytics' },
			{ id: 'sentry', value: 'sentry', label: 'Sentry', group: 'Monitoring & Analytics' },
			{
				id: 'prometheus',
				value: 'prometheus',
				label: 'Prometheus',
				group: 'Monitoring & Analytics'
			},
			{ id: 'grafana', value: 'grafana', label: 'Grafana', group: 'Monitoring & Analytics' },
			{ id: 'splunk', value: 'splunk', label: 'Splunk', group: 'Monitoring & Analytics' },
			{
				id: 'google-analytics',
				value: 'google-analytics',
				label: 'Google Analytics',
				group: 'Monitoring & Analytics'
			},

			// Ungrouped Technologies (misc tools)
			{ id: 'postman', value: 'postman', label: 'Postman' },
			{ id: 'insomnia', value: 'insomnia', label: 'Insomnia' },
			{ id: 'figma', value: 'figma', label: 'Figma' },
			{ id: 'sketch', value: 'sketch', label: 'Sketch' },
			{ id: 'notion', value: 'notion', label: 'Notion' },
			{ id: 'slack', value: 'slack', label: 'Slack' },
			{ id: 'discord', value: 'discord', label: 'Discord' },
			{ id: 'vscode', value: 'vscode', label: 'VS Code' },
			{ id: 'webstorm', value: 'webstorm', label: 'WebStorm' },
			{ id: 'chrome-devtools', value: 'chrome-devtools', label: 'Chrome DevTools' }
		],
		[]
	);

	const groups = React.useMemo(() => {
		return [...new Set(groupOptions.map((opt) => opt.group).filter(Boolean))];
	}, [groupOptions]);

	return (
		<SelectProvider
			values={selectedValues}
			onValuesChange={setSelectedValues}
			options={groupOptions}
			mode='multiple'
		>
			<SelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder='Select from 100+ technologies...' />
			</SelectTrigger>
			<SelectList search={{ placeholder: 'Search items...', emptyMessage: 'No items found' }}>
				<SelectVirtualizedGroupedList groupOrder={groups} ungroupedPosition='bottom'>
					{({ item }) => <SelectListItem value={item.value} />}
				</SelectVirtualizedGroupedList>
			</SelectList>
		</SelectProvider>
	);
};

export const WithGroups: Story = {
	args: {
		values: []
	},
	render: () => <WithGroupsTemplate />
};

export const WrapWhenOpen: StoryObj<MultiSelectStorybookTypes> = {
	render: (args) => <BasicMultiSelectTemplate {...args} />,
	args: {
		values: [],
		options: frameworks,
		overflowBehavior: 'wrap-when-open'
	}
};

export const Wrap: StoryObj<MultiSelectStorybookTypes> = {
	render: (args) => <BasicMultiSelectTemplate {...args} />,
	args: {
		values: [],
		options: frameworks,
		overflowBehavior: 'wrap'
	}
};

export const Cutoff: StoryObj<MultiSelectStorybookTypes> = {
	render: (args) => <BasicMultiSelectTemplate {...args} />,
	args: {
		values: [],
		options: frameworks,
		overflowBehavior: 'cutoff'
	}
};

export const DisabledClickToRemove: StoryObj<MultiSelectStorybookTypes> = {
	render: (args) => <BasicMultiSelectTemplate {...args} />,
	args: {
		values: [],
		options: frameworks,
		clickToRemove: false
	}
};

const LargeListVirtualizedTemplate = () => {
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	const options: Option[] = React.useMemo(() => {
		return Array.from({ length: 5000 }, (_, i) => ({
			id: `item-${i}`,
			value: `item-${i}`,
			label: `Item ${i + 1}`
		}));
	}, []);

	return (
		<SelectProvider
			mode='multiple'
			values={selectedValues}
			options={options}
			onValuesChange={setSelectedValues}
		>
			<SelectTrigger className='w-full max-w-[400px]'>
				<MultiSelectValue placeholder={`Select from ${options.length} items (virtualized)`} />
			</SelectTrigger>
			<SelectList search={{ placeholder: 'Search items...', emptyMessage: 'No items found' }}>
				<SelectVirtualizedList>
					{({ item }) => <SelectListItem value={item.value} />}
				</SelectVirtualizedList>
			</SelectList>
		</SelectProvider>
	);
};

export const LargeListVirtualized: StoryObj<MultiSelectStorybookTypes> = {
	render: () => <LargeListVirtualizedTemplate />
};

const WithFormTemplate = () => {
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
				<Label htmlFor='frameworks'>Select Frameworks:</Label>
				<SelectProvider
					values={selectedFrameworks}
					onValuesChange={setSelectedFrameworks}
					options={frameworks}
					mode='multiple'
				>
					<SelectTrigger className='w-full'>
						<MultiSelectValue placeholder='Choose frameworks...' />
					</SelectTrigger>
					<SelectList
						search={{ placeholder: 'Search frameworks...', emptyMessage: 'No frameworks found' }}
					>
						<SelectListItems>{({ item }) => <SelectListItem value={item.value} />}</SelectListItems>
					</SelectList>
				</SelectProvider>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='languages'>Select Languages:</Label>
				<SelectProvider
					values={selectedLanguages}
					onValuesChange={setSelectedLanguages}
					options={programmingLanguages}
					mode='multiple'
				>
					<SelectTrigger className='w-full'>
						<MultiSelectValue placeholder='Choose languages...' />
					</SelectTrigger>
					<SelectList>
						<SelectListItems>{({ item }) => <SelectListItem value={item.value} />}</SelectListItems>
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
};

export const WithForm: Story = {
	render: () => <WithFormTemplate />
};

const CustomStylingTemplate = (args: MultiSelectStorybookTypes) => {
	const [selectedValues, setSelectedValues] = React.useState<string[]>(args.values || []);

	return (
		<SelectProvider
			{...args}
			mode='multiple'
			values={selectedValues}
			onValuesChange={setSelectedValues}
		>
			<SelectTrigger className='w-full max-w-[400px] bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100'>
				<MultiSelectValue placeholder='Custom styled multi-select...' />
			</SelectTrigger>
			<SelectList>
				<SelectListItems>{({ item }) => <SelectListItem value={item.value} />}</SelectListItems>
			</SelectList>
		</SelectProvider>
	);
};

export const CustomStyling: Story = {
	render: (args) => <CustomStylingTemplate {...args} />,
	args: {
		values: [],
		options: frameworks
	}
};
