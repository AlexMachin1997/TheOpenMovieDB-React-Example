export interface ComponentsConfig {
	$schema: string;
	style: 'new-york' | 'default';
	rsc: boolean;
	tsx: boolean;
	tailwind: {
		config: string;
		css: string;
		baseColor:
			| 'slate'
			| 'zinc'
			| 'neutral'
			| 'stone'
			| 'gray'
			| 'red'
			| 'orange'
			| 'green'
			| 'blue'
			| 'yellow'
			| 'violet';
		cssVariables: boolean;
		prefix: string;
	};
	aliases: {
		components: string;
		utils: string;
		ui: string;
		lib: string;
		hooks: string;
	};
	iconLibrary: 'lucide' | 'heroicons' | 'tabler' | 'feather' | 'radix';
}

// Type-safe way to import the config
export const componentsConfig: ComponentsConfig = {
	$schema: 'https://ui.shadcn.com/schema.json',
	style: 'new-york',
	rsc: false,
	tsx: true,
	tailwind: {
		config: '',
		css: 'src/styles/index.css',
		baseColor: 'slate',
		cssVariables: true,
		prefix: ''
	},
	aliases: {
		components: '~/components',
		utils: '~/lib/utils',
		ui: '~/components/ui',
		lib: '~/lib',
		hooks: '~/hooks'
	},
	iconLibrary: 'lucide'
} as const;
