import React from 'react';

// Storybook modules
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { lightTheme } from '../src/components/theme';

/*

preview.js notes:

- Allows for globalDecorators to be added, saves adding it per story file

- Adds knobs support (Toggle components)

- Adds theming support via ThemeProvider

- Adds a11y support, components are tested for accessibility e.g. alt image

*/

// Adds interactive component support e.g. isToggled
addDecorator(withKnobs);

// Adds accessibility tests to storybook
addDecorator(withA11y);

// Provides a global wrapper
addDecorator((storyFn) => <ThemeProvider theme={lightTheme}>{storyFn()}</ThemeProvider>);
