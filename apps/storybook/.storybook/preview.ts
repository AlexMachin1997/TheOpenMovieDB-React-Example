import type { Preview } from '@storybook/react-vite';
import './tailwind.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},

		// Table of contents for docs pages, generated from the rendered headings so it cannot go
		// stale when one is renamed.
		//
		// This has to live here rather than per component. `DocsContainer` reads
		// `resolveOf('meta', ['meta']).preparedMeta.parameters.docs.toc` first and only falls back
		// to these project-level parameters when that throws — which it does for every `.mdx` page
		// attached via `<Meta of={...} />`. So `parameters.docs.toc` in a story meta is silently
		// ignored for MDX, and this is the only switch that works.
		// (@storybook/addon-docs@10.2.16, dist/blocks.js:6769-6772)
		//
		// `headingSelector` is not optional in practice: the default is `h3` alone, which lists a
		// page's sub-sections while skipping every `##` section above them.
		docs: {
			toc: {
				headingSelector: 'h2, h3'
			}
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo'
		}
	}
};

export default preview;
