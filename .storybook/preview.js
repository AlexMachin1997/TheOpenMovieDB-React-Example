import * as React from 'react';

// Storybook modules
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withKnobs } from '@storybook/addon-knobs';
import { lightTheme } from '../src/components/theme';

import '../src/index.scss';

/*

preview.js notes:

- Allows for globalDecorators to be added, saves adding it per story file

- Adds knobs support (Toggle components)

- Adds theming support via ThemeProvider

- Adds a11y support, components are tested for accessibility e.g. alt image

*/

// Adds interactive component support e.g. isToggled
addDecorator(withKnobs);

document.body.classList.add('light-mode');
document.body.classList.add('font-karla');

// Adds accessibility tests to storybook
addParameters({
	a11y: {
		element: '#root',
		config: {},
		options: {},
		manual: false
	}
});

// Provides a global wrapper
addDecorator((storyFn) => (
	<>
		<ThemeProvider theme={lightTheme}>{storyFn()}</ThemeProvider>
	</>
));
