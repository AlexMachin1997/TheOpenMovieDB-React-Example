import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import { darkTheme, lightTheme } from '../theme';
import Heading from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

const stylingChecks = (expectedResult, props, target = 'h1', theme = lightTheme) => {
	// Arrange and act
	const element = createDOMElement(
		<ThemeProvider theme={theme}>
			<Heading {...props} />
		</ThemeProvider>,
		target
	);

	// Assert
	expect(element).toHaveStyle(expectedResult);
};

describe('Heading tests', () => {
	describe('weight', () => {
		it('Should have default font-weight of 500', () => {
			stylingChecks('font-weight: 500', {});
		});

		it('Should have a font-weight of 700', () => {
			stylingChecks('font-weight: 700', { weight: '700' });
		});
	});

	describe('height', () => {
		it('Should have a default height of 1', () => {
			stylingChecks('height: 1', {});
		});

		it('Should have a default height of 2', () => {
			stylingChecks('height: 2', { height: 2 });
		});
	});

	describe('text', () => {
		it('Should return the default text', () => {
			// Arrange and act
			const element = createDOMElement(<Heading />, 'h1');

			// Assert
			expect(element.textContent).toBe('Default text');
		});

		it('Should return the custom text', () => {
			// Arrange and act
			const element = createDOMElement(<Heading text="Custom" />, 'h1');

			// Assert
			expect(element.textContent).toBe('Custom');
		});
	});

	describe('size', () => {
		it('Should return a font-size of 1rem', () => {
			stylingChecks('font-size: 1rem', {});
		});

		it('Should return a font-size of 2rem', () => {
			stylingChecks('font-size: 2rem', { size: '2rem' });
		});
	});

	describe('Theming (Dark/Light modes)', () => {
		it('The font colour should be white', () => {
			stylingChecks('color: black', {}, 'h1', lightTheme);
		});

		it('The font colour should be black', () => {
			stylingChecks('color: white', {}, 'h1', darkTheme);
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and act
			const element = createDOMElement(
				<Heading text="a11y" size="2rem" weight="bold" height={1} />,
				'h1'
			);

			// Assert

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
