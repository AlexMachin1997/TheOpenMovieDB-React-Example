import React from 'react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import { darkTheme, lightTheme } from '../../theme';
import Typography from './index';
import createDOMElement from '../../../utils/testUtils/createDOMElement';

const stylingCheck = (expectedResult, props, theme = lightTheme) => {
	// Arrange and act
	const element = createDOMElement(
		<ThemeProvider theme={theme}>
			<Typography {...props} />
		</ThemeProvider>,
		'h1'
	);

	// Assert
	expect(element).toHaveStyle(expectedResult);
};

describe('Typography tests', () => {
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
			const element = createDOMElement(<Typography />, 'h1');

			// Assert
			expect(element.innerHTML).toBe('Default text');
		});

		it('Should return the custom text', () => {
			// Arrange and act
			const element = createDOMElement(<Typography text='Custom Text' />, 'h1');

			// Assert
			expect(element.innerHTML).toBe('Custom Text');
		});

		it('Should return the custom JSX', () => {
			// Arrange and act
			const element = createDOMElement(
				<Typography type='a' text={<p>Custom jsx</p>} />,
				"a[href='https://www.google.com/']"
			);

			// Assert
			expect(element.textContent).toBe('Custom jsx');
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

	describe('href', () => {
		it('It should return the default href', () => {
			// Arrange and act
			const element = createDOMElement(
				<Typography type='a' />,
				"a[href='https://www.google.com/']"
			);

			// Assert
			expect(element).toBeTruthy();
		});

		it('The custom prop should be https://www.facebook.com/', () => {
			// Arrange and act
			const element = createDOMElement(
				<Typography type='a' href='https://www.facebook.com/' />,
				"a[href='https://www.facebook.com/']"
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('newTab', () => {
		it('The Typography should have a target of _blank', () => {
			// Arrange and act
			const element = createDOMElement(
				<Typography type='a' href='https://www.facebook.com/' />,
				"a[target='_blank']"
			);

			// Assert
			expect(element).toBeTruthy();
		});

		it('The custom prop should give the Typography component a target of _self', () => {
			// Arrange and act
			const element = createDOMElement(
				<Typography type='a' href='https://www.facebook.com/' newTab={false} />,
				"a[target='_self']"
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and act
			const element = createDOMElement(
				<Typography text='a11y' size='2rem' weight='bold' height={1} />,
				'h1'
			);

			// Assert
			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
