import React from 'react';
import { axe } from 'jest-axe';

import Tooltip from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

describe('Tooltip tests', () => {
	describe('content', () => {
		it('Should return the default content', () => {
			// Arrange and act
			const element = createDOMElement(<Tooltip />, 'div').querySelector('div').firstChild;

			// Assert
			expect(element.textContent).toBe('Tooltip title');
			expect(element).toBeTruthy();
		});

		it('Should return the custom content', () => {
			// Arrange and act
			const element = createDOMElement(<Tooltip content='Custom content' />, 'div').querySelector(
				'div',
			).firstChild;

			// Assert
			expect(element.textContent).toBe('Custom content');
			expect(element).toBeTruthy();
		});
	});

	describe('tooltipText', () => {
		it('Should return the default tooltipText (Text which shows on hover)', () => {
			// Arrange and act
			const element = createDOMElement(<Tooltip />, 'span');

			// Act
			expect(element.textContent).toBe('Tooltip content');
			expect(element).toBeTruthy();
		});

		it('The custom prop should show Visit Facebook', () => {
			// Arrange and act
			const element = createDOMElement(<Tooltip tooltipText='Custom title' />, 'span');

			// Assert
			expect(element.textContent).toBe('Custom title');
			expect(element).toBeTruthy();
		});

		/* Can't do a css onHover event in react-testing-library */
		it('The tooltiptext should be visibility hidden and opacity of 0', () => {
			// Arrange and act
			const element = createDOMElement(<Tooltip />, 'span');

			// Assert
			expect(element).toHaveStyle('visibility: hidden');
			expect(element).toHaveStyle('opacity: 0');
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and act
			const element = createDOMElement(<Tooltip />, 'div');
			const result = await axe(element);

			// Assert
			expect(result).toHaveNoViolations();
		});
	});
});
