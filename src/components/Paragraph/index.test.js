import React from 'react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import { darkTheme, lightTheme } from '../theme';
import Paragraph from './index';
import createDOMContent from '../../utils/testUtils/createDOMElement';

describe('Paragraph tests', () => {
	describe('weight', () => {
		it('Should have default font-weight of 500', () => {
			// Arrange and act
			const element = createDOMContent(<Paragraph />, 'p');

			// Assert
			expect(element).toHaveStyle('font-weight: 500');
		});

		it('Should have a font-weight of 700', () => {
			// Arrange and act
			const element = createDOMContent(<Paragraph weight="700" />, 'p');

			// Assert
			expect(element).toHaveStyle('font-weight: 700');
		});
	});

	describe('height', () => {
		it('Should have a default height of 1', () => {
			// Arrange and act
			const element = createDOMContent(<Paragraph />, 'p');

			// Assert
			expect(element).toHaveStyle('height: 1');
		});

		it('Should have a default height of 2', () => {
			// Arrange and act
			const element = createDOMContent(<Paragraph />, 'p');

			// Assert
			expect(element).toHaveStyle('height: 2');
		});
	});

	describe('text', () => {
		it('Should return the default text', () => {
			// Assert and act
			const element = createDOMContent(<Paragraph />, 'p');

			// Assert
			expect(element.textContent).toBe('Default text');
		});

		it('Should return the custom text', () => {
			// Assert and act
			const element = createDOMContent(<Paragraph text="Custom" />, 'p');

			// Assert
			expect(element.textContent).toBe('Custom');
		});
	});

	describe('size', () => {
		it('Should return a font-size of 1rem', () => {
			// Arrange and act
			const element = createDOMContent(<Paragraph />, 'p');

			// Assert
			expect(element).toHaveStyle('font-size: 1rem');
		});

		it('Should return a font-size of 2rem', () => {
			// Arrange and act
			const element = createDOMContent(<Paragraph size="2rem" />, 'p');

			// Assert
			expect(element).toHaveStyle('font-size: 2rem');
		});
	});

	describe('Theming (Dark/Light modes)', () => {
		const ParagraphCustomProvider = ({ theme }) => (
			<ThemeProvider theme={theme}>
				<Paragraph />
			</ThemeProvider>
		);

		it('The font colour should be white', () => {
			// Arrange and act
			const element = createDOMContent(ParagraphCustomProvider({ theme: darkTheme }), 'p');

			// Assert
			expect(element).toHaveStyle('color: white');
		});

		it('The font colour should be black', () => {
			// Arrange and act
			const element = createDOMContent(ParagraphCustomProvider({ theme: lightTheme }), 'p');

			// Assert
			expect(element).toHaveStyle('color: black');
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMContent(
				<Paragraph text="Test" weight="bolder" height={1} size="1rem" colour="red" />,
				'p'
			);

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
