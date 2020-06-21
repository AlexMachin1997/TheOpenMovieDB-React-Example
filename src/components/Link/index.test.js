import React from 'react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import Link from './index';
import { lightTheme } from '../theme';
import createDOMElement from '../../utils/testUtils/createDOMElement';

describe('Link tests', () => {
	describe('href', () => {
		it('It should return the default href', () => {
			// Arrange and act
			const element = createDOMElement(<Link />, "a[href='https://www.google.com/']");

			// Assert
			expect(element).toBeTruthy();
		});

		it('The custom prop should be https://www.facebook.com/', () => {
			// Arrange and act
			const element = createDOMElement(
				<Link href="https://www.facebook.com/" />,
				"a[href='https://www.facebook.com/']"
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('newTab', () => {
		it('The link should have a target of _blank', () => {
			// Arrange and act
			const element = createDOMElement(
				<Link href="https://www.facebook.com/" />,
				"a[target='_blank']"
			);

			// Assert
			expect(element).toBeTruthy();
		});

		it('The custom prop should give the link component a target of _self', () => {
			// Arrange and act
			const element = createDOMElement(
				<Link href="https://www.facebook.com/" newTab={false} />,
				"a[target='_self']"
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('colour', () => {
		it('The default colour should be black', () => {
			// Arrange and act
			const element = createDOMElement(
				<ThemeProvider theme={lightTheme}>
					<Link />
				</ThemeProvider>,
				"a[href='https://www.google.com/']"
			);

			// Assert
			expect(element).toHaveStyle('color: black');
		});

		it('The custom colour should be red', () => {
			// Arrange and act
			const element = createDOMElement(<Link colour="red" />, "a[href='https://www.google.com/']");

			// Assert
			expect(element).toHaveStyle('color: red');
		});
	});

	describe('content', () => {
		it('Custom text', () => {
			// Arrange and act
			const element = createDOMElement(
				<Link content="Custom content" />,
				"a[href='https://www.google.com/']"
			);

			// Assert
			expect(element.textContent).toBe('Custom content');
		});

		it('Custom JSX', () => {
			// Arrange and act
			const element = createDOMElement(
				<Link content={<p>Custom jsx</p>} />,
				"a[href='https://www.google.com/']"
			);

			// Assert
			expect(element.textContent).toBe('Custom jsx');
		});
	});

	describe('label', () => {
		it('Should return the default label', () => {
			// Arrange and act
			const element = createDOMElement(<Link />, "a[aria-label='Default']");

			// Assert
			expect(element).toBeTruthy();
		});

		it('Should return the custom label', () => {
			// Arrange and act
			const element = createDOMElement(
				<Link ariaLabel="Custom Label" />,
				"a[aria-label='Default']"
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and act
			const element = createDOMElement(<Link />, "a[href='https://www.google.com/']");
			const result = await axe(element);

			// Assert
			expect(result).toHaveNoViolations();
		});
	});
});
