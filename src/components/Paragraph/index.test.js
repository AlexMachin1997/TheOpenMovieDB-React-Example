import React from 'react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import { darkTheme, lightTheme } from '../theme';
import Paragraph from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

const stylingCheck = (expectedResult, props, target = 'p', theme = lightTheme) => {
	// Arrange and act
	const element = createDOMElement(
		<ThemeProvider theme={theme}>
			<Paragraph {...props} />
		</ThemeProvider>,
		target,
	);

	// Assert
	expect(element).toHaveStyle(expectedResult);
};

describe('Paragraph tests', () => {
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
			// Assert and act
			const element = createDOMElement(<Paragraph />, 'p');

			// Assert
			expect(element.textContent).toBe('Default text');
		});

		it('Should return the custom text', () => {
			// Assert and act
			const element = createDOMElement(<Paragraph text='Custom' />, 'p');

			// Assert
			expect(element.textContent).toBe('Custom');
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
		it('Should return the light mode default colour', () => {
			stylingCheck('color: black', {}, 'p', lightTheme);
		});

		it('Should return the dark mode default colour', () => {
			stylingCheck('color: white', {}, 'p', darkTheme);
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMElement(
				<Paragraph text='Test' weight='bolder' height={1} size='1rem' colour='red' />,
				'p',
			);

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
