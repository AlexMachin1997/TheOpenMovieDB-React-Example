import { reactLibrary } from '@repo/vite-config/react-library';

export default reactLibrary({
	externals: ['@repo/core', '@repo/ui-core', '@repo/ui-overlays']
});
