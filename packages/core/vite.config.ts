import { typescriptLibrary } from '@repo/vite-config/typescript-library';

export default typescriptLibrary({
	externals: ['date-fns']
});
