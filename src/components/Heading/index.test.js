import React from 'react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import { darkTheme, lightTheme } from '../theme';
import Heading from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

const stylingCheck = (expectedResult, props, theme = lightTheme) => {
	// Arrange and act
	const element = createDOMElement(
		<ThemeProvider theme={theme}>
			<Heading {...props} />
		</ThemeProvider>,
		'h1',
	);

	// Assert
	expect(element).toHaveStyle(expectedResult);
};

describe('Heading tests', () => {
	describe('weight', () => {
		it('Should have default font-weight of 500', () => {
			stylingCheck('font-weight: 500', {});
		});

		it('Should have a font-weight of 700', () => {
			stylingCheck('font-weight: 700', { weight: '700' });
		});
	});

	describe('height', () => {
		it('Should have a default height of 1', () => {
			stylingCheck('height: 1', {});
		});

		it('Should have a default height of 2', () => {
			stylingCheck('height: 2', { height: 2 });
		});
	});

	describe('text', () => {
		it('Should return the default text', () => {
			// Arrange and act
			const element = createDOMElement(<Heading />, 'h1');

			// Assert
			expect(element.innerHTML).toBe('Default text');
		});

		it('Should return the custom text', () => {
			// Arrange and act
			const element = createDOMElement(<Heading text='Custom Text' />, 'h1');

			// Assert
			expect(element.innerHTML).toBe('Custom Text');
		});
	});

	describe('size', () => {
		it('Should return a font-size of 1rem', () => {
			stylingCheck('font-size: 1rem', {});
		});

		it('Should return a font-size of 2rem', () => {
			stylingCheck('font-size: 2rem', { size: '2rem' });
		});
	});

	describe('colour', () => {
		it('Should return the default colour (LightTheme)', () => {
			stylingCheck('color: black', {}, lightTheme);
		});

		it('Should return the default colour (DarkTheme)', () => {
			stylingCheck('color: white', {}, darkTheme);
		});

		it('Should return the custom colour', () => {
			stylingCheck('color: red', { colour: 'red' });
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and act
			const element = createDOMElement(
				<Heading text='a11y' size='2rem' weight='bold' height={1} />,
				'h1',
			);

			// Assert
			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
