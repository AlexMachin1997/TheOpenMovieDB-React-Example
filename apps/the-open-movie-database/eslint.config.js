import { config as reactConfig } from '@repo/eslint-config/react';

export default [
	...reactConfig,
	{
		rules: {
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					'': 'never',
					'~': 'never',
					'~/components': 'never',
					'~/hooks': 'never',
					'~/services': 'never',
					'~/types': 'never',
					'~/utils': 'never',
					'~/assets': 'never',
					'~/test': 'never'
				}
			]
		}
	}
];
