import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import { darkTheme, lightTheme } from '../theme';
import Heading from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

describe('Heading tests', () => {
	describe('weight', () => {
		it('Should have default font-weight of 500', () => {
			// Arrange and act
			const element = createDOMElement(<Heading />, 'h1');

			// Assert
			expect(element).toHaveStyle('font-weight: 500');
		});

		it('Should have a font-weight of 700', () => {
			// Arrange and act
			const element = createDOMElement(<Heading weight="700" />, 'h1');

			// Assert
			expect(element).toHaveStyle('font-weight: 700');
		});
	});

	describe('height', () => {
		it('Should have a default height of 1', () => {
			// Arrange and act
			const element = createDOMElement(<Heading />, 'h1');

			// Assert
			expect(element).toHaveStyle('height: 1');
		});

		it('Should have a default height of 2', () => {
			// Arrange and act
			const element = createDOMElement(<Heading height={1} />, 'h1');

			// Assert
			expect(element).toHaveStyle('height: 1');
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
			// Arrange and act
			const element = createDOMElement(<Heading />, 'h1');

			// Assert
			expect(element).toHaveStyle('font-size: 1rem');
		});

		it('Should return a font-size of 2rem', () => {
			// Arrange and act
			const element = createDOMElement(<Heading size="2rem" />, 'h1');

			// Assert
			expect(element).toHaveStyle('font-size: 2rem');
		});
	});

	describe('Theming (Dark/Light modes)', () => {
		const BlockThemeProvider = ({ theme }) => {
			render(
				<ThemeProvider theme={theme}>
					<Heading />
				</ThemeProvider>
			);
		};

		it('The font colour should be white', () => {
			// Arrange and act
			const element = createDOMElement(
				BlockThemeProvider({
					theme: darkTheme
				}),
				'h1'
			);

			// Assert
			expect(element).toHaveStyle('color: white');
		});

		it('The font colour should be black', () => {
			// Arrange and act
			const element = createDOMElement(
				BlockThemeProvider({
					theme: lightTheme
				}),
				'h1'
			);

			// Assert
			expect(element).toHaveStyle('color: black');
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
