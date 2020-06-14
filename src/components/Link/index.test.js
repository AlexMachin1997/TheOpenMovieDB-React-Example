import React from 'react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';

import Link from './index';
import { lightTheme } from '../theme';
import createDOMElement from '../../utils/testUtils/createDOMElement';

describe('Link tests', () => {
	describe('href', () => {
		it('It should return the default href', () => {
			const element = createDOMElement(<Link />, "a[href='https://www.google.com/']");
			expect(element).toBeTruthy();
		});

		it('The custom prop should be https://www.facebook.com/', () => {
			const element = createDOMElement(
				<Link href="https://www.facebook.com/" />,
				"a[href='https://www.facebook.com/']"
			);
			expect(element).toBeTruthy();
		});
	});

	describe('newTab', () => {
		it('The link should have a target of _blank', () => {
			const element = createDOMElement(
				<Link href="https://www.facebook.com/" />,
				"a[target='_blank']"
			);

			expect(element).toBeTruthy();
		});

		it('The custom prop should give the link component a target of _self', () => {
			const element = createDOMElement(
				<Link href="https://www.facebook.com/" newTab={false} />,
				"a[target='_self']"
			);

			expect(element).toBeTruthy();
		});
	});

	describe('colour', () => {
		it('The default colour should be black', () => {
			const element = createDOMElement(
				<ThemeProvider theme={lightTheme}>
					<Link />
				</ThemeProvider>,
				"a[href='https://www.google.com/']"
			);

			expect(element).toHaveStyle('color: black');
		});

		it('The custom colour should be red', () => {
			const element = createDOMElement(<Link colour="red" />, "a[href='https://www.google.com/']");
			expect(element).toHaveStyle('color: red');
		});
	});

	describe('content', () => {
		it('Custom text', () => {
			const element = createDOMElement(
				<Link content="Custom content" />,
				"a[href='https://www.google.com/']"
			);

			expect(element.textContent).toBe('Custom content');
		});

		it('Custom JSX', () => {
			const element = createDOMElement(
				<Link content={<p>Custom jsx</p>} />,
				"a[href='https://www.google.com/']"
			);

			expect(element.textContent).toBe('Custom jsx');
		});
	});

	describe('label', () => {
		it('Should return the default label', () => {
			const element = createDOMElement(<Link />, "a[aria-label='Default']");

			expect(element).toBeTruthy();
		});

		it('Should return the custom label', () => {});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMElement(<Link />, "a[href='https://www.google.com/']");

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
